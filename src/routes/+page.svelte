<script lang="ts">
	export const ssr = false;

	import { onMount } from 'svelte';
	import 'grapesjs/dist/css/grapes.min.css';
	import { XMLParser } from 'fast-xml-parser';

	let editor: any;
	let fileInput: HTMLInputElement;

	// Fungsi sakti untuk mengambil semua teks dari node XML yang kompleks/nested
	const extractFullText = (node: any): string => {
		if (!node) return '';
		if (typeof node === 'string') return node;
		if (Array.isArray(node)) return node.map(extractFullText).join(' ');
		if (typeof node === 'object') {
			// Jika ada properti #text, prioritaskan itu, lalu gabungkan dengan anak-anaknya
			const baseText = node['#text'] || '';
			const childrenText = Object.keys(node)
				.filter((key) => key !== '#text' && key !== 'id' && key !== 'rid')
				.map((key) => extractFullText(node[key]))
				.join(' ');
			return `${baseText} ${childrenText}`.trim();
		}
		return '';
	};

	const processJATS = async (xmlText: string) => {
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ''
		});

		const jsonObj = parser.parse(xmlText);
		const articleMeta = jsonObj?.article?.front?.['article-meta'];
		const journalMeta = jsonObj?.article?.front?.['journal-meta'];

		if (!articleMeta) return;

		// 1. Ekstraksi Metadata Dasar
		const journalTitle = extractFullText(journalMeta?.['journal-title-group']?.['journal-title']);
		const articleTitle = extractFullText(articleMeta['title-group']?.['article-title']);
		const abstractData = articleMeta.abstract?.p;
		const abstractHtml = Array.isArray(abstractData)
			? abstractData.map((p) => extractFullText(p)).join('</p><p>')
			: extractFullText(abstractData);

		// 2. Mapping Afiliasi
		const affsRaw = articleMeta['aff'];
		const affMap: Record<string, { text: string; index: number }> = {};
		if (affsRaw) {
			const affList = Array.isArray(affsRaw) ? affsRaw : [affsRaw];
			affList.forEach((a: any, i: number) => {
				const id = a.id;
				const institution = extractFullText(a.institution || a);
				if (id) affMap[id] = { text: institution, index: i + 1 };
			});
		}

		// 3. Ekstraksi Authors
		let authors: any[] = [];
		const contribGroups = Array.isArray(articleMeta['contrib-group'])
			? articleMeta['contrib-group']
			: [articleMeta['contrib-group']];

		contribGroups.forEach((group: any) => {
			if (!group?.contrib) return;
			const rawContribs = Array.isArray(group.contrib) ? group.contrib : [group.contrib];
			rawContribs.forEach((c: any) => {
				const xrefs = Array.isArray(c.xref) ? c.xref : [c.xref];
				const affId = xrefs.find((x: any) => x?.['ref-type'] === 'aff')?.rid;
				const isCorresp = c.corresp === 'yes' || !!c.email;

				authors.push({
					name: `${c.name?.['given-names'] || ''} ${c.name?.surname || ''}`.trim(),
					affIndex: affId ? affMap[affId]?.index : null,
					affText: affId ? affMap[affId]?.text : '',
					isCorresp
				});
			});
		});

		// 4. Ekstraksi Detail Correspondence dari XML (Author Notes)
		// Kita ambil langsung dari tag <corresp> agar nama & email yang tertulis di sana muncul
		const correspNode = articleMeta['author-notes']?.corresp;
		let correspondenceText = extractFullText(correspNode);

		// Fallback jika tag corresp kosong/tidak ada nama
		if (!correspondenceText || correspondenceText.length < 5) {
			const mainAuth = authors.find((a) => a.isCorresp);
			if (mainAuth) {
				correspondenceText = `${mainAuth.name} (Automatic Fallback)`;
			}
		}

		// 5. Update Builder
		editor.DomComponents.clear();

		// Judul Jurnal & Artikel
		editor.addComponents(`
            <div class="section-container" style="text-align: center;">
                <div style="font-style: italic; color: #888; font-size: 0.9rem; margin-bottom: 10px;">${journalTitle}</div>
                <h1 class="article-title-text" style="font-size: 1.8rem; margin: 10px 0;">${articleTitle}</h1>
            </div>
        `);

		// Bagian Penulis & Afiliasi
		let authorSectionHtml = `<div class="section-container" style="text-align: center;">
            <div style="margin-bottom: 10px;">
                <span style="font-weight: bold; color: #555;">Author: </span>`;

		authors.forEach((auth, index) => {
			authorSectionHtml += `
                <span style="font-size: 1.1rem; font-weight: 500; color: #222;">
                    ${auth.name}<sup style="color: #0288d1; font-size: 0.7rem;">${auth.affIndex || ''}</sup>${auth.isCorresp ? '<sup style="color: #d32f2f; font-size: 0.8rem;">+</sup>' : ''}
                </span>${index < authors.length - 1 ? ', ' : ''}`;
		});

		authorSectionHtml += `</div>`;

		// Daftar Afiliasi
		const uniqueAffs = [...new Set(authors.map((a) => a.affText))].filter(Boolean);
		uniqueAffs.forEach((aff, i) => {
			authorSectionHtml += `
                <div style="font-size: 0.85rem; color: #666; font-style: italic; margin-top: 5px;">
                    <sup style="color: #0288d1;">${i + 1}</sup> ${aff}
                </div>`;
		});

		// --- BAGIAN CORRESPONDENCE (MENAMPILKAN NAMA DARI XML) ---
		if (correspondenceText) {
			authorSectionHtml += `
                <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px; font-size: 0.9rem;">
                    <span style="font-weight: bold; color: #555; font-style: italic;">Correspondence: </span>
                    <span style="color: #222;">${correspondenceText.replace(/^\*/, '').trim()}</span>
                </div>`;
		}

		authorSectionHtml += `</div>`;
		editor.addComponents(authorSectionHtml);

		// Abstract
		editor.addComponents(`
            <div class="section-container">
                <div class="label" style="text-align: left; font-weight: bold; color: #333; text-transform: none; border-bottom: 1px solid #eee; padding-bottom: 5px;">Abstract:</div>
                <div class="abstract-box" style="margin-top: 15px;">${abstractHtml}</div>
            </div>
        `);

		editor.store();
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => processJATS(event.target?.result as string);
			reader.readAsText(file);
		}
	};

	onMount(async () => {
		const grapesjs = (await import('grapesjs')).default;
		editor = grapesjs.init({
			container: '#gjs',
			height: '100vh',
			storageManager: { type: 'local', options: { local: { key: 'gjs-project-jats' } } }
		});

		editor.addStyle(`
            body { background-color: #f0f2f5; padding: 40px 0; }
            .section-container { background-color: white; width: 850px; margin: 0 auto 15px auto; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 30px; border-radius: 4px; font-family: sans-serif; }
            .article-title-text { font-family: serif; font-weight: bold; color: #000; text-transform: uppercase; }
            .abstract-box { font-size: 1rem; line-height: 1.6; color: #444; text-align: justify; }
            .label { font-size: 0.9rem; margin-bottom: 10px; display: block; }
        `);

		editor.Commands.add('cmd-import-xml', { run: () => fileInput.click() });
		editor.Commands.add('cmd-reset-page', {
			run: () => {
				if (confirm('Reset?')) {
					editor.DomComponents.clear();
					localStorage.removeItem('gjs-project-jats');
					location.reload();
				}
			}
		});

		editor.Panels.addButton('views', {
			id: 'btn-import',
			className: 'fa fa-file-code-o',
			command: 'cmd-import-xml'
		});
		editor.Panels.addButton('views', {
			id: 'btn-reset',
			className: 'fa fa-trash',
			command: 'cmd-reset-page'
		});
	});
</script>

<input
	type="file"
	accept=".xml"
	bind:this={fileInput}
	on:change={handleFileChange}
	style="display: none;"
/>
<div id="gjs"></div>

<style>
	:global(body) {
		margin: 0;
		overflow: hidden;
	}
	#gjs {
		border: none;
	}
	:global(.fa-trash) {
		color: #ff4d4f !important;
	}
	:global(.fa-file-code-o) {
		color: #2196f3 !important;
	}
</style>

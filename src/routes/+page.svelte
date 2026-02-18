<script>
	// @ts-nocheck
	import { registerArticleBackBlocks } from '$lib/utils/grapejs/blocks/article/back';
	import { registerArticleContentBlocks } from '$lib/utils/grapejs/blocks/article/content';
	import { registerArticleMetadataBlocks } from '$lib/utils/grapejs/blocks/article/metadata';
	import { registerJournalBlocks } from '$lib/utils/grapejs/blocks/journal';
	import { initGrapejs } from '$lib/utils/grapejs/init';
	import 'grapesjs/dist/css/grapes.min.css';
	import { onMount } from 'svelte';

	let editor = $state(null);

	onMount(() => {
		// Inisialisasi editor
		const editorInstance = initGrapejs();
		editor = editorInstance;

		const panels = editorInstance.Panels;

		// Tombol Import
		panels.addButton('options', {
			id: 'import-json',
			className: 'custom-import-btn',
			command: 'open-import-file',
			attributes: { title: 'Import JSON Config' }
		});

		// Tombol Delete (Sidebar Only)
		panels.addButton('options', {
			id: 'delete-all',
			className: 'custom-delete-btn',
			command: 'clear-sidebar-only',
			attributes: { title: 'Clear Sidebar Blocks' }
		});

		// Command: Buka File
		editorInstance.Commands.add('open-import-file', {
			run() {
				const fileInput = document.createElement('input');
				fileInput.type = 'file';
				fileInput.accept = '.json';
				fileInput.onchange = (e) => handleFileChange(e);
				fileInput.click();
			}
		});

		// Command: Clear Sidebar
		editorInstance.Commands.add('clear-sidebar-only', {
			run(edt) {
				if (confirm('Hapus semua daftar blok di sidebar? (Kanvas tetap aman)')) {
					edt.BlockManager.getAll().reset();
					edt.BlockManager.render();
				}
			}
		});
	});

	const handleFileChange = (event) => {
		const file = event?.target?.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target.result);
				processImport(data);
			} catch (err) {
				alert('Format file JSON tidak valid!');
			}
		};
		reader.readAsText(file);
		event.target.value = '';
	};

	const processImport = (data) => {
		if (!editor) return;

		let logs = [];

		// 1. Registrasi ke Sidebar (Blok)
		try {
			if (data?.journal) {
				registerJournalBlocks(editor, data.journal);
				logs.push('Journal');
			}
			if (data?.article?.metadata) {
				registerArticleMetadataBlocks(editor, data.article.metadata);
				logs.push('Metadata');
			}
			if (data?.article?.contents) {
				registerArticleContentBlocks(editor, data.article.contents);
				logs.push('Contents');
			}
			if (data?.article?.back) {
				registerArticleBackBlocks(editor, data.article.back);
				logs.push('Back');
			}
		} catch (e) {
			console.error('Registration failed:', e);
		}

		// 2. Render Otomatis ke Canvas
		if (logs.length > 0) {
			editor.BlockManager.render();

			// --- Bagian Jurnal ---
			if (data.journal) {
				editor.addComponents(`
                    <div style="padding: 20px; text-align: center; border-bottom: 2px solid #333; margin-bottom: 20px;">
                        <h2 style="margin: 0; font-family: sans-serif; text-transform: uppercase;">${data.journal.title}</h2>
                        <p style="margin: 5px 0; font-family: sans-serif;">
                            ISSN: ${data.journal.issn} | Vol. ${data.journal.volume}, No. ${data.journal.issue} (${data.journal.year})
                        </p>
                    </div>
                `);
			}

			// --- Bagian Metadata (Title, Author, Affiliation) ---
			if (data.article?.metadata) {
				const meta = data.article.metadata;

				// Proses Penulis & Afiliasi
				const authorsHtml =
					meta.authors
						?.map(
							(a) => `
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 18px; font-weight: bold;">${a.name}${a.corresponding ? '<sup>*</sup>' : ''}</div>
                        <div style="font-size: 14px; color: #666;">${a.affiliation}</div>
                        <div style="font-size: 12px; color: #007bff;">${a.email}</div>
                    </div>
                `
						)
						.join('') || '';

				// Proses Abstract (mengambil properti "p")
				const abstractHtml =
					meta.abstract?.map((item) => `<p style="text-align: justify;">${item.p}</p>`).join('') ||
					'';

				// Proses Keywords
				const keywordsText = meta.keywords?.join(', ') || '-';

				editor.addComponents(`
                    <div style="padding: 0 40px; font-family: 'Times New Roman', serif;">
                        <h1 style="font-size: 28px; line-height: 1.2; margin-bottom: 20px;">${meta.title}</h1>
                        
                        <div style="margin-bottom: 25px;">${authorsHtml}</div>

                        <div style="border: 1px solid #eee; padding: 20px; background: #fafafa;">
                            <h3 style="margin-top: 0;">Abstract</h3>
                            ${abstractHtml}
                            <div style="margin-top: 15px;">
                                <strong>Keywords:</strong> <em>${keywordsText}</em>
                            </div>
                        </div>

                        <div style="margin-top: 10px; font-size: 12px; color: #888;">
                            DOI: <a href="#">${meta.doi}</a>
                        </div>
                    </div>
                `);
			}
		}
	};
</script>

<div class="h-screen w-screen overflow-hidden">
	<div id="gjs"></div>
</div>

<style>
	#gjs {
		height: 100% !important;
		width: 100% !important;
	}

	:global(.gjs-cv-canvas) {
		width: 100% !important;
		height: 100% !important;
	}

	:global(.custom-import-btn),
	:global(.custom-delete-btn) {
		font-family: 'Font Awesome 6 Free' !important;
		font-weight: 900 !important;
		font-size: 16px !important;
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	:global(.custom-import-btn::before) {
		content: '\f56f' !important;
		color: #3b82f6;
	}

	:global(.custom-delete-btn::before) {
		content: '\f1f8' !important;
		color: #ff4d4f;
	}
</style>

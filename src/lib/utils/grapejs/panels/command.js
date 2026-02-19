import { articleBackComponents, registerArticleBackBlocks } from "../blocks/article/back";
import { articleContentComponents, registerArticleContentBlocks } from "../blocks/article/content";
import { articleMetadataComponents, registerArticleMetadataBlocks } from "../blocks/article/metadata";
import { journalComponents, registerJournalBlocks } from "../blocks/journal";

export const registerCommand = (editor) => {
    // Command: Open File
    editor.Commands.add('open-import-file', {
        run() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.onchange = (e) => handleFileChange(e);
            fileInput.click();
        }
    });

    // Command: Clear Sidebar
    editor.Commands.add('clear-page', {
        run(edt) {
            if (confirm('Clear all page?')) {
                const pages = edt.getWrapper().findType('page');
                pages.forEach(page => {
                    page.components().reset();
                });
            }
        }
    });

    // Command: Add New Page
    editor.Commands.add('add-new-page', {
        run() {
            editor.addComponents({
                type: 'page',
                classes: ['page'],
                attributes: {
                    id: `page-${editor.getWrapper().findType('page').length + 1}`
                },
                name: `Page-${editor.getWrapper().findType('page').length + 1}`
            });
        }
    });

    // Handle function
    // Handle: Import File
    const handleFileChange = (event) => {
        const file = event?.target?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                handleImport(data);
            } catch (err) {
                alert('Format file JSON tidak valid!', err);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleImport = (data) => {
        if (!editor) return;

        try {
            if (data?.journal) {
                registerJournalBlocks(editor, data.journal);
            }
            if (data?.article?.metadata) {
                registerArticleMetadataBlocks(editor, data.article.metadata);
            }
            if (data?.article?.content) {
                registerArticleContentBlocks(editor, data.article.content);
            }
            if (data?.article?.back) {
                registerArticleBackBlocks(editor, data.article.back);
            }

            // Insert Componenet Into Page
            const page = editor.getWrapper().findFirstType('page')
            page.components().reset();

            // Journal Section
            page.append({
                tagName: 'div',
                name: 'Journal Section',
                components: journalComponents(data.journal)
            })

            // Article Metadata Section
            page.append({
                tagName: 'div',
                name: 'Article Metadata Section',
                components: articleMetadataComponents(data.article.metadata)
            })

            // Article Content Section
            page.append({
                tagName: 'div',
                name: 'Article Content Section',
                components: articleContentComponents(data.article.content)
            })

            // Article Back Section
            page.append({
                tagName: 'div',
                name: 'Article Back Section',
                components: articleBackComponents(data.article.back)
            })
        } catch (e) {
            console.error('Registration failed:', e);
        }
    }
}

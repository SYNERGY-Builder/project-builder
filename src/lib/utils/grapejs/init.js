import grapesjs from "grapesjs";

export function initGrapejs() {
    let editor;

    editor = grapesjs.init({
        container: '#gjs',
        fromElement: true,
        height: '100vh',
        width: '100%',
        storageManager: false,
    });

    editor.DomComponents.addType('page', {
        model: {
            defaults: {
                tagName: 'div',
                classes: ['page'],
                droppable: true,
                draggable: false,
            }
        }
    });

    editor.on('load', () => {
        const wrapper = editor.DomComponents.getWrapper()
        wrapper.set({
            droppable: false,
            selectable: false,
            hoverable: false
        })

        editor.addComponents({
            type: 'page',
        });

        editor.addStyle(`
            body {
                background: #e5e5e5;
                padding: 20px 0;
            }

            .page {
                width: 210mm;
                height: 297mm;
                background: white;
                margin: 20px auto;
                padding: 20mm;
                box-sizing: border-box;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                overflow: auto;
                position: relative;
                page-break-after: always;
            }
        `);
    })

    editor.BlockManager.getCategories().add({
        id: 'journal-data',
        label: 'journal data',
        open: false
    })

    editor.BlockManager.getCategories().add({
        id: 'article-metadata',
        label: 'article metadata',
        open: false
    })

    editor.BlockManager.getCategories().add({
        id: 'article-content',
        label: 'article content',
        open: false
    })

    editor.BlockManager.getCategories().add({
        id: 'article-back',
        label: 'article back',
        open: false
    })

    return editor
}
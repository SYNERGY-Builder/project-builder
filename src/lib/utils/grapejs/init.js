import grapesjs from "grapesjs";
import { registerPanelButtons } from "./panels/panel";

export function initGrapejs() {
    let editor;

    editor = grapesjs.init({
        container: '#gjs',
        fromElement: true,
        height: '100vh',
        width: '100%',
        storageManager: false,
    });

    registerPanelButtons(editor.Panels, editor)

    // Component - type
    editor.DomComponents.addType('page', {
        model: {
            defaults: {
                tagName: 'div',
                classes: ['page'],
                attributes: {
                    id: 'page-1'
                },
                droppable: true,
                draggable: false,
            }
        }
    });

    // on - function
    editor.on('load', () => {
        const wrapper = editor.getWrapper()
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
                width: 100%;
                max-width: 210mm;
                // height: 297mm;
                min-height: 297mm;
                background: white;
                margin: 30px auto;
                padding: 20mm;
                box-sizing: border-box;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                overflow: auto;
                position: relative;
                page-break-after: always;
            }
        `);
    })

    // Category - Block
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
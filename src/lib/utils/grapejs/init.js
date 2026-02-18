import createStudioEditor from '@grapesjs/studio-sdk';
import '@grapesjs/studio-sdk/dist/style.css';

export function initGrapejs(rootElement) {
    const editor = createStudioEditor({
        root: rootElement,
        licenseKey: 'YOUR_LICENSE_KEY',
        project: {
            default: {
                pages: [
                    {
                        name: 'Home',
                        component: `
                            <div style="padding:40px;text-align:center">
                                <h1>Hello Studio 👋</h1>
                                <p>Tess</p>
                            </div>
                        `
                    }
                ]
            }
        }
    });

    // helper function 
    const wrapper = () => {
        return editor.DomComponents.getWrapper()
    }

    const pagesLength = () => {
        const pages = wrapper().findType('page');
        return pages.length + 1;
    }

    // Component - type
    editor.DomComponents.addType('page', {
        model: {
            defaults: {
                tagName: 'div',
                classes: ['page'],
                attributes: {
                    id: 'page-1'
                },
                name: 'Page-1',
                droppable: true,
                draggable: false,
                // copyable: false
            }
        }
    });

    // Panel - button
    editor.Panels.addButton('options', {
        id: 'new-page',
        label: '<i class="fa fa-file"></i>',
        command: () => {
            editor.addComponents({
                type: 'page',
                classes: ['page'],
                attributes: {
                    id: `page-${pagesLength()}`
                },
                name: `Page-${pagesLength()}`
            });
        }
    })

    // on - function

    editor.on('load', () => {
        wrapper().set({
            droppable: false,
            selectable: false,
            hoverable: false
        })

        editor.addComponents({
            type: 'page',
            // removable: false
        });

        editor.addStyle(`
            body {
                background: #e5e5e5;
                padding: 20px 0;
            }

            .page {
                width: 210mm;
                height: 297mm;
                max-height: 297mm;
                background: white;
                margin: 25px auto;
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
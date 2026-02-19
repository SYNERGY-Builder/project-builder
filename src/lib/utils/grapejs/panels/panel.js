import { registerCommand } from "./command";

export const registerPanelButtons = (panels, editor) => {
    // Tombol Import
    panels.addButton('options', {
        id: 'import-json',
        className: 'custom-import-btn',
        command: 'open-import-file',
        attributes: { title: 'Import JSON Config' }
    });

    // Button - Clear page
    panels.addButton('options', {
        id: 'delete-all',
        className: 'custom-delete-btn',
        command: 'clear-page',
        attributes: { title: 'Clear Pages' }
    });

    // Button - add new page
    panels.addButton('options', {
        id: 'new-page',
        label: '<i class="fa fa-file"></i>',
        command: 'add-new-page',
        attributes: {title: 'Add New Page'}
    })

    registerCommand(editor)
}

import grapesjs from "grapesjs";

export function initGrapejs() {
    let editor;

    editor = grapesjs.init({
        container: '#gjs',
        fromElement: true,
        height: '297mm',
        width: '100%',
        storageManager: false,
        // panels: { defaults: [] },
    });

    return editor
}
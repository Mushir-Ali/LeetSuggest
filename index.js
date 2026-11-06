function applySuggestions(editor) {
    editor.updateOptions({ wordBasedSuggestions: "currentDocument", quickSuggestions: true });
}

let id = setInterval(() => {
    if (!window.monaco) return;
    const editor = window.monaco.editor.getEditors().find(e => e.getModel()?.getLanguageId() !== "plaintext");
    if (editor) {
        clearInterval(id);
        applySuggestions(editor);
        editor.onDidChangeConfiguration(() => {
            if (editor.getRawOptions().wordBasedSuggestions !== "currentDocument") {
                applySuggestions(editor);
            }
        });
        window.monaco.editor.onDidCreateEditor((newEditor)=>applySuggestions(newEditor));
    }
}, 300);
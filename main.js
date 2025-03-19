const codeEditorElement = document.getElementById('code-editor'); // Get the textarea element  
const livePreview = document.getElementById('live-preview');  
const lineNumberCheckbox = document.getElementById('lineNumber');  
const wordWrapCheckbox = document.getElementById('wordWrap');   
const themeSelector = document.getElementById('theme-selector');  
const fontStyleSelector = document.getElementById('fontStyle');  
const fontSizeInput = document.getElementById('fontSize');  
const whitespaceCheckbox = document.getElementById('whitespace');  
const tabSizeSelector = document.getElementById('tabSize');  
const lintingCheckbox = document.getElementById('linting');  
const autoTagCloseCheckbox = document.getElementById('autoTagClose');  

// Tab Management Variables  
let tabs = [{ name: 'File1', content: '' }]; // Initial tab named File1  
let activeTab = tabs[0];  

// CodeMirror Initialization  
const codeMirror = CodeMirror.fromTextArea(codeEditorElement, {  
    mode: 'htmlmixed',  
    theme: themeSelector.value,   
    lineNumbers: lineNumberCheckbox.checked,  
    lineWrapping: wordWrapCheckbox.checked,   
    autoCloseTags: autoTagCloseCheckbox.checked,  
    autoCloseBrackets: true,  
    indentUnit: parseInt(tabSizeSelector.value), // Set initial tab size  
    matchBrackets: true, // Enable bracket matching  
    foldGutter: true,  
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],  
    lint: lintingCheckbox.checked, // Enable linting based on checkbox  
});  

// Preview Update Function  
function updatePreview() {  
    const content = codeMirror.getValue();  
    livePreview.contentDocument.body.innerHTML = content;  
    activeTab.content = content;  
    setTimeout(updateDimensions, 0);  
}  

// CodeMirror Change Event Listener  
codeMirror.on('change', () => {  
    updatePreview();  
});  

lineNumberCheckbox.addEventListener('change', function() {  
    codeMirror.setOption("lineNumbers", lineNumberCheckbox.checked);  
});  

wordWrapCheckbox.addEventListener('change', function() {  
    codeMirror.setOption("lineWrapping", wordWrapCheckbox.checked);  
});   

themeSelector.addEventListener('change', function() {  
    const selectedTheme = themeSelector.value;  
    codeMirror.setOption("theme", selectedTheme);  
});  

// Font Style and Size  
fontStyleSelector.addEventListener('change', function() {  
    const selectedFontStyle = fontStyleSelector.value;  
    codeMirror.getWrapperElement().style.fontFamily = selectedFontStyle; // Change font style  
});  

fontSizeInput.addEventListener('input', function() {  
    const fontSize = fontSizeInput.value;  
    codeMirror.getWrapperElement().style.fontSize = `${fontSize}px`; // Change font size  
});  

// Whitespace Characters  
whitespaceCheckbox.addEventListener('change', function() {  
    codeMirror.setOption("showWhitespace", whitespaceCheckbox.checked); // Show whitespace characters  
});  

// Tab Size  
tabSizeSelector.addEventListener('change', function() {  
    const tabSize = parseInt(tabSizeSelector.value);  
    codeMirror.setOption("indentUnit", tabSize); // Update tab size  
});  

// Linting  
lintingCheckbox.addEventListener('change', function() {  
    codeMirror.setOption("lint", lintingCheckbox.checked); // Enable or disable linting  
});  

// Auto Tag Close  
autoTagCloseCheckbox.addEventListener('change', function() {  
    codeMirror.setOption("autoCloseTags", autoTagCloseCheckbox.checked); // Enable or disable auto tag close  
});  

// Commenting functionality  
codeMirror.addKeyMap({  
    'Ctrl-/': function(cm) {  
        cm.toggleComment(); // Toggle comment on selected lines  
    },  
    'Alt-Up': function(cm) { // Move line up  
        const cursor = cm.getCursor();  
        const line = cm.getLine(cursor.line);  
        if (cursor.line > 0) {  
            cm.replaceRange(line + "\n", { line: cursor.line - 1 }); // Move line up  
            cm.replaceRange("", { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 }); // Remove original  
            cm.setCursor(cursor.line - 1, cursor.ch); // Move cursor  
        }  
    },  
    'Alt-Down': function(cm) { // Move line down  
        const cursor = cm.getCursor();  
        const line = cm.getLine(cursor.line);  
        if (cursor.line < cm.lineCount() - 1) {  
            cm.replaceRange("", { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 }); // Remove original  
            cm.replaceRange(line + "\n", { line: cursor.line + 1 }); // Move line down  
            cm.setCursor(cursor.line + 1, cursor.ch); // Move cursor  
        }  
    },  
    'Shift-Alt-Up': function(cm) { // Copy line up  
        const cursor = cm.getCursor();  
        const line = cm.getLine(cursor.line);  
        if (cursor.line > 0) {  
            cm.replaceRange(line + "\n", { line: cursor.line - 1 }); // Copy line up  
            cm.setCursor(cursor.line, cursor.ch); // Keep cursor in the same position  
        }  
    },  
    'Shift-Alt-Down': function(cm) { // Copy line down  
        const cursor = cm.getCursor();  
        const line = cm.getLine(cursor.line);  
        if (cursor.line < cm.lineCount() - 1) {  
            cm.replaceRange(line + "\n", { line: cursor.line + 1 }); // Copy line down  
            cm.setCursor(cursor.line + 1, cursor.ch); // Keep cursor in the same position  
        }  
    }  
});  

// Multi-Cursor Functionality (using Ctrl + click)  
codeMirror.on('gutterClick', function(cm, line, gutter, event) {  
    if (event.ctrlKey || event.metaKey) {  
        const cursor = cm.getCursor();  
        if (cm.getLine(line) !== undefined) {  
            cm.addSelection({line: line, ch: 0}, {line: line, ch: cm.getLine(line).length}); // Add new cursor  
        }  
    }  
});  

// Initial Setup  
renderTabs();  
setActiveTab(activeTab);  
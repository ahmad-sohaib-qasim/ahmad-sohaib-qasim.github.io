// main.js  
const codeEditorElement = document.getElementById('code-editor'); // Get the textarea element  
const livePreview = document.getElementById('live-preview');  
const lineNumberCheckbox = document.getElementById('lineNumber');  
const wordWrapCheckbox = document.getElementById('wordWrap'); 
const themeSelector = document.getElementById('theme-selector'); 

// Tab Management Variables  
let tabs = [{ name: 'File1', content: '' }]; // Initial tab named File1  
let activeTab = tabs[0];  

// CodeMirror Initialization  
const codeMirror = CodeMirror.fromTextArea(codeEditorElement, {  
    mode: 'htmlmixed',  
    theme: themeSelector.value, 
    lineNumbers: lineNumberCheckbox.checked,  
    lineWrapping: wordWrapCheckbox.checked, 
    autoCloseTags: true,  
    autoCloseBrackets: true,  
    indentUnit: 4,  
    matchBrackets: true, // Enable bracket matching  
    foldGutter: true,  
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],  
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
// Initial Setup  
renderTabs();  
setActiveTab(activeTab);  
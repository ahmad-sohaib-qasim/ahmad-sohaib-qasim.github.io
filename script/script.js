var currentTheme = 'dracula'; // Default theme set here  
var editors = {}; // Store CodeMirror instances for easy access  
var defaultTabSize = 4; // Default tab size  
var defaultFontSize = 12; // Default font size (in pixels)

document.querySelector('#runButton').addEventListener('click', () => {
    // Get the values from the editors
    var htmlContent = editors.html.getValue();
    var cssContent = editors.css.getValue();
    var jsContent = editors.js.getValue();

    console.log(cssContent);

    // Create a new HTML document for previewing the output
    var newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css" />
            <style>
            ${cssContent}
            /* Additional styles for the preview area */
            body { margin: 0; padding: 0; }
            #main-qeditor { display: flex; position: fixed; bottom: 8px; right: 8px; }
            #back-qeditor {
                padding: 15px 10px;
                border-radius: 8px 0px 0px 8px;
                background-color: #fff;
                border: 2px solid #3b3b3b;
                cursor: pointer;
            }
            #cross-qeditor {
                padding: 15px 10px;
                border: none;
                border-radius: 0px 8px 8px 0px;
                color: #fff;
                background-color: #3b3b3b;
                cursor: pointer;
            }
            #back-qeditor:hover i { transform: translateX(-3px); }
            #cross-qeditor:hover i { transform: scale(1.05); }
            </style>
        </head>
        <body>
            ${htmlContent}
            <div id="main-qeditor">
                <button id="back-qeditor"><i class="fa-regular fa-arrow-left"></i> Back</button>
                <button id="cross-qeditor"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <script>
                document.getElementById('back-qeditor').addEventListener('click', function() { window.close(); });
                document.getElementById('cross-qeditor').addEventListener('click', function() { document.getElementById('main-qeditor').remove(); });
                // Add additional scripts dynamically
                ${jsContent}
            <\/script>
        </body>
        </html>
    `
     );
    newWindow.document.close(); // Close the document to finish loading
})


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('htmlContent').value = `<!DOCTYPE html>  
    <html lang="en">  
    <head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Document</title>  
    </head>  
    <body>  
    <h1>Hello, World!</h1>  
    </body>  
    </html>`;

    document.getElementById('cssContent').value = ``;
    document.getElementById('jsContent').value = `console.log('Hello, World!');`;

    // Initialize editors with default settings  
    editors.html = createEditor('htmlContent', 'xml');
    editors.css = createEditor('cssContent', 'css');
    editors.js = createEditor('jsContent', 'javascript');

    // Set default panel to show  
    showPanel('htmlPanel');
    setTheme(currentTheme); // Apply default theme  

    // Configure editor settings based on user input  
    configureEditors();

    function setTheme(theme) {
        currentTheme = theme; // Update the current theme variable  
        for (var editor in editors) {
            editors[editor].setOption('theme', currentTheme); // Change theme for each editor  
        }
    }

    // Event listener for theme change  
    document.getElementById('themeSelector').addEventListener('change', function () {
        setTheme(this.value); // Call setTheme with the selected value  
    });







});

function createEditor(id, mode) {
    const editor = CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: document.getElementById('lineNumber').checked,
        mode: mode,
        theme: currentTheme,
        lineWrapping: document.getElementById('wordWrap').checked,
        styleActiveLine: true,
        tabSize: defaultTabSize, // Default tab size  
        matchBrackets: true,
        viewportMargin: 10,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        }
    });

    // Update live preview on any change  
    editor.on("change", function () {
        updatePreview(); // Update preview on any change  
    });

    return editor;
}

// Function to update editor settings based on user inputs  
function configureEditors() {
    const tabSizeInput = document.getElementById('tabsize');
    const fontSizeInput = document.getElementById('fontSize');
    const wordWrapInput = document.getElementById('wordWrap');
    const lineNumberInput = document.getElementById('lineNumber');

    // Set initial values  
    tabSizeInput.value = defaultTabSize;
    fontSizeInput.value = defaultFontSize;

    // Add event listeners for inputs  
    tabSizeInput.addEventListener('input', function () {
        const newSize = parseInt(this.value, 10);
        for (let editorKey in editors) {
            editors[editorKey].setOption('tabSize', newSize);
        }
    });

    fontSizeInput.addEventListener('input', function () {
        const newSize = parseInt(this.value, 10);
        for (let editorKey in editors) {
            editors[editorKey].getWrapperElement().style.fontSize = newSize + 'px'; // Set font size  
        }
    });

    wordWrapInput.addEventListener('change', function () {
        const isChecked = this.checked;
        for (let editorKey in editors) {
            editors[editorKey].setOption('lineWrapping', isChecked); // Update word wrap  
        }
    });

    lineNumberInput.addEventListener('change', function () {
        const isChecked = this.checked;
        for (let editorKey in editors) {
            editors[editorKey].setOption('lineNumbers', isChecked); // Update line numbers  
        }
    });
}

// Call updatePreview initially to set the default preview  
updatePreview();

document.getElementById('exportButton').addEventListener('click', function () {
    // Existing export logic...  
});

document.getElementById('themeSelector').addEventListener('change', function () {
    setTheme(this.value);
});

function setTheme(theme) {
    currentTheme = theme;
    for (var editor in editors) {
        editors[editor].setOption('theme', currentTheme); // Change theme for each editor  
    }
}



// document.querySelector('#runButton').addEventListener('click', ()=> {
    // console.log('asasasas');
    // // Get the values from the editors
    // var htmlContent = editors.html.getValue();
    // var cssContent = editors.css.getValue();
    // var jsContent = editors.js.getValue();

    // console.log(cssContent);

    // // Create a new HTML document for previewing the output
    // var newWindow = window.open();
    // newWindow.document.write(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Preview</title>
    //         <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css" />
    //         <style>
    //         ${cssContent}
    //         /* Additional styles for the preview area */
    //         body { margin: 0; padding: 0; }
    //         #main-qeditor { display: flex; position: fixed; bottom: 8px; right: 8px; }
    //         #back-qeditor {
    //             padding: 15px 10px;
    //             border-radius: 8px 0px 0px 8px;
    //             background-color: #fff;
    //             border: 2px solid #3b3b3b;
    //             cursor: pointer;
    //         }
    //         #cross-qeditor {
    //             padding: 15px 10px;
    //             border: none;
    //             border-radius: 0px 8px 8px 0px;
    //             color: #fff;
    //             background-color: #3b3b3b;
    //             cursor: pointer;
    //         }
    //         #back-qeditor:hover i { transform: translateX(-3px); }
    //         #cross-qeditor:hover i { transform: scale(1.05); }
    //         </style>
    //     </head>
    //     <body>
    //         ${htmlContent}
    //         <div id="main-qeditor">
    //             <button id="back-qeditor"><i class="fa-regular fa-arrow-left"></i> Back</button>
    //             <button id="cross-qeditor"><i class="fa-solid fa-xmark"></i></button>
    //         </div>

    //         <script>
    //             document.getElementById('back-qeditor').addEventListener('click', function() { window.close(); });
    //             document.getElementById('cross-qeditor').addEventListener('click', function() { document.getElementById('main-qeditor').remove(); });
    //             // Add additional scripts dynamically
    //             ${jsContent}
    //         <\/script>
    //     </body>
    //     </html>
    // `
    //  );
    // newWindow.document.close(); // Close the document to finish loading
// });


// Function to update the preview content  
function updatePreview() {
    var htmlContent = editors.html.getValue();
    var cssContent = editors.css.getValue();
    var jsContent = editors.js.getValue();

    const previewFrame = document.getElementById('previewFrame');
    const previewFrameDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewFrameDoc.open();
    previewFrameDoc.write(`  
        <!DOCTYPE html>  
        <html lang="en">  
        <head>  
            <meta charset="UTF-8">  
            <meta name="viewport" content="width=device-width, initial-scale=1.0">  
            <style>  
                body { background-color: white; } /* Default body background color to white */  
                ${cssContent}  
            </style>  
        </head>  
        <body>  
            ${htmlContent}  
            <script>${jsContent}</script>  
        </body>  
        </html>  
    `);
    previewFrameDoc.close();
}  

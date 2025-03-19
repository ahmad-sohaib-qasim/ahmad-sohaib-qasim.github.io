const tabGroup = document.querySelector('.tab-group');  
const newTabButton = document.querySelector('.new-tab-button');  
const codeEditor = document.getElementById('code-editor');  
const livePreview = document.getElementById('live-preview');  
const deleteTabButton = document.querySelector('.delete-tab');  
const renameTabButton = document.querySelector('.rename-tab');  
const copyContentButton = document.querySelector('.copy-content');  
const downloadHTMLButton = document.querySelector('.download-html');  
const resizer = document.querySelector('.resizer');  
const panel1 = document.getElementById('panel1');  
const panel2 = document.getElementById('panel2');  

let tabCount = 1;  
let tabs = [{ name: 'index', content: '' }]; // Store tab names and content  

// Function to create a new tab  
function createTab(tabName) {  
    if (tabs.length >= 5) {  
        alert("Maximum 5 tabs are allowed.");  
        return null;  
    }  

    const tabButton = document.createElement('button');  
    tabButton.classList.add('tab');  
    tabButton.dataset.tab = tabName;  
    tabButton.textContent = tabName;  

    tabButton.addEventListener('click', () => {  
        switchTab(tabName);  
    });  

    return tabButton;  
}  

// Function to switch to a tab  
function switchTab(tabName) {  
    // Deactivate current active tab  
    document.querySelector('.tab.active').classList.remove('active');  

    // Activate the clicked tab  
    const tabButtons = document.querySelectorAll('.tab');  
    tabButtons.forEach(button => {  
        if (button.dataset.tab === tabName) {  
            button.classList.add('active');  
        }  
    });  

    // Load the content of the tab into the editor  
    const tab = tabs.find(tab => tab.name === tabName);  
    codeEditor.value = tab.content;  
    updatePreview();  
}  

// Function to add a new tab  
function addTab() {  
    if (tabs.length >= 5) {  
        alert("Maximum 5 tabs are allowed.");  
        return;  
    }  

    tabCount++;  
    const tabName = `index${tabCount > 2 ? tabCount - 1 : ''}`;  
    if (tabs.find(tab => tab.name === tabName)) {  
         alert("Tab with this name already exists.");  
        return;  
    }  

    const newTab = { name: tabName, content: '' };  
    tabs.push(newTab);  

    const tabButton = createTab(tabName);  
    if (tabButton) {  
        tabGroup.insertBefore(tabButton, newTabButton);  
        switchTab(tabName);  
    }  
}  


// Function to delete a tab  
function deleteTab() {  
    if (tabs.length <= 1) {  
        alert("Cannot delete the initial 'index' tab.");  
        return;  
    }  

    const activeTabName = document.querySelector('.tab.active').dataset.tab;  
    if (confirm(`Are you sure you want to delete tab "${activeTabName}"?`)) {  
        // Remove the tab from the array  
        tabs = tabs.filter(tab => tab.name !== activeTabName);  

        // Remove the tab button from the UI  
        const tabButtons = document.querySelectorAll('.tab');  
        tabButtons.forEach(button => {  
            if (button.dataset.tab === activeTabName) {  
                button.remove();  
            }  
        });  

        // Switch to the first tab  
        switchTab(tabs[0].name);  
    }  
}  

// Function to rename a tab  
function renameTab() {  
    const activeTabName = document.querySelector('.tab.active').dataset.tab;  
    const newName = prompt("Enter new name for the tab:", activeTabName);  

    if (newName && newName !== activeTabName) {  
        if (tabs.some(tab => tab.name === newName)) {  
            alert("Tab with this name already exists.");  
            return;  
        }  

        // Update the tab name in the array  
        const tab = tabs.find(tab => tab.name === activeTabName);  
        tab.name = newName;  

        // Update the tab button text in the UI  
        const tabButtons = document.querySelectorAll('.tab');  
        tabButtons.forEach(button => {  
            if (button.dataset.tab === activeTabName) {  
                button.textContent = newName;  
                button.dataset.tab = newName;  
            }  
        });  
    }  
}  

// Function to copy content to clipboard  
function copyContent() {  
    const content = codeEditor.value;  
    navigator.clipboard.writeText(content)  
        .then(() => alert('Content copied to clipboard!'))  
        .catch(err => console.error('Failed to copy: ', err));  
}  

// Function to download HTML  
function downloadHTML() {  
    const content = codeEditor.value;  
    const filename = document.querySelector('.tab.active').dataset.tab + '.html';  
    const blob = new Blob([content], { type: 'text/html' });  
    const url = URL.createObjectURL(blob);  
    const a = document.createElement('a');  
    a.href = url;  
    a.download = filename;  
    document.body.appendChild(a);  
    a.click();  
    document.body.removeChild(a);  
    URL.revokeObjectURL(url);  
}  

// Function to update the live preview  
function updatePreview() {  
    const content = codeEditor.value;  
    livePreview.contentDocument.body.innerHTML = content;  
    const activeTabName = document.querySelector('.tab.active').dataset.tab;  
    const tab = tabs.find(tab => tab.name === activeTabName);  
    tab.content = content;  
}  

// Event listeners  
newTabButton.addEventListener('click', addTab);  
deleteTabButton.addEventListener('click', deleteTab);  
renameTabButton.addEventListener('click', renameTab);  
copyContentButton.addEventListener('click', copyContent);
downloadHTMLButton.addEventListener('click', downloadHTML);  
codeEditor.addEventListener('input', updatePreview);  

// script.js (Resize Functionality - Refined)  

// const panel1 = document.getElementById('panel1');  
// const panel2 = document.getElementById('panel2');  
// const resizer = document.querySelector('.resizer');  
const container = document.querySelector('.container'); // Get the container  

let originalX = 0;  
let originalWidth1 = 0;  
let originalWidth2 = 0;  
let maxWidth1 = 0;  
let minWidth1 = 50; // Minimum width for panel1 (adjust as needed)  

resizer.addEventListener('mousedown', function (e) {  
    originalX = e.pageX;  
    originalWidth1 = panel1.offsetWidth;  
    originalWidth2 = panel2.offsetWidth;  
    maxWidth1 = container.offsetWidth - minWidth1; // Maximum width for panel1  
    panel1.classList.add('no-select');  
    panel2.classList.add('no-select');  

    document.addEventListener('mousemove', resize);  
    document.addEventListener('mouseup', stopResize);  
});  

function resize(e) {  
    let widthChange = e.pageX - originalX;  
    let newWidth1 = originalWidth1 + widthChange;  

    // Constrain the width of panel1  
    if (newWidth1 < minWidth1) {  
        newWidth1 = minWidth1;  
    } else if (newWidth1 > maxWidth1) {  
        newWidth1 = maxWidth1;  
    }  

    panel1.style.flexBasis = newWidth1 + 'px';  
    panel2.style.flexBasis = (container.offsetWidth - newWidth1) + 'px'; // Make panel2 adjust accordingly  

    updateDimensions(); // Update the dimensions display during resize  
}  

function stopResize() {  
    panel1.classList.remove('no-select');  
    panel2.classList.remove('no-select');  
    document.removeEventListener('mousemove', resize);  
    document.removeEventListener('mouseup', stopResize);  
}  

// Initialize - Select the first tab  
switchTab('index');  
//... (previous code) ...  

const screenIcon = document.getElementById('screen-icon');  
const widthDisplay = document.getElementById('width');  
const heightDisplay = document.getElementById('height');  

// Function to update dimensions display  
function updateDimensions() {  
    const width = livePreview.offsetWidth;  
    const height = livePreview.offsetHeight;  
    widthDisplay.textContent = width;  
    heightDisplay.textContent = height;  

    // Update screen size icon  
    if (width < 480) {  
        screenIcon.className = 'fas fa-mobile-alt'; // Small mobile  
    } else if (width < 768) {  
        screenIcon.className = 'fas fa-tablet-alt'; // Tablet  
    } else if (width < 992) {  
        screenIcon.className = 'fas fa-laptop'; // Laptop  
    } else {  
        screenIcon.className = 'fas fa-desktop'; // Desktop / Wide screen  
    }  
}  

// Call updateDimensions on initial load and when the preview is updated.  
updatePreview(); // Call it once on page load to initialize  
codeEditor.addEventListener('input', () => {  
    updatePreview();  
    updateDimensions();  
});  

// Also update dimensions when the window resizes (in case the user resizes the whole browser window)  
window.addEventListener('resize', updateDimensions);  

// Modify the updatePreview function  
function updatePreview() {  
    const content = codeEditor.value;  
    livePreview.contentDocument.body.innerHTML = content;  
    const activeTabName = document.querySelector('.tab.active').dataset.tab;  
    const tab = tabs.find(tab => tab.name === activeTabName);  
    tab.content = content;  

    // Update dimensions after the content has been rendered in the iframe.  
    setTimeout(updateDimensions, 0); // Use setTimeout to ensure iframe is updated.  
}  

//... (rest of your previous code) ...  
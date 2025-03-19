// control.js  
const deleteTabButton = document.querySelector('.delete-tab');  
const renameTabButton = document.querySelector('.rename-tab');  
const copyContentButton = document.querySelector('.copy-content');  
const downloadHtmlButton = document.querySelector('.download-html');  
const screenIcon = document.getElementById('screen-icon');  
const widthDisplay = document.getElementById('width');  
const heightDisplay = document.getElementById('height');  
const newTabButton = document.querySelector('.new-tab-button');  
const tabGroup = document.querySelector('.tab-group');  

// Tab Management Functions  
function createTabElement(tab) {  
    const tabElement = document.createElement('button');  
    tabElement.classList.add('tab');  
    tabElement.dataset.tab = tab.name;  
    tabElement.textContent = tab.name;  

    tabElement.addEventListener('click', () => {  
        setActiveTab(tab);  
    });  

    return tabElement;  
}  

function renderTabs() {  
    tabGroup.innerHTML = '';  
    tabs.forEach(tab => {  
        const tabElement = createTabElement(tab);  
        tabGroup.appendChild(tabElement);  
    });  

    const activeTabElement = document.querySelector(`.tab[data-tab="${activeTab.name}"]`);  
    if (activeTabElement) {  
        activeTabElement.classList.add('active');  
    }  
}  

function setActiveTab(tab) {  
    activeTab = tab;  
    codeMirror.setValue(tab.content); // Update CodeMirror  
    renderTabs();  
    updatePreview();  
}  

function addTab() {  
    if (tabs.length >= 10) {  
        alert("Maximum 10 files allowed.");  
        return;  
    }  

    const newTabName = `File${tabs.length + 1}`;  
    const newTab = { name: newTabName, content: '' };  
    tabs.push(newTab);  
    setActiveTab(newTab);  
}  

function deleteTab() {  
    if (tabs.length <= 1) {  
        alert("Cannot delete the last tab.");  
        return;  
    }  

    const tabIndex = tabs.indexOf(activeTab);  
    tabs.splice(tabIndex, 1);  

    // Set active tab to the previous tab, or the next if deleting the first tab  
    if (tabIndex > 0) {  
        setActiveTab(tabs[tabIndex - 1]);  
    } else {  
        setActiveTab(tabs[0]);  
    }  
}  

function renameTab() {  
    const newName = prompt("Enter new name for the tab:", activeTab.name);  

    if (newName) {  
        // Check for uniqueness (case-insensitive)  
        const lowerNewName = newName.toLowerCase();  
        if (tabs.some(tab => tab !== activeTab && tab.name.toLowerCase() === lowerNewName)) {  
            alert("Tab name already exists. Please choose a different name.");  
            return;  
        }  

        activeTab.name = newName;  
        renderTabs(); // Re-render to update the tab name in the UI  
    }  
}  

// Screen Size Update function  
function updateDimensions() {  
    const livePreview = document.getElementById('live-preview');  
    const width = livePreview.offsetWidth;  
    const height = livePreview.offsetHeight;  
    widthDisplay.textContent = width;  
    heightDisplay.textContent = height;  

    if (width < 480) {  
        screenIcon.className = 'fas fa-mobile-alt';  
    } else if (width < 768) {  
        screenIcon.className = 'fas fa-tablet-alt';  
    } else if (width < 992) {  
        screenIcon.className = 'fas fa-laptop';  
    } else {  
        screenIcon.className = 'fas fa-desktop';  
    }  
}  

// Download HTML (basic)  
downloadHtmlButton.addEventListener('click', () => {  
    const content = codeMirror.getValue();  
    const blob = new Blob([content], { type: 'text/html' });  
    const url = URL.createObjectURL(blob);  
    const a = document.createElement('a');  
    a.href = url;  
    a.download = `${activeTab.name}.html`; // Use active tab's name  
    document.body.appendChild(a);  
    a.click();  
    document.body.removeChild(a);  
    URL.revokeObjectURL(url);  
});  

// Copy Content  
copyContentButton.addEventListener('click', () => {  
    const content = codeMirror.getValue();  
    navigator.clipboard.writeText(content)  
        .then(() => alert('Content copied to clipboard!'))  
        .catch(err => console.error('Failed to copy: ', err));  
});  

// Event Listeners  
newTabButton.addEventListener('click', addTab);  
deleteTabButton.addEventListener('click', deleteTab);  
renameTabButton.addEventListener('click', renameTab);  
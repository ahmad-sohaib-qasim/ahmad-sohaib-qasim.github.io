var activeTab = 'html'; // Default active tab

function showPanel(panelId) {
    var winwidth = window.innerWidth;
    
    document.querySelectorAll('.pannels .panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Show the selected panel
    document.getElementById(panelId).classList.add('active');

    // Update the active tab
    activeTab = panelId.replace('Panel', '').toLowerCase();

    // Remove active class from all buttons
    document.querySelectorAll('.editor-btns').forEach(button => {
        button.classList.remove('active-btn');
    });

    // Add active class to the current button
    const activeButton = document.querySelector(`button[onclick="showPanel('${panelId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active-btn');
    }

    // Update the preview if the preview panel is active
    updatePreview();

    // Refresh the editor if needed
    if (editors[activeTab]) {
        editors[activeTab].refresh(); // Refresh CodeMirror instance
    }
}

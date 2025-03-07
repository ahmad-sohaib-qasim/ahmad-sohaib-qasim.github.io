// vb.js  

document.addEventListener('DOMContentLoaded', function() {  
    const openVBButton = document.getElementById('openVB');  
    const vbOverlay = document.getElementById('vbOverlay');  
    const vbIframe = document.getElementById('vbIframe');  
    const vbReloadButton = document.getElementById('vbReload');  
    const vbCloseButton = document.getElementById('vbClose');  
    const codeMirror = document.querySelector('.CodeMirror').CodeMirror;  
    const vbSearchForm = document.getElementById('vbSearchForm');  
    const vbSearchInput = document.getElementById('vbSearchInput');  
    const vbSearchEngine = document.getElementById('vbSearchEngine'); // Get the dropdown  
  
    openVBButton.addEventListener('click', function() {  
      const htmlContent = codeMirror.getValue();  
      const dataURI = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);  
      vbIframe.src = dataURI;  
      vbOverlay.style.display = 'flex';  
    });  
  
    vbReloadButton.addEventListener('click', function() {  
      // Correct way to reload the iframe content.  IMPORTANT: Use try/catch  
      try {  
        vbIframe.contentWindow.location.reload();  
      } catch (error) {  
        console.error("Error reloading iframe:", error);  
        // Optionally, display an error message to the user.  
        alert("Iframe reload failed.  The content might not be from a trusted source.");  
      }  
  
    });  
  
    vbCloseButton.addEventListener('click', function() {  
      vbOverlay.style.display = 'none';  
      vbIframe.src = "about:blank";  
    });  
  
    vbSearchForm.addEventListener('submit', function(event) {  
      event.preventDefault();  
      const searchTerm = vbSearchInput.value;  
      const searchEngine = vbSearchEngine.value; // Get the selected search engine  
  
      let searchURL;  
      switch (searchEngine) {  
        case 'google':  
          searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm);  
          break;  
        case 'bing':  
          searchURL = 'https://www.bing.com/search?q=' + encodeURIComponent(searchTerm);  
          break;  
        case 'duckduckgo':  
          searchURL = 'https://duckduckgo.com/?q=' + encodeURIComponent(searchTerm);  
          break;  
        case 'yahoo':  
          searchURL = 'https://search.yahoo.com/search?p=' + encodeURIComponent(searchTerm);  
          break;  
        default:  
          searchURL = 'https://www.bing.com/search?q=' + encodeURIComponent(searchTerm); // Default to Bing  
      }  
  
      vbIframe.src = searchURL;  
    });  
  });  
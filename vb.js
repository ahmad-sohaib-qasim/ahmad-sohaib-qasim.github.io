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
  const vbBackButton = document.getElementById('vbBack'); // New  
  const vbForwardButton = document.getElementById('vbForward'); // New  
  //const vbSearchEngine = document.getElementById('vbSearchEngine'); // No longer needed  
  
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
          alert("Iframe reload failed. The content might not be from a trusted source.");  
        }  
        
    });  
    

    vbSearchForm.addEventListener('submit', function(event) {  
        event.preventDefault();  
        const searchTerm = vbSearchInput.value;  
        //const searchEngine = vbSearchEngine.value; // No longer needed  
        
        // Always use Bing  
        const searchURL = 'https://www.bing.com/search?q=' + encodeURIComponent(searchTerm);  
        
        vbIframe.src = searchURL;  
  });  
  
  // Back button functionality  
  vbBackButton.addEventListener('click', function() {  
    try {  
        if (vbIframe.contentWindow.history.length > 1) {  
            vbIframe.contentWindow.history.back();  
        } else {  
            // Already at the beginning of history, so close the viewer  
            vbOverlay.style.display = 'none';  
            vbIframe.src = "about:blank";  
        }  
    } catch (error) {  
        console.error("Error going back:", error);  
        // Close the viewer in case of an error (e.g., cross-origin issue)  
        vbOverlay.style.display = 'none';  
        vbIframe.src = "about:blank";  
    }  
});  

vbCloseButton.addEventListener('click', function() {  
    vbOverlay.style.display = 'none';  
    vbIframe.src = "about:blank";  
});    

  // Forward button functionality  
  vbForwardButton.addEventListener('click', function() {  
      try {  
          vbIframe.contentWindow.history.forward();  
      } catch (error) {  
          console.error("Error going forward:", error);  
          alert("Cannot go forward. Possibly at the end of history, or content from an untrusted source.");  
      }  
  });  
});  
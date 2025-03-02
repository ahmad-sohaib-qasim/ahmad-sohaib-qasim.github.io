

function height() {
    let topmenu = document.querySelector('.project-control-ribbon').offsetHeight;
    let secondmenu = document.querySelector('.editor-control-ribbon').offsetHeight;
    let main = document.querySelector('.editor-main').style.height = `calc(100vh - ${topmenu + secondmenu}px - 4px)`;
}

// Call height function on window resize
window.addEventListener('resize', height);

// Initial call to set the height
height();

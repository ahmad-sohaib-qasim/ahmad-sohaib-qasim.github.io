// resize.js  
const panel1 = document.getElementById('panel1');  
const panel2 = document.getElementById('panel2');  
const resizer = document.querySelector('.resizer');  
const container = document.querySelector('.container');  

let originalX = 0;  
let originalWidth1 = 0;  
let originalWidth2 = 0;  
let maxWidth1 = 0;  
let minWidth1 = 30;  

function resize(e) {  
    let widthChange = e.pageX - originalX;  
    let newWidth1 = originalWidth1 + widthChange;  

    if (newWidth1 < minWidth1) {  
        newWidth1 = minWidth1;  
    } else if (newWidth1 > maxWidth1) {  
        newWidth1 = maxWidth1;  
    }  

    panel1.style.flexBasis = newWidth1 + 'px';  
    panel2.style.flexBasis = (container.offsetWidth - newWidth1) + 'px';  

    updateDimensions();  
}  

function stopResize() {  
    panel1.classList.remove('no-select');  
    panel2.classList.remove('no-select');  
    panel2.classList.remove('resizing'); // Remove resizing class here  
    document.removeEventListener('mousemove', resize);  
    document.removeEventListener('mouseup', stopResize);  
}  


resizer.addEventListener('mousedown', function (e) {  
    originalX = e.pageX;  
    originalWidth1 = panel1.offsetWidth;  
    originalWidth2 = panel2.offsetWidth;  
    maxWidth1 = container.offsetWidth - minWidth1;  
    panel1.classList.add('no-select');  
    panel2.classList.add('no-select');  
    panel2.classList.add('resizing'); // Add resizing class here  

    document.addEventListener('mousemove', resize);  
    document.addEventListener('mouseup', stopResize);  
});  


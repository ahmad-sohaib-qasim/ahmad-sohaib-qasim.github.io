let opensb = document.querySelector('#open-sb');
let closesb = document.querySelector('#close-sb');
let sb = document.querySelector('.sidebar');

opensb.addEventListener('click', () => {
    sb.classList.add('sb-open');
});

closesb.addEventListener('click', () => {
    sb.classList.remove('sb-open');
});

document.body.addEventListener('click', (event) => {
    if (!closesb.contains(event.target) && !sb.contains(event.target) && sb.classList.contains('open-sb')) {
        sb.classList.remove('sb-open');
    }
});



var a = document.querySelector('#wordWrap').checked;

console.log(a);
let res = document.querySelector('.centraldiv');

res.addEventListener('mousedown', () => {
    function onMouseMove(event) {
        var cursorposition = event.clientX;
        var innerwidth = window.innerWidth;
        var rightwidth = innerwidth - cursorposition;
        console.log(rightwidth);
        document.querySelector('.editor-main').style.gridTemplateColumns = `${innerwidth - rightwidth}px 5px ${rightwidth}px`;
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});

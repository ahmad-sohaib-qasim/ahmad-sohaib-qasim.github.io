const res = document.querySelector('.centraldiv');
const minWidth = 90;

res.addEventListener('mousedown', () => {
    const onMouseMove = (event) => {
        const cursorPosition = Math.max(event.clientX, minWidth);
        const innerWidth = window.innerWidth;
        const rightWidth = Math.max(innerWidth - cursorPosition, minWidth);
        console.log(rightWidth);
        document.querySelector('.editor-main').style.gridTemplateColumns = `${cursorPosition}px 5px ${rightWidth}px`;
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});

const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkbox)
checkbox()
function checkbox() {
    const triggerBottom = window.innerHeight / 5 * 4
    console.log(window.innerHeight);
    console.log(triggerBottom);
    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top
        console.log(boxTop);
        console.log(box.getBoundingClientRect());

        if (boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}
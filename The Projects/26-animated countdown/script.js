const nav = document.querySelector('.nav')
const hero = document.querySelector('.hero')
window.addEventListener('scroll', fixNav)
function fixNav() {

    if (window.scrollY > nav.getBoundingClientRect().height) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}


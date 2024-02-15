const togles = document.querySelectorAll('.faq-toggle');

togles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        console.log(toggle.parentNode);
        toggle.parentNode.classList.toggle('active');

    })
})
const tagsEl = document.getElementById('tags')
const h3 = document.getElementById('h3')
const textarea = document.getElementById('textarea')
const pm = document.querySelector('.pm')

const question = prompt('What type of choice you want to pick')
pm.innerText = `You wanna choose ${question}`;

textarea.focus()

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)
    console.log(e.target.value);


    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
        const randomtag = pickRandomTag()
        highlightTag(randomtag)
        setTimeout(() => {
            UnHighlightTag(randomtag)
        }, 100)
    }, 100)

    setTimeout(() => {
        clearInterval(interval)
        setTimeout(() => {
            const randomtag = pickRandomTag()
            highlightTag(randomtag)
            h3.style.opacity = 0.2;
            textarea.style.opacity = 0.2
            const randomtagdata = document.querySelector('.highlight')
        }, 100);
    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function UnHighlightTag(tag) {
    tag.classList.remove('highlight')
}
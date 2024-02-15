const insert = document.getElementById('insert')


window.addEventListener('keydown', (e) => {
    console.log(e);
    insert.innerHTML = `<div class="key keys">
    ${e.key === ' ' ? 'Space' : e.key}
    <small>event.key</small>
</div>
<div class="key">
    ${e.keyCode}
    <small>event.keycode</small>
</div>
<div class="key">
    ${e.code}
    <small>event.code</small>
</div>`
})
const placeholders = document.querySelectorAll('.placeholder')
let item_active = ""
for(const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('drop', dragdrop)
}


const btn = document.querySelector('#add')
btn.addEventListener('click', () => {
    if (placeholders.length > 0) {
        const item = document.createElement('div')
        item.className = 'item'
        item.id = (document.querySelectorAll('.item').length+1).toString()
        item.draggable = true
        item.textContent = 'Hello, World! - ' + (document.querySelectorAll('.item').length + 1).toString()
        item.addEventListener('dragstart', dragstart)
        item.addEventListener('dragend', dragend)

        placeholders[0].appendChild(item)
    }
})

function dragstart(event){
    event.target.classList.add('hold')
    item_active = event
    setTimeout(() => event.target.classList.add('hide'), 0)
}

function dragend(event) {
    event.target.classList.remove('hold', 'hide')
}

function dragover(event) {
    event.preventDefault()
    if (event.target.classList[0] == 'item') {
        if (event.offsetY < event.srcElement.clientHeight / 2) {
            console.log('Мышь сверху')
            event.target.classList.add('hovered_up')
            event.target.classList.remove('hovered_bottom')
        } else {
            console.log('Мышь снизу')
            event.target.classList.add('hovered_bottom')
            event.target.classList.remove('hovered_up')
        }
    }
}

function dragenter(event) {
    event.target.classList.add('hovered')
}

function dragleave(event) {
    event.target.classList.remove('hovered', 'hovered_up', 'hovered_bottom')
}

function dragdrop(event) {
    event.target.classList.remove('hovered', 'hovered_up', 'hovered_bottom')

    if (event.target.className == 'item') {
        if (event.offsetY < event.srcElement.clientHeight / 2) {
            event.srcElement.parentElement.insertBefore(item_active.target, event.target)
        } else {
            event.srcElement.parentElement.insertBefore(item_active.target, event.target.nextSibling)
        }
    } else if (event.target.className == 'placeholder') {
        event.target.appendChild(item_active.target)
    }
}
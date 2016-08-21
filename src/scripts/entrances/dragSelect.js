import dragSelectInit from '../modules/dragSelect'
var arr = Array(10).fill('')
for (let i in arr) {
    var _item = document.createElement('li')
    _item.innerText = `list item [${++i}]`
    list.appendChild(_item)
}

dragSelectInit(document, document.querySelectorAll('#list li'), document.querySelector('.selectRange'), 'selected')

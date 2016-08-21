import PolygonCalculator from '../../src/polygonCalculator'

let $angleAmount = angleAmount
let $polygon = polygon
let $container = container
let _forEach = [].forEach
let _reduce = [].reduce

// amount of the angles changed
$angleAmount.addEventListener('change', function () {
    let _newAmount = this.value
    amountDisplay.innerText = _newAmount
    generateThePointRangeBars(_newAmount)
})

// some value changed
barsContainer.addEventListener('change', (ev) => {
    let $target = ev.target || ev.srcElement
    if (~$target.className.indexOf('whatever')) {
        reDraw()
    }
}, true)

let generateThePointRangeBars = (amount) => {
    while (barsContainer.childElementCount)
        _forEach.call(barsContainer.children, c => c.remove())
    while (amount-- > 0) {
        let item = document.createElement('li')
        let input = document.createElement('input')
        input.className = 'whatever'
        input.setAttribute('type', 'number')
        input.setAttribute('value', 3)
        input.setAttribute('min', 1)
        input.setAttribute('max', 10)
        item.appendChild(input)
        barsContainer.appendChild(item)
    }
    reDraw()
}

let reDraw = () => {
    try {
        $polygon.setAttribute('points',
            new PolygonCalculator($container.clientWidth / 2, $container.clientHeight / 2, +$angleAmount.value, 10, 40)
                .generatePointsPath(..._reduce.call(document.getElementsByClassName('whatever'), (p, n) => {
                    p[p.length] = n.value
                    return p
                }, [])))
    } catch (e) {
        alert(e.message)
    }
}

generateThePointRangeBars(5)
import PolygonCalculator from '../../src/polygonCalculator'

let $reset = btnReset
let $angleAmount = angleAmount
let $polygon = polygon
let $container = container
let $values = valueArr
let regenerate = () => {
    $polygon.setAttribute('points', new PolygonCalculator($container.clientWidth / 2, $container.clientHeight / 2, +$angleAmount.value, 10, 40).generatePointsPath(...$values.value.split(',')))
}

$reset.addEventListener('click', regenerate)
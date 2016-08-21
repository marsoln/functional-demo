import generator from '../modules/easeInOut'

let period = 20
let $bar = document.querySelector('.bar')
let $btn = document.querySelector('.start')
let itv = -1

$btn.addEventListener('click', function () {
    let easeInOut = generator(5, period, 0, 100);
    $bar.style.width = 0
    clearInterval(itv)
    itv = setInterval(function () {
        $bar.style.width = `${easeInOut()}%`
    }, period)
})
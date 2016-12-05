import generator from '../modules/easeInOut'

let frame = 60
let $bar = document.querySelector('.bar')
let $btn = document.querySelector('.start')
let itv = -1

$btn.addEventListener('click', function() {
    let easeInOut = generator(3, frame, 0, 100);
    $bar.style.width = 0
    clearInterval(itv)
    itv = setInterval(function() {
        $bar.style.width = `${easeInOut()}%`
    }, 1000 / frame)
})
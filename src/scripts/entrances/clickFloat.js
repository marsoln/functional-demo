import radiansGen from '../modules/radiansGenerator'
import $ from 'jquery'

const GEN = new radiansGen({
    _from: 0,
    _to: 80
}) // 预设浮动范围 从0 到 80

let createEle = function () {
    let $ele = $('<div></div>')
    $ele.css({
        'position': 'absolute',
        'width': 30,
        'height': 30,
        'border-radius': '50%',
        'margin-left': -15,
        'margin-top': -15
    })
    $('#container').append($ele)
    return $ele
}

$(function () {
    //初始化鼠标点击事件
    $('#container').on('click', function ($event) {
        let [_from, _to] = GEN.getPoints($event.clientX, $event.clientY)
        let $popEle = createEle()
        $popEle.css({
            top: _from.Y,
            left: _from.X,
            opacity: 1,
            'background-color': `rgba(${Math.random() * 255 >>> 0},${Math.random() * 255 >>> 0},${Math.random() * 255 >>> 0},1)`
        }).animate({
            top: _to.Y,
            left: _to.X,
            opacity: 0
        }, 1200, () => {
            $popEle.remove()
        })
    })
})
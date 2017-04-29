/**
 * 获取easeInOut函数
 * 
 * @param {number} duration 整体时间(秒)
 * @param {number} frame 帧数(每秒)
 * @param {number} start 起始值
 * @param {number} increase 增长值
 * 
 * @return {Function} 返回ease-in-out线性函数
 */
const EaseInOutGenerator = (duration, frame, start, increase) => {
    let time_span = 1 / frame
    let curr_time = 0
    return function() {
        let ret
        let time = curr_time
        if (time == 0) {
            ret = start
        } else if (time >= duration) {
            ret = start + increase
        } else if ((time /= duration / 2) < 1) {
            ret = increase / 2 * Math.pow(2, 10 * (time - 1)) + start
        } else {
            ret = increase / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + start
        }
        curr_time += time_span
        return ret
    }
}

export default EaseInOutGenerator
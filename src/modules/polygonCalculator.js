const DEFAULT_RADIANS_RANGE = 2 * Math.PI   // 整个扇形的弧度
const DEFAULT_ORIGIN_RADIANS = 0 // 默认初始弧度
const DEFAULT_BASE_LENGTH = 40
const SIN = Math.sin
const COS = Math.cos
const FORMAT_POINT = (p) => {
    return `${p.X},${p.Y}`
}

class Point {
    constructor(x, y) {
        this.X = x
        this.Y = y
    }
}

export default class PolygonCalculator {

    constructor(originX, originY, angleAmount, unitLength, baseLength, radiansRange, originRadians) {
        this.originOfCoordinate = new Point(originX, originY)
        this.angleAmount = angleAmount  // 角的数量
        this.unitLength = unitLength    // 单位长度
        this.pointsCollection = {}  // 历史point计算的记录
        this.unitRadians = (radiansRange || DEFAULT_RADIANS_RANGE) / angleAmount // 单位角度
        this.baseLength = baseLength || DEFAULT_BASE_LENGTH // 基础长度
        this.originRadians = originRadians || DEFAULT_ORIGIN_RADIANS // 基准角度
        this.radians = new Array(angleAmount).fill().reduce((prev, n, index) => {
            prev[prev.length] = this.originRadians + this.unitRadians * index
            return prev
        }, [])  // 旋转的角度数组
    }

    generatePoints(handler, ...unitAmount) {
        if (unitAmount.length !== this.angleAmount) {
            throw new RangeError('传入的单位数量和初始的边角数量不一致.')
        }
        let ret = []
        unitAmount.forEach((amount, index) => {
            let _key = `${amount}_${index}`
            if (!this.pointsCollection[_key]) {
                let _radian = this.radians[index]
                this.pointsCollection[_key] = new Point(
                    this.originOfCoordinate.X + SIN(_radian) * (amount * this.unitLength + this.baseLength),
                    this.originOfCoordinate.Y - COS(_radian) * (amount * this.unitLength + this.baseLength)
                )
            }
            ret[ret.length] = handler ? handler.call(this, this.pointsCollection[_key]) : this.pointsCollection[_key]
        })
        return ret.join(' ')
    }

    generatePointsPath(...args) {
        return this.generatePoints(FORMAT_POINT, ...args)
    }
}

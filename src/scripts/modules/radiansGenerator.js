const DEFAULT_RADIANS_RANGE = Math.PI / 3 // 60度
const DEFAULT_ORIGIN_RADIANS = 0 - Math.PI / 6 // 默认初始弧度
const SIN = Math.sin
const COS = Math.cos

class Point {
    constructor(x, y) {
        this.X = x
        this.Y = y
    }
}

class RadiansGenerator {

    constructor({
        _from = 50,
        _to = 80
    }) {
        this.from = _from
        this.to = _to
    }

    getPoints(x, y) {
        let originOfCoordinate = new Point(x, y)
        let _radian = DEFAULT_ORIGIN_RADIANS + DEFAULT_RADIANS_RANGE * Math.random()
        return [
            new Point(
                originOfCoordinate.X + SIN(_radian) * this.from,
                originOfCoordinate.Y - COS(_radian) * this.from
            ), new Point(
                originOfCoordinate.X + SIN(_radian) * this.to,
                originOfCoordinate.Y - COS(_radian) * this.to
            )
        ]
    }
}


export default RadiansGenerator
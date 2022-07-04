declare var PIXI
import {gsap} from "gsap/all"
import {CSSPlugin} from "gsap/CSSPlugin"

export function init(app,setup){

    console.log(setup)

    let t = gsap.timeline()

    let x = new PIXI.Graphics()
    x.lineStyle(4,0xffffff)
    x.lineTo(400,400)
    app.stage.addChild(x)

    app.someFunction = ()=>console.log("printme")

}


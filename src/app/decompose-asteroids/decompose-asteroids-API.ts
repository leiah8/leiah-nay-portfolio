import { gsap, Draggable } from "gsap/all"

export interface decomposeSetup {
    startingNumber: number
}

export function decomposeNumber(_els, _setup) {
    let self = {} as decomposeClass

    class decomposeClass {
        els: SVGSVGElement;
        setup: decomposeSetup;
        //#region decomposition variables
        refToOne: HTMLElement
        refToTen: HTMLElement
        refToHundred: HTMLElement
        //refToThousand: HTMLElement
        textSize = 14;
        svgns = "http://www.w3.org/2000/svg";
        color = "#ff7f50";
        T: gsap.timeline;
        animationFinished = false;
        animationStarted = false;
        drawnElements: SVGSVGElement
        assetScale = 2.3;
        goButton: SVGSVGElement
        yTextOffset = 50
        //#endregion

        //#region slider variables
        num: SVGSVGElement
        numValue: number
        sliderControls: HTMLElement
        numberDisplay: HTMLElement
        buttons: HTMLElement
        sliderBar: SVGSVGElement
        slider: SVGSVGElement
        maxText: SVGSVGElement
        sliderOpen = false;
        increment: number
        max = 999;
        min = 0
        //#endregion

        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup
            this.refToOne = this.els.getElementById("meteor") as HTMLElement;
            this.refToTen = this.els.getElementById("ten") as HTMLElement;
            this.refToHundred = this.els.getElementById("hundred") as HTMLElement;
            //this.refToThousand = this.els.getElementById("thousand") as HTMLElement;
            this.drawnElements = this.els.getElementById("drawnElements") as SVGSVGElement
            this.T = gsap.timeline({ paused: false });

            this.num = this.els.getElementById("num") as unknown as SVGSVGElement
            this.sliderControls = this.els.getElementById("sliderControls") as HTMLElement
            this.numberDisplay = this.els.getElementById("numberDisplay") as HTMLElement
            this.buttons = this.els.getElementById("buttons") as HTMLElement
            this.sliderBar = this.els.getElementById("sliderBar") as unknown as SVGSVGElement
            this.slider = this.els.getElementById("slider") as unknown as SVGSVGElement
            this.maxText = this.els.getElementById("maxText") as unknown as SVGSVGElement
            this.goButton = this.els.getElementById("goButton") as SVGSVGElement

            this.init()
        }

        //#region DECOMPOSITION FUNCTIONS

        showObject(object, duration) {
            return self.T.to(object, { opacity: 1, duration: duration })
        }

        hideObject(object, duration) {
            return self.T.to(object, { opacity: 0, duration: duration })
        }

        translateObject(object, xVal, yVal) {
            return self.T.to(object, { x: xVal, y: yVal, delay: 0.05 })
        }

        setDecrementVal(num) {
            if (num > 999) {
                return 1000;
            }
            else if (num > 99) {
                return 100;
            }
            else if (num > 9) {
                return 10;
            }
            else {
                return 1;
            }
        }

        bringToFront(obj) {
            let parent = obj.parentElement
            parent.removeChild(obj);
            parent.appendChild(obj);
        }

        redrawElements() {
            let arr = Array.from(self.drawnElements.children)
            arr.slice().reverse().forEach(element => {
                self.bringToFront(element)
            });
            gsap.utils.toArray("text").forEach(element => {
                self.bringToFront(element)
            });
        }

        togglePause(e) {
            var name = e.target.getAttribute("id");
            if (e.target != this.goButton) {
                if (name != "goCircle" && name != "goTriangle") {
                    if (this.T.paused()) {
                        this.T.resume();
                        console.log("resumed")
                    }
                    else if(this.animationStarted){
                        this.T.pause();
                        console.log("paused")
                    }
                }
            }
        }

        generateDecompositionObjects(startingNumber) {
            let decrementNumID = 1;
            let decrementVal = this.setDecrementVal(startingNumber);

            for (let i = startingNumber; i > 0;) {
                let numBBox = this.num.getBBox();
                //determine current asset
                var currentAsset;
                if (decrementVal == 1) {
                    currentAsset = this.refToOne
                }
                else if (decrementVal == 10) {
                    currentAsset = this.refToTen
                }
                else if (decrementVal == 100) {
                    currentAsset = this.refToHundred
                }
                /*
                else {
                    currentAsset = this.refToThousand
                }
                */ 

                let decrementText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(decrementText, { attr: { id: 'decrementText' + (decrementNumID), class: "number" }, x: numBBox.x - (numBBox.width / 2) + 50, y: numBBox.y + this.yTextOffset, fontFamily: 'Poppins', textContent: decrementVal.toString(), fontSize: this.textSize, opacity: 0, fill: this.color })
                this.drawnElements.appendChild(decrementText)

                let decrementAsset = currentAsset.cloneNode(true);
                gsap.set(decrementAsset, { attr: { id: 'decrementAsset' + (decrementNumID), x: currentAsset.getBBox().x, y: currentAsset.getBBox().y, width: currentAsset.getBBox().width, height: currentAsset.getBBox().height }, opacity: 0 })
                this.drawnElements.appendChild(decrementAsset)

                let number = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(number, { attr: { id: 'text' + (i), class: 'number' }, x: numBBox.x - (numBBox.width / 2) + 50, y: numBBox.y + this.yTextOffset, fontFamily: 'Poppins', textContent: i, fontSize: this.textSize, opacity: 0 })
                this.drawnElements.appendChild(number)

                i -= decrementVal
                this.num.textContent = String(parseInt(this.num.textContent) - decrementVal)
                decrementVal = this.setDecrementVal(i);
                decrementNumID++
            }
        }

        decompose(startingNumber) {

            if (!this.animationFinished && this.numValue > 0) {
                if (this.sliderOpen) {
                    this.sliderControls.style.display = "none";
                    this.sliderOpen = false
                }

                this.goButton.style.display = "none"

                this.generateDecompositionObjects(startingNumber)

                this.num.textContent = String(this.numValue) //set this back to what it was after it was modified from generateDecompostionObjects

                this.showObject('#text' + startingNumber, 1)//fade in starting number

                let yOffset = 100
                let xOffset = 25
                let decrementVal = this.setDecrementVal(startingNumber);
                let decrementNumID = 1;
                let assetRowCount = {100: 0, 10:0 , 1:0}
                
                let yVal = yOffset
                let xVal = xOffset
                let maxXVal = 0;

                this.animationStarted = true;

                for (let i = startingNumber; i > decrementVal - 1;) {

                    let decrementText = this.els.getElementById('decrementText' + decrementNumID);
                    let decrementAsset = this.els.getElementById("decrementAsset" + decrementNumID) as SVGSVGElement;
                    let currentNum = '#text' + i;
                    let nextNum = '#text' + (i - decrementVal);

                    if (assetRowCount[decrementVal] == 3) {//if we have filled row with 3 objects of unique type then proceed to next row
                        assetRowCount[decrementVal] = 0;
                        yVal += (parseInt(decrementAsset.getAttribute("height")) * this.assetScale) + 10
                        xVal = xOffset
                    }
                    
                    this.hideObject(currentNum, 0);
                    this.showObject(decrementText, 0)

                    //show next counter if exists
                    if (i - decrementVal > 0) {
                        this.showObject(nextNum, 0)
                    }

                    this.translateObject(decrementText, xVal, yVal)
                    this.T.to(decrementText, { duration: 0.5, scale: 0.01 })//scale

                    //LEIAH's CHANGES (Scale and position depend on the asset because of each one's transformation)
                    if (decrementVal == 1) {
                        this.T.set(decrementAsset, { x: xVal, y: yVal, opacity: 1 })
                        this.T.to(decrementAsset, { scale: this.assetScale * 1.3, duration: 0.5, onComplete: this.redrawElements}, "<")
                    }
                    else if (decrementVal == 10) {
                        this.T.set(decrementAsset, { x: xVal - 58, y: yVal - 17, opacity: 1})
                        this.T.to(decrementAsset, { scale: this.assetScale, duration: 0.5, onComplete: this.redrawElements}, "<")
                    }
                    else {
                        this.T.set(decrementAsset, { x: xVal - 120, y: yVal - 65, opacity: 1})
                        this.T.to(decrementAsset, { scale: this.assetScale, duration: 0.5, onComplete: this.redrawElements}, "<")
                    }

                    //this.T.set(decrementAsset, { x: xVal, y: yVal, opacity: 1 })
                    //this.T.to(decrementAsset, { scale: this.assetScale, duration: 0.5, onComplete: this.redrawElements}, "<")
                    
                    decrementNumID++;
                    
                    xVal += (parseInt(decrementAsset.getAttribute("width"))) * this.assetScale + 10
                    maxXVal = Math.max(maxXVal,xVal)//keep track of the furthest xValue
                    assetRowCount[decrementVal]++;

                    //decrement and then update rather than update then decrement
                    i -= decrementVal;
                    if (decrementVal != this.setDecrementVal(i)){
                        decrementVal = this.setDecrementVal(i);
                        //if we are switching to a new asset
                        yVal = yOffset //reset y value
                        xOffset = maxXVal + 25 //set x to furthest x
                        xVal = xOffset
                    }

                }
                this.animationFinished = true;
            }
        }

        reset(){
            if (this.T.isActive()){
                this.T.kill()
                this.T = gsap.timeline({ paused: false });
            }

            gsap.set(this.sliderControls, { display: "none" })
            gsap.set(this.num, {display: "none"})
            gsap.set(this.goButton, { display: "block"})
            Array.from(this.drawnElements.childNodes).forEach(e => e.remove())
            this.animationFinished = false
            this.animationStarted = false
            this.sliderOpen = false
            this.sliderValueHasBeenUpdated(self.min);
            this.T.resume()
            
        }
        //#endregion

        //#region SLIDER FUNCTIONS
        inputFieldPressed() {
            if (!this.sliderOpen && !this.animationFinished) {
                if (this.num.style.display == "none") {
                    this.num.textContent = String(this.min)
                    this.numValue = this.min
                    this.num.style.display = "block"
                }
                gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
                this.sliderControls.style.display = "block";
                this.sliderOpen = true;
            }
            else {
                this.sliderControls.style.display = "none";
                this.sliderOpen = false;
            }
        }

        buttonPressed(button) {
            let newNumber = parseInt(this.num.textContent) + parseInt(button.getAttribute("val"))
            if (newNumber > this.max) {
                newNumber = this.max
            }
            else if (newNumber < this.min) {
                newNumber = this.min
            }
            if (newNumber <= this.max && newNumber >= this.min) {
                this.sliderValueHasBeenUpdated(newNumber)
            }
        }

        sliderValueHasBeenUpdated(value) {
            this.num.textContent = value
            this.numValue = value
            gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
            gsap.set(this.slider, { x: this.increment * (value - this.min) })
        }

        addEventListenersAndInteractivity() {

            this.numberDisplay.addEventListener("pointerdown", event => this.inputFieldPressed())

            for (let i = 0; i < this.buttons.children.length; i++) {
                this.buttons.children[i].addEventListener("pointerdown", event => this.buttonPressed(this.buttons.children[i]))
            }

            //Initializing draggables, controller and slider
            var controllerDraggable = Draggable.create(this.sliderControls, {
                type: 'x,y',
                bounds: this.els
            })

            Draggable.create(this.slider, {
                type: 'x',
                bounds: this.sliderBar,
                cursor: "pointer",
                onPress: function () {
                    //disable controller drag if we are dragging slider
                    controllerDraggable[0].disable()
                },
                onDrag: function () {
                    self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.min))
                },
                onDragEnd: function () {
                    controllerDraggable[0].enable()
                }

            })
            this.els.addEventListener("pointerdown", event => {if (this.animationStarted) {this.togglePause(event)}})
            this.goButton.addEventListener("pointerdown", e => this.decompose(this.numValue));
            this.els.getElementById("restart").addEventListener("pointerdown", e => this.reset())

        }

        init() {
            gsap.registerPlugin(Draggable)

            //calculating increments for slider
            let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width)
            this.increment = barWidth / (this.max - this.min);

            gsap.set(this.sliderControls, { display: "none" })
            gsap.set(this.num, {display: "none"})

            //setting slider max and mins and repositioning the max
            this.els.getElementById("maxTextInner").textContent = String(this.max)
            gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` })
            this.els.getElementById("minTextInner").textContent = String(this.min)

            this.addEventListenersAndInteractivity()
        }
        //#endregion

    }
    return new decomposeClass(_els, _setup);
}
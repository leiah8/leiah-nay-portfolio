import { gsap } from "gsap/all";

interface block {
    el : Node
    num : number
}

interface pos {
    x : number
    y : number
}


export interface blocksSetup {
}

export function blocksAPI(_els, _setup) {
    let self = {} as blocksClass

    class blocksClass {
        els : SVGSVGElement | null;
        setup : blocksSetup;

        hundredRef : HTMLElement; 
        tensRef : HTMLElement; 
        onesRef : HTMLElement; 

        hundredBlank : HTMLElement; 
        tenBlank : HTMLElement; 
        oneBlank : HTMLElement; 

        layer : HTMLElement;
        txt : HTMLElement;
        restartBtn : HTMLElement;


        totalNum : number;

        blankHundreds : block[];
        blankTens : block[];
        blankOnes : block[];

        filledBlocks : Node[];

        tl : any;
        
        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup

            this.hundredRef = document.getElementById("hundred") as HTMLElement
            this.tensRef = document.getElementById("ten") as HTMLElement
            this.onesRef = document.getElementById("one") as HTMLElement

            this.hundredBlank = document.getElementById("hundred1") as HTMLElement
            this.tenBlank = document.getElementById("ten1") as HTMLElement
            this.oneBlank = document.getElementById("one1") as HTMLElement

            this.txt = document.getElementById("innerTxt") as HTMLElement
            this.restartBtn = document.getElementById("restart") as HTMLElement

            this.layer = document.getElementById("layer1") as HTMLElement

            this.blankHundreds = []
            this.blankTens = []
            this.blankOnes = []

            this.filledBlocks = [];

            this.tl = gsap.timeline()
            this.totalNum = 0;

            this.main()
        }

        gridCoords(xVal, yVal, deltaX, deltaY) {
            var coords = [];

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    coords.push({x : xVal + j * deltaX, y : yVal + i*deltaY})
                }
            }

            return coords;
        }

        colCoords(xVal, yVal, deltaY) {
            var coords = []; 
            for (var i = 0; i < 9; i++) {
                coords.push({x : xVal, y : yVal + i*deltaY})
            }

            return coords;
        }

        updateText() {
            //gsap.set(this.txt, {text : self.totalNum});
            this.txt.textContent = String(this.totalNum);

            //original x="255.68185"
            //center : 300

            //CENTRE TEXT
            console.log(self.txt.getClientRects()[0].width)
            gsap.set(this.txt, {x : 14 -(self.txt.getClientRects()[0].width / 2)});
        }

        clear() {
            this.filledBlocks.forEach(block => {
                try {
                    self.layer.removeChild(block);
                }
                catch {
                    gsap.set(block, {visibility : "hidden"});
                }
            });

            this.filledBlocks = [];

            this.totalNum = 0;
            console.log(this.totalNum);
            this.updateText()
        }

        fillBlock(num, val) {
            var block;
            if (val == 100) {
                block = this.hundredRef.cloneNode(true);
                gsap.set(block, {x : 144 + (num % 3) * 98, y : 120 + ((num  - num % 3) / 3) * 145 });
            }
            else if (val == 10) {
                block = this.tensRef.cloneNode(true);
                gsap.set(block, {x : 71, y : -325 + num * 46.5 });
            
            }
            else {
                block = this.onesRef.cloneNode(true);
                gsap.set(block, {x : 185 + (num % 3) * 45, y : -299 + ((num  - num % 3) / 3) * 140 });
            
            }

            this.filledBlocks.push(block);

            self.layer.appendChild(block);
            this.totalNum += val;
            console.log(self.totalNum);
            this.updateText()

            block.addEventListener('click', function () {
                //gsap.set(block, {visibility : "hidden"});
                self.layer.removeChild(block);
                self.totalNum -= val;
                console.log(self.totalNum);
                self.updateText()
            })
        }

        addBlankBlocks(coords, val) {
            var index = 0;
            var ref;
            var arr;

            if (val == 100) {
                ref = self.hundredBlank;
                arr = self.blankHundreds;
            }
            else if (val == 10) {
                ref = self.tenBlank;
                arr = self.blankTens;
            }
            else {
                ref = self.oneBlank;
                arr = self.blankOnes;
            }

            coords.forEach(c => {
                var blankBlock = ref.cloneNode(true);
                gsap.set(blankBlock, {x : c.x, y : c.y});
                self.layer.appendChild(blankBlock);

                arr.push({el : blankBlock, num : index});
                index++;
            }) 

        }

        main() {

            this.updateText()

            this.restartBtn.addEventListener('click', function() {self.clear()});

            var hundredCoords = this.gridCoords(0, 0, 98, 145);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 100);
                })
            })



            var tenCoords = this.colCoords(0, 0, 46.5);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 10);
                })
            })



            var oneCoords = this.gridCoords(0, 0, 45, 140);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 1);
                })
            })
        }

    }
    return new blocksClass(_els, _setup);
}

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
    version : string
}

export function blocksAPI(_els, _setup) {
    let self = {} as blocksClass

    class blocksClass {
        els : SVGSVGElement | null;
        setup : blocksSetup;

        //Reference to HTML Elements
        thousandRef : HTMLElement;
        hundredRef : HTMLElement; 
        tensRef : HTMLElement; 
        onesRef : HTMLElement; 
        tenthsRef : HTMLElement;
        hundredthsRef : HTMLElement;

        thousandBlank : HTMLElement;
        hundredBlank : HTMLElement; 
        tenBlank : HTMLElement; 
        oneBlank : HTMLElement; 
        tenthsBlank : HTMLElement;
        hundredthsBlank : HTMLElement;

        layer : HTMLElement;
        txt : HTMLElement;
        restartBtn : HTMLElement;

        //Text 'x' value depends on the layout
        textXVal : number;

        totalNum : number;

        //Store blank blocks
        blankThousands : block[];
        blankHundreds : block[];
        blankTens : block[];
        blankOnes : block[];

        blankHundredths : block[];
        blankTenths : block[];

        filledBlocks : Node[];

        tl : any;
        
        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup

            this.thousandRef = document.getElementById("thousand") as HTMLElement
            this.hundredRef = document.getElementById("hundred") as HTMLElement
            this.tensRef = document.getElementById("ten") as HTMLElement
            this.onesRef = document.getElementById("one") as HTMLElement
            this.hundredthsRef = document.getElementById("hundredth") as HTMLElement
            this.tenthsRef = document.getElementById("tenth") as HTMLElement

            this.thousandBlank = document.getElementById("thousand1") as HTMLElement
            this.hundredBlank = document.getElementById("hundred1") as HTMLElement
            this.tenBlank = document.getElementById("ten1") as HTMLElement
            this.oneBlank = document.getElementById("one1") as HTMLElement
            this.hundredthsBlank = document.getElementById("hundredth1") as HTMLElement
            this.tenthsBlank = document.getElementById("tenth1") as HTMLElement

            this.txt = document.getElementById("innerTxt") as HTMLElement
            this.restartBtn = document.getElementById("restart") as HTMLElement

            this.layer = document.getElementById("layer1") as HTMLElement

            this.blankThousands = [];
            this.blankHundreds = []
            this.blankTens = []
            this.blankOnes = []
            this.blankHundredths = []
            this.blankTenths = []

            this.filledBlocks = [];

            this.tl = gsap.timeline()
            this.totalNum = 0;

            this.textXVal = 0;

            this.main()
        }

        /** Outputs the coordinates of a 'rows' by 'cols' grid at (xVal, yVal) 
         * with a horizontal difference of 'delatX' and a vertiacal difference of 'deltaY'
         * between each element */
        gridCoords(xVal, yVal, deltaX, deltaY, rows, cols) {
            var coords = [];
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    coords.push({x : xVal + j * deltaX, y : yVal + i*deltaY})
                }
            }
            return coords;
        }

        /** Outputs the coordinates of 'rows' elements in one column at (xVal, yVal) 
         * with a vertical difference of 'deltaY' between each element */
        colCoords(xVal, yVal, deltaY, rows) {
            var coords = []; 
            for (var i = 0; i < rows; i++) {
                coords.push({x : xVal, y : yVal + i*deltaY})
            }
            return coords;
        }

        /** Updates the displayed text to match the totalNum */
        updateText() {
            // TO DO : ROUND PROPERLY
            
            if (this.setup.version == "decimalsChart")
                this.txt.textContent = this.totalNum.toFixed(2);
            else
                this.txt.textContent = String(this.totalNum);

            //centre text
            gsap.set(this.txt, {x : self.textXVal -(self.txt.getClientRects()[0].width / 2)});
        }

        /** Remove all filled blocks and reset the chart */
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

        /** Fill a block, whose image depends on 'val' at (xVal, yVal) */
        fillBlock(xVal, yVal, val) {

            //determine image
            var block;
            if (val == 100) {
                block = this.hundredRef.cloneNode(true);
            }
            else if (val == 10) {
                block = this.tensRef.cloneNode(true);            
            }
            else if (val == 1){
                block = this.onesRef.cloneNode(true);
            }
            else if (val == 0.1){
                block = this.tenthsRef.cloneNode(true);
            }
            else if (val == 0.01){
                block = this.hundredthsRef.cloneNode(true);
            }
           else {
                block = this.thousandRef.cloneNode(true);
            }

            //add block
            gsap.set(block, {x : xVal, y : yVal });
            this.filledBlocks.push(block);
            self.layer.appendChild(block);

            //Update the totalNum
            this.totalNum += val;
            this.updateText();
            console.log(self.totalNum);

            //Remove block and update text when it is clicked
            block.addEventListener('click', function () {
                self.layer.removeChild(block);

                self.totalNum -= val;
                self.updateText()
                console.log(self.totalNum);
            })
        }

        /** Create a blank block, whose image depends on 'val' 
         * at each of the coordinates in 'coords */
        addBlankBlocks(coords, val) {

            //determine image
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
            else if (val == 1) {
                ref = self.oneBlank;
                arr = self.blankOnes;
            }
            else if (val == 0.1) {
                ref = self.tenthsBlank;
                arr = self.blankTenths;
            }
            else if (val == 0.01) {
                ref = self.hundredthsBlank;
                arr = self.blankHundredths;
            }
            else {
                ref = self.thousandBlank;
                arr = self.blankThousands;
            }

            // draw a blank image at each coordinate 
            coords.forEach(c => {
                var blankBlock = ref.cloneNode(true);
                gsap.set(blankBlock, {x : c.x, y : c.y});
                self.layer.appendChild(blankBlock);

                arr.push({el : blankBlock, num : index});
                index++;
            }) 

        }

        /** MAIN Setup  */
        main() {

            //Determine version
            if (this.setup.version == "hundredsChart") {
                self.textXVal = 14;
                self.hundredsChartSetup()
            }
            else if (this.setup.version == "thousandsChart") {
                self.textXVal = 56;
                self.thousandsChartSetup()
            }
            else if (this.setup.version == "decimalsChart") {
                self.textXVal = 44;
                self.decimalChartSetup()
            }
        }

        /** Setup for the hundreds chart version */
        hundredsChartSetup() {
            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            // HUNDREDS //
            var hundredCoords = this.gridCoords(0, 0, 98, 145,3,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(144 + (block.num % 3) * 98, 120 + ((block.num  - block.num % 3) / 3) * 145 , 100);
                })
            })

            // TENS //
            var tenCoords = this.colCoords(0, 383.5, 46.5,9);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(438, 179 + block.num * 46.5 , 10);
                })
            })

            // ONES //
            var oneCoords = this.gridCoords(0, 0, 45, 140,3,3);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(561 + (block.num % 3) * 45,222 + ((block.num  - block.num % 3) / 3) * 140 , 1);
                })
            })
        }

        /** Setup for the hundreds chart version */
        thousandsChartSetup() {

            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            // THOUSANDS //
            var thousandCoords = this.gridCoords(-4.5, 0, 98, 145,3,3);
            this.addBlankBlocks(thousandCoords, 1000);
            
            this.blankThousands.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(128 + (block.num % 3) * 98, 85 + ((block.num  - block.num % 3) / 3) * 145 , 1000);
                })
            })
            
            // HUNDREDS //
            var hundredCoords = this.gridCoords(0, 0, 102, 145,3,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(445 + (block.num % 3) * 102, 120 + ((block.num  - block.num % 3) / 3) * 145 , 100);
                })
            })

            // TENS //
            var tenCoords = this.colCoords(180, 0, 46.5,9);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(745, 179 + block.num * 46.5 , 10);
                })
            })

            // ONES //
            var oneCoords = this.gridCoords(307, 1, 45, 140,3,3);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(868.4 + (block.num % 3) * 45,222 + ((block.num  - block.num % 3) / 3) * 140 , 1);
                })
            })
        }

        /** Setup for the decimal chart version */
        decimalChartSetup() {
            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            // ONES //
            var oneCoords = this.gridCoords(0, 0, 98, 145,3,3);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(-182 + (block.num % 3) * 98, 356 + ((block.num  - block.num % 3) / 3) * 145 , 1);
                })
            })

            // TENTHS //
            var tenthCoords = this.colCoords(0, 0, 46.5,9);
            this.addBlankBlocks(tenthCoords, 0.1);

            this.blankTenths.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(487, 28 + block.num * 46.5 , 0.1);
                })
            })

            // HUNDREDTHS //
            var hundredthCoords = this.gridCoords(0, 0, 45, 140,3,3);
            this.addBlankBlocks(hundredthCoords, 0.01);

            this.blankHundredths.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(693 + (block.num % 3) * 45, 12 + ((block.num  - block.num % 3) / 3) * 140 , 0.01);
                })
            })

        }

    }
    return new blocksClass(_els, _setup);
}

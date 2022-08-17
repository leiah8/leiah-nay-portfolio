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

        textXVal : number;
        totalNum : number;

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

        gridCoords(xVal, yVal, deltaX, deltaY, rows, cols) {
            var coords = [];

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    coords.push({x : xVal + j * deltaX, y : yVal + i*deltaY})
                }
            }

            return coords;
        }

        colCoords(xVal, yVal, deltaY, rows) {
            var coords = []; 
            for (var i = 0; i < rows; i++) {
                coords.push({x : xVal, y : yVal + i*deltaY})
            }

            return coords;
        }

        updateText() {
            this.txt.textContent = String(this.totalNum);

            //CENTRE TEXT
            gsap.set(this.txt, {x : self.textXVal -(self.txt.getClientRects()[0].width / 2)});
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

        fillBlock(xVal, yVal, val) {
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

            gsap.set(block, {x : xVal, y : yVal });

            this.filledBlocks.push(block);

            self.layer.appendChild(block);
            this.totalNum += val;
            this.totalNum = Math.round(this.totalNum * 100) / 100;  //ROUND NUMBER PROPERLY
            console.log(self.totalNum);
            this.updateText()

            block.addEventListener('click', function () {
                //gsap.set(block, {visibility : "hidden"});
                self.layer.removeChild(block);
                self.totalNum -= val;
                this.totalNum = Math.round(this.totalNum * 100) / 100; //ROUND NUMBER PROPERLY
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

            coords.forEach(c => {
                var blankBlock = ref.cloneNode(true);
                gsap.set(blankBlock, {x : c.x, y : c.y});
                self.layer.appendChild(blankBlock);

                arr.push({el : blankBlock, num : index});
                index++;
            }) 

        }

        main() {

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
            else if (this.setup.version == "arrowsHundredsChart") {
                self.textXVal = 35;
                self.hundredArrowsSetup()
            }

        }

        hundredsChartSetup() {

            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            var hundredCoords = this.gridCoords(0, 0, 98, 145,3,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    //self.fillBlock(block.num, 100);
                    self.fillBlock(144 + (block.num % 3) * 98, 120 + ((block.num  - block.num % 3) / 3) * 145 , 100);
                })
            })



            var tenCoords = this.colCoords(0, 383.5, 46.5,9);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(438, 179 + block.num * 46.5 , 10);
                })
            })



            var oneCoords = this.gridCoords(0, 0, 45, 140,3,3);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(561 + (block.num % 3) * 45,222 + ((block.num  - block.num % 3) / 3) * 140 , 1);
                })
            })
        }

        thousandsChartSetup() {

            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});


            var thousandCoords = this.gridCoords(-4.5, 0, 98, 145,3,3);
            this.addBlankBlocks(thousandCoords, 1000);
            
            this.blankThousands.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(128 + (block.num % 3) * 98, 85 + ((block.num  - block.num % 3) / 3) * 145 , 1000);
                })
            })
            

            var hundredCoords = this.gridCoords(0, 0, 102, 145,3,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    //self.fillBlock(block.num, 100);
                    self.fillBlock(445 + (block.num % 3) * 102, 120 + ((block.num  - block.num % 3) / 3) * 145 , 100);
                })
            })

            var tenCoords = this.colCoords(180, 0, 46.5,9);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(745, 179 + block.num * 46.5 , 10);
                })
            })



            var oneCoords = this.gridCoords(307, 1, 45, 140,3,3);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(868.4 + (block.num % 3) * 45,222 + ((block.num  - block.num % 3) / 3) * 140 , 1);
                })
            })
        }

        decimalChartSetup() {
            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            var oneCoords = this.gridCoords(0, 0, 98, 145,3,3);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(-182 + (block.num % 3) * 98, 356 + ((block.num  - block.num % 3) / 3) * 145 , 1);
                })
            })

            var tenthCoords = this.colCoords(0, 0, 46.5,9);
            this.addBlankBlocks(tenthCoords, 0.1);

            this.blankTenths.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(487, 28 + block.num * 46.5 , 0.1);
                })
            })

            var hundredthCoords = this.gridCoords(0, 0, 45, 140,3,3);
            this.addBlankBlocks(hundredthCoords, 0.01);

            this.blankHundredths.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(693 + (block.num % 3) * 45, 12 + ((block.num  - block.num % 3) / 3) * 140 , 0.01);
                })
            })

        }

        hundredArrowsSetup() {
            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            var hundredCoords = this.gridCoords(0, 0, 94, 128,4,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    //self.fillBlock(block.num, 100);
                    self.fillBlock(144 + (block.num % 3) * 94, 120 + ((block.num  - block.num % 3) / 3) * 128 , 100);
                })
            })

            var tenCoords = this.colCoords(0, 0, 51.5, 10);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(492, 179 + block.num * 51.5 , 10);
                })
            })

            var oneCoords = this.gridCoords(118, 0, 75, 100,5,2);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(679 + (block.num % 2) * 75,222 + ((block.num  - block.num % 2) / 2) * 100 , 1);
                })
            })
        }   

    }
    return new blocksClass(_els, _setup);
}

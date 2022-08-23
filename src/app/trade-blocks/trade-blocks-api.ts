import { gsap } from "gsap/all";

interface block {
    el : Node | null
    num : number | null
}

var blank = {el : null, num : null};

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

        tensToHundredArrow : HTMLElement;
        hundredToTensArrow : HTMLElement;
        onesToTenArrow : HTMLElement;
        tenToOnesArrow : HTMLElement;

        layer : HTMLElement;
        txt : HTMLElement;
        restartBtn : HTMLElement;

        textXVal : number;
        totalNum : number;

        numOnes : number;
        numTens : number;
        numHundreds : number;

        blankThousands : block[];
        blankHundreds : block[];
        blankTens : block[];
        blankOnes : block[];

        blankHundredths : block[];
        blankTenths : block[];

        filledBlocks : Node[];

        filledOnes : block[];
        filledTens : block[];
        filledHundreds : block[];

        tl : any;
        
        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup

            //this.thousandRef = document.getElementById("thousand") as HTMLElement
            this.hundredRef = document.getElementById("hundred") as HTMLElement
            this.tensRef = document.getElementById("ten") as HTMLElement
            this.onesRef = document.getElementById("one") as HTMLElement

            //this.hundredthsRef = document.getElementById("hundredth") as HTMLElement
            //this.tenthsRef = document.getElementById("tenth") as HTMLElement

            //this.thousandBlank = document.getElementById("thousand1") as HTMLElement
            this.hundredBlank = document.getElementById("hundred1") as HTMLElement
            this.tenBlank = document.getElementById("ten1") as HTMLElement
            this.oneBlank = document.getElementById("one1") as HTMLElement

            //this.hundredthsBlank = document.getElementById("hundredth1") as HTMLElement
            //this.tenthsBlank = document.getElementById("tenth1") as HTMLElement

            this.txt = document.getElementById("innerTxt") as HTMLElement
            this.restartBtn = document.getElementById("restart") as HTMLElement

            this.layer = document.getElementById("layer1") as HTMLElement

            this.tensToHundredArrow = document.getElementById("blueLeft1") as HTMLElement 
            this.hundredToTensArrow = document.getElementById("rightBlue1") as HTMLElement
            this.onesToTenArrow = document.getElementById("blueLeft2") as HTMLElement
            this.tenToOnesArrow = document.getElementById("blueRight2") as HTMLElement

            //this.blankThousands = [];
            this.blankHundreds = []
            this.blankTens = []
            this.blankOnes = []

            //this.blankHundredths = []
            //this.blankTenths = []

            this.filledBlocks = [];

            this.filledOnes = [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
            this.filledTens =   [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
            this.filledHundreds =  [blank, blank, blank, blank, blank, blank, blank, blank, blank];
            
            this.tl = gsap.timeline()
            
            this.totalNum = 0;

            this.numOnes = 0;
            this.numTens = 0;
            this.numHundreds = 0;

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
            this.filledOnes = [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
            this.filledTens =   [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
            this.filledHundreds =  [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];

            this.numOnes = 0;
            this.numTens = 0;
            this.numHundreds = 0;

            this.totalNum = 0;
            this.updateText()
        }

        addBlockToArr(arr, block) {
            arr[block.num] = block;

        }

        removeBlockFromArr(arr, num) {
            for(var i = 0; i < arr.length; i++) {
                try {
                    if (arr[i].num == num){
                        arr[i] = blank;
                    }
                }
                catch {
                    arr[i].num = blank;
                }
            }
        }

        fillBlock(number, xVal, yVal, val) {
            var block : Node;
            if (val == 100) {
                block = this.hundredRef.cloneNode(true);
                //this.filledHundreds.push({el : block, num : number});
                this.addBlockToArr(self.filledHundreds, {el : block, num : number} );
                this.numHundreds += 1;
            }
            else if (val == 10) {
                block = this.tensRef.cloneNode(true);  
                this.addBlockToArr(self.filledTens, {el : block, num : number} )      
                this.numTens += 1;  
            }
            else if (val == 1){
                block = this.onesRef.cloneNode(true);
                this.addBlockToArr(self.filledOnes, {el : block, num : number} )
                this.numOnes +=1;
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
            this.updateText()
            this.checkTrade()

            block.addEventListener('click', function () {
                //gsap.set(block, {visibility : "hidden"});
                self.layer.removeChild(block);
                self.totalNum -= val;
                this.totalNum = Math.round(this.totalNum * 100) / 100; //ROUND NUMBER PROPERLY
                self.updateText()

                if (val == 1) {
                    self.numOnes -= 1;
                    self.removeBlockFromArr(self.filledOnes, number);

                }
                else if (val == 10) {
                    self.numTens -= 1;
                    self.removeBlockFromArr(self.filledTens, number);

                }
                else if (val == 100) {
                    self.numHundreds -= 1;
                    self.removeBlockFromArr(self.filledHundreds, number);
                }
                
                self.checkTrade() //NEED TO TAKE BLOCK OUT OF LISTS /////////////////////////////////////
            
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

            
            if (this.setup.version == "arrowsHundredsChart") {
                self.textXVal = 35;
                self.arrowSetup();
                self.hundredArrowsSetup()
            }

        }

        findFirstBlank(arr) {
            var index = 0;
            /*
            arr.forEach(block => {
                if (block == blank) return index;
                index++;
            })*/
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == blank) return i;
            }

            return -1;
            
        }

        checkTrade() {
            if (this.numOnes >= 10 && this.numTens < 10) {
                gsap.set(this.onesToTenArrow, {visibility : "visible"});

            }
            else {
                gsap.set(this.onesToTenArrow, {visibility : "hidden"});
            }

            if (this.numOnes == 0 && this.numTens > 0) {
                gsap.set(this.tenToOnesArrow, {visibility : "visible"});

            }
            else {
                gsap.set(this.tenToOnesArrow, {visibility : "hidden"});
            }


            if (this.numTens >= 10 && this.numHundreds < 12) {
                gsap.set(this.tensToHundredArrow, {visibility : "visible"});
            }
            else {
                gsap.set(this.tensToHundredArrow, {visibility : "hidden"});
            }

            if (this.numTens == 0 && this.numHundreds > 0) {
                gsap.set(this.hundredToTensArrow, {visibility : "visible"});
            }
            else {
                gsap.set(this.hundredToTensArrow, {visibility : "hidden"});
            }
        }

        findLastFilled(arr) {
            var index = 0;

            arr.forEach(block => {
                if (block != blank) index = block.num;
            })

            return index;
        }

        arrowSetup() {
            gsap.set(self.tensToHundredArrow, {visibility : "hidden"});

            self.tensToHundredArrow.addEventListener('click', function() {
                var index : number;
                index = self.findFirstBlank(self.filledHundreds);
               
                self.fillBlock(index,  144 + (index % 3) * 94, 120 + ((index  - index % 3) / 3) * 128 , 100);

                self.filledTens.forEach(block => {
                    try {
                        self.layer.removeChild(block.el);
                    }
                    catch {
                        gsap.set(block, {visibility : "hidden"});
                    }
                });

                self.filledTens = [blank,blank,blank,blank,blank,blank,blank,blank,blank,blank]
                self.numTens = 0;
                self.totalNum -= 100;
                self.totalNum = Math.round(self.totalNum * 100) / 100; //ROUND NUMBER PROPERLY
                self.updateText()

                gsap.set(self.tensToHundredArrow, {visibility : "hidden"});

                self.checkTrade();


            });

            gsap.set(self.hundredToTensArrow, {visibility : "hidden"});

            self.hundredToTensArrow.addEventListener('click', function() {
                
                for (var i = 0; i < 10; i++) {
                    self.fillBlock(i, 492, 179 + i * 51.5 , 10);
                }

                var index = self.findLastFilled(self.filledHundreds);

                try {
                    self.layer.removeChild(self.filledHundreds[index].el);
                }
                catch {
                    gsap.set(self.filledHundreds[index].el, {visibility : "hidden"});
                }

                self.filledHundreds[index] = blank;

                self.numHundreds -= 1;
                self.totalNum -= 100;
                self.totalNum = Math.round(self.totalNum * 100) / 100; //ROUND NUMBER PROPERLY
                self.updateText()

                gsap.set(self.hundredToTensArrow, {visibility : "hidden"});

                self.checkTrade();
            });
            
            
            gsap.set(self.onesToTenArrow, {visibility : "hidden"});

            self.onesToTenArrow.addEventListener('click', function() {
                var index : number;
                index = self.findFirstBlank(self.filledTens);
               
                self.fillBlock(index, 492, 179 + index * 51.5 , 10);

                self.filledOnes.forEach(block => {
                    try {
                        self.layer.removeChild(block.el);
                    }
                    catch {
                        gsap.set(block, {visibility : "hidden"});
                    }
                });

                self.filledOnes = [blank,blank,blank,blank,blank,blank,blank,blank,blank,blank]
                self.numOnes = 0;
                self.totalNum -= 10;
                self.totalNum = Math.round(self.totalNum * 100) / 100; //ROUND NUMBER PROPERLY
                self.updateText()

                gsap.set(self.onesToTenArrow, {visibility : "hidden"});

                self.checkTrade();
            })

            gsap.set(self.tenToOnesArrow, {visibility : "hidden"});

            self.tenToOnesArrow.addEventListener('click', function() {
               
                for (var i = 0; i < 10; i++) {
                    self.fillBlock(i, 679 + (i % 2) * 75,222 + ((i  - i % 2) / 2) * 100 , 1);
                }

                var index = self.findLastFilled(self.filledTens);

                try {
                    self.layer.removeChild(self.filledTens[index].el);
                }
                catch {
                    gsap.set(self.filledTens[index].el, {visibility : "hidden"});
                }

                self.filledTens[index] = blank;

                self.numTens -= 1;
                self.totalNum -= 10;
                self.totalNum = Math.round(self.totalNum * 100) / 100; //ROUND NUMBER PROPERLY
                self.updateText()

                gsap.set(self.onesToTenArrow, {visibility : "hidden"});

                self.checkTrade();
            });


        }

        hundredArrowsSetup() {
            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            var hundredCoords = this.gridCoords(0, 0, 94, 128,4,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    //self.fillBlock(block.num, 100);
                    self.fillBlock(block.num, 144 + (block.num % 3) * 94, 120 + ((block.num  - block.num % 3) / 3) * 128 , 100);
                })
            })

            var tenCoords = this.colCoords(0, 0, 51.5, 10);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 492, 179 + block.num * 51.5 , 10);
                })
            })

            var oneCoords = this.gridCoords(118, 0, 75, 100,5,2);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 679 + (block.num % 2) * 75,222 + ((block.num  - block.num % 2) / 2) * 100 , 1);
                })
            })
        }   

    }
    return new blocksClass(_els, _setup);
}

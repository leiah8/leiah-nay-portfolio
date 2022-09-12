import { gsap } from "gsap/all";

interface block {
    el : Node | null
    num : number | null
    x : number
    y : number
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

        //Refs to HTML Elements

        // BLOCKS //
        hundredRef : HTMLElement; 
        tensRef : HTMLElement; 
        onesRef : HTMLElement; 

        //thousandRef : HTMLElement;
        //tenthsRef : HTMLElement;
        //hundredthsRef : HTMLElement;

        hundredBlank : HTMLElement; 
        tenBlank : HTMLElement; 
        oneBlank : HTMLElement; 

        //thousandBlank : HTMLElement;
        //tenthsBlank : HTMLElement;
        //hundredthsBlank : HTMLElement;

        // ARROWS //
        tensToHundredArrow : HTMLElement;
        hundredToTensArrow : HTMLElement;
        onesToTenArrow : HTMLElement;
        tenToOnesArrow : HTMLElement;

        // OTHER //
        layer : HTMLElement;
        txt : HTMLElement;
        restartBtn : HTMLElement;

        textXVal : number;

        // TRACK NUM //
        totalNum : number;

        numOnes : number;
        numTens : number;
        numHundreds : number;

        // TRACK BLANKS //
        blank : block;

        blankHundreds : block[];
        blankTens : block[];
        blankOnes : block[];

        //blankThousands : block[];
        //blankHundredths : block[];
        //blankTenths : block[];

        // TRACK FILLED BLOCKS //
        filledBlocks : Node[];

        filledOnes : block[];
        filledTens : block[];
        filledHundreds : block[];

        tl : any;
        
        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup

            this.hundredRef = document.getElementById("hundred") as HTMLElement
            this.tensRef = document.getElementById("ten") as HTMLElement
            this.onesRef = document.getElementById("one") as HTMLElement

            //this.thousandRef = document.getElementById("thousand") as HTMLElement
            //this.hundredthsRef = document.getElementById("hundredth") as HTML Element
            //this.tenthsRef = document.getElementById("tenth") as HTMLElement

            this.hundredBlank = document.getElementById("hundred1") as HTMLElement
            this.tenBlank = document.getElementById("ten1") as HTMLElement
            this.oneBlank = document.getElementById("one1") as HTMLElement

            //this.thousandBlank = document.getElementById("thousand1") as HTMLElement
            //this.hundredthsBlank = document.getElementById("hundredth1") as HTMLElement
            //this.tenthsBlank = document.getElementById("tenth1") as HTMLElement

            this.txt = document.getElementById("innerTxt") as HTMLElement
            this.restartBtn = document.getElementById("restart") as HTMLElement

            this.layer = document.getElementById("layer1") as HTMLElement

            this.tensToHundredArrow = document.getElementById("blueLeft1") as HTMLElement 
            this.hundredToTensArrow = document.getElementById("rightBlue1") as HTMLElement
            this.onesToTenArrow = document.getElementById("blueLeft2") as HTMLElement
            this.tenToOnesArrow = document.getElementById("blueRight2") as HTMLElement

            this.blank = {el : null, num : null, x : -100, y : -100};

            this.blankHundreds = []
            this.blankTens = []
            this.blankOnes = []

            //this.blankThousands = [];
            //this.blankHundredths = []
            //this.blankTenths = []

            this.filledBlocks = [];

            this.filledOnes = [this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank];
            this.filledTens =   [this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank];
            this.filledHundreds =  [this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank];
            
            this.tl = gsap.timeline()
            
            this.totalNum = 0;

            this.numOnes = 0;
            this.numTens = 0;
            this.numHundreds = 0;

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
            this.txt.textContent = String(this.totalNum);
            gsap.set(this.txt, {x : self.textXVal -(self.txt.getClientRects()[0].width / 2)});
        }

        /** Remove all filled blocks and reset the chart */
        clear() {
            this.filledBlocks.forEach(block => {
                try {
                    self.layer.removeChild(block);
                } catch {
                    gsap.set(block, {visibility : "hidden"});
                }
            });

            //reset arrays 
            this.filledBlocks = [];
            this.filledOnes = [this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank];
            this.filledTens =   [this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank];
            this.filledHundreds =  [this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank, this.blank];

            //reset values
            this.numOnes = 0;
            this.numTens = 0;
            this.numHundreds = 0;

            //update display
            this.totalNum = 0;
            this.updateText();

            gsap.set(self.tensToHundredArrow, {visibility : "hidden"});
            gsap.set(self.hundredToTensArrow, {visibility : "hidden"});
            gsap.set(self.onesToTenArrow, {visibility : "hidden"});
            gsap.set(self.tenToOnesArrow, {visibility : "hidden"});

            //TO DO : When reset, remove all animating blocks and reset the timeline
            /*
            try {
                self.tl.pause();
            } catch {

            }
            */

        }

        /** Adds 'block' to given arr at the specified 'num' place */
        addBlockToArr(arr, block) {
            arr[block.num] = block;
        }

        /** Removes the block with index 'num' from 'arr' */
        removeBlockFromArr(arr, num) {
            for(var i = 0; i < arr.length; i++) {
                try {
                    if (arr[i].num == num)
                        arr[i] = this.blank;
                } catch {
                    arr[i] = this.blank;
                }
            }
        }

        /** Fill a block, whose image depends on 'val' at (xVal, yVal) */
        fillBlock(number, xVal, yVal, val) {

            //determine the image and track the value
            var block : Node;
            if (val == 100) {
                block = this.hundredRef.cloneNode(true);
                this.addBlockToArr(self.filledHundreds, {el : block, num : number, x : xVal, y : yVal} );
                this.numHundreds += 1;
            }
            else if (val == 10) {
                block = this.tensRef.cloneNode(true);  
                this.addBlockToArr(self.filledTens, {el : block, num : number, x : xVal, y : yVal} )      
                this.numTens += 1;  
            }
            else if (val == 1){
                block = this.onesRef.cloneNode(true);
                this.addBlockToArr(self.filledOnes, {el : block, num : number, x : xVal, y : yVal} )
                this.numOnes +=1;
            }
            
            /*
            else if (val == 0.1) block = this.tenthsRef.cloneNode(true);
            else if (val == 0.01) block = this.hundredthsRef.cloneNode(true); 
            else block = this.thousandRef.cloneNode(true); 
            */

            //add block to screen 
            gsap.set(block, {x : xVal, y : yVal, visibility : "visible"});
            self.layer.appendChild(block);

            this.filledBlocks.push(block);

            //update value and check if a trade can be made
            this.totalNum += val;
            this.updateText()
            this.checkTrade()

            //if block is clicked, remove it 
            block.addEventListener('click', function () {
                self.layer.removeChild(block);
                self.totalNum -= val;
                self.updateText()

                //remove from specific array and decrement tracking value
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
                
                self.checkTrade();
            });
        }

        /** Add blank blocks representing 'val' at each pos in 'coords' */
        addBlankBlocks(coords, val) {
            var index = 0;
            var ref;
            var arr;

            //determine image and array to store value
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

            /*
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
            */

            coords.forEach(c => {
                var blankBlock = ref.cloneNode(true);
                gsap.set(blankBlock, {x : c.x, y : c.y});
                self.layer.appendChild(blankBlock);

                arr.push({el : blankBlock, num : index, x : c.x, y : c.y});
                index++;
            }) 

        }

        /** Finds the first blank element in 'arr; and returns its index */
        findFirstBlank(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == this.blank) return i;
            }
            return -1;
        }

        /** Checks if a trade is possible and lights up the corresponding arrow */
        checkTrade() {

            //10 Ones --> 1 Ten
            if (this.numOnes >= 10 && this.numTens < 10) 
                gsap.set(this.onesToTenArrow, {visibility : "visible"});
            else 
                gsap.set(this.onesToTenArrow, {visibility : "hidden"});

            //1 Ten --> 10 Ones
            if (this.numOnes == 0 && this.numTens > 0) 
                gsap.set(this.tenToOnesArrow, {visibility : "visible"});
            else 
                gsap.set(this.tenToOnesArrow, {visibility : "hidden"});

            //10 Tens --> 1 Hundred
            if (this.numTens >= 10 && this.numHundreds < 12) 
                gsap.set(this.tensToHundredArrow, {visibility : "visible"});
            else 
                gsap.set(this.tensToHundredArrow, {visibility : "hidden"});

            //1 Hundred --> 10 Tens
            if (this.numTens == 0 && this.numHundreds > 0) 
                gsap.set(this.hundredToTensArrow, {visibility : "visible"});
            else 
                gsap.set(this.hundredToTensArrow, {visibility : "hidden"});
        }

        /** Finds the last filled block in the 'arr' and returns the index*/
        findLastFilled(arr) {
            var index = 0;
            arr.forEach(block => {
                if (block != this.blank) index = block.num;
            })
            return index;
        }

        /** Redraws elements in the opposite order */
        redrawElements(arr) {
            for (var i = arr.length - 1; i >= 0; i--) {
                let obj = arr[i];
                this.layer.removeChild(obj);
                this.layer.appendChild(obj);
            }
        }

        /** Add Event Listeners to Arrows */
        //TO DO : MAKE MORE MODULAR (GLOBALIZE x and y VALUES)
        arrowSetup() {

            //10 Tens --> 1 Hundred
            gsap.set(self.tensToHundredArrow, {visibility : "hidden"});
            self.tensToHundredArrow.addEventListener('click', function() {
                var tempArr = [];
                var index = self.findFirstBlank(self.filledHundreds);

                //Initialize timeline
                self.tl = gsap.timeline({paused : true,
                    onComplete : () => {
                        //fill hundred block
                        self.fillBlock(index,  xVal, yVal , 100);
                        
                        //remove animated tens
                        tempArr.forEach(temp => {
                            self.layer.removeChild(temp);
                        });

                        //reset values
                        self.filledTens = [self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank]
                        self.numTens = 0;
                        self.totalNum -= 100;
                        self.updateText()
                        gsap.set(self.tensToHundredArrow, {visibility : "hidden"});

                        self.checkTrade();
                    }
                });

                //Create animation
                var xVal = 144 + (index % 3) * 94
                var yVal = 120 + ((index  - index % 3) / 3) * 128
                
                //Replace all tens with animating blocks (so the event listener is removed)
                self.filledTens.forEach(block => {
                    var temp = self.tensRef.cloneNode(true);
                    gsap.set(temp, {x : block.x, y : block.y, visibility : "visible"})
                    self.layer.appendChild(temp);
                    self.layer.removeChild(block.el);
                    tempArr.push(temp);
                });

                self.redrawElements(tempArr); //redraw elements so last becomes first

                //Animate tens to the 1 hundred position
                var tensIndex = 0;
                tempArr.forEach(temp => {
                    self.tl.to(temp, {x : xVal - 13, y : yVal + 65 + tensIndex*8.65, scale : 0.95}, "<=0.15"); 
                    tensIndex++;
                })

                self.tl.play();

                //NO ANIMATION VERSION:
                /*
                index = self.findFirstBlank(self.filledHundreds);
                self.fillBlock(index,  144 + (index % 3) * 94, 120 + ((index  - index % 3) / 3) * 128 , 100);

                self.filledTens.forEach(block => {
                    try {
                        self.layer.removeChild(block.el);
                    } catch {
                        gsap.set(block, {visibility : "hidden"});
                    }
                });

                self.filledTens = [self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank]
                self.numTens = 0;
                self.totalNum -= 100;
                self.updateText();

                gsap.set(self.tensToHundredArrow, {visibility : "hidden"});

                self.checkTrade();
                */
            });

            //1 Hundred --> 10 Tens
            gsap.set(self.hundredToTensArrow, {visibility : "hidden"});
            self.hundredToTensArrow.addEventListener('click', function() {
                var tempArr = [];
                var index = self.findLastFilled(self.filledHundreds);

                //Initialize timeline
                self.tl = gsap.timeline({paused : true,
                    onComplete : () => {
                        //draw all tens
                        for (var i = 0; i < 10; i++) {
                            self.fillBlock(i, 491, 178 + i * 51.5 , 10);
                        }    
                        
                        //remove animated tens
                        tempArr.forEach(temp => {
                            self.layer.removeChild(temp);
                        });

                        //reset values
                        self.numHundreds -= 1;
                        self.totalNum -= 100;
                        self.updateText()
                        gsap.set(self.hundredToTensArrow, {visibility : "hidden"});

                        self.checkTrade();
                    }
                });
                
                //remove hundred block
                try {
                    self.layer.removeChild(self.filledHundreds[index].el);
                } catch {
                    gsap.set(self.filledHundreds[index].el, {visibility : "hidden"});
                }
                self.filledHundreds[index] = self.blank;

                //Create animation
                var xVal = 144 + (index % 3) * 94
                var yVal = 120 + ((index  - index % 3) / 3) * 128

                //create 10 tens in the position of the hundred
                for (var i = 9; i >= 0; i--) {
                    var temp = self.tensRef.cloneNode(true);
                    gsap.set(temp, {x : xVal - 13, y : yVal + 65 + i*8.65, scale : 0.95, visibility : "visible"})
                    self.layer.appendChild(temp);
                    tempArr.push(temp);
                }

                //move the tens to each tens position
                var count = 0;
                tempArr.forEach(temp => {
                    self.tl.to(temp, {x : 491, y : 178 + count * 51.5 , scale : 1}, "<=0.2");
                    count++;
                })
                count++;
                
                self.tl.play();

                //NO ANIMATION VERSION:
                /*
                for (var i = 0; i < 10; i++) {
                    self.fillBlock(i, 491, 178 + i * 51.5 , 10);
                }

                var index = self.findLastFilled(self.filledHundreds);
                try {
                    self.layer.removeChild(self.filledHundreds[index].el);
                } catch {
                    gsap.set(self.filledHundreds[index].el, {visibility : "hidden"});
                }
                self.filledHundreds[index] = blank;

                self.numHundreds -= 1;
                self.totalNum -= 100;
                self.updateText()
                gsap.set(self.hundredToTensArrow, {visibility : "hidden"});

                self.checkTrade();
                */

            });
            
            //10 Ones --> 1 Ten
            gsap.set(self.onesToTenArrow, {visibility : "hidden"});
            self.onesToTenArrow.addEventListener('click', function() {
                var tempArr = [];
                var index = self.findFirstBlank(self.filledTens);

                //Initialize timeline
                self.tl = gsap.timeline({paused : true,
                    onComplete : () => {
                        //draw ten block
                        self.fillBlock(index, xVal, yVal , 10);

                        //remove animated ones
                        tempArr.forEach(temp => {
                            self.layer.removeChild(temp);
                        });

                        //reset values
                        self.filledOnes = [self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank]
                        self.numOnes = 0;
                        self.totalNum -= 10;
                        self.updateText()
                        gsap.set(self.onesToTenArrow, {visibility : "hidden"});

                        self.checkTrade();

                    }
                });
                
                //Create animation
                var xVal = 491
                var yVal = 178 + index * 51.5
            
                //Replace all ones with animating blocks (so the event listener is removed)
                self.filledOnes.forEach(block => {
                    var temp = self.onesRef.cloneNode(true);
                    gsap.set(temp, {x : block.x, y : block.y, visibility : "visible"})
                    self.layer.appendChild(temp);
                    self.layer.removeChild(block.el);
                    tempArr.push(temp);
                });

                self.redrawElements(tempArr);

                //Animate ones to the ten's position
                var onesIndex = 0;
                tempArr.forEach(temp => {
                    self.tl.to(temp, {x : xVal +2.5  + onesIndex*9, y : yVal + 4.2, scale : 0.85}, "<=0.15"); 
                    onesIndex++;
                })

                self.tl.play();

                //NO ANIMATION VERSION: 
                /*
                index = self.findFirstBlank(self.filledTens);
                self.fillBlock(index, 491, 178 + index * 51.5 , 10);

                self.filledOnes.forEach(block => {
                    try {
                        self.layer.removeChild(block.el);
                    } catch {
                        gsap.set(block.el, {visibility : "hidden"});                    
                    }
                });
                
                self.filledOnes = [self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank,self.blank]
                self.numOnes = 0;
                self.totalNum -= 10;
                self.updateText()
                gsap.set(self.onesToTenArrow, {visibility : "hidden"});

                self.checkTrade();
                */
                
            }); 

            //1 Ten --> 10 Ones
            gsap.set(self.tenToOnesArrow, {visibility : "hidden"});
            self.tenToOnesArrow.addEventListener('click', function() {
                var tempArr = [];
                var index = self.findLastFilled(self.filledTens);

                //Initialize timeline
                self.tl = gsap.timeline({paused : true,
                    onComplete : () => {
                        //fill ones 
                        for (var i = 0; i < 10; i++) {
                            self.fillBlock(i, 679.7 + (i % 2) * 75,222 + ((i  - i % 2) / 2) * 100 , 1);
                        }

                        //remove animated ones
                        tempArr.forEach(temp => {
                            self.layer.removeChild(temp);
                        }); 

                        //reset values
                        self.numTens -= 1;
                        self.totalNum -= 10;
                        self.updateText()
                        gsap.set(self.onesToTenArrow, {visibility : "hidden"});

                        self.checkTrade();
                    }
                });

                //remove ten block
                try {
                    self.layer.removeChild(self.filledTens[index].el);
                } catch {
                    gsap.set(self.filledTens[index].el, {visibility : "hidden"});
                }
                self.filledTens[index] = self.blank;

                //Create animation

                //create ones to animation with in the position of a ten
                for (var i = 9; i >= 0; i--) {
                    var temp = self.onesRef.cloneNode(true);
                    gsap.set(temp, {x : 491 +2.5 + i*9, y : 178 + 4.2 + index * 51.5, scale : 0.85, visibility : "visible"})
                    self.layer.appendChild(temp);
                    tempArr.push(temp);
                }

                //animate to the ones' positions
                var count = 0;
                tempArr.forEach(temp => {
                    self.tl.to(temp, {x : 679.7 + (count % 2) * 75, y : 222 + ((count  - count % 2) / 2) * 100, scale : 1}, "<=0.2");
                    count++;
                })
                count++;
                
                self.tl.play();

                //NO ANIMATION VERSION: 
                /*
                for (var i = 0; i < 10; i++) {
                    self.fillBlock(i, 679.7 + (i % 2) * 75,222 + ((i  - i % 2) / 2) * 100 , 1);
                }

                var index = self.findLastFilled(self.filledTens);
                try {
                    self.layer.removeChild(self.filledTens[index].el);
                } catch {
                    gsap.set(self.filledTens[index].el, {visibility : "hidden"});
                }
                self.filledTens[index] = blank;

                self.numTens -= 1;
                self.totalNum -= 10;
                self.updateText()
                gsap.set(self.onesToTenArrow, {visibility : "hidden"});

                self.checkTrade();
                */
            });
        }

        /** Set up for the hundreds chart with trading arrows */
        hundredArrowsSetup() {
            this.updateText()
            this.restartBtn.addEventListener('click', function() {self.clear()});

            //draw blank hundreds
            var hundredCoords = this.gridCoords(0, 0, 94, 128,4,3);
            this.addBlankBlocks(hundredCoords, 100);

            this.blankHundreds.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 144 + (block.num % 3) * 94, 120 + ((block.num  - block.num % 3) / 3) * 128 , 100);
                })
            }) 

            //draw blank tens
            var tenCoords = this.colCoords(0, 0, 51.5, 10);
            this.addBlankBlocks(tenCoords, 10);

            this.blankTens.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 491, 178 + block.num * 51.5 , 10);
                })
            })

            //draw blank ones
            var oneCoords = this.gridCoords(118, 0, 75, 100,5,2);
            this.addBlankBlocks(oneCoords, 1);

            this.blankOnes.forEach(block => {
                (block.el).addEventListener('click', function() {
                    self.fillBlock(block.num, 679.7 + (block.num % 2) * 75,222 + ((block.num  - block.num % 2) / 2) * 100 , 1);
                })
            })
        }
        
        /** MAIN Set up  */
        main() {
            if (this.setup.version == "arrowsHundredsChart") {
                self.textXVal = 35;
                self.arrowSetup();
                self.hundredArrowsSetup()
            }
            //TO DO : ADD VERSIONS FOR THE THOUSANDS AND DECIMAL CHARTS
        }
        
    }
    return new blocksClass(_els, _setup);
}

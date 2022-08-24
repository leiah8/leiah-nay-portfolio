import { gsap } from "gsap/all";


export interface blocksSetup {
}

interface tenth {
    el : Node 
    num : number
    on : boolean
    activated : boolean
}


interface pos {
    x : number
    y : number
}

export function blocksAPI(_els, _setup) {
    let self = {} as blocksClass

    class blocksClass {
        els : SVGSVGElement | null;
        setup : blocksSetup;

        svgns : string

        refToOutline : HTMLElement;
        refToFillRect : HTMLElement;
        restart : HTMLElement;
        addBtn : HTMLElement;
        frontLayer : HTMLElement;
        backLayer : HTMLElement;

        txt : HTMLElement;

        totalTenths : number;

        filledTenths : tenth[];

        additionalOutlines : Node[] ;

        outlineCoords : pos[];
        outlinesIndex : number;

        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup

            this.svgns = "http://www.w3.org/2000/svg";


            this.refToOutline = document.getElementById("outline") as HTMLElement;
            this.refToFillRect = document.getElementById("fillRect") as HTMLElement;
            this.restart = document.getElementById("restart") as HTMLElement;
            this.addBtn = document.getElementById("add") as HTMLElement;
            this.frontLayer = document.getElementById("layer2") as HTMLElement;
            this.backLayer = document.getElementById("layer1") as HTMLElement;

            this.txt = document.getElementById("innerTxt") as HTMLElement



            this.totalTenths = 0;

            this.filledTenths = [];
            this.additionalOutlines = [];

            this.outlineCoords = this.gridCoords(323, 356.5, 198, 210, 2, 3);
            this.outlinesIndex = 0;

            this.main();


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

        updateText() {

            this.txt.textContent = String((this.totalTenths - (this.totalTenths % 10)) / 10) + "." + String(this.totalTenths % 10);

            //CENTRE TEXT
            gsap.set(this.txt, {x : 40 -(self.txt.getClientRects()[0].width / 2)});

            
        }

        clear() {
            self.filledTenths.forEach(tenth => {
                try {
                    self.backLayer.removeChild(tenth.el);
                }
                catch {
                    gsap.set(tenth.el, {visibility : "hidden"});
                }
            });

            self.filledTenths = [];

            self.additionalOutlines.forEach(el => {
                try {
                    self.frontLayer.removeChild(el);
                }
                catch {
                    gsap.set(el, {visibility : "hidden"});
                }
            })

            self.additionalOutlines = [];

            self.outlinesIndex = 0;

            self.totalTenths = 0;

            self.updateText();
        }

        activateTenths(){
            this.filledTenths.forEach(tenth => {
                if (tenth.activated == false) {

                    tenth.el.addEventListener('click', function() {
                        if (tenth.on == true) {
                            gsap.set(tenth.el, {fill : "#ffffff"});
                            tenth.on = false;
                            self.totalTenths--;
                        }
                        else if (tenth.on == false) {
                            gsap.set(tenth.el, {fill : "#4285f4"});
                            tenth.on = true;
                            self.totalTenths++;
                        }
                        

                        

                        self.updateText();
                    })

                    tenth.activated = true;
                }
                
            })
        }

        main() {

            this.updateText();

            this.restart.addEventListener('click', function() {
                self.clear();
            })

            this.addBtn.addEventListener('click', function() {
                if (self.outlinesIndex < 6) {
                    
                    var tempOutline = self.refToOutline.cloneNode(true);
                    gsap.set(tempOutline, {x : self.outlineCoords[self.outlinesIndex].x, 
                        y : self.outlineCoords[self.outlinesIndex].y});
                    self.frontLayer.appendChild(tempOutline);
                    self.additionalOutlines.push(tempOutline)
                    
                    var xVal = -281

                    for (var i = 0; i < 10; i++) {
                        var temp = self.refToFillRect.cloneNode(true);
                        gsap.set(temp, { x : self.outlineCoords[self.outlinesIndex].x + xVal, 
                            y : self.outlineCoords[self.outlinesIndex].y - 208.5, 
                            fill : "#ffffff"});
                        self.backLayer.appendChild(temp);

                        self.filledTenths.push({el : temp, num : i + 10 * self.outlinesIndex, on : false, activated : false});
                        xVal += 15.51
                    }

                    self.activateTenths();

                    self.outlinesIndex++;
                }
            });


            /*
            
            this.outlineCoords.forEach(c => {
                var tempOutline = self.refToOutline.cloneNode(true);
                gsap.set(tempOutline, {x : c.x, y : c.y});
                this.frontLayer.appendChild(tempOutline);

                var xVal = 64
                for (var i = 0; i < 10; i++) {
                    var temp = self.refToFillRect.cloneNode(true);
                    gsap.set(temp, {x : c.x + xVal, y : c.y - 208.5, fill : "#ffffff"});
                    this.backLayer.appendChild(temp);

                    xVal += 15.4
                }

            }) 
            */
            
            

        }
    }

    return new blocksClass(_els, _setup);
}

import { gsap } from "gsap/all";


export interface blocksSetup {
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

        refToOutline : HTMLElement;
        restart : HTMLElement;
        addBtn : HTMLElement;
        frontLayer : HTMLElement;
        backLayer : HTMLElement;

        totalOnes : number;
        totalTenths : number;

        filledTenths : HTMLElement[];

        additionalOutlines : Node[] ;

        outlineCoords : pos[];
        outlinesIndex : number;

        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup

            this.refToOutline = document.getElementById("outline") as HTMLElement;
            this.restart = document.getElementById("restart") as HTMLElement;
            this.addBtn = document.getElementById("add") as HTMLElement;
            this.frontLayer = document.getElementById("layer2") as HTMLElement;
            this.backLayer = document.getElementById("layer1") as HTMLElement;


            this.totalOnes = 0;
            this.totalTenths = 0;

            this.filledTenths = [];
            this.additionalOutlines = [];

            this.outlineCoords = this.gridCoords(-21, 356.5, 198, 210, 2, 3);
            this.outlinesIndex = 1;

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

        main() {

            this.outlineCoords.forEach(c => {
                var temp = self.refToOutline.cloneNode(true);
                gsap.set(temp, {x : c.x, y : c.y});
                this.frontLayer.appendChild(temp);

                

            }) 

        }
    }

    return new blocksClass(_els, _setup);
}

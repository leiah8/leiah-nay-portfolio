import { gsap } from "gsap/all";
import { Draggable } from "gsap/Draggable";


export interface gameSetup {
  sunPos: string
  moonPos: string
  planetPos: string
}

interface filled {
  el: Node
  num: number
  on: boolean
}

interface blank {
  el: Node
  num: number
}

interface pos {
  x: number
  y: number
}

export function gameAPI(_els, _setup) {
  let self = {} as gameClass

  class gameClass {
    els: SVGSVGElement | null;
    setup: gameSetup;
    svgns: string

    sunPosLst: pos[];
    moonPosLst: pos[];
    planetPosLst: pos[];

    sunTargetNum: number;
    moonTargetNum: number;
    planetTargetNum: number;

    meteor: HTMLElement;
    moon: HTMLElement;
    planet: HTMLElement;
    sun: HTMLElement;
    layer: HTMLElement;
    layer0: HTMLElement;
    covers: HTMLElement;

    totalNum: number;
    filledMeteors: filled[];
    blankMeteors: blank[];

    sunArr: Node[];
    moonArr: Node[];
    planetArr: Node[];

    tl: any;

    /*
    sunCoords = this.getColCoords(2, 180, -200, 60);
    planetCoords = (this.getColCoords(5, 200, -90, 30)).concat(this.getColCoords(4, 230, -90, 30));
    moonCoords = this.getColCoords(9, 140, -15, 15);

    */
    asteroidColCoords = this.getColCoords(10, 9, -160, 10).reverse();
    

    sunCoords = this.getRowCoords(1, 190, -110, 60);
    planetCoords = this.getRowCoords(5, 180, 30, 30).concat(this.getRowCoords(4, 180, 5, 30));
    moonCoords = this.getRowCoords(9, 160, 100, 15);

    coordsM = this.getGridCoords(-101.4, -70.5, 10, 10, 10);

    constructor(els, setup) {
      self = this
      this.els = els
      this.setup = setup
      this.svgns = "http://www.w3.org/2000/svg"

      this.sunPosLst = this.strToPosLst(this.setup.sunPos)
      this.moonPosLst = this.strToPosLst(this.setup.moonPos)
      this.planetPosLst = this.strToPosLst(this.setup.planetPos)

      //((this.setup.planetPos).split(";")).map(x => this.strToPos(x));

      this.sunTargetNum = this.sunPosLst.length
      this.moonTargetNum = this.moonPosLst.length
      this.planetTargetNum = this.planetPosLst.length

      this.meteor = document.getElementById("meteor") as HTMLElement
      this.moon = document.getElementById("moon") as HTMLElement
      this.planet = document.getElementById("planet") as HTMLElement
      this.sun = document.getElementById("sun") as HTMLElement
      this.layer = document.getElementById("layer1") as HTMLElement
      this.layer0 = document.getElementById("layer3") as HTMLElement
      this.covers = document.getElementById("coverBtns") as HTMLElement

      this.totalNum = 0
      this.filledMeteors = []
      this.blankMeteors = []

      this.sunArr = []
      this.moonArr = []
      this.planetArr = []

      this.tl = gsap.timeline()

      this.main()
    }

    strToPos(s) {
      //x,y
      var strLst = s.split(',');
      return { x: Number(strLst[0]), y: Number(strLst[1]) };
    }

    strToPosLst(strPos) {
      if (strPos == "") return [];
      var arr = (strPos.split(";")).map(x => this.strToPos(x));
      var n = arr.length;

      //sort list by x position (bubble sort)
      for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
          if (arr[j].x > arr[j + 1].x) {
            //swap
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      return arr;
    }

    getColCoords(numRows, newX, newY, delta) {
      var col: pos[] = [];
      for (var i = 0; i < numRows; i++) {
        col.push({ x: newX, y: newY + i * delta });
      }
      return col;
    }

    getRowCoords(numCols, newX, newY, delta) {
      var col: pos[] = [];
      for (var i = 0; i < numCols; i++) {
        col.push({ x: newX + i * delta, y: newY });
      }
      return col;
    }

    getGridCoords(newX, newY, numRows, numCols, delta) {
      var coords: pos[] = [];
      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
          coords.push({ x: newX + j * delta, y: newY + i * -delta });
        }
      }
      return coords;
    }

    pausePlay() {
      if (self.tl.isActive())
        self.tl.pause();
      else if (self.tl.paused())
        self.tl.play();
    }

    fill(num, filledRects) {

      if (!(this.tl.isActive() || this.tl.paused())) {
        if (num > 100) this.totalNum = 100;
        else if (num < 0) this.totalNum = 0;
        else this.totalNum = num;

        var index = 0;
        filledRects.forEach(obj => {
          if (obj.on == false && index < this.totalNum) {
            gsap.set(filledRects[index].el, { visibility: "visible" });
            obj.on = true;
          }
          else if (obj.on == true && index >= this.totalNum) {
            gsap.set(filledRects[index].el, { visibility: "hidden" });
            obj.on = false;
          }

          index++;
        });
      }
    }

    main() {
      gsap.set(this.covers, { visibility: "hidden" });

      // ARROWS ///////////////////
      const up = document.getElementById("up") as HTMLElement;
      const down = document.getElementById("down") as HTMLElement;
      const left = document.getElementById("left") as HTMLElement;
      const right = document.getElementById("right") as HTMLElement;

      up.addEventListener('click', function () { self.fill(self.totalNum + 10, self.filledMeteors) });
      down.addEventListener('click', function () { self.fill(self.totalNum - 10, self.filledMeteors) });
      left.addEventListener('click', function () { self.fill(self.totalNum - 1, self.filledMeteors) });
      right.addEventListener('click', function () { self.fill(self.totalNum + 1, self.filledMeteors) });

      const start = document.getElementById("startBtn") as HTMLElement;
      start.addEventListener('click', function () {
        self.play();
      });

      const clearBtn = document.getElementById("clearBtn") as HTMLElement;
      clearBtn.addEventListener('click', function () { self.clear() });

      // BLOCKS //////////////////
      const blankMeteor = document.getElementById("blank-meteor-0") as HTMLElement;

      //meteors///////////////////
      var index = 0;
      this.coordsM.forEach(c => {
        var temp = blankMeteor.cloneNode(true);
        gsap.set(temp, { x: c.x, y: c.y });
        this.blankMeteors.push({ el: temp, num: index });
        this.layer.appendChild(temp);

        index++;
      });

      this.blankMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function () {
          self.fill(obj.num + 1, self.filledMeteors);
        });
      });

      index = 0;
      this.coordsM.forEach(c => {
        var temp = self.meteor.cloneNode(true);
        gsap.set(temp, { x: c.x - 9.13, y: c.y - 0.2, visibility: "hidden" });
        self.filledMeteors.push({ el: temp, num: index, on: false });
        self.layer.appendChild(temp);
        index++;
      });

      this.filledMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function () {
          self.fill(obj.num + 1, self.filledMeteors);
        });
      });

      blankMeteor.setAttribute("visibility", "hidden");

      //add targets 

      //CHANGE TO PROPER TARGET IMG 
      this.sunPosLst.forEach(p => {
        let circ = document.createElementNS(this.svgns, "ellipse")
        gsap.set(circ, { attr: { cx: p.x, cy: p.y, rx: 21, ry: 21, stroke: "#ffffff" }, strokeWidth: 1.5, fill: "none" });
        this.layer0.appendChild(circ);
      });

      var targetPlanet = document.getElementById("targetPlanet");

      this.planetPosLst.forEach(p => {
        //let circ = document.createElementNS(this.svgns, "ellipse")
        //gsap.set(circ, { attr: { cx: p.x, cy: p.y, rx: 10, ry: 10, stroke: "#ffffff" }, strokeWidth: 2, fill: "none" });
        //this.layer0.appendChild(circ);
        var temp = targetPlanet.cloneNode(true);
        gsap.set(targetPlanet, {x : p.x - 102.9, y : p.y - 10.9, scale : 0.87});
        this.layer0.appendChild(temp);
      });

      this.moonPosLst.forEach(p => {
        let circ = document.createElementNS(this.svgns, "ellipse")
        gsap.set(circ, { attr: { cx: p.x, cy: p.y, rx: 5, ry: 5, stroke: "#ffffff" }, strokeWidth: 1.5, fill: "none" });
        this.layer0.appendChild(circ);
      });


    }

    play() {

      this.clear();

      this.tl = gsap.timeline({
        onStart: () => {
          document.addEventListener('click', self.pausePlay);
        },
        onComplete: () => {
          document.removeEventListener('click', self.pausePlay);

          var t1 = gsap.timeline();

          if (numSuns*100 + numPlanets*10 + numMoons == this.sunTargetNum*100 + this.planetTargetNum*10 + this.moonTargetNum){
            //correct
            window.alert("Well Done!");
          }
          else if (numSuns*100 + numPlanets*10 + numMoons > this.sunTargetNum*100 + this.planetTargetNum*10 + this.moonTargetNum){
            //try again, too many meteors
            window.alert("Try Again");

          }
          else {
            //try again, not enough meteors
            window.alert("Try Again");
          }

        }
      });

      var meteorArr: Node[] = [];

      for (var i = 0; i < this.totalNum; i++) {
        var temp = this.meteor.cloneNode(true);
        gsap.set(temp, { x: this.coordsM[i].x - 9.13, y: this.coordsM[i].y - 0.2 });
        meteorArr.push(temp);
        this.layer.appendChild(temp);

        gsap.set(this.filledMeteors[i].el, { visibility: "hidden" });
        this.filledMeteors[i].on = false;
      }

      var numSuns = Math.floor(this.totalNum / 100);
      this.totalNum -= numSuns * 100;

      var numPlanets = Math.floor(this.totalNum / 10);
      this.totalNum -= numPlanets * 10;

      var numMoons = this.totalNum;

      var moonIndex = 0;

      var meteorPortalX = 40;
      var meteorPortalY = -115;

      var planetPortalX = 142;
      var planetPortalY = -40;


      //grey out 
      this.blankMeteors.forEach(obj => {
        this.tl.to(obj.el, { opacity: 0.5, duration: 0 });
      });

      this.tl.to(this.covers, { visibility: "visible", duration: 0 });
      this.tl.to(this.meteor, { duration: 0.5 });

      if (numSuns > 0) {
        for (var i = 0; i < numSuns; i++) {
          this.tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 });
          moonIndex++;
          for (var j = 1; j < 100; j++) {
            this.tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 }, "<+=0.0001");
            moonIndex++;
          }
          var tempSun = this.sun.cloneNode(true);
          gsap.set(tempSun, { x: 50, y: -160, scale: 0 });
          this.layer0.appendChild(tempSun);
          this.sunArr.push(tempSun);

          this.tl.to(tempSun, { duration: 0.25 });
          if (i < this.sunTargetNum) {
            //this.tl.to(tempSun, {x : this.sunCoords[i].x, y : this.sunCoords[i].y, scale : 4, duration : 1}); //SCALE 1 NOT WORKING
            this.tl.to(tempSun, { x: this.sunPosLst[i].x - 129.8, y: this.sunPosLst[i].y - 240.5, scale: 4, duration: 1 }); //SCALE 1 NOT WORKING
          }
          else {
            this.tl.to(tempSun, { x: this.sunCoords[i - this.sunTargetNum].x, y: this.sunCoords[i - this.sunTargetNum].y, scale: 4, duration: 1 }); //SCALE 1 NOT WORKING
          }
          this.tl.to(tempSun, { duration: 0.25 });
        }
      }

      if (numPlanets > 0) {
        for (var i = 0; i < numPlanets; i++) {
          this.tl.to(meteorArr[moonIndex], { x: this.asteroidColCoords[0].x, y: this.asteroidColCoords[0].y, duration: 1 });
          moonIndex++;
          for (var j = 1; j < 10; j++) {
            this.tl.to(meteorArr[moonIndex], { x: this.asteroidColCoords[j].x, y: this.asteroidColCoords[j].y, duration: 1 }, "<+=0.0001");
            moonIndex++;
          }

          moonIndex -= 10;
          this.tl.to(this.meteor, { duration: 0.001 });

          for (var j = 0; j < 10; j++) {
            this.tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 }, "<+=0.15");
            moonIndex++;
          }

          var tempPlanet = this.planet.cloneNode(true);
          gsap.set(tempPlanet, { x: planetPortalX, y: planetPortalY, scale: 0 });
          this.layer0.appendChild(tempPlanet);
          this.planetArr.push(tempPlanet);

          this.tl.to(tempPlanet, { duration: 0.25 });
          if (i < this.planetTargetNum) {
            //this.tl.to(tempPlanet, {x : this.planetCoords[i].x, y : this.planetCoords[i].y, scale : 0.8, duration : 1}); //SCALE 1 NOT WORKING
            this.tl.to(tempPlanet, { x: this.planetPosLst[i].x - 30.2, y: this.planetPosLst[i].y - 111.7, scale: 0.8, duration: 1 }); //SCALE 1 NOT WORKING
          }
          else {
            this.tl.to(tempPlanet, { x: this.planetCoords[i - this.planetTargetNum].x, y: this.planetCoords[i - this.planetTargetNum].y, scale: 0.8, duration: 1 }); //SCALE 1 NOT WORKING
          }
          this.tl.to(tempPlanet, { duration: 0.25 });
        }

      }

      if (numMoons > 0) {
        for (var i = 0; i < numMoons; i++) {
          this.tl.to(meteorArr[moonIndex], { x: meteorPortalX - 20, y: meteorPortalY, duration: 1 });
          this.tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY + 3, scale: 0, duration: 0.5 });
          moonIndex++;

          var tempMoon = this.moon.cloneNode(true);
          gsap.set(tempMoon, { x: 115, y: 14, scale: 0 });

          this.layer0.appendChild(tempMoon);
          this.moonArr.push(tempMoon);

          this.tl.to(tempMoon, { duration: 0.25 });
          if (i < this.moonTargetNum) {
            //this.tl.to(tempMoon, {x : this.moonCoords[i].x, y : this.moonCoords[i].y, scale : 0.55, duration : 1}); //SCALE 1 NOT WORKING
            this.tl.to(tempMoon, { x: this.moonPosLst[i].x - 54.1, y: this.moonPosLst[i].y - 49.05, scale: 0.55, duration: 1 }); //SCALE 1 NOT WORKING
          }
          else {
            this.tl.to(tempMoon, { x: this.moonCoords[i - this.moonTargetNum].x, y: this.moonCoords[i - this.moonTargetNum].y, scale: 0.55, duration: 1 }); //SCALE 1 NOT WORKING
          }
          this.tl.to(tempMoon, { duration: 0.25 });
        }

      }
      //go back 
      this.blankMeteors.forEach(obj => {
        this.tl.to(obj.el, { opacity: 1, duration: 0 });
      });

      this.tl.to(this.covers, { visibility: "hidden", duration: 0 });
      this.tl.play();

      this.totalNum = 0;

      gsap.registerPlugin(Draggable);

      this.sunArr.forEach(el => {
        Draggable.create(el);
      })

      this.planetArr.forEach(el => {
        Draggable.create(el);
      })

      this.moonArr.forEach(el => {
        Draggable.create(el);
      })

      //check answer 
      //if (numSuns == this.sunTargetNum && numMoons == this.moonTargetNum && numPlanets == this.planetTargetNum){


    }

    clear() {
      this.sunArr.forEach(el => {
        //el.remove();
        gsap.set(el, { visibility: "hidden" });
      })
      this.sunArr = [];

      this.planetArr.forEach(el => {
        //el.remove();
        gsap.set(el, { visibility: "hidden" });
      })
      this.planetArr = [];

      this.moonArr.forEach(el => {
        //el.remove();
        gsap.set(el, { visibility: "hidden" });
      })
      this.moonArr = [];
    }

  }
  return new gameClass(_els, _setup);
}

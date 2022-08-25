import { gsap } from "gsap/all";
import { Draggable } from "gsap/Draggable";

export interface moonFactorySetup {
}

/** Keeps track of filled meteors in the input array */
interface filled {
    el : Node
    num : number
    on : boolean
}

/** Keeps track of blank meteors in the input array */
interface blank {
    el : Node
    num : number
}

interface pos {
    x : number
    y : number
}

export function moonFactoryAPI(_els, _setup) {
    let self = {} as moonFactoryClass

    class moonFactoryClass {
        els : SVGSVGElement | null;
        setup : moonFactorySetup;

        //element references 
        meteor : HTMLElement; 
        moon : HTMLElement; 
        planet : HTMLElement; 
        sun : HTMLElement; 
        layer : HTMLElement; 
        layer0 : HTMLElement; 
        covers : HTMLElement; 

        totalNum : number;

        //arrays to track input values
        filledMeteors : filled[];
        blankMeteors : blank[];

        //array to hold all output elements
        spaceArr : Node[];

        tl : any;

        //coordinates of output elements
        sunCoords = this.getColCoords(2, 180, -200, 60);
        planetCoords = (this.getColCoords(5, 200, -90, 30)).concat(this.getColCoords(4, 230, -90, 30));
        moonCoords = this.getColCoords(9, 140, -15, 15);

        //column coordinates of asteroids before they go through the portal
        asteroidColCoords = this.getColCoords(10, 9, -160, 10).reverse();

        //coordinates of input meteors
        coordsM = this.getGridCoords(-101.4, -65.5, 10, 10, 10);
        
        constructor(els, setup) {
          self = this
          this.els = els
          this.setup = setup

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

          this.spaceArr = []

          this.tl = gsap.timeline()

          this.main()
        }

        /**Outputs an array of coordinates for 'numRows' elements as a column 
         * at (newX, newY) with a vertical difference of 'delta'*/
        getColCoords(numRows, newX, newY, delta) {
          var col : pos[] = [];
          for(var i = 0; i < numRows; i++) {
              col.push({x : newX, y : newY + i*delta});
          }
          return col;
        }
        
        /**Outputs an array of coordinates for a 'numRows' by 'numCols' grid 
         * at (newX, newY) with 'delta' units between each element*/
        getGridCoords(newX, newY, numRows, numCols, delta) {
          var coords : pos[] = [];
          for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
              coords.push({x : newX + j * delta, y : newY + i * -delta});
            }
          }
          return coords;
        }

        /** Toggles the pause and play */
        pausePlay() {
          if (self.tl.isActive())
            self.tl.pause();
          else if (self.tl.paused()) 
            self.tl.play();
        }
          
        /**Fills the given 'num' of elements in the 'filledRects' array */
        fill(num, filledRects){
          
          //check if animation is playing or paused
          if (!(this.tl.isActive() || this.tl.paused())) {

            //ensure num is within the bounds of 0 < num < 100
            //and update the totalNum
            if (num > 100) this.totalNum = 100;
            else if (num < 0) this.totalNum = 0;
            else this.totalNum = num;
            
            //fill elements that are not yet filled
            var index = 0;
            filledRects.forEach(obj => {
              if (obj.on == false && index < this.totalNum) {
                gsap.set(filledRects[index].el, {visibility : "visible"});
                obj.on = true;
              }
              else if (obj.on == true && index >= this.totalNum) {
                gsap.set(filledRects[index].el, {visibility : "hidden"});
                obj.on = false;
              }
              index++;
            });
          }
        }
        
        /** MAIN SET UP */
        main() {

          //SET UP ELEMENTS
          gsap.set(this.covers, {visibility : "hidden"});
        
          // ARROWS //
          const up = document.getElementById("up") as HTMLElement;
          const down = document.getElementById("down") as HTMLElement;
          const left = document.getElementById("left") as HTMLElement;
          const right = document.getElementById("right") as HTMLElement;
      
          up.addEventListener('click', function(){self.fill(self.totalNum + 10, self.filledMeteors)});
          down.addEventListener('click', function(){self.fill(self.totalNum - 10, self.filledMeteors)});
          left.addEventListener('click', function(){self.fill(self.totalNum - 1, self.filledMeteors)});
          right.addEventListener('click', function(){self.fill(self.totalNum + 1, self.filledMeteors)});
          
          // BUTTONS //
          const start = document.getElementById("startBtn") as HTMLElement;
          start.addEventListener('click', function() {
            self.play();
          });
        
          const clearBtn = document.getElementById("clearBtn") as HTMLElement;
          clearBtn.addEventListener('click', function() {self.clear()});
          
          // INPUT ELEMENTS //
          const blankMeteor = document.getElementById("blank-meteor-0") as HTMLElement;
          
          //draw blank input meteors
          var index = 0;
          this.coordsM.forEach(c => {
              var temp = blankMeteor.cloneNode(true);
              gsap.set(temp, {x : c.x, y : c.y});
              this.blankMeteors.push({el : temp, num : index});
              this.layer.appendChild(temp);
      
              index++;
          });
          
          this.blankMeteors.forEach(obj => {
              (obj.el).addEventListener('click', function() {
                self.fill(obj.num + 1, self.filledMeteors);
              });
          }); 

          // draw filled meteors and set all to 'hidden'
          index = 0;
          this.coordsM.forEach(c => {
            var temp = self.meteor.cloneNode(true);
            gsap.set(temp, {x : c.x - 9.13, y : c.y - 0.2, visibility : "hidden"});
            self.filledMeteors.push({el : temp, num : index, on : false});
            self.layer.appendChild(temp);
            index++;
          });
        
          this.filledMeteors.forEach(obj => {
            (obj.el).addEventListener('click', function() {
              self.fill(obj.num + 1, self.filledMeteors);
            });
        }); 
        
        blankMeteor.setAttribute("visibility", "hidden");
      }
      
      /**Set up and play the animation*/
      play() {
        
        //create timeline that toggles the ability to pause
        this.tl = gsap.timeline({
          onStart : () => {
            document.addEventListener('click', self.pausePlay);
          }, 
          onComplete : () => {
            document.removeEventListener('click', self.pausePlay);
          }
        });
        
        var meteorArr : Node[] = [];
        
        //create input asteroids and set asteroids in 'filledMeteors' array back to hidden
        for(var i = 0; i < this.totalNum; i++) {
          var temp = this.meteor.cloneNode(true);
          gsap.set(temp, {x : this.coordsM[i].x - 9.13, y : this.coordsM[i].y - 0.2});
          meteorArr.push(temp);
          this.layer.appendChild(temp);
      
          gsap.set(this.filledMeteors[i].el, {visibility : "hidden"});
          this.filledMeteors[i].on = false;
        }
        
        //determine the number of suns, planets, and moons
        var numSuns = Math.floor(this.totalNum / 100);
        this.totalNum -= numSuns*100;
      
        var numPlanets = Math.floor(this.totalNum / 10);
        this.totalNum -= numPlanets*10;
      
        var numMoons = this.totalNum;
        
        //Values for the animation
        var moonIndex = 0;
      
        var meteorPortalX = 40;
        var meteorPortalY = -115;
      
        var planetPortalX = 142;
        var planetPortalY = -40;
          
          
        //grey out blank input meteors (so user knows they cannot input)
        this.blankMeteors.forEach(obj => {
            this.tl.to(obj.el, {opacity : 0.5, duration : 0});
        });
        
        //cover the buttons (so user knows they cannot use them)
        this.tl.to(this.covers, {visibility: "visible", duration : 0});
        this.tl.to(this.meteor, {duration : 0.5});
        
        //animate sun
        if (numSuns > 0) {
          //move all meteors to portal
          for(var i = 0; i < numSuns; i++) {
            this.tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY, scale : 0, duration : 1.5});
              moonIndex++;
              for (var j = 1; j < 100; j++) {
                this.tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY, scale : 0, duration : 1.5}, "<+=0.0001");
                  moonIndex++;
              }
              
              //create and animate sun
              var tempSun = this.sun.cloneNode(true);
              gsap.set(tempSun, {x : 50, y : -160, scale : 0});
              this.layer0.appendChild(tempSun);
              this.spaceArr.push(tempSun);
      
              this.tl.to(tempSun, {duration : 0.25});
              this.tl.to(tempSun, {x : this.sunCoords[i].x, y : this.sunCoords[i].y, scale : 4, duration : 1}); //SCALE 1 NOT WORKING
              this.tl.to(tempSun, {duration : 0.25});
          }
        }
        
        //animate planets
        if (numPlanets > 0) {
          for (var i = 0; i < numPlanets; i++) {

            //move 10 asteroids to the column
            this.tl.to(meteorArr[moonIndex], {x : this.asteroidColCoords[0].x, y : this.asteroidColCoords[0].y, duration : 1});
            moonIndex++;
            for (var j = 1; j < 10; j++) {
              this.tl.to(meteorArr[moonIndex], {x : this.asteroidColCoords[j].x, y : this.asteroidColCoords[j].y, duration : 1}, "<+=0.0001");
              moonIndex++;
            }
            
            //move asteroids into the portal
            moonIndex -= 10;
            this.tl.to(this.meteor, {duration : 0.001});
    
            for(var j = 0; j < 10; j++){
              this.tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY, scale : 0, duration : 1.5}, "<+=0.15" );
              moonIndex++;
            }
            
            //create and animate planet
            var tempPlanet = this.planet.cloneNode(true);
            gsap.set(tempPlanet, {x : planetPortalX, y : planetPortalY, scale : 0});
            this.layer0.appendChild(tempPlanet);
            this.spaceArr.push(tempPlanet);
      
            this.tl.to(tempPlanet, {duration : 0.25});
            this.tl.to(tempPlanet, {x : this.planetCoords[i].x, y : this.planetCoords[i].y, scale : 0.8, duration : 1}); //SCALE 1 NOT WORKING
            this.tl.to(tempPlanet, {duration : 0.25});
          }
      
        }
        
        //animate moons
        if (numMoons > 0) {
          for (var i = 0; i < numMoons; i++) {
            //move asteroid to the portal
            this.tl.to(meteorArr[moonIndex], {x : meteorPortalX - 20, y : meteorPortalY, duration : 1}); 
            this.tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY + 3, scale : 0, duration : 0.5});
            moonIndex++;
            
            //create and animate moon
            var tempMoon = this.moon.cloneNode(true);
            gsap.set(tempMoon, {x : 115, y : 14, scale : 0});
            this.layer0.appendChild(tempMoon);
            this.spaceArr.push(tempMoon);
    
            this.tl.to(tempMoon, {duration : 0.25});
            this.tl.to(tempMoon, {x : this.moonCoords[i].x, y : this.moonCoords[i].y, scale : 0.55, duration : 1}); //SCALE 1 NOT WORKING
            this.tl.to(tempMoon, {duration : 0.25});
          }
      
        }
        
        //set blankMeteors back to normal (user can soon use input)
        this.blankMeteors.forEach(obj => {
            this.tl.to(obj.el, {opacity : 1, duration : 0});
        });
        
        //uncover buttons
        this.tl.to(this.covers, {visibility: "hidden", duration : 0});

        //play animation
        this.tl.play();
        this.totalNum = 0;
        
        //make suns, planets and moons draggable
        gsap.registerPlugin(Draggable);
      
        this.spaceArr.forEach(el => {
          Draggable.create(el);
        })
          
      }
      
      /** Remove all outputted suns, planets, and moons */
      clear() {
          this.spaceArr.forEach(el => {
            gsap.set(el, {visibility : "hidden"});
          })
          this.spaceArr = [];
      }

    }

    return new moonFactoryClass(_els, _setup);
}

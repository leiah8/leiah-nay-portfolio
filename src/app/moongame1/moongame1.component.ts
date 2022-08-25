import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { gameAPI, gameSetup} from "./moonGame1Api";


@Component({
  selector: 'app-moongame1',
  templateUrl: './moongame1.component.html',
  styleUrls: ['./moongame1.component.css']
})
export class Moongame1Component implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  //positions of the target sun, planets, and moons 
  @Input()
  private sunPos : string = "";

  @Input()
  private moonPos : string = "";

  @Input()
  private planetPos : string = "";

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      sunPos : this.sunPos,
      moonPos : this.moonPos,
      planetPos : this.planetPos
    } as gameSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = gameAPI(els, setup);
  }

}
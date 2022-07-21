import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {decomposeNumber, decomposeSetup} from "./decompose-asteroids-API";

@Component({
  selector: 'app-decompose-asteroids',
  templateUrl: './decompose-asteroids.component.html',
  styleUrls: ['./decompose-asteroids.component.css']
})
export class DecomposeAsteroidsComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  @Input()
  private startingNumber: number 

  ngAfterViewInit(): void {
      
    const setup = {
      startingNumber: this.startingNumber
    } as decomposeSetup

    const els = this.renderEl.nativeElement;

    const decompose = decomposeNumber(els, setup)
  

  }

}

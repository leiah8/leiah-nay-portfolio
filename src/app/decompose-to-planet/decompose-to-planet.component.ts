import { Component, ElementRef, Input, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {decomposeNumber,decomposeSetup} from "./decompose"

@Component({
  selector: 'app-decompose-to-planet',
  templateUrl: './decompose-to-planet.component.html',
  styleUrls: ['./decompose-to-planet.component.css']
})
export class DecomposeToPlanetComponent implements AfterViewInit {

  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;
 
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

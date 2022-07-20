import { Component, ElementRef, Input, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {decomposeNumber,decomposeSetup} from "./decompose"

@Component({
  selector: 'app-kh-decompose-number',
  templateUrl: './kh-decompose-number.component.html',
  styleUrls: ['./kh-decompose-number.component.css'],
  encapsulation: ViewEncapsulation.None //https://stackoverflow.com/questions/46403698/css-values-not-applying-on-dynamically-injected-html-div-elements-in-angular-4
})
export class KhDecomposeNumberComponent implements AfterViewInit {
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

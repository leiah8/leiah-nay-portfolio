import { Component, OnInit, AfterViewInit } from '@angular/core';
import { blocksAPI, blocksSetup} from "./tenth-sqaures-api";


@Component({
  selector: 'app-tenth-squares',
  templateUrl: './tenth-squares.component.html',
  styleUrls: ['./tenth-squares.component.css']
})
export class TenthSquaresComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const setup = { } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}

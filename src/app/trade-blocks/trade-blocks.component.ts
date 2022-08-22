import { Component, OnInit , AfterViewInit} from '@angular/core';
import { blocksAPI, blocksSetup} from "./trade-blocks-api";


@Component({
  selector: 'app-trade-blocks',
  templateUrl: './trade-blocks.component.html',
  styleUrls: ['./trade-blocks.component.css']
})
export class TradeBlocksComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : "arrowsHundredsChart"
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}

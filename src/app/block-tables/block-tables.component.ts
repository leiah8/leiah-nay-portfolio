import { Component, OnInit, AfterViewInit } from '@angular/core';
import { blocksAPI, blocksSetup} from "./blocks-api";

@Component({
  selector: 'app-block-tables',
  templateUrl: './block-tables.component.html',
  styleUrls: ['./block-tables.component.css']
})
export class BlockTablesComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : ""
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}


@Component({
  selector: 'app-block-tables',
  templateUrl:  './block-tables.component.html',
  styleUrls: ['./block-tables.component.css']
})
export class HundredsTableComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : "hundredsChart"
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}

@Component({
  selector: 'app-block-tables',
  templateUrl: './1000s-char.componenet.html',
  styleUrls: ['./block-tables.component.css']
})
export class ThousandsTableComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : "thousandsChart"
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }
}

@Component({
  selector: 'app-block-tables',
  templateUrl: './decimal-chart.component.html', 
  styleUrls: ['./block-tables.component.css']
})
export class DecimalTableComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : "decimalsChart"
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}

/*
@Component({
  selector: 'app-block-tables',
  templateUrl: './arrows-100s-chart.component.html' , 
  styleUrls: ['./block-tables.component.css']
})
export class HundredsArrowsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : "arrowsHundredsChart"
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}
*/
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { blocksAPI, blocksSetup} from "./blocks-api";


/*

export class MoonfactoryComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
    } as moonFactorySetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = moonFactoryAPI(els, setup);
  }

}

*/
@Component({
  selector: 'app-block-tables',
  templateUrl: './block-tables.component.html',
  styleUrls: ['./block-tables.component.css']
})
export class BlockTablesComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
    } as blocksSetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}


@Component({
  selector: 'app-block-tables',
  templateUrl: './block-tables.component.html',
  styleUrls: ['./block-tables.component.css']
})
export class HundredsTableComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
  }

}

@Component({
  selector: 'app-block-tables',
  templateUrl: './block-tables.component.html',
  styleUrls: ['./block-tables.component.css']
})
export class ThousandsTableComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
  }

}

@Component({
  selector: 'app-block-tables',
  templateUrl: './block-tables.component.html',
  styleUrls: ['./block-tables.component.css']
})
export class DecimalTableComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
  }

}

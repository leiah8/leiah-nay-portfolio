import { Component, OnInit , Input, AfterViewInit} from '@angular/core';
import { moonFactoryAPI, moonFactorySetup} from "./moonfactoryAPI";


@Component({
  selector: 'app-moonfactory',
  templateUrl: './moonfactory.component.html',
  styleUrls: ['./moonfactory.component.css']
})

export class MoonfactoryComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
    } as moonFactorySetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = moonFactoryAPI(els, setup);

  }

}


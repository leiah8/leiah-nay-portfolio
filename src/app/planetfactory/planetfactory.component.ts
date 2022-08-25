import { Component, OnInit , Input, AfterViewInit} from '@angular/core';
import { planetFactoryAPI, planetFactorySetup} from "./planetFactoryAPI";

@Component({
  selector: 'app-planetfactory',
  templateUrl: './planetfactory.component.html',
  styleUrls: ['./planetfactory.component.css']
})
export class PlanetfactoryComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
    } as planetFactorySetup

    const els = null; //this.renderEl.nativeElement; 
    const interactive = planetFactoryAPI(els, setup);

  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TstDotConnectComponent } from './tst-dot-connect/tst-dot-connect.component';
import { ContainerComponent } from './container/container.component';
import { MoonfactoryComponent } from './moonfactory/moonfactory.component';
import { Moongame1Component } from './moongame1/moongame1.component';
import { PlanetfactoryComponent } from './planetfactory/planetfactory.component';
import { KhDecomposeNumberComponent } from './kh-decompose-number/kh-decompose-number.component';
import { DecomposeAsteroidsComponent } from './decompose-asteroids/decompose-asteroids.component';
import { DecomposeToPlanetComponent } from './decompose-to-planet/decompose-to-planet.component';
import { BlockTablesComponent } from './block-tables/block-tables.component';
import { TradeBlocksComponent } from './trade-blocks/trade-blocks.component';
import { TenthSquaresComponent } from './tenth-squares/tenth-squares.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TstDotConnectComponent,
    ContainerComponent,
    MoonfactoryComponent,
    Moongame1Component,
    PlanetfactoryComponent,
    KhDecomposeNumberComponent,
    DecomposeAsteroidsComponent,
    DecomposeToPlanetComponent,
    BlockTablesComponent,
    TradeBlocksComponent,
    TenthSquaresComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

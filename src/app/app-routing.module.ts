import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { MoonfactoryComponent } from './moonfactory/moonfactory.component';
import { PlanetfactoryComponent } from './planetfactory/planetfactory.component';
import { KhDecomposeNumberComponent } from './kh-decompose-number/kh-decompose-number.component';
import { DecomposeAsteroidsComponent } from './decompose-asteroids/decompose-asteroids.component';
import { DecomposeToPlanetComponent } from './decompose-to-planet/decompose-to-planet.component';
import { HundredsTableComponent, ThousandsTableComponent, DecimalTableComponent} from './block-tables/block-tables.component';
import { TradeBlocksComponent } from './trade-blocks/trade-blocks.component'
import { TenthSquaresComponent } from './tenth-squares/tenth-squares.component'
import { Moongame1Component } from './moongame1/moongame1.component';



const routes: Routes = [
  { path: 'moonGame', component: ContainerComponent },
  { path: 'moonFactory', component: MoonfactoryComponent },
  { path: 'planetFactory', component: PlanetfactoryComponent },
  { path: 'decomposePlanets', component: KhDecomposeNumberComponent },
  { path: 'decomposeAsteroids', component: DecomposeAsteroidsComponent },
  { path: 'decompose', component: DecomposeToPlanetComponent },
  { path: 'hundredBlocks', component: HundredsTableComponent },
  { path: 'thousandBlocks', component: ThousandsTableComponent },
  {path : 'decimalBlocks',  component: DecimalTableComponent },
  {path : 'tradeHundredBlocks',  component: TradeBlocksComponent },
  {path : 'tenthSquares',  component: TenthSquaresComponent },
  {path : 'moonGame1',  component: Moongame1Component },

  //{ path: '', component:  }, //FOR MAIN PAGE
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { MoonfactoryComponent } from './moonfactory/moonfactory.component';
import { PlanetfactoryComponent } from './planetfactory/planetfactory.component';
import { Moongame1Component } from './moongame1/moongame1.component';



const routes: Routes = [
  { path: 'moonGame', component: ContainerComponent },
  { path: 'moonFactory', component: MoonfactoryComponent },
  { path: 'planetFactory', component: PlanetfactoryComponent },
  //{ path: 'moonGame', component: Moongame1Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

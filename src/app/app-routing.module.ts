import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MapComponent} from "./map/map.component";
import {IntroComponent} from "./intro/intro.component";

const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'intro',component: IntroComponent},
  {path:'map',component: MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

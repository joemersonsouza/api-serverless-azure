import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarOverviewComponent } from './pages/car-overview/car-overview.component';


const routes: Routes = [
  {path: '', component: CarOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

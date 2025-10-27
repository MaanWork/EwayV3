import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from '../newpage/newpage.component';

const routes: Routes = [
  {
    path: '',
    component: NewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRouteRoutingModule {}

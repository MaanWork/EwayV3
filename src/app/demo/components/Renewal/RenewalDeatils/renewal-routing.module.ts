import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenewalComponent } from './renewal.component';
import { RenewalDetailsComponent } from './renewal-details/renewal-details.component';

const routes: Routes = [
  {
    path: '',
    component: RenewalComponent,
  },
  {
    path: 'RenewalDetails',
    component: RenewalDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewalRoutingModule {}

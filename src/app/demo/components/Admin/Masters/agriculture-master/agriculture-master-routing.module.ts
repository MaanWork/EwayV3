import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgricultureMasterComponent } from './agriculture-master.component';
import { AgricultureFormComponent } from './agriculture-form/agriculture-form.component';

const routes: Routes = [
  { path: '', component: AgricultureMasterComponent },
  { path: 'agriculture-form', component: AgricultureFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgricultureMasterRoutingModule { }

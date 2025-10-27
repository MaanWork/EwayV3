import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiInterListComponent } from './api-inter-list/api-inter-list.component';
import { ApiInterFormComponent } from './api-inter-form/api-inter-form.component';
import { ApiFlowListComponent } from './api-flow-list/api-flow-list.component';
import { ApiFlowfieldsFormComponent } from './api-flowfields-form/api-flowfields-form.component';

const routes: Routes = [
  {
    path: '',
    component: ApiInterListComponent,
  },
  {
    path: 'new_Api_Integration_Details',
    component:ApiInterFormComponent,
    data: {
      preload: true,
      title: "Api_Integration_Details",
      breadcrumb:  "Api_Integration_Details",
    }
  },
  {
    path: 'flow_field_details',
    component:ApiFlowListComponent,
    data: {
      preload: true,
      title: "flow_field_details",
      breadcrumb:  "flow_field_details",
    }
  },
  {
    path: 'flow_field_details_form',
    component:ApiFlowfieldsFormComponent,
    data: {
      preload: true,
      title: "flow_field_details_form",
      breadcrumb:  "flow_field_details_form",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiInterRoutingModule { 

}
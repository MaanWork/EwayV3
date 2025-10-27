import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationListComponent } from './integration-list.component';
import { IntegrationDetailsComponent } from '../integration-details/integration-details.component';





const routes: Routes = [
  {
    path: '',
    component: IntegrationListComponent ,
  },
  {
    path: 'integrationNewDetails',
    component:IntegrationDetailsComponent,
    data: {
      preload: true,
      title: "Integration Details",
      breadcrumb:  "Integration Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegrationListRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryListComponent } from './query-list/query-list.component';
import { QueryFormComponent } from './query-form/query-form.component';

const routes: Routes = [
  {
    path: '',
    component: QueryListComponent,
  },
  {
    path: 'new_query_Details',
    component: QueryFormComponent,
    data: {
      preload: true,
      title: "new_query_Details",
      breadcrumb: "new_query_Details",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }

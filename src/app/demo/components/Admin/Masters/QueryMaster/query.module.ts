import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { QueryListComponent } from './query-list/query-list.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/_services';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '@app/shared/material/material.module';
import { PipesModule } from '@app/_pipes/pipes.module';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    QueryFormComponent,
    QueryListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MaterialModule,
    PipesModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextareaModule,
    CommonModule,
    QueryRoutingModule
  ]
})
export class QueryModule { }

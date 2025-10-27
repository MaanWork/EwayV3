import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiInterRoutingModule } from './api-inter-routing.module';
import { ApiInterListComponent } from './api-inter-list/api-inter-list.component';
import { ApiInterFormComponent } from './api-inter-form/api-inter-form.component';
import { ApiFlowListComponent } from './api-flow-list/api-flow-list.component';
import { ApiFlowfieldsFormComponent } from './api-flowfields-form/api-flowfields-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/_services';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '@app/shared/material/material.module';
import { PipesModule } from '@app/_pipes/pipes.module';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [
    ApiInterListComponent,
    ApiInterFormComponent,
    ApiFlowListComponent,
    ApiFlowfieldsFormComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
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
    InputTextareaModule,MessagesModule,
    ApiInterRoutingModule,
    
  ]
})
export class ApiInterModule { }

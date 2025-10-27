import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgricultureMasterRoutingModule } from './agriculture-master-routing.module';
import { AgricultureMasterComponent } from './agriculture-master.component';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/_pipes/pipes.module';
import { DirectivesModule } from '@app/_services';
import { MaterialModule } from '@app/shared/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgricultureFormComponent } from './agriculture-form/agriculture-form.component';
@NgModule({
  declarations: [
    AgricultureMasterComponent,
    AgricultureFormComponent
  ],
  imports: [
    CommonModule,
    AgricultureMasterRoutingModule,
    MaterialModule,
    PipesModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
  ]
})
export class AgricultureMasterModule { }

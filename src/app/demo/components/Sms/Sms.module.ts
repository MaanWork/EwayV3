import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SmsComponent } from './Sms.component';
import { SmsRoutingModule } from './Sms-routing.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { MaterialModule } from '@app/shared/material/material.module';
import { PipesModule } from '../../../_pipes/pipes.module';
import { DirectivesModule } from '../../../_services/directives.module';

@NgModule({
  declarations: [
    SmsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    TableModule,
    MaterialModule,
    PipesModule,
    DropdownModule,
    ButtonModule,InputTextModule,
    InputTextareaModule,
    CalendarModule,
    InputTextModule,
    SmsRoutingModule,
    MaterialModule,
    PipesModule,
  ],
  bootstrap: [
    SmsComponent
  ],
  providers: [
    CurrencyPipe,
  ],
})
export class SmsModule { }

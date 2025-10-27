
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { DirectivesModule } from 'src/app/_services/directives.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { IntegrationListRoutingModule } from './integration-list-routing.module';
import { IntegrationListComponent } from './integration-list.component';
import { IntegrationDetailsComponent } from '../integration-details/integration-details.component';






@NgModule({
  declarations: [
    IntegrationListComponent,
    IntegrationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    IntegrationListRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,
    RadioButtonModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    BreadcrumbModule, 
    InputTextareaModule,
  ],
  bootstrap: [],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})
export class IntegrationListModule { }

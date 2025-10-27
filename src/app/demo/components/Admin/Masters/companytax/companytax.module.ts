import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//mport { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { CompanyTaxListComponent } from './companytax.component';
import { CompanyTaxModule } from './companytax-routing.module';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { DirectivesModule } from 'src/app/_services/directives.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
  CompanyTaxListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    CompanyTaxModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [CompanyTaxListComponent],
  providers: [
    CurrencyPipe,

  ],
})
export class CompanyTaxListsModule { }

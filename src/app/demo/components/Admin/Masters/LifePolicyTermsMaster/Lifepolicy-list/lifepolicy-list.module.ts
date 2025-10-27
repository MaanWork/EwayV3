
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
//import { ThemeModule } from '../../../../../@theme/theme.module';
import { LifePolicyListComponent } from './lifepolicy-list.component';
import { LifePolicyDetailsComponent } from '../Lifepolicy-details/lifepolicy-details.component';
import { LifePolicyListRoutingModule } from './lifepolicy-list-routing.module';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { DirectivesModule } from 'src/app/_services/directives.module';
import { MaterialModule } from '@app/shared/material/material.module';
// import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';



@NgModule({
  declarations: [
    LifePolicyListComponent,
    LifePolicyDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    LifePolicyListRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [LifePolicyListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})
export class LifepolicytermsModule { }

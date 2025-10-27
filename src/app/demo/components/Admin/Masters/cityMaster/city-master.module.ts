
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';

import { MastersService } from '../Masters.service';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { CityMasterRoutingModule } from './city-master-routing.module';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { DirectivesModule } from 'src/app/_services/directives.module';





@NgModule({
  declarations: [
    CityListComponent,
    CityDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    CityMasterRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    // NbSearchModule,
    // NbDatepickerModule,
    // NbMomentDateModule,
    MaterialModule,
    PipesModule,
  //  DigitOnlyModule,

  ],
  bootstrap: [CityListComponent],
  providers: [
    CurrencyPipe,
    MastersService
  ],
})
export class CityMasterModule { }

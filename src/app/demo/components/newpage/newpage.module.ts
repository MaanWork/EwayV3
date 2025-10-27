import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { NewComponent } from '../newpage/newpage.component';
import { NewRouteRoutingModule } from './newpage-routing.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { PipesModule } from '../../../_pipes/pipes.module';
import { DirectivesModule } from '../../../_services/directives.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [
   
    NewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    NewRouteRoutingModule,
    TableModule,
    MaterialModule,
    PipesModule,
    ButtonModule,
    MenuModule,
  ],
  bootstrap: [NewComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class NewPageModule { }

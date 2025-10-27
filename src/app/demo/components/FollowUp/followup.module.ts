import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { FollowupComponent } from './followup.component';
import { FollowupRoutingModule } from './followup-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from '@app/shared/material/material.module';
import { PipesModule } from '../../../_pipes/pipes.module';
import { DirectivesModule } from '../../../_services/directives.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
//import { MatNativeDateModule } from '@angular/material';





@NgModule({
  declarations: [
    FollowupComponent,
    //MailComponent
    //VieQuoteDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MatDatepickerModule,
    FollowupRoutingModule,
    MatFormFieldModule,
    TableModule,
    MaterialModule,
    PipesModule,
    InputTextModule,
    SpeedDialModule,
    SelectButtonModule,
    ToastModule,
    MessagesModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ChipModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    DialogModule
  ],
  bootstrap: [
    //MailComponent
    FollowupComponent
  ],
  providers: [
    CurrencyPipe,
  ],
})
export class FollowupModule { }

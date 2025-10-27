import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { CalendarModule } from 'primeng/calendar';
import { PolicyformComponent } from '../policyform/policyform.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { SelectButtonModule } from 'primeng/selectbutton';



@NgModule({
  declarations: [
    PolicyformComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    TableModule,
    TabViewModule,
    SelectButtonModule,
    ReactiveFormsModule, // Add this
    FormlyModule.forRoot(), // Formly Core
    FormlyBootstrapModule, // Formly Bootstrap
    TableModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ]
})
export class PolicyFormModule { }

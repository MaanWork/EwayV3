import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableViewComponent } from './table-view/table-view.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PolicyTableComponent } from '@app/demo/components/policy/policy-table/policy-table.component';
import { CustomerTableComponent } from '@app/demo/components/customer/customer-table/customer-table.component';
import { QuotationTableComponent } from '@app/demo/components/quotation/quotation-table/quotation-table.component';


@NgModule({
  declarations: [ 
    TableViewComponent, 
    CustomerTableComponent,
    QuotationTableComponent,
    PolicyTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    BreadcrumbModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    InputTextModule,
    DataViewModule,
    DialogModule,
    AutoCompleteModule,
    ChipModule,
    CheckboxModule,
    DropdownModule
    
  ],
  exports: [TableViewComponent]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';
@NgModule({
  imports: [
    FormsModule,
    CommonModule
    
  ],
  declarations: [ SearchFilterPipe ],
  exports :[ SearchFilterPipe ]
})
export class SearchFilterModule { }

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
 <p-inputNumber  [formControl]="formControl" class="w-full customFormlyHeight" styleClass="w-full customFormlyHeight"
 [formlyAttributes]="field" inputId="integeronly" (keydown)="onKeyDown($event,field)" (keyup)="CommaFormattedCorp($event,field)"> </p-inputNumber>
 
 <div class="text-danger"  *ngIf="to.errors==true">This field is Required</div>
 `,
})
export class CommaSeparatorInput extends FieldType {
    myNumber: number;

    onKeyDown(event: KeyboardEvent,field) {
  const inputElement = event.target as HTMLInputElement;
  let maxLength=0; 
  if(field.key=='EngineCapacity') maxLength=6;
  else maxLength=19;
  if (inputElement.value.length >= maxLength) {
    event.preventDefault();
  }
    }

    CommaFormattedCorp(event: KeyboardEvent,field){
      const inputElement = event.target as HTMLInputElement;
        if(inputElement.value) inputElement.value = String(inputElement.value).replace(/[^0-9.]|(?<=\-..*)\./g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return inputElement.value;
      }
}
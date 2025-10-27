import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'commaseparator',
})
export class Commaseparator implements PipeTransform {
  constructor() { }

  transform(value: any): any {
    if (value) {
      console.log(value);
      const removecomma: any = value.toString().replace(/,/g, '');
      const number: any = Number(removecomma);
      return new Intl.NumberFormat('en').format(number);
    } else {
      return '';
    }
  }
}

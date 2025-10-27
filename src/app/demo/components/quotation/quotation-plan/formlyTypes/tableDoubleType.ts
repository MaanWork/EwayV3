import { Component, Pipe, PipeTransform } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
@Pipe({ name: 'slicePairs' })
export class SlicePairsPipe implements PipeTransform {
  transform(arr: any[]): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
      result.push(arr.slice(i, i + 2));
    }
    return result;
  }
}
@Component({
  selector: 'app-table-type',
  template: `
    <div class="row">
      <div class="col-md-12 col-lg-12 col-xl-12 col-12 offset-md-1 offset-lg-1 offset-xl-1">
        <table class="table table-bordered" style="width: 100% !important;">
          <thead style="background-color: #042181; color:#fff; height:35px">
  <tr>
    <ng-container *ngIf="field.fieldGroup.length > 0">
      <ng-container *ngFor="let header of field.fieldGroup[0].fieldGroup;let z = index">
         <th [style.width]="(z === 0) ? '150px'  : (z === 1) ? '300px' : '30px'">
    {{ header.props.label }}
  </th>
      </ng-container>
      <ng-container *ngFor="let header of field.fieldGroup[0].fieldGroup;let z = index">
         <th [style.width]="(z === 0) ? '150px'  : (z === 1) ? '300px' : '30px'">
         {{ header.props.label }}
  </th>
      </ng-container>
    </ng-container>
  </tr>
</thead>

         <tbody style="background-color: #b3c6d6 !important;">
  <ng-container *ngFor="let row of field.fieldGroup; let i = index">
    <ng-container *ngIf="i > 0">
      <ng-container *ngFor="let colPair of row.fieldGroup | slicePairs">
        <tr style="border-bottom:1px black !important;background-color:white !important">
          <ng-container *ngFor="let column of colPair">
            <td *ngFor="let subColumn of column.fieldGroup" class="px-2">
              <formly-field [field]="subColumn"></formly-field>
            </td>
          </ng-container>
        </tr>
      </ng-container>
    </ng-container>
  </ng-container>
</tbody>

        </table>
      </div>
    </div>
  `,

})
export class TableDoubleTypeComponent extends FieldType { }

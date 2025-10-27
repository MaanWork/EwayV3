import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'displayFire',
 template: `
 <div style="margin-top: 10px !important;margin-left: 10px !important;line-height: 1!important;">
        <span >{{field.templateOptions.label}}</span>
 </div>

 `,
})
export class DisplayLabelFire extends FieldType {
    
}
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'display2',
 template: `
 <div style="display: block !important; padding-right: 10px !important;padding-top:12px !important;margin-left:-5px !important;cursor: pointer !important;">
        <span style="font-size:15px !important"><b>{{field.templateOptions.label}}</b></span>
 </div>
 `,
})
export class DisplayLabelHeader extends FieldType {
    
}
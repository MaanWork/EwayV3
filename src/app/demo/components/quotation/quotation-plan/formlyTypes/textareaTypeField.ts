import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <textarea pInputTextarea
          [id]="id"
          [formControl]="formControl"
          [placeholder]="to.placeholder"
          [formlyAttributes]="field"
          [ngStyle]="{'width': '-webkit-fill-available'}">
    </textarea>

  `
})

export class TextareaTypeComponent extends FieldType implements OnInit {
  ngOnInit() {
  }
  // [cols]="to.cols ? to.cols : 60"
  //             [rows]="to.rows ? to.rows : 2"
}
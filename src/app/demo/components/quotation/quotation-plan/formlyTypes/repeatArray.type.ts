import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { RepeatService } from '../Riskpage/repeat.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div class="flex flex-wrap justify-content-end">
     
    </div>
    <div>
      <div *ngFor="let field of field.fieldGroup; let i = index;" class="grid" style="height:auto !important;">
        <formly-field class="col" [field]="field"></formly-field>
        <div class="col-12 md:col-3 lg:col-3 xl:col-3" style="margin-top:45px !important;">
          <p-button label="Delete" styleClass="mb-3 p-button-outlined" *ngIf="i != 0" (click)="remove(i)"></p-button>
        </div>
        <hr class="m-0 p-0">
      </div>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType implements OnInit, OnDestroy {
  endorsementSection: boolean = false;
  endorsementId: any = null;
  private subscription: Subscription;
  private subscription2: Subscription;
  constructor(private repeat : RepeatService) {
    super();
    let endorsementDetails = JSON.parse(sessionStorage.getItem('endorseTypeId'));
    if (endorsementDetails) {
      this.endorsementSection = true;
      this.endorsementId = endorsementDetails?.EndtTypeId;
    }
  }

  ngOnInit() {
    if (!this.field.fieldGroup || this.field.fieldGroup.length === 0) {
      // this.add(); // Add one field by default
    }
    this.subscription = this.repeat.addRequested.pipe(take(1)).subscribe(() => {
      this.add();
    });
    this.subscription2 = this.repeat.removeRequested.subscribe(() => {
      this.remove(0);
    });
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
  }
}
// <div>
// <p-button label="Add New" styleClass="mr-3 p-button-outlined" (click)="add()"></p-button>
// </div>
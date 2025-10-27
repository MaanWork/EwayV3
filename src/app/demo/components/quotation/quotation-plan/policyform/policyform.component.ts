import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { policyFormConfig } from '../policyFormconfig';
import { PolicyData } from '../policy.model';


@Component({
  selector: 'app-policyform',


  templateUrl: './policyform.component.html'
})
export class PolicyformComponent {

  public form = new FormGroup({});
  model: any;
  options: any;
  fields: FormlyFieldConfig[];
  primaryfields: FormlyFieldConfig[];
  extensionfields: FormlyFieldConfig[];
  extensionTablefields: FormlyFieldConfig[];
  interruptionfields:FormlyFieldConfig[];
  value1: any;
  policyItem: any;
  groupedFields: any;
  groupedExtensionFields: any;
  showExtensions: boolean = false;
  BIValue: any = 'N';
  EValue: any = 'N';
  BIList: any[] = [];
  showInterruptions: boolean = false;
  showExtensionToggle:boolean = false;
  constructor() {
    // eslint-disable-next-line prefer-const
    let fireData = new policyFormConfig();
    this.fields = fireData.policyfields.fieldGroup;
    this.primaryfields = fireData.primaryfields.fieldGroup;
    this.extensionfields = fireData.extensionfields.fieldGroup;
    this.extensionTablefields = fireData.extensionTablefields.fieldGroup;
    this.interruptionfields = fireData.interruptionfields.fieldGroup;

    // console.log(this.fields);
    this.policyItem = new PolicyData();
    this.addControlsToForm();
    this.setConfirm();
    this.setExtensions();
    this.setLeakageExtensionOptions();
    this.groupedFields = this.groupFields(this.fields);

  }




  private addControlsToForm() {
    const addControls = (fields: any[]) => {
      fields.forEach((field) => {
        if (field?.key) {
          this.form.addControl(field.key, new FormControl(''));
        }
        if (field?.fieldGroup) {
          addControls(field.fieldGroup);
        }
      });
    };

    addControls(this.fields);
  }

  // Group fields into pairs
  private groupFields(fields: any[]): any[] {
    const grouped: any[] = [];
    const visibleFields = fields.filter(field => !field.hide);
    const newLineFields = ['IndemnityPeriod']; // Fields that must always start a new line

    let tempGroup: any[] = [];

    for (let i = 0; i < visibleFields.length; i++) {
      const field = visibleFields[i];

      if (newLineFields.includes(field.key)) {
        // Push any existing group before adding new-line field
        if (tempGroup.length > 0) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
        grouped.push([field]); // Push IndemnityPeriod alone
      } else {
        // Pair fields together
        if (tempGroup.length === 0 || tempGroup.length === 1) {
          tempGroup.push(field);
        }

        if (tempGroup.length === 2) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
      }
    }

    // Push remaining group if not empty
    if (tempGroup.length > 0) {
      grouped.push(tempGroup);
    }

    return grouped;
  }

  setLeakageExtensionOptions() {
    // Setting options dynamically for the leakageExtension field
    const leakageExtensionField = this.fields.find(field => field.key === 'leakageExtension');
    if (leakageExtensionField) {
      leakageExtensionField.props.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ];
    }
  }
  setConfirm() {
    this.BIList = [{ Code: 'N', CodeDesc: 'No' },
    { Code: 'Y', CodeDesc: 'Yes' },]
    // const confirmField = this.fields.find(field => field.key === 'isConfirmed');
    // if (confirmField) {
    //   confirmField.props.options = [
    //     { value: 'N', label: 'No' },
    //     { value: 'Y', label: 'Yes' },
    //   ];
    //   confirmField.defaultValue = 'N'
    // }

  }

  setExtensions() {
    const confirmField = this.fields.find(field => field.key === 'extensions');
    if (confirmField) {
      confirmField.props.options = [
        { value: 'N', label: 'No' },
        { value: 'Y', label: 'Yes' },
      ];
      confirmField.defaultValue = 'N';
    }
  }
  change(event, type) {
    // console.log(event.target.innerText, type);
    if (event.target.innerText == 'Yes' && type == 'isConfirmed') {
      this.showInterruptions = true;
      this.showExtensionToggle =true;
    }
    else if (event.target.innerText == 'No' && type == 'isConfirmed') {
      this.showExtensions = false;
      this.showInterruptions = false;
      this.showExtensionToggle =false;
    }

    else if (event.target.innerText == 'Yes' && type == 'extensions') {
      this.showExtensions = true;
      this.showExtensionToggle =true;
    }
    else if (event.target.innerText == 'No' && type == 'extensions') {
      this.showExtensions = false;
    }
  }
  
}

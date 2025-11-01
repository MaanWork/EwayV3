import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'all-risk-pp-tza',
  templateUrl: './all-risk-pp-tza.component.html',
  styleUrl: './all-risk-pp-tza.component.scss'
})
export class AllRiskPpTzaComponent {
  coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;
  productId:any=null;userType:any=null;branchCode:any=null;agencyCode:any=null;
  countryId:any=null;brokerbranchCode:any=null;allRiskForm:any;
  @Input() form: any; @Input() productItem: any;  @Input() renderType: any = null;
  @Input() locationList: any[] = [];@Input() CoversRequired:any; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();IndustryError: boolean;
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  constructor(private fb: FormBuilder){
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || null);
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.allRiskForm = this.fb.group({ allRisk: this.fb.array([]) });
  }
   ngOnInit(){
       const AllRiskArray = this.allRiskForm.get('allRisk') as FormArray;
        if(this.locationList[this.tabIndex]['allRisk']){
            if (this.locationList[this.tabIndex]['allRisk'].length != 0) {
              for (let i = 0; i < this.locationList[this.tabIndex]['allRisk'].length; i++) {
                AllRiskArray.push(
                  this.fb.group({
                    AllriskSumInsured: this.locationList[this.tabIndex]['allRisk'][i].AllriskSumInsured,
                    AllriskDescription: this.locationList[this.tabIndex]['allRisk'][i].AllriskDescription
                  })
                );
                this.locationList[this.tabIndex].IndustryId = this.locationList[this.tabIndex]['allRisk'][0].IndustryType;
              }
            }
            else { this.addAllRisk() }
        }
        else { this.addAllRisk() }
   }
  get AllRiskArray(): FormArray {
    return this.allRiskForm.get('allRisk') as FormArray;
  }
  addAllRisk() {
    const userGroup = this.fb.group({
      AllriskSumInsured: [''],
      AllriskDescription: ['']
    });
    this.AllRiskArray.push(userGroup);
  }
  removeAllRisk(index: number) {
    this.AllRiskArray.removeAt(index);
  }
  onKeyDown(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    let maxLength = 0;
    maxLength = 19;
    if (inputElement.value.length >= maxLength) {
      event.preventDefault();
    }
  }
  CommaFormattedDynamic(event: KeyboardEvent, name: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputElement.value = formattedValue;
      if (!name || !this.form.controls[name]) {
        return inputElement.value;
      }
      else this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
    }
  }
  previous(){this.previousSection.emit('AllRisk');}
  skip() {this.skipSection.emit('AllRisk');}
  listProceed(type) {
       let allRiskForm = this.allRiskForm.controls.allRisk.value;
        if (allRiskForm) {
          console.log("Final Form Values", allRiskForm)
          this.productItem.allRiskDomestic = [];
          for (let i = 0; i < allRiskForm.length; i++) {
            let d = {
              "AllriskSumInsured": allRiskForm[i].AllriskSumInsured,
              "AllriskDescription": allRiskForm[i].AllriskDescription,
            }
            this.productItem.allRiskDomestic.push(d)
            if (i == allRiskForm.length - 1) {
              this.locationList[this.tabIndex]['allRisk'] = this.productItem.allRiskDomestic
              let res = {
                "locationList": this.locationList,
                "type": type
              }
              this.finalProceed.emit(res)
            }
          }
        }
    }
}

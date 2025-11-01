import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
@Component({
  selector: 'content-pp-tza',
  templateUrl: './content-pp-tza.component.html',
  styleUrl: './content-pp-tza.component.scss'
})
export class ContentPpTzaComponent {
    productId: any = null;
    form2 = new FormGroup({});
    showExtensions = false;userType:any=null;contentRiskForm:any;
    @Input() form: any; insuranceId: any = null;
    @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
    @Input() locationList: any[] = [];@Input() CoversRequired:any; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();IndustryError: boolean;coversreuired: string;
;
    @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
    branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    constructor(private sharedService: SharedService,private fb: FormBuilder) {
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
        this.contentRiskForm = this.fb.group({ contentRisk: this.fb.array([]) });
    }
    ngOnInit(){
      this.ContentRiskArray.clear();
      if(this.locationList.length!=0){
        if(this.locationList[this.tabIndex]['contentRiskDomestic']){
          let contentDetails = this.locationList[this.tabIndex]['contentRiskDomestic'];
          if(contentDetails.length!=0){
            for (let all of contentDetails) {
              const userGroup = this.fb.group({
                SumInsured: all.SumInsured,
                Description: all.Description
              });
              this.ContentRiskArray.push(userGroup);
            }
          }
          else this.addContentRisk();
        } else this.addContentRisk();
      }
    }
    get ContentRiskArray(): FormArray {
      return this.contentRiskForm.get('contentRisk') as FormArray;
    }
    addContentRisk() {
      const userGroup = this.fb.group({
        SumInsured: [''],
        Description: ['']
      });
      this.ContentRiskArray.push(userGroup);
    }
    removeContentRisk(index: number) {
      this.ContentRiskArray.removeAt(index);
    }
    listProceed(type) {
      let contentRiskForm = this.contentRiskForm.controls.contentRisk.value;
      if (contentRiskForm) {
        console.log("Final Form Values", contentRiskForm)
        this.productItem.contentRiskDomestic = [];
        for (let i = 0; i < contentRiskForm.length; i++) {
          let d = {
            "SumInsured": contentRiskForm[i].SumInsured,
            "Description": contentRiskForm[i].Description,
          }
          this.productItem.contentRiskDomestic.push(d)
          if (i == contentRiskForm.length - 1) {
            this.locationList[this.tabIndex]['contentRiskDomestic'] = this.productItem.contentRiskDomestic
             let res = {
                "locationList": this.locationList,
                "type": type
              }
              this.finalProceed.emit(res)
          }
        }
      }
    }
    previous(){
      this.previousSection.emit('ContentRisk');
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
}

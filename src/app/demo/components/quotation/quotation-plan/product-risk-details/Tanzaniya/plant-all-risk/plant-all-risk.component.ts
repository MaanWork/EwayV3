import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { PlantAllRiskTanzaniya } from '../../../models/Tanzaniya/PlantAllRisk/PlantAllRisk';
import { PlantAllRiskTanzaniyaApi } from '../../../models/Tanzaniya/PlantAllRisk/PlantAllRiskApi';
@Component({
  selector: 'plant-all-risk-tza',
  templateUrl: './plant-all-risk.component.html',
  styleUrl: './plant-all-risk.component.scss'
})
export class PlantAllRiskTZAComponent {

    userType: any = null;
          productId: any = null;
          form2 = new FormGroup({});fieldAccidentalDamage:any[]=[];claimCostList:any[]=[];
          showExtensions = false;carrierlegalliabilityFields:any[]=[];fieldsCARPrimaryupto:any[]=[];
          @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
          @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
          @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
          @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
          @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;bondfields:any[]=[];
          @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
          branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
          IndustryError: boolean;yearsList:any[]=[];BondTypeList:any[]=[];
            public AppConfig: any = (Mydatas as any).default;
          public ApiUrl1: any = this.AppConfig.ApiUrl1;
          public MarineApiUrl: any = this.AppConfig.MarineApi;
          public CommonApiUrl: any = this.AppConfig.CommonApiUrl;plantAllRiskForm:any;
          constructor(private sharedService: SharedService,private fb: FormBuilder){
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
              this.plantAllRiskForm = this.fb.group({ plantallrisk: this.fb.array([]) });
               let contentData = null;
              if(this.insuranceId == '100002') {contentData = new PlantAllRiskTanzaniya();
                this.addPlantAllRisk()}
        }
        ngOnInit(){
          if(this.locationList.length!=0){
            this.onEditData();
          }
        }
        onEditData(){
          let i=0;
          if(this.locationList.length!=0){
            for(let obj of this.locationList){
              let subDetails = null;
              if(obj.SectionList){
                subDetails = obj.SectionList;
                let plantAllRiskApi = new PlantAllRiskTanzaniyaApi();
                let result = plantAllRiskApi.getEditDetails(subDetails, obj);
                if(result) obj = result;
              }
              if(subDetails && this.tabIndex==i){
                 if(obj['plantallrisk'] && obj['plantallrisk'].length>0){
                  this.productItem.IndustryId = obj['IndustryType'];
                  this.PlantAllRiskArray.clear();
                  for(let entry of obj['plantallrisk']){
                    const userGroup = this.fb.group({
                      Description: [entry.Description],
                      SumInsured: [entry.SumInsured]
                    });
                    this.PlantAllRiskArray.push(userGroup);
                  }
                 }
              }
            i+=1;
            }
          }
        }
        get PlantAllRiskArray(): FormArray {
          return this.plantAllRiskForm.get('plantallrisk') as FormArray;
        }
        addPlantAllRisk() {
          const userGroup = this.fb.group({
            Description: [''],
            SumInsured: ['']
          });
          this.PlantAllRiskArray.push(userGroup);
        }
        removePlantAllRisk(index: number) {
          this.PlantAllRiskArray.removeAt(index);
        }
        onSIValueChange(args) {
          if (args.key === 'e' || args.key === '+' || args.key === '-') {
            return false;
          } else {
            return true;
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
        onProceedData(type){
            let i = 0;
            if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
            else { this.IndustryError = false; }
            let locationList = [];
            if (i == 0) {
              let j = 0;
              for (let entry of this.locationList) {
                let i = 0;
                if (entry.BuildingOwnerYn == null) entry.BuildingOwnerYn = 'Y';
                if (entry.CoversRequired == null) entry.CoversRequired = 'BC';
                let obj = {
                  "LocationId": j + 1,
                  "LocationName": entry.LocationName,
                  "CoversRequired": entry.CoversRequired,
                  "BuildingOwnerYn": entry.BuildingOwnerYn,
                  "Address": entry.BuildingAddress,
                  "SectionList": []
                }
                if (j == this.tabIndex) {
                  obj['plantallrisk'] = entry['plantallrisk'] = this.plantAllRiskForm.value.plantallrisk;
                  entry['IndustryId'] = this.productItem.IndustryId;
                  let Form = this.plantAllRiskForm.value.plantallrisk;
                  console.log(Form);     
                  if (Form) {
                    this.productItem.PlantallRiskList= [];
                    for (let i = 0; i < Form.length; i++) {
                      let d = {
                        "SumInsured": String(Form[i].SumInsured).replaceAll(',', ''),
                        "DescriptionOfRisk": Form[i].Description,
                      }
                      this.productItem.PlantallRiskList.push(d)
                      if (i == Form.length - 1) {
                        obj['PlantallRiskList'] = entry['PlantallRiskList'] = this.productItem.PlantallRiskList; 
                        let plantAllRiskApi = new PlantAllRiskTanzaniyaApi();
                        let plantAllRisklist: any = plantAllRiskApi.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj,null)
                        obj = plantAllRisklist;
                      }
                    }
                  }
                }
                else if(entry?.SectionList){obj['SectionList']=entry?.SectionList;}
                  locationList.push(JSON.parse(JSON.stringify(obj)));
                    j += 1;
                    if (j == this.locationList.length) {console.log("Final Obj", JSON.parse(JSON.stringify(obj)), locationList);this.finalRedirect(locationList,type)}
              }
            }
        }
        finalRedirect(locationList,type){
          console.log("Received Obj",locationList)
            let res = {
              "locationList": locationList,
              "type": type
            }
            console.log("Final Object", res)
            this.finalProceed.emit(res)
        }
        //Industry Change
        IndustryChanged() {
          this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
        }
        previous() {
          let res = {
              "locationList": this.locationList,
              "type": 'Previous'
            }
          this.previousSection.emit(res);
        }
}

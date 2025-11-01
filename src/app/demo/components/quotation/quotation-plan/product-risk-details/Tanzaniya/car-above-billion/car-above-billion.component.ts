import { ConstructionAllRiskAboveTanzaniya } from '../../../models/Tanzaniya/ConstructionAllRiskAbove/constructionAllRisk';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { ConstructionAllRiskAboveApiTanzaniya } from '../../../models/Tanzaniya/ConstructionAllRiskAbove/constructionAllRiskApi';
@Component({
  selector: 'car-above-billion',
  templateUrl: './car-above-billion.component.html',
  styleUrl: './car-above-billion.component.scss'
})
export class CarAboveBillionComponent {
          userType: any = null;
          productId: any = null;
          form2 = new FormGroup({});
          showExtensions = false;carrierlegalliabilityFields:any[]=[];fieldsCARPrimaryupto:any[]=[];
          @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
          @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
          @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
          @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
          @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;
          @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
          branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
          IndustryError: boolean;fieldsCARupto:any[]=[];
           public AppConfig: any = (Mydatas as any).default;
          public ApiUrl1: any = this.AppConfig.ApiUrl1;
          public MarineApiUrl: any = this.AppConfig.MarineApi;
          public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
      showMonthsError: boolean;
      showMaxLimitedError: boolean;
      showMaxLimitError: boolean;
          constructor(private sharedService: SharedService){
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
            let fireData = null;
            if (this.productId == '83') { fireData = new ConstructionAllRiskAboveTanzaniya(); }
            this.addControlsToForm(fireData.CARuptofields.fieldGroup);
            this.addControlsToForm(fireData.constructionCARuptofields.fieldGroup);
            this.fieldsCARupto = this.groupFields(fireData.CARuptofields.fieldGroup);
            this.fieldsCARPrimaryupto = this.groupFields(fireData.constructionCARuptofields.fieldGroup);
            this.buildingContractorsList();
          }
          ngOnInit() {
            if (this.locationList.length != 0) {
              this.onEditData();
            }
          }
          onEditData() {
            console.log("Locations On Edit", this.locationList);
            let i = 0;
            for (let obj of this.locationList) {
                let subDetails = null;
                if(obj.SectionList){
                  subDetails=obj.SectionList;
                  let constructionAllRiskApi = null;
                  if (this.insuranceId == '100002') constructionAllRiskApi = new ConstructionAllRiskAboveApiTanzaniya();
                  obj = constructionAllRiskApi.getEditDetails(subDetails, obj, this.engineerData);
                }
                if(this.tabIndex==i && obj.SectionList){
                    if(obj?.CARuptoConstruction) this.productItem['CARuptoConstruction']=obj?.CARuptoConstruction;
                    if(obj?.CARuptoMonths) this.productItem['CARuptoMonths']=obj?.CARuptoMonths;
                    if(obj?.CARuptoStoreys) this.productItem['CARuptoStoreys']=obj?.CARuptoStoreys;
                    if(obj?.EARMaintenance) this.productItem['EARMaintenance']=obj?.EARMaintenance;
                    if(obj?.CARuptoSumInsured) this.productItem['CARuptoSumInsured']= obj?.CARuptoSumInsured;
                    if(obj?.CARDescription){ this.productItem['CARDescription']=obj?.CARDescription;}
                    if(obj?.CARAnnual){ this.productItem['CARAnnual']=obj?.CARAnnual;}
                    if(obj?.CARPrincipal){ this.productItem['CARPrincipal']=obj?.CARPrincipal;}
                    if(obj?.CARLocationName){ this.productItem['CARLocationName']=obj?.CARLocationName;}
                    if(obj?.CARStartDate){ this.productItem['CARStartDate']=obj?.CARStartDate;}
                    if(obj?.CARPeriodOfActivity){ this.productItem['CARPeriodOfActivity']=obj?.CARPeriodOfActivity;}
                    if(obj?.IndustryType){ this.productItem['IndustryId']=obj?.IndustryType;}
                }
                i+=1;
            }
          }
          buildingContractorsList() {
            let ReqObj = {
              "InsuranceId": this.insuranceId,
              "ItemType": "BUILDING_TYPE_CONTRACTORS"
            }
            let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
                this.buildingContactorTypes = defaultObj.concat(data.Result);
                if (this.productId == '82' || this.productId == '83') {
                  let i = 0
                  for (let entry of this.buildingContactorTypes) {
                    entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
                    i += 1;
                    if (i == this.buildingContactorTypes.length) {
                      let fieldList = [];
                      if (this.productId == '82' || this.productId == '83') fieldList = this.fieldsCARPrimaryupto[0];
                      if (this.buildingContactorTypes?.length > 0 && fieldList) {
                        for (let field of fieldList) {
                          if (field.key == 'CategoryId') {
                          } else if (field.key == 'CARuptoConstruction' || field.key == 'ContentsType') {
                            field.props.options = this.buildingContactorTypes;
                          }
                        }
                      }
                    }
                  }
                }
              });
          }
          private addControlsToForm(fields: any[]) {
          }
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
            console.log(grouped);
            return grouped;
          }
          checkLimitValue(event: Event, key, type): void {
            if (type == 'max') {
              if (key == 'CARuptoSumInsured') {
                const input = event.target as HTMLInputElement;
                const numericValue = parseFloat(input.value.replace(/,/g, ''));
                if (numericValue > 1000000000) {
                  this.showMaxLimitError = true;
                  input.value = '1000000000';
                  this.form.controls['CARuptoSumInsured'].setValue('1000000000');
                } else {
                  this.showMaxLimitError = false;
                }
              }
            }
            if (type == 'min') {
              if (key == 'CARuptoSumInsured') {
                const input = event.target as HTMLInputElement;
                const numericValue = parseFloat(input.value.replace(/,/g, ''));
                if (numericValue < 1000000000) {
                  this.showMaxLimitedError = true;
                } else {
                  this.showMaxLimitedError = false;
                }
              }
              if (key == 'farmCareSumInsured') {
                const input = event.target as HTMLInputElement;
                const numericValue = parseFloat(input.value.replace(/,/g, ''));
              }
            }
            if (key == 'CARuptoMonths') {
              const input = event.target as HTMLInputElement;
              const value = input.value.replace(/,/g, '');
              const numericValue = parseFloat(value);
              if (this.productId == '82') {
                if (numericValue > 12) {
                  this.showMonthsError = true;
                  input.value = '12';
                  this.productItem[key].setValue('12');
                }
              }
              if (this.productId == '83') {
                if (numericValue > 36) {
                  this.showMonthsError = true;
                  input.value = '36';
                  this.productItem[key].setValue('36');
                }
              }
            }
          }
        onProceedData(type){
            console.log("Locations", this.locationList)
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
                     if(entry.SectionList) obj.SectionList = entry.SectionList.filter(ele=>ele.SectionId!='232');
                    obj['CARuptoConstruction'] = entry['CARuptoConstruction'] = this.productItem['CARuptoConstruction'];
                    obj['CARuptoStoreys'] = entry['CARuptoStoreys'] = this.productItem['CARuptoStoreys'];
                    obj['CARuptoMonths'] = entry['CARuptoMonths'] = this.productItem['CARuptoMonths'];
                    obj['CARuptoSumInsured'] = entry['CARuptoSumInsured'] = String(this.productItem['CARuptoSumInsured']).replaceAll(',','');
                    obj['EARMaintenance'] = entry['EARMaintenance'] = this.productItem['EARMaintenance'];
                    if(entry.CARuptoConstruction!='0' && entry.CARuptoConstruction!=null && entry.CARuptoConstruction!='' && entry.CARuptoStoreys!='0' && entry.CARuptoStoreys!=null && entry.CARuptoStoreys!='' && entry.CARuptoMonths!='0' && entry.CARuptoMonths!=null && entry.CARuptoMonths!='' && entry.CARuptoSumInsured!='0' && entry.CARuptoSumInsured!=null && entry.CARuptoSumInsured!=''){
                          let subEntry= {
                            "SectionId": "232",
                            "SectionName":"Contractors All Risks",
                            "CoverId":"566",
                            "SumInsured": entry.CARuptoSumInsured,
                            "CategoryId": entry.CARuptoConstruction,
                            "CategoryDesc": this.buildingContactorTypes.find(ele => ele.Code == entry.CARuptoConstruction)?.CodeDesc ,
                            "BuildingUsageId": entry.CARuptoConstruction,
                            "BuildingFloors": entry.CARuptoStoreys,
                            "BuildingBuildYear": entry.CARuptoMonths,
                            "DescriptionOfRisk": entry.EARMaintenance
                          }
                          if(this.productItem.IndustryId){subEntry['IndustryId'] = this.productItem.IndustryId;subEntry['IndustryType'] = this.productItem.IndustryId;subEntry["IndustryTypeDesc"]= this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc}
                              obj['CARAnnual'] = entry['CARAnnual'] = this.productItem['CARAnnual'];
                              obj['CARPrincipal'] = entry['CARPrincipal'] = this.productItem['CARPrincipal'];
                              obj['CARDescription'] = entry['CARDescription'] = this.productItem['CARDescription'];
                              obj['CARLocationName'] = entry['CARLocationName'] = this.productItem['CARLocationName'];
                              obj['CARStartDate'] = entry['CARStartDate'] = this.productItem['CARStartDate'];
                              obj.SectionList.push(subEntry);
                      }
              }
               else if(entry?.SectionList){
                  obj['SectionList']=entry?.SectionList;
                      if(entry?.CARAnnual){ obj['CARAnnual'] = entry?.CARAnnual}
                      if(entry?.CARPrincipal){ obj['CARPrincipal'] = entry?.CARPrincipal}
                      if(entry?.CARLocationName){ obj['CARLocationName'] = entry?.CARLocationName}
                      if(entry?.CARStartDate){ obj['CARStartDate'] = entry?.CARStartDate}
                      if(entry?.CARPeriodOfActivity){ obj['CARPeriodOfActivity'] = entry?.CARPeriodOfActivity}
                      if(entry?.CARDescription){ obj['CARDescription'] = entry?.CARDescription}
                      if(entry?.IndustryType){ obj['IndustryId'] = entry?.CARuptoConstruction}
                }
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
        isNumberKey(event: KeyboardEvent): boolean {
              const charCode = event.which ? event.which : event.keyCode;
              if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
                return false;
              }
              else return true;
        }
        CommaFormattedDynamic(event: KeyboardEvent, name: string) {
          const inputElement = event.target as HTMLInputElement;
          if (inputElement.value) {
            const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
            const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            inputElement.value = formattedValue;
            if (!name || !this.form.controls[name]) {
              return inputElement.value;
            } else {
              this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
            }
          }
        }
        restrictNumber(event: KeyboardEvent) {
          const charCode = event.which ? event.which : event.keyCode;
          if (charCode < 48 || charCode > 57) {
            event.preventDefault();
          }
        }
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

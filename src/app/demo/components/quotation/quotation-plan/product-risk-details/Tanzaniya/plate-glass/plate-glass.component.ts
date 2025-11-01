import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { PlateGlassTanzaniyaApi } from '../../../models/Tanzaniya/PlateGlass/PlateGlassTanzaniyaApi';
@Component({
  selector: 'plate-glass-tza',
  templateUrl: './plate-glass.component.html',
  styleUrl: './plate-glass.component.scss'
})
export class PlateGlassTZAComponent {
      userType: any = null;
      productId: any = null;
      
      @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
      @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
      @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
      @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;PlateGlassType:any[]=[];
      @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
      branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
      IndustryError: boolean;plateGlassForm: FormGroup;
        public AppConfig: any = (Mydatas as any).default;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;
      public MarineApiUrl: any = this.AppConfig.MarineApi;
      public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
      constructor(private sharedService: SharedService,private fb:FormBuilder){
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
          this.plateGlassForm = this.fb.group({ plateglass: this.fb.array([]) });
          this.getPlateGlassType();
          this.addPlateGlass();
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
                let Api = new PlateGlassTanzaniyaApi();
                const householdersResult = Api.getEditDetails(subDetails, obj);
                if (householdersResult !== undefined) {
                  obj = householdersResult;
                }
              }
              if(subDetails && this.tabIndex==i){
                  if(obj.plateglass){
                      const FormArray = this.plateGlassForm.get('plateglass') as FormArray;
                      FormArray.clear();
                      if (FormArray) {
                        for (let i = 0; i < obj.plateglass.length; i++) {
                          FormArray.push(
                            this.fb.group({
                              SumInsured: this.CommaFormattedValue(obj.plateglass[i].SumInsured),
                              CategoryId: obj.plateglass[i].CategoryId
                            })
                          );
                        }
                      } 
                  }
              }
            i+=1;
            }
          }
      }
      CommaFormattedValue(data){
        if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return data
      }
      getPlateGlassType() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "PLATE_GLASS"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
            this.PlateGlassType = defaultObj.concat(data.Result);
            for (let i = 0; i < this.PlateGlassType.length; i++) {
              this.PlateGlassType[i].label = this.PlateGlassType[i]['CodeDesc'];
              this.PlateGlassType[i].value = this.PlateGlassType[i]['Code'];
              //delete this.PlateGlassType[i].CodeDesc;
            }
          },
          (err) => { },
        );
      }
      onProceedData(type){
            console.log("Locations", this.locationList)
          let i = 0;
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
                obj['plateglass'] = entry['plateglass'] = this.plateGlassForm.value.plateglass;
                let Form = entry['plateglass'];
                if (Form) {
                  for (let i = 0; i < Form.length; i++) {
                    let d = {
                      "SectionId": "53",
                      "SectionName": "Plate glass",
                      "CoverId": '386',
                      "SumInsured": String(Form[i].SumInsured).replaceAll(',', ''),
                      "Status": "Y",
                      "CategoryId": Form[i].CategoryId,
                      "OtherOccupation": i,
                     }
                    obj.SectionList.push(d);
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
      get PlateGlassArray(): FormArray {
        return this.plateGlassForm.get('plateglass') as FormArray;
      }
      addPlateGlass() {
        const userGroup = this.fb.group({
          CategoryId: [''],
          SumInsured: ['']
        });
        this.PlateGlassArray.push(userGroup);
      }
      removePlateGlass(index: number) {
        this.PlateGlassArray.removeAt(index);
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
      onSIValueChange(args) {
        if (args.key === 'e' || args.key === '+' || args.key === '-') {
          return false;
        } else {
          return true;
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

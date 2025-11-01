import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'personal-plus-tza',
  templateUrl: './personal-plus.component.html',
  styleUrl: './personal-plus.component.scss'
})
export class PersonalPlusTZAComponent {
    BuildingOwnerYn:any='Y';CoversRequired:any='BC';domesticMenus:any[]=[];
    currentDomestic:any=null; userType: any = null;productId: any = null;
    form2 = new FormGroup({});
    showExtensions = false;
    @Input() form: any; coversreuired: any = null; insuranceId: any = null;
    @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
    @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();IndustryError: boolean;
    @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
    branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;orgCountryList:any[]=[];
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  constructor(){
    this.domesticMenus = [{ menu: 'BuildingDetails', filled: false }, { menu: 'ContentRisk', filled: false }, { menu: 'AllRisk', filled: false }, { menu: 'OwnersLiability', filled: false }, { menu: 'ElectronicEquipment', filled: false }];
  }
  ngOnInit(){
    if(this.locationList.length!=0){
      this.onEditData();
    }
  }
  onEditData(){
    let i=0;
    for(let loc of this.locationList){
      if(loc.SectionList && this.tabIndex==i){
            if(loc?.CoversRequired) this.CoversRequired = loc?.CoversRequired;
            if(loc?.BuildingOwnerYn) this.BuildingOwnerYn = loc?.BuildingOwnerYn;
           let buildDetails = loc.SectionList.filter(ele=>ele.CoverId=='105')
           if(buildDetails.length!=0){
            loc['BuildingList']=[]
            for(let build of buildDetails){
              let buildEntry={"RoofType": build.RoofType,"BuildingYear": build.BuildingAge,"WallType": build.WallType,
                "FirstLossPayee": build.FirstLossPayee,"BuildingSumInsured": build.SumInsured,"BuildingDescription": build.DescriptionOfRisk,
              }
              loc.BuildingList.push(buildEntry)
            }
           }
           let contentDetails = loc.SectionList.filter(ele=>ele.CoverId=='290')
            if(contentDetails.length!=0){
              loc['contentRiskDomestic']=[]
              for(let content of contentDetails){
                let contentEntry={ "SumInsured": content.SumInsured,"Description": content.DescriptionOfRisk,}
                loc['contentRiskDomestic'].push(contentEntry)
              }
            }
            let allDetails = loc.SectionList.filter(ele=>ele.CoverId=='45')
            if(allDetails.length!=0){
              loc['allRisk']=[];
              for(let all of allDetails){let allEntry={"AllriskSumInsured": all.SumInsured,"AllriskDescription": all?.DescriptionOfRisk}
                loc['allRisk'].push(allEntry);
              }
            }
            let EEDetails = loc.SectionList.filter(ele=>ele.CoverId=='90')
            if(EEDetails.length!=0){
              loc['EERiskDomestic']=[];
              for(let EE of EEDetails){let ElecEntry={ "ContentId": EE.ContentId,"ContentDesc": EE.ContentDesc,"Description": EE.DescriptionOfRisk,"SumInsured": EE.SumInsured}
                loc['EERiskDomestic'].push(ElecEntry);
              }
            }
      }
      i+=1;
      if(i==this.locationList.length){this.menuSelection(this.CoversRequired,'Domestic');}
    }
  }
  setBuildingOwnerYN() {
    if (this.BuildingOwnerYn != 'Y') {
      this.CoversRequired = 'C'
    }
    else if (this.CoversRequired == null) this.CoversRequired = 'BC';
  }
  menuSelection(id, type) {
      if (id == 'B') {
        this.domesticMenus = this.domesticMenus.filter(e => e.menu !== 'ContentRisk');
        const isAlreadyPresent = this.domesticMenus.some(e => e.menu === 'BuildingDetails');
        if (!isAlreadyPresent) {
          this.domesticMenus.unshift({ menu: 'BuildingDetails', filled: false });
        }
        this.currentDomestic = this.domesticMenus[0].menu;
      }
      else if (id == 'C') {
        this.domesticMenus = this.domesticMenus.filter(e => e.menu !== 'BuildingDetails');
        const isAlreadyPresent = this.domesticMenus.some(e => e.menu === 'ContentRisk');
        if (!isAlreadyPresent) {
          this.domesticMenus.unshift({ menu: 'ContentRisk', filled: false });
        }
        this.currentDomestic = this.domesticMenus[0].menu;
      }
      else {
        const isBuildingPresent = this.domesticMenus.some(e => e.menu === 'BuildingDetails');
        if (!isBuildingPresent) {
          this.domesticMenus.unshift({ menu: 'BuildingDetails', filled: false });
        }
        const isContentPresent = this.domesticMenus.some(e => e.menu === 'ContentRisk');
        if (!isContentPresent) {
          this.domesticMenus.unshift({ menu: 'ContentRisk', filled: false });
        }
        this.currentDomestic = this.domesticMenus[0].menu;
      }
      this.domesticMenus.forEach(element => {
        let valid = this.checkFilled(element.menu);
        console.log(element, valid);
        if (valid) {
          let index = this.domesticMenus.findIndex(item => item.menu === element.menu);
          this.domesticMenus[index].filled = true;
        }
      });
  }
  checkFilled(index) {
    if (index == 'AllRisk') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {}
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'OwnersLiability') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['EmpLiabilitySi'] = this.productItem.EmpLiabilitySi;
            entry['EmpDescription'] = this.productItem.EmpDescription;
          }
          if (entry.EmpLiabilitySi == null || entry.EmpLiabilitySi == '' || entry.EmpLiabilitySi == 0 || entry.EmpDescription == null || entry.EmpDescription == '' || entry.EmpDescription == 0) { i += 1 }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'ElectronicEquipment') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['ContentTypeId'] = this.productItem.ContentTypeId;
            entry['ElectronicEquipmentSI'] = this.productItem.ElectronicEquipmentSI;
            entry['ElectronicDescription'] = this.productItem.ElectronicDescription;
          }
          if(entry.EERiskList){
            for (let build of entry.EERiskList) {
              if (build.ElectronicEquipmentSI == null || build.ElectronicEquipmentSI == '' || build.ElectronicDescription == 0 || build.ElectronicDescription == undefined) { entry['ContentSuminsuredError'] = true; i += 1 } else { entry['ContentSuminsuredError'] = false; }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'PersonalAccident') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['OccupationType'] = this.productItem.OccupationType;
            entry['PersonalDeath'] = this.productItem.PersonalDeath;
            entry['PersonalPermanent'] = this.productItem.PersonalPermanent;
            entry['PersonalTemporary'] = this.productItem.PersonalTemporary;
            entry['PersonalMedical'] = this.productItem.PersonalMedical;
          }
          if (entry.OccupationType == null || entry.OccupationType == '' || entry.OccupationType == 0 || entry.PersonalDeath == null || entry.PersonalDeath == '' || entry.PersonalDeath == 0 || entry.PersonalPermanent == null || entry.PersonalPermanent == '' || entry.PersonalPermanent == 0 || entry.PersonalTemporary == null || entry.PersonalTemporary == '' || entry.PersonalTemporary == 0 || entry.PersonalMedical == null || entry.PersonalMedical == '' || entry.PersonalMedical == 0) { i += 1 }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Fire & Allied Perils') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.FireList) {
              if (build.BuildingUsageId == null || build.BuildingUsageId == '' || build.BuildingUsageId == 0) build.BuildingUsageIdError = true;
              else build.BuildingUsageIdError = false;
              if (build.WallType == null || build.WallType == '' || build.WallType == 0) build.WallTypeError = true;
              else build.WallTypeError = false;
              if (build.RoofType == null || build.RoofType == '' || build.RoofType == 0) build.RoofTypeError = true;
              else build.RoofTypeError = false;
              if (build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0) build.SumInsuredError = true;
              else build.SumInsuredError = false;
              if (build.BuildingUsageId == null || build.BuildingUsageId == '' || build.BuildingUsageId == 0 ||
                build.WallType == null || build.WallType == '' || build.WallType == 0 ||
                build.RoofType == null || build.RoofType == '' || build.RoofType == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Business Interruption (Fire & Allied Perils)') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.BIFireList) {
              if (build.IndemityPeriod == null || build.IndemityPeriod == '' || build.IndemityPeriod == 0) build.IndemityPeriodError = true;
              else build.IndemityPeriodError = false;
              if (build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0) build.SumInsuredError = true;
              else build.SumInsuredError = false;
              if (build.IndemityPeriod == null || build.IndemityPeriod == '' || build.IndemityPeriod == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Money') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Office Contents') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['OfficeContentsSumInsured'] = this.productItem.OfficeContentsSumInsured;
            entry['DescriptionOfice'] = this.productItem.DescriptionOfice;
          }
          for (let build of entry.OfficeContentList) {
            if (build.DescriptionOfRisk == null || build.DescriptionOfRisk == '' || build.SumInsured == 0 || build.SumInsured == undefined) { i += 1 }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Goods in Transit') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['GoodsCategoryId'] = this.productItem.GoodsCategoryId;
            entry['GoodsBuildingUsage'] = this.productItem.GoodsBuildingUsage;
            entry['GoodsOccupationType'] = this.productItem.GoodsOccupationType;
            entry['GoodsSi'] = this.productItem.GoodsSi;
            entry['GoodsLimit'] = this.productItem.GoodsLimit;
          }
          if (entry.GoodsCategoryId == null || entry.GoodsCategoryId == '' || entry.GoodsCategoryId == 0 || entry.GoodsBuildingUsage == null || entry.GoodsBuildingUsage == '' || entry.GoodsBuildingUsage == 0 || entry.GoodsOccupationType == null || entry.GoodsOccupationType == '' || entry.GoodsOccupationType == 0 || entry.GoodsSi == null || entry.GoodsSi == '' || entry.GoodsSi == 0 || entry.GoodsLimit == null || entry.GoodsLimit == '' || entry.GoodsLimit == 0) { i += 1 }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Business All Risk') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.TableRowAllRisk) {
              if (build.ContentDesc == null || build.ContentDesc == '' || build.ContentDesc == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Plate Glass') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.PlateGlassList) {
              if (build.CategoryId == null || build.CategoryId == '' || build.CategoryId == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Machinery Breakdown') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.MachineryList) {
              if (build.ContentId == null || build.ContentId == '' || build.ContentId == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Electronic Equipment') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.ElecEquipList) {
              if (build.ContentId == null || build.ContentId == '' || build.ContentId == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0 ||
                build.ContentDesc == null || build.ContentDesc == '' || build.ContentDesc == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Accidental Damge') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['AccidentalSumInsured'] = this.productItem.AccidentalSumInsured;
            entry['DescriptionAcc'] = this.productItem.DescriptionAcc;
          }
          if (entry.AccidentalSumInsured == null || entry.AccidentalSumInsured == '' || entry.AccidentalSumInsured == 0 || entry.DescriptionAcc == null || entry.DescriptionAcc == '' || entry.DescriptionAcc == 0) { i += 1 }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Fidelity') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.FidelityList) {
              if (build.OccupationId == null || build.OccupationId == '' || build.OccupationId == 0 ||
                build.Count == null || build.Count == '' || build.Count == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Public Liability') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.LiabilityList) {
              if (build.CategoryId == null || build.CategoryId == '' || build.CategoryId == 0 ||
                build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Group Personal Accident') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (j == this.tabIndex) {
            entry['GroupOccupationType'] = this.productItem.GroupOccupationType;
            entry['TotalNoOfGroupMemeber'] = this.productItem.TotalNoOfGroupMemeber;
            entry['IndemnityType'] = this.productItem.IndemnityType;
            entry['GroupSumInsured'] = this.productItem.GroupSumInsured;
          }
          for (let build of entry.GPAList) {
            if (build.OccupationType == null || build.OccupationType == '' || build.IndemnityType == 0 || build.IndemnityType == null || build.Count == undefined || build.Count == null || build.Count == '' || build.SumInsured == 0 || build.SumInsured == undefined || build.SumInsured == null) { entry['ContentSuminsuredError'] = true; i += 1 } else { entry['ContentSuminsuredError'] = false; }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Fire add on') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.FireAddOnList) {
              if (build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Stock add on') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.stockAddOnCoverList) {
              if (build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'Claim Experience Details') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            if (entry.claimExperienceList) {
              for (let build of entry.claimExperienceList) {
                if (build.CLHClaimYear == null || build.CLHClaimYear == '' || build.CLHClaimYear == 0 ||
                  build.CLHNatureOfLoss == null || build.CLHNatureOfLoss == '' || build.CLHNatureOfLoss == 0 ||
                  build.CLHDateOfLoss == null || build.CLHDateOfLoss == '' || build.CLHDateOfLoss == 0 ||
                  build.CLHClaimedAmount == null || build.CLHClaimedAmount == '' || build.CLHClaimedAmount == 0 ||
                  build.CLHRemarks == null || build.CLHRemarks == '' || build.CLHRemarks == 0
                ) {
                  i += 1
                }
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'UnderWriter Questions') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.uwQuestionList) {
              if (build.Value == null || build.Value == '' || build.Value == 0
              ) {
                i += 1
              }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    if (index == 'BuildingDetails') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
            for (let build of entry.BuildingList) {
              if (build.WallType == null || build.WallType == '') { build['WallTypeError'] = true; i += 1 } else { build['WallTypeError'] = false; }
              if (build.RoofType == null || build.RoofType == '') { build['RoofTypeError'] = true; i += 1 } else { build['RoofTypeError'] = false; }
              if (build.BuildingYear == null || build.BuildingYear == '') { build['BuildingYearError'] = true; i += 1 } else { build['BuildingYearError'] = false; }
              if (build.FirstLossPayee == null || build.FirstLossPayee == '') { build['FirstLossPayeeError'] = true; i += 1 } else { build['FirstLossPayeeError'] = false; }
              if (build.BuildingSumInsured == null || build.BuildingSumInsured == '' || build.BuildingSumInsured == 0) { build['SumInsuredError'] = true; i += 1 } else { build['SumInsuredError'] = false; }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
    else if (index == 'ContentRisk') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'C' || entry.CoversRequired == 'BC') {
            if(entry.ContentList){
              for (let build of entry.ContentList) {
                if (build.SumInsured == null || build.SumInsured == '' || build.Description == 0 || build.Description == undefined) { entry['ContentSuminsuredError'] = true; i += 1 } else { entry['ContentSuminsuredError'] = false; }
              }
            }
          }
        }
        j += 1;
        console.log(i, j, this.locationList.length);
        if (j == this.locationList.length) return i == 0;
      }
    }
    else if (index == 'Employers Liability') {
      let i = 0, j = 0;
      for (let entry of this.locationList) {
        if (j == this.tabIndex) {
          if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
          else { entry['LocationNameError'] = false; }
          if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
          else { entry['BuildingAddressError'] = false; }
          if (entry.CoversRequired == 'C' || entry.CoversRequired == 'BC') {
            for (let build of entry.EmployersList) {
              if (build.OccupationId == null || build.OccupationId == '' || build.Count == 0 || build.Count == null || build.Count == undefined || build.SumInsured == null || build.SumInsured == '' || build.SumInsured == 0) { entry['ContentSuminsuredError'] = true; i += 1 } else { entry['ContentSuminsuredError'] = false; }
            }
          }
        }
        j += 1;
        if (j == this.locationList.length) return i == 0;
      }
    }
  }
  listProceed(type, id, event?) {
    if (type == 'Domestic') {
      if (id != undefined) {
        this.currentDomestic = this.domesticMenus[id].menu;
      }
      else {
        if (this.currentDomestic == 'BuildingDetails' || this.currentDomestic == 'ContentRisk') {
          let valid = this.checkTabValidation(this.currentDomestic);
          if (valid) {
            let index = this.domesticMenus.findIndex(item => item.menu === this.currentDomestic);
            this.domesticMenus[index].filled = true;
            if (id) this.currentDomestic = this.domesticMenus[id].menu;
            else this.currentDomestic = this.domesticMenus[++index]?.menu;
          }
        }
        else {
          let filled = this.checkFilled(this.currentDomestic);
          console.log(filled);
          if (filled) {
            let index = this.domesticMenus.findIndex(item => item.menu === this.currentDomestic);
            this.domesticMenus[index].filled = true;
          }
          let index = this.domesticMenus.findIndex(item => item.menu === this.currentDomestic);
          this.currentDomestic = this.domesticMenus[++index]?.menu;
          if (!this.currentDomestic || this.currentDomestic == 'undefined'){}
        }
      }
    }
  }
  checkTabValidation(index) {
        if (index == 'BuildingDetails') {
          let i = 0, j = 0;
          console.log(this.locationList);
          for (let entry of this.locationList) {
            if (j == this.tabIndex) {
              if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
              else { entry['LocationNameError'] = false; }
              if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
              else { entry['BuildingAddressError'] = false; }
              if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') {
                for (let build of entry.BuildingList) {
                  if (build.WallType == null || build.WallType == '') { build['WallTypeError'] = true; i += 1 } else { build['WallTypeError'] = false; }
                  if (build.RoofType == null || build.RoofType == '') { build['RoofTypeError'] = true; i += 1 } else { build['RoofTypeError'] = false; }
                  if (build.BuildingYear == null || build.BuildingYear == '') { build['BuildingYearError'] = true; i += 1 } else { build['BuildingYearError'] = false; }
                  if (build.FirstLossPayee == null || build.FirstLossPayee == '') { build['FirstLossPayeeError'] = true; i += 1 } else { build['FirstLossPayeeError'] = false; }
                  if (build.BuildingSumInsured == null || build.BuildingSumInsured == '' || build.BuildingSumInsured == 0) { build['SumInsuredError'] = true; i += 1 } else { build['SumInsuredError'] = false; }
                }
              }
            }
            j += 1;
            if (j == this.locationList.length) return i == 0;
          }
        }
        else if (index == 'ContentRisk') {
          let i = 0, j = 0;
          for (let entry of this.locationList) {
            if (j == this.tabIndex) {
              if (entry.LocationName == null || entry.LocationName == '') { entry['LocationNameError'] = true; i += 1; }
              else { entry['LocationNameError'] = false; }
              if (entry.BuildingAddress == null || entry.BuildingAddress == '') { entry['BuildingAddressError'] = true; i += 1; }
              else { entry['BuildingAddressError'] = false; }
              if (entry.CoversRequired == 'C' || entry.CoversRequired == 'BC') {
                if (j == this.tabIndex) { entry['ContentSuminsured'] = this.productItem.ContentSuminsured }
                if (entry.CoversRequired == 'C' || entry.CoversRequired == 'BC') {
                  const ContentRiskArray = []
                  let list = [];
                  this.productItem.contentRiskDomestic = []; let l = 0;
                  for (let obj of list) {
                    if (obj.SumInsured != '' && obj.Description != '') {
                      this.productItem.contentRiskDomestic.push(obj);
                    }
                    l += 1;
                    if (l == list.length) {
                      if (this.productItem.contentRiskDomestic.length != 0) { entry['ContentSuminsuredError'] = false; }
                      else { i += 1; entry['ContentSuminsuredError'] = true; }
                    }
                  }
                }
                else { entry['ContentSuminsuredError'] = false; }
              }
            }
            j += 1;
            if (j == this.locationList.length) return i == 0;
          }
        }
    }
    onProceed(res){
      if(res){
        this.locationList=res?.locationList;
        if(res?.type=='Save'){
           let index = this.domesticMenus.findIndex(item => item.menu === this.currentDomestic);
           this.domesticMenus[index].filled = true;
           this.currentDomestic = this.domesticMenus[++index]?.menu;
        }
        else if(res.type=='Submit' || res.type=='Next'){
          this.onSaveDomesticDetails(res)
        }
      }
    }
    onSaveDomesticDetails(response){
      console.log("Submit Loc",this.locationList)
      let i=0,locationList=[];
        for(let loc of this.locationList){
            let obj={
                "LocationId": i + 1,
                "LocationName": loc.LocationName,
                "CoversRequired": this.CoversRequired,
                "BuildingOwnerYn": this.BuildingOwnerYn,
                "Address": loc.BuildingAddress,
                "SectionList": []
            }
            if(this.tabIndex==i){
              if(loc['BuildingList'] && (this.CoversRequired=='B' || this.CoversRequired=='BC')){
                  if(obj.SectionList){obj.SectionList = obj.SectionList.filter(ele=>ele.CoverId!='105')}
                  else obj['SectionList']=[];
                  for (let build of loc.BuildingList) {
                    if (build.BuildingSumInsured != 0 && build.BuildingSumInsured != null && build.RoofType != null && build.WallType != null) {
                      let subEntry = {
                        "CoverId": "105",
                        "SectionId": "34",
                        "SectionName": "Building",
                        "Status": "Y",
                        "RiskId": null,
                        "RoofType": build.RoofType,
                        "WallType": build.WallType,
                        "BuildingBuildYear": build.BuildingYear,
                        // "BuildingBuildYear": '2024',
                        "BuildingOwnerYn": "N",
                        "FirstLossPayee": build.FirstLossPayee,
                        "BuildingSumInsured": build.BuildingSumInsured,
                        "DescriptionOfRisk": build.BuildingDescription,
                        "SumInsured": build.BuildingSumInsured,
                        "BuildingUsageId": null,
                        "WaterTankSi": null,
                        "ArchitectsSi": null,
                        "LocationName": loc?.LocationName,
                        "LossOfRentSi": this.productItem?.LossOfRentSi,
                        "TypeOfProperty": this.productItem?.TypeOfProperty,
                        "BuildingAddress": loc?.BuildingAddress
                      }
                      obj.SectionList.push(subEntry);
                    }
                  }
              }
              else obj.SectionList = obj.SectionList.filter(ele=>ele.CoverId!='105')
              if(loc['contentRiskDomestic'] && (this.CoversRequired=='C' || this.CoversRequired=='BC')){
                  if(obj.SectionList){loc.SectionList = obj.SectionList.filter(ele=>ele.CoverId!='290')}
                  else obj['SectionList']=[];
                  if (loc.contentRiskDomestic) {
                  for (let index = 0; index < loc.contentRiskDomestic.length; index++) {
                    if (loc.contentRiskDomestic[index]?.SumInsured != null && loc.contentRiskDomestic[index]?.SumInsured != 0 && loc.contentRiskDomestic[index]?.SumInsured != '0' && loc.contentRiskDomestic[index]?.SumInsured != '' && loc.contentRiskDomestic[index]?.SumInsured != 'undefined') {
                      let altEntry = {
                        "SectionId": "34",
                        "SectionName": "Household Contents",
                        "CoverId": "290",
                        "SumInsured": loc.contentRiskDomestic[index]?.SumInsured.replace(/,/g, ''),
                        "DescriptionOfRisk": loc.contentRiskDomestic[index]?.Description,
                        "OtherOccupation": index
                      }
                      if (loc['IndustryType']) { altEntry['IndustryType'] = loc['IndustryType']; altEntry["IndustryTypeDesc"] = this.industryTypeList.find(ele => ele.Code == loc['IndustryType'])?.CodeDesc }
                      obj.SectionList.push(altEntry);
                    }
                  }
                }
              }
              else obj.SectionList = obj.SectionList.filter(ele=>ele.CoverId!='290')
              if (loc['allRisk']) {
                if(obj.SectionList){obj.SectionList = obj.SectionList.filter(ele=>ele.CoverId!='45')}
                else obj['SectionList']=[];
                for (let index = 0; index < loc.allRisk.length; index++) {
                  if (loc.allRisk[index]?.AllriskSumInsured != null && loc.allRisk[index]?.AllriskSumInsured != 0 && loc.allRisk[index]?.AllriskSumInsured != '0') {
                    let altEntry = {
                      "SectionId": "34",
                      "SectionName": "All Risk",
                      "CoverId": "45",
                      "AllriskSumInsured": loc.allRisk[index]?.AllriskSumInsured.replace(/,/g, ''),
                      "SumInsured": loc.allRisk[index]?.AllriskSumInsured.replace(/,/g, ''),
                      "DescriptionOfRisk": loc.allRisk[index]?.AllriskDescription,
                      "OtherOccupation": index
                    }
                    if (loc['IndustryType']) { altEntry['IndustryType'] = loc['IndustryType']; altEntry["IndustryTypeDesc"] = this.industryTypeList.find(ele => ele.Code == loc['IndustryType'])?.CodeDesc }
                    obj.SectionList.push(altEntry);
                  }
                }
              }
              if (loc.EERiskDomestic.length != 0) {
                if(obj.SectionList){obj.SectionList = obj.SectionList.filter(ele=>ele.CoverId!='90')}
                else obj['SectionList']=[];
                for (let i = 0; i < loc.EERiskDomestic.length; i++) {
                  let payload = {
                    "SectionId": "34",
                    "SectionName": "Electronic Equipment",
                    "CoverId": "90",
                    "TotalNoOfEmployees": "1",
                    "ContentId": loc.EERiskDomestic[i].ContentId,
                    "ContentDesc": loc.EERiskDomestic[i].ContentDesc,
                    "DescriptionOfRisk": loc.EERiskDomestic[i].Description,
                    "SumInsured": String(loc.EERiskDomestic[i].SumInsured).replaceAll(",", ""),
                    "Status": "Y"
                  }
                  obj.SectionList.push(payload);
                }
              }
              if(loc.SectionList){
                  let liabilityList = loc.SectionList.filter(ele=>ele.CoverId=='593');
                  if(liabilityList.length!=0) obj.SectionList = obj.SectionList.concat(liabilityList)
              }
            }
            else if(loc.SectionList){obj.SectionList=loc.SectionList}
            locationList.push(obj);
            i+=1;
            if(i==this.locationList.length){
                let res = {
                  "locationList": locationList,
                  "type": response.type
                }
                this.finalProceed.emit(res)
            }
        }
    }
    Previous(res){
      let index = this.domesticMenus.findIndex(item => item.menu === this.currentDomestic);
      this.currentDomestic = this.domesticMenus[--index]?.menu;
    }
    skip(res){
      let index = this.domesticMenus.findIndex(item => item.menu === this.currentDomestic);
      this.domesticMenus[index].filled = true;
      this.currentDomestic = this.domesticMenus[++index]?.menu;
    }
}

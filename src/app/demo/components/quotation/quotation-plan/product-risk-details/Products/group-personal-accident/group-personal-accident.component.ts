import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import { GPAPhoenix } from '../../../models/phoneix/PhoenixZambia/GroupPersonalAccident/GPA';
import { GPABotswana } from '../../../models/phoneix/PhoenixBotswana/GroupPersonalAccident/GPA';
import { GPAMozambique } from '../../../models/phoneix/PhoenixMozambique/GroupPersonalAccident/GPA';
import { GPASwaziland } from '../../../models/phoneix/PhoenixSwazilnd/GroupPersonalAccident/GPA';
import { GPANamibia } from '../../../models/phoneix/PhoenixNamibia/GroupPersonalAccident/GPA';
import { GPACommercialNamibia } from '../../../models/phoneix/PhoenixMocambique/CommercialPackagePlus/GroupPersonalAccident/GPA';
import { GPACommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/GroupPersonalAccident/GPA';
import { GPACommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/GroupPersonalAccident/GPA';
import { GPACommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/GroupPersonalAccident/GPA';
import { GPACommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/GroupPersonalAccident/GPA';
import { GPAApiMozambique } from '../../../models/phoneix/PhoenixMozambique/GroupPersonalAccident/GPAApi';
import { GPAApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/GroupPersonalAccident/GPAApi';
import { GPAApiPhoenix } from '../../../models/phoneix/PhoenixZambia/GroupPersonalAccident/GPAApi';
import { GPAApiBotswana } from '../../../models/phoneix/PhoenixBotswana/GroupPersonalAccident/GPAApi';
import { GPAApiNamibia } from '../../../models/phoneix/PhoenixNamibia/GroupPersonalAccident/GPAApi';
import { GPACommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/GroupPersonalAccident/GPAApi';
import { GPACommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/GroupPersonalAccident/GPAApi';
import { GPACommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/GroupPersonalAccident/GPAApi';
import { GPACommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/GroupPersonalAccident/GPAApi';
import { GPACommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/GroupPersonalAccident/GPAApi';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-group-personal-accident',
  standalone: false,
  templateUrl: './group-personal-accident.component.html',
  styleUrls: ['./group-personal-accident.component.css']
})
export class GroupPersonalAccidentComponent implements OnInit {
  @Input() form: FormGroup;coversreuired: any = null;insuranceId: any = null;
  @Input() productItem: any;userDetails: any = null;loginId: any = null;GPAcolumns: string[] = [];
  @Input() renderType: any = null;
  @Input() locationList: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  locationIndex: any = 0;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  IndustryError: boolean;
    showAddForm: boolean = false; 
  filteredGPAList: any[]=[];
  item: any[] = [];
 GPAList: any[] = [];
  userType: any = null;
  productId: any = null;
  editingIndex: number = null;
  isEditing: boolean = false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  GroupPersonalForm: any[] = [];phonixWeeks: any[]=[];occupationList: any[]=[];
  constructor(private sharedService: SharedService) {
    // Initialize form and productItem
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || '{}');
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
    let contentData = null;
    this.getNoOfWeeks();this.getOccupationEmployers();
    if (this.productId == '92') {
      if (this.insuranceId == "100046") contentData = new GPACommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new GPACommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new GPACommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new GPACommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new GPACommercialNamibia();
      this.GroupPersonalForm = contentData?.fields;
    } else {
      if (this.insuranceId == '100046') contentData = new GPAPhoenix();
      else if (this.insuranceId == '100047') contentData = new GPABotswana();
      else if (this.insuranceId == '100048') contentData = new GPAMozambique();
      else if (this.insuranceId == '100049') contentData = new GPASwaziland();
      else if (this.insuranceId == '100050') contentData = new GPANamibia();
      this.GroupPersonalForm = contentData?.fields;
    }
    this.getNoOfWeeks();
  }
  ngOnInit() {
    this.GPAcolumns = ['Occupation', 'No of Employees', 'Annual Remuneration', 'Temporary Disablement', 'Coverage', 'Medical Expenses', 'Actions'];
    if (this.locationList.length != 0) {this.onEditData();}
  }
  onEditData() {
   
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let groupPersonalApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") groupPersonalApi = new GPACommercialApiPhoenix();
            else if (this.insuranceId == '100047') groupPersonalApi = new GPACommercialApiBotswana();
            else if (this.insuranceId == '100048') groupPersonalApi = new GPACommercialApiMozambique();
            else if (this.insuranceId == '100049') groupPersonalApi = new GPACommercialApiSwaziland();
            else if (this.insuranceId == '100050') groupPersonalApi = new GPACommercialApiNamibia();
          }
          else {
            if (this.insuranceId == '100046') groupPersonalApi = new GPAApiPhoenix();
            else if (this.insuranceId == '100047') groupPersonalApi = new GPAApiBotswana();
            else if (this.insuranceId == '100048') groupPersonalApi = new GPAApiMozambique();
            else if (this.insuranceId == '100049') groupPersonalApi = new GPAApiSwaziland();
            else if (this.insuranceId == '100050') groupPersonalApi = new GPAApiNamibia();
          }
          obj = groupPersonalApi.getEditDetails(subDetails, obj,i);
          if (obj && this.tabIndex == i) {
              if(obj.list){
                if(obj.list.length!=0){
                  this.productItem.IndustryId = obj.list[0].IndustryId
                    this.GPAList = obj['list'];
                    this.filterGPAList();
                }
                else{
                  this.productItem.IndustryId = null;
                  this.GPAList = [];
                  this.filterGPAList();}
              }
          }
          i += 1;
        }
      }
    }
    else {
      let i = 0;
      for (let loc of this.locationList) {
        if (loc && this.tabIndex == i) {
          if(loc.list){
            if(loc.list.length!=0){
              this.productItem.IndustryId = loc.list[0].IndustryId
                this.GPAList = loc['list'];
                this.filterGPAList();
            }
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let groupPersonalApi = null, subDetails = this.locationDetails[i].SectionList;
              if (this.productId == '92') {
                if (this.insuranceId == "100046") groupPersonalApi = new GPACommercialApiPhoenix();
                else if (this.insuranceId == '100047') groupPersonalApi = new GPACommercialApiBotswana();
                else if (this.insuranceId == '100048') groupPersonalApi = new GPACommercialApiMozambique();
                else if (this.insuranceId == '100049') groupPersonalApi = new GPACommercialApiSwaziland();
                else if (this.insuranceId == '100050') groupPersonalApi = new GPACommercialApiNamibia();
              }
              else {
                if (this.insuranceId == '100046') groupPersonalApi = new GPAApiPhoenix();
                else if (this.insuranceId == '100047') groupPersonalApi = new GPAApiBotswana();
                else if (this.insuranceId == '100048') groupPersonalApi = new GPAApiMozambique();
                else if (this.insuranceId == '100049') groupPersonalApi = new GPAApiSwaziland();
                else if (this.insuranceId == '100050') groupPersonalApi = new GPAApiNamibia();
              }
              loc = groupPersonalApi.getEditDetails(subDetails, loc);
              if(loc.list){
                if(loc.list.length!=0){
                    this.productItem.IndustryId = loc.list[0].IndustryId
                    this.GPAList = loc['list'];
                    this.filterGPAList();
                }
              }
            }
          }
        }
        i += 1;
      }
    }
  }
  AddGPA() {
    if (
      !this.productItem.NumberofEmployees ||
      !this.productItem.TemporaryDisablement ||
      !this.productItem.MedicalExpenses
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields before adding.',
      });
      return;
    }
    this.GPAList.push({
      'NumberofEmployees': this.productItem.NumberofEmployees,
      'occupation': this.productItem.occupation,
      'AnnualRemuneration': this.productItem.AnnualRemuneration,
      'TemporaryDisablement': this.productItem.TemporaryDisablement,
      'Coverage': this.productItem.Coverage,
      'MedicalExpenses': this.productItem.MedicalExpenses,
      'LocationIndex': this.locationIndex
    });
    this.filterGPAList();
    this.showAddForm = !this.showAddForm;
    this.productItem.NumberofEmployees = null;
    this.productItem.occupation = null; this.productItem.AnnualRemuneration = null;
    this.productItem.TemporaryDisablement = null; this.productItem.Coverage = null;
    this.productItem.MedicalExpenses = null;
  }
  filterGPAList() {
    this.filteredGPAList = this.GPAList.filter(item => item.LocationIndex == this.locationIndex);
     //if(this.filterGPAList.length==0) this.showAddForm = true;
    console.log(this.filteredGPAList, 'filteredGPAList');
  }
  editGPA(event, index) {
    this.showAddForm = true;
    this.productItem.NumberofEmployees = event.NumberofEmployees;
    this.productItem.occupation = event.occupation; this.productItem.AnnualRemuneration = event.AnnualRemuneration;
    this.productItem.TemporaryDisablement = event.TemporaryDisablement; this.productItem.Coverage = event.Coverage;
    this.productItem.MedicalExpenses = event.MedicalExpenses;
    this.isEditing = true;
    this.editingIndex = index;
  }
  updateGPA() {
    if (this.editingIndex !== null) {
      this.GPAList[this.editingIndex].AnnualRemuneration = this.productItem.AnnualRemuneration;
      this.GPAList[this.editingIndex].occupation = this.productItem.occupation;
      this.GPAList[this.editingIndex].TemporaryDisablement = this.productItem.TemporaryDisablement;
      this.GPAList[this.editingIndex].Coverage = this.productItem.Coverage;
      this.GPAList[this.editingIndex].MedicalExpenses = this.productItem.MedicalExpenses;
      this.GPAList[this.editingIndex].NumberofEmployees = this.productItem.NumberofEmployees;
      this.GPAList[this.editingIndex].LocationIndex = this.locationIndex;
      // this.GPAList[this.editingIndex] = { ...this.productItem,LocationIndex:this.locationIndex };
      this.showAddForm = false;
      this.filterGPAList();
      this.productItem.NumberofEmployees = null;
      this.productItem.occupation = null; this.productItem.AnnualRemuneration = null;
      this.productItem.TemporaryDisablement = null; this.productItem.Coverage = null;
      this.productItem.MedicalExpenses = null;
      this.editingIndex = null;
    }
  }
  deleteGPA(rowIndex) {
    if (rowIndex !== null) {
      this.GPAList.splice(rowIndex, 1);
      this.filteredGPAList.splice(rowIndex, 1);
    }
  }
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  onProceedData(type) {
    let i = 0;
    if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') {
      i += 1;
      this.IndustryError = true;
    }
    else {
      this.IndustryError = false;
    }
    let locationList = [];
    if (i == 0) {
      let j = 0;
      for (let entry of this.locationList) {
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
            if(entry.SectionList) obj['SectionList']=entry.SectionList.filter(ele=>ele.SectionId!='182')
            if (this.GPAList?.filter(item => item.LocationIndex == j).length != 0) {
              // let gpalist = null;
              // gpalist = gpaApi?.getSaveDetails(entry, this.claimCostList, this.IndustryId, this.industryTypeList, obj, this.GPAList?.filter(item => item.LocationIndex == j))
              let list = this.GPAList?.filter(item => item.LocationIndex == j);
              if (list) {
                for (let i = 0; i < list.length; i++) {
                  if (list[i].MedicalExpenses != null && list[i].MedicalExpenses != '' && list[i].MedicalExpenses != undefined) {
                    let subEntry = {
                      "SectionId": "182",
                      "SectionName": "Group Personal Accident",
                      "CoverId": "126",
                      "SumInsured": String(list[i].MedicalExpenses),
                      "TotalNoOfEmployees": list[i].NumberofEmployees,
                      "IndemnityType": list[i].Coverage,
                      "CategoryId": list[i].occupation,
                      "Status": "Y",
                      "OtherOccupation": i,
                      "IndustryId": this.productItem.IndustryId,
                      "IndustryTypeDesc": this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc
                    }
                    obj.SectionList.push(subEntry);
                  }
                  if (list[i].AnnualRemuneration != null && list[i].AnnualRemuneration != '' && list[i].AnnualRemuneration != undefined) {
                    let subEntry = {
                      "SectionId": "182",
                      "SectionName": "Group Personal Accident",
                      "CoverId": "123",
                      "SumInsured": list[i].AnnualRemuneration,
                      "TotalNoOfEmployees": list[i].NumberofEmployees,
                      "IndemnityType": list[i].Coverage,
                      "CategoryId": list[i].occupation,
                      "Status": "Y",
                      "OtherOccupation": i,
                       "IndustryId": this.productItem.IndustryId,
                      "IndustryTypeDesc": this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc
                    }
                    obj.SectionList.push(subEntry);
                  }
                  if (list[i].TemporaryDisablement != null && list[i].TemporaryDisablement != '' && list[i].TemporaryDisablement != undefined) {
                    let subEntry = {
                      "SectionId": "182",
                      "SectionName": "Group Personal Accident",
                      "CoverId": "50",
                      "SumInsured": list[i].TemporaryDisablement,
                      "TotalNoOfEmployees": list[i].NumberofEmployees,
                      "IndemnityType": list[i].Coverage,
                      "CategoryId": list[i].occupation,
                      "Status": "Y",
                      "OtherOccupation": i,
                       "IndustryId": this.productItem.IndustryId,
                      "IndustryTypeDesc": this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc
                    }
                    obj.SectionList.push(subEntry);
                  }
                }
              }
              if (list) {
                if (this.productItem.MedicalExpenses && this.productItem.AnnualRemuneration && this.productItem.TemporaryDisablement && j == this.tabIndex) {
                  let unSavedEntry;
                  let unSavedEntry2;
                  let unSavedEntry3;
                  unSavedEntry = {
                    "SectionId": "182",
                    "SectionName": "Group Personal Accident",
                    "CoverId": "126",
                    "SumInsured": this.productItem.MedicalExpenses,
                    "TotalNoOfEmployees": this.productItem.NumberofEmployees,
                    "IndemnityType": this.productItem.Coverage,
                    "CategoryId": this.productItem.occupation,
                    "Status": "Y",
                    "OtherOccupation": this.GPAList.length,
                    "IndustryId": this.productItem.IndustryId,
                    "IndustryTypeDesc": this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc
                  }
                if(this.productItem.AnnualRemuneration!=null && this.productItem.AnnualRemuneration!=0 && this.productItem.AnnualRemuneration!=''){
                  unSavedEntry2 = {
                    "SectionId": "182",
                    "SectionName": "Group Personal Accident",
                    "CoverId": "123",
                    "SumInsured": this.productItem.AnnualRemuneration,
                    "TotalNoOfEmployees": this.productItem.NumberofEmployees,
                    "IndemnityType": this.productItem.Coverage,
                    "CategoryId": this.productItem.occupation,
                    "Status": "Y",
                    "OtherOccupation": this.GPAList.length,
                    "IndustryId": this.productItem.IndustryId,
                    "IndustryTypeDesc": this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc
                  }
                }
                  if(this.productItem.TemporaryDisablement!=null && this.productItem.TemporaryDisablement!=0 && this.productItem.TemporaryDisablement!=''){
                    unSavedEntry3 = {
                      "SectionId": "182",
                      "SectionName": "Group Personal Accident",
                      "CoverId": "50",
                      "SumInsured": this.productItem.TemporaryDisablement,
                      "TotalNoOfEmployees": this.productItem.NumberofEmployees,
                      "IndemnityType": this.productItem.Coverage,
                      "CategoryId": this.productItem.occupation,
                      "Status": "Y",
                      "OtherOccupation": this.GPAList.length,
                      "IndustryId": this.productItem.IndustryId,
                      "IndustryTypeDesc": this.industryTypeList.find(ele=>ele.Code==this.productItem.IndustryId)?.CodeDesc
                    }
                  }
                  let existingIndex = obj.SectionList.findIndex(item => item.CategoryId === this.productItem.occupation && item.SectionId == '182');
                  if (existingIndex !== -1) {
                    // Replace the existing entry
                    obj.SectionList = obj.SectionList.filter(item => (item.SectionId == '182' && item.CategoryId !== this.productItem.occupation) || item.SectionId != '182');
                  } else {
                    // Push a new entry
                    if(unSavedEntry) obj.SectionList.push(unSavedEntry)
                    if(unSavedEntry2) obj.SectionList.push(unSavedEntry2)
                    if(unSavedEntry3) obj.SectionList.push(unSavedEntry3)
                  }
                }
              }
            }
            else {
              if (this.productItem.MedicalExpenses && this.productItem.AnnualRemuneration && this.productItem.TemporaryDisablement) {
                let unSavedEntry;
                let unSavedEntry2;
                let unSavedEntry3;
                unSavedEntry = {
                  "SectionId": "182",
                  "SectionName": "Group Personal Accident",
                  "CoverId": "126",
                  "SumInsured": this.productItem.MedicalExpenses,
                  "TotalNoOfEmployees": this.productItem.NumberofEmployees,
                  "IndemnityType": this.productItem.Coverage,
                  "CategoryId": this.productItem.occupation,
                  "Status": "Y",
                  "OtherOccupation": this.GPAList.length
                }
              if(this.productItem.AnnualRemuneration!=null && this.productItem.AnnualRemuneration!=0 && this.productItem.AnnualRemuneration!=''){
                unSavedEntry2 = {
                  "SectionId": "182",
                  "SectionName": "Group Personal Accident",
                  "CoverId": "123",
                  "SumInsured": this.productItem.AnnualRemuneration,
                  "TotalNoOfEmployees": this.productItem.NumberofEmployees,
                  "IndemnityType": this.productItem.Coverage,
                  "CategoryId": this.productItem.occupation,
                  "Status": "Y",
                  "OtherOccupation": this.GPAList.length
                }
              }
              if(this.productItem.TemporaryDisablement!=null && this.productItem.TemporaryDisablement!=0 && this.productItem.TemporaryDisablement!=''){
                unSavedEntry3 = {
                  "SectionId": "182",
                  "SectionName": "Group Personal Accident",
                  "CoverId": "50",
                  "SumInsured": this.productItem.TemporaryDisablement,
                  "TotalNoOfEmployees": this.productItem.NumberofEmployees,
                  "IndemnityType": this.productItem.Coverage,
                  "CategoryId": this.productItem.occupation,
                  "Status": "Y",
                  "OtherOccupation": this.GPAList.length
                }
              }
                let existingIndex = obj.SectionList.findIndex(item => item.CategoryId === this.productItem.occupation && item.SectionId == '182');
                if (existingIndex !== -1) {
                  // Replace the existing entry
                  obj.SectionList = obj.SectionList.filter(item => (item.SectionId == '182' && item.CategoryId !== this.productItem.occupation) || item.SectionId != '182');
                } else {
                  // Push a new entry
                  if(unSavedEntry) obj.SectionList.push(unSavedEntry)
                  if(unSavedEntry2) obj.SectionList.push(unSavedEntry2)
                  if(unSavedEntry3) obj.SectionList.push(unSavedEntry3)
                }
              }
            }
        }
        else{
          if (entry.SectionList) {
              obj.SectionList = entry['SectionList']
            }
        }
        // let groupPersonalApi = null;
        // if(this.productId=='92'){
        //   if (this.insuranceId == "100046") groupPersonalApi = new GPACommercialApiPhoenix();
        //   else if (this.insuranceId == '100047') groupPersonalApi = new GPACommercialApiBotswana();
        //   else if (this.insuranceId == '100048') groupPersonalApi = new GPACommercialApiMozambique();
        //   else if (this.insuranceId == '100049') groupPersonalApi = new GPACommercialApiSwaziland();
        //   else if (this.insuranceId == '100050') groupPersonalApi = new GPACommercialApiNamibia();
        // }
        // else{
        //     if (this.insuranceId == '100046') groupPersonalApi = new GPAApiPhoenix();
        //     else if (this.insuranceId == '100047') groupPersonalApi = new GPAApiBotswana();
        //     else if (this.insuranceId == '100048') groupPersonalApi = new GPAApiMozambique();
        //     else if (this.insuranceId == '100049') groupPersonalApi = new GPAApiSwaziland();
        //     else if (this.insuranceId == '100050') groupPersonalApi = new GPAApiNamibia();
        //     if (entry['NumberofEmployees'] != undefined && entry['TemporaryDisablement'] != undefined && entry['MedicalExpenses'] != undefined && entry['Coverage'] != undefined && entry['IndustryType'] != undefined) {
        //       let glassApilist: any = groupPersonalApi.getSaveDetails(entry, this.GroupPersonalForm, this.productItem.IndustryId, this.industryTypeList, obj)
        //       if (glassApilist) { obj = glassApilist }
        //     }
        //     else if (entry.SectionList) {
        //       obj.SectionList = entry['SectionList']
        //     }
        // }
        locationList.push(obj);
        j += 1;
      }
      let res = {
        "locationList": locationList,
        "type": type
      }
      if (type == 'packageData') {
        this.saveSection.emit(res);
      }
      else {
        this.finalProceed.emit(res)
      }
    }
  }
  skip() {
    this.skipSection.emit('Group Personal Accident');
  }
  previous() {
    this.previousSection.emit(true);
  }
  getNoOfWeeks() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "NO_OF_WEEKS"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null, label: "-Select-", "value": null }]
        this.phonixWeeks = data.Result;
        for (let i = 0; i < this.phonixWeeks.length; i++) {
          this.phonixWeeks[i].label = this.phonixWeeks[i]['CodeDesc'];
          this.phonixWeeks[i].value = this.phonixWeeks[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.phonixWeeks.length - 1) {
            if (this.productId == '57' || this.productId == '92') {
              console.log(this.GroupPersonalForm);
              let fieldList = this.GroupPersonalForm[0].fieldGroup[0].fieldGroup;
              for (let field of fieldList) {
                if (field.key == 'Coverage') {
                  field.props.options = defaultObj.concat(this.phonixWeeks);
                }
              }
            }
          }
        }
      })
  }
  getOccupationEmployers() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId,
      "TitleType": 'I'
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.occupationList = data.Result;
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
          for (let i = 0; i < this.occupationList.length; i++) {
            this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
            this.occupationList[i].value = this.occupationList[i]['Code'];
            if (i == this.occupationList.length - 1) {
              if (this.productId == '57' || this.productId == '92') {
                console.log(this.GroupPersonalForm);
                if (this.GroupPersonalForm) {
                  let fieldList = this.GroupPersonalForm[0].fieldGroup[0].fieldGroup;
                  if (fieldList) {
                    for (let field of fieldList) {
                      if (field.key == 'occupation') {
                        field.props.options = defaultRow.concat(this.occupationList);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getCodeDesc(coverage: string, list: any): string {
    if (list == 'phonixWeeks') return this.phonixWeeks?.find(item => item.Code === coverage)?.CodeDesc || 'N/A';
    if (list == 'occupation') return this.occupationList?.find(item => item.Code === coverage)?.CodeDesc || 'N/A';
  }
}
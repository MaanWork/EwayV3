import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@app/_services';
import {  MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '@app/app.component';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../app-config.json';
import { ShortTermVehicle } from '../../quotation/quotation-plan/models/Tanzaniya/ShortTermVehicle';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProductData } from '../../customer/customer-create-form/product';
@Component({
    selector: 'app-update-short-term-info',
    templateUrl: './update-short-term-info.component.html',
    styleUrls: ['./update-short-term-info.component.scss'],
})
export class UpdateShortInfoComponent implements OnInit {
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    public motorApiUrl: any = this.AppConfig.MotorApiUrl;
    public customApiUrl1:any = this.AppConfig.CustomApiUrl1;
        fields:any[]=[];productItem:any=null;customerDetails:any=null;
        requestReferenceNo: any=null;vehicleDetailsList:any[]=[];
        policyStartDate: any=null;
  vehicleId: any=null;
  policyEndDate: any=null;
  sourceType: any=null;
  sourceCodeDesc: any=null;
  Code: any=null;insuranceId: any=null;customerList: any[]=[];customerCode: any=null;customerName: any=null;brokerList: any[]=[];
  fuelTypeList: any[]=[];
  branchCode: any=null;motorDetails: any=null;commonDetails: any=null;currencyCode: any=null;productId: any=null;
  colorList: any[]=[];bodyTypeList: any[]=[];usageList: any[]=[];motorCategoryList: any[]=[];
  productList13: any[]=[];
  makeList: any[]=[];
  modelList: any[]=[];
  brokerCode: null;
  brokerBranchCode: null;
  brokerLoginId: null;
  userType: string;
  showCustomerList: boolean;
  userDetails: any;
  vehicleDetails: any;
  subuserType: string;
  promocode: null;
  commissionType: any;
  agencyCode: any;
  exchangeRate: any;
  bdmCode: any;
  ProductCode: any;
  loginId: string;
  brokerbranchCode: string;
  endorsementSection: any;
  endorsePolicyNo: any;
        constructor(private messageService: MessageService,private sharedService: SharedService,private appComp:AppComponent,
          private translate:TranslateService,private datePipe:DatePipe,private router:Router) {
          
           
        }
      
        ngOnInit(): void {
         
          let fireData = new ShortTermVehicle();
                let entry = [];
                this.fields[0] = fireData?.fields;
                let bodyTypeHooks = { onInit: (field: FormlyFieldConfig) => {
                  field.formControl.valueChanges.subscribe(() => {
                        this.onBodyTypeChange('change');
                  });
                } }
                let makeHooks ={ onInit: (field: FormlyFieldConfig) => {
                  field.formControl.valueChanges.subscribe(() => {
                    this.onMakeChange('change')
                  });
                } }
                let modelHooks ={ onInit: (field: FormlyFieldConfig) => {
                  field.formControl.valueChanges.subscribe(() => {
                    this.onModelChange('change')
                  });
                } }
                this.fields[0].fieldGroup[0].fieldGroup[0].hooks = bodyTypeHooks;
                this.fields[0].fieldGroup[0].fieldGroup[1].hooks = makeHooks;
                this.fields[0].fieldGroup[0].fieldGroup[2].hooks = modelHooks;
                let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                if (referenceNo) {
                  this.requestReferenceNo = referenceNo;
                  this.vehicleDetailsList =[];this.vehicleId = null;
                  this.getMotorDetails('direct');
                  //this.setCommonFormValues(null);
                }
                else {
                    this.productItem = new ProductData();
                    this.onBodyTypeChange('change');
                    
                    if(this.customerDetails) this.productItem.OwnerName = this.customerDetails.ClientName;
                    if(this.customerDetails?.PolicyHolderType){
                      this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
                    } 
                    this.getFuelTypeList();
                    this.getYearList();
                    this.getColorsList();
                    this.getBodyTypeList();
                    this.getUsageList();
                    this.getMotorCategoryList();
                    //this.getMotorCategoryList();
                }
          
        }
        getFuelTypeList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode
          }
          let urlLink = `${this.CommonApiUrl}dropdown/fueltype`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              if(data.Result){
                  this.fuelTypeList = data.Result;
                  for (let i = 0; i < this.fuelTypeList.length; i++) {
                    this.fuelTypeList[i].label = this.fuelTypeList[i]['CodeDesc'];
                    this.fuelTypeList[i].value = this.fuelTypeList[i]['Code'];
                    delete this.fuelTypeList[i].CodeDesc;
                    if (i == this.fuelTypeList.length - 1) {
                        let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                        if(this.motorDetails){
                          this.productItem.FuelType = this.fuelTypeList.find(ele=>ele.label==this.motorDetails.FuelType || ele.Code==this.motorDetails.FuelType)?.Code;
                        }
                        if(this.fields.length!=0){
                          let fields = this.fields[0].fieldGroup[0].fieldGroup;
                          
                          for(let field of fields){
                            if(field.key=='FuelType'){
                              field.props.options = defaultObj.concat(this.fuelTypeList);
                              if(field.formControl) field.formControl.setValue(this.productItem.FuelType);
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
        getBodyTypeList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode
          }
          let urlLink = `${this.CommonApiUrl}master/dropdown/induvidual/bodytype`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                  let sortedList = this.transform(data?.Result)
                  console.log("Sorted List",sortedList)
                  this.bodyTypeList = data.Result;
                  for (let i = 0; i < this.bodyTypeList.length; i++) {
                    this.bodyTypeList[i].label = this.bodyTypeList[i]['CodeDesc'];
                    this.bodyTypeList[i].value = this.bodyTypeList[i]['Code'];
                    delete this.bodyTypeList[i].CodeDesc;
                    if (i == this.bodyTypeList.length - 1) {
                        let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                        
                        if(this.fields.length!=0){ this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.bodyTypeList);}
                        if(this.motorDetails){
                          
                          this.productItem.BodyType = this.bodyTypeList.find(ele=>ele.label==this.motorDetails.VehicleTypeDesc || ele.Code ==this.motorDetails.VehicleType)?.Code;
                          if(this.fields.length!=0){
                            let fields = this.fields[0].fieldGroup[0].fieldGroup;
                            for(let field of fields){
                              if(field.key=="BodyType"){
                              if(field.formControl) field.formControl.setValue(this.productItem.BodyType);
                              }
                            }
                          }
                          // this.fields[0].fieldGroup[0].fieldGroup[0].formControl.controls['BodyType'].setValue(this.productItem.BodyType);
                          this.onBodyTypeChange('direct');
                        }
                    }
                  } 
              }
        
            },
            (err) => { },
          );
        }
        getUsageList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode
          }
          let urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                  this.usageList = data.Result;
                  for (let i = 0; i < this.usageList.length; i++) {
                    this.usageList[i].label = this.usageList[i]['CodeDesc'];
                    this.usageList[i].value = this.usageList[i]['Code'];
                    delete this.usageList[i].CodeDesc;
                    if (i == this.usageList.length - 1) {
                      let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                      if(this.motorDetails){
                        this.productItem.MotorUsage = this.usageList.find(ele=>ele.label==this.motorDetails.Motorusage || ele.Code ==this.motorDetails.Motorusage)?.Code;
                      }
                      if(this.fields.length!=0){
                        let fields = this.fields[0].fieldGroup[0].fieldGroup;
                      
                        for(let field of fields){
                          if(field.key=='MotorUsage'){
                            field.props.options = defaultObj.concat(this.usageList);
                            if(field.formControl) field.formControl.setValue(this.productItem.MotorUsage);
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
        getMotorCategoryList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode
          }
          let urlLink = `${this.CommonApiUrl}dropdown/motorcategory`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                  this.motorCategoryList = data.Result;
                  for (let i = 0; i < this.motorCategoryList.length; i++) {
                    this.motorCategoryList[i].label = this.motorCategoryList[i]['CodeDesc'];
                    this.motorCategoryList[i].value = this.motorCategoryList[i]['Code'];
                    delete this.motorCategoryList[i].CodeDesc;
                    if (i == this.motorCategoryList.length - 1) {
                      let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                      if(this.motorDetails){
                        this.productItem.MotorCategory = this.motorCategoryList.find(ele=>ele.label==this.motorDetails.MotorCategory || ele.Code ==this.motorDetails.MotorCategory)?.Code;
                      }
                      if(this.fields.length!=0){
                        let fields = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fields){
                          if(field.key=='MotorCategory'){
                            field.props.options = defaultObj.concat(this.motorCategoryList);
                            if(field.formControl) field.formControl.setValue(this.productItem.MotorCategory);
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
        transform(values: any[]): any[] {
          return values.sort((a,b) => Number(a['Code']) -  Number(b['Code']))
        }
        getColorsList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode
          }
          let urlLink = `${this.CommonApiUrl}master/dropdown/color`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              if(data.Result){
                  this.colorList = data.Result;
                  for (let i = 0; i < this.colorList.length; i++) {
                    this.colorList[i].label = this.colorList[i]['CodeDesc'];
                    this.colorList[i].value = this.colorList[i]['Code'];
                    delete this.colorList[i].CodeDesc;
                    if (i == this.colorList.length - 1) {
                        let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                        let fields = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fields){
                          console.log("Received Iterate",field)
                          if(field.key=='Color'){
                            field.props.options = defaultObj.concat(this.colorList);
                          }
                        }
                    }
                  }
              }
            },
            (err) => { },
          );
        }
        getYearList() {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            const currentYear = new Date().getFullYear() - 40, years = [];
            while (year >= currentYear) {
              let yearEntry = year--
              years.push({ "label": String(yearEntry), "value": String(yearEntry) });
              if (year == currentYear) {
                let defaultObj = [{ 'label': '-Select-', 'value': '','Code':'' }]
                if (this.productId != '59' && this.productId!='46') this.fields[0].fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(years);
                if(this.productId=='46'){
                  let fields = this.fields[0].fieldGroup[0].fieldGroup;
                  for(let field of fields){
                    console.log("Received Iterate",field)
                    if(field.key=='ManufactureYear'){
                      field.props.options = defaultObj.concat(years);
                    }
                  }
                  //this.fields[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(years);
                }
                //if(this.productId=='59') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(years);
                
                
              }
          
            }
          }
        onBodyTypeChange(type){
            if(type=='change'){
              
              this.productItem.Make = '';
              this.productItem.Model = '';
              this.productItem.ModelDesc = null;
              this.productItem.OtherModelDesc = null;
            }
            this.getMakeList();
            if(this.productItem.BodyType==null || this.productItem.BodyType=='' || this.productItem.BodyType=='1' || this.productItem.BodyType=='2' || this.productItem.BodyType=='3' || this.productItem.BodyType=='4' || this.productItem.BodyType=='5'){
              let fields = this.fields[0].fieldGroup[0].fieldGroup;
              for(let field of fields){
                if(field.key=='Make'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                }
                if(field.key=='Model'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                  field.hideExpression=false;field.hide=false;
                }
                else if(field.key=='ModelDesc'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                  field.hideExpression=true;field.hide=true;}
                else if(field.key=='OtherModelDesc'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                  if(this.productItem.Model=='99999') {field.hideExpression=false;field.hide=false;}
                  else{field.hideExpression=true;field.hide=true;}
                }
              }
              // this.fields[0].fieldGroup[0].fieldGroup[3].hideExpression = true;
              // this.fields[0].fieldGroup[0].fieldGroup[2].hideExpression = false;
            }
            else{
              let fields = this.fields[0].fieldGroup[0].fieldGroup;
              for(let field of fields){
                if(field.key=='Model'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                  field.hideExpression=true;field.hide=true;
                }
                else if(field.key=='ModelDesc'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                  field.hideExpression=false;field.hide=false;
                }
                else if(field.key=='OtherModelDesc'){
                  if(type=='change' && field.formControl) {field.formControl.setValue('');}
                  if(this.productItem.Model=='99999') {field.hideExpression=false;field.hide=false;}
                  else{field.hideExpression=true;field.hide=true;}
                }
              }
            }
        }
        getMakeList(){
          if(this.productItem.BodyType!='' && this.productItem.BodyType!=null){
            let ReqObj = {
              "BodyId": this.productItem.BodyType,
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode
            }
            let urlLink = `${this.CommonApiUrl}master/dropdown/motormake`;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if(data.Result){
                    this.makeList = data.Result;
                    for (let i = 0; i < this.makeList.length; i++) {
                      this.makeList[i].label = this.makeList[i]['CodeDesc'];
                      this.makeList[i].value = this.makeList[i]['Code'];
                      delete this.makeList[i].CodeDesc;
                      if (i == this.makeList.length - 1) {
                          let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                          this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.makeList);
                          if(this.motorDetails){
                            this.productItem.Make = this.makeList.find(ele=>ele.label==this.motorDetails.Vehiclemake || ele.Code==this.motorDetails.Vehiclemake || ele.Code == this.motorDetails.VehiclemakeDesc)?.Code;
                            this.productItem.Model = this.motorDetails.Vehiclemodel;
                            this.productItem.ModelDesc = this.motorDetails.VehicleModelDesc;
                            this.productItem.OtherModelDesc = this.motorDetails.VehicleModelDesc;
                            if(this.fields.length!=0){
                              let fields = this.fields[0].fieldGroup[0].fieldGroup;
                              for(let field of fields){
                                if(field.key=="Make"){ if(field.formControl) field.formControl.setValue(this.productItem.Make);}
                                if(field.key=="Model"){ if(field.formControl) field.formControl.setValue(this.productItem.Model);}
                                if(field.key=="ModelDesc"){ if(field.formControl) field.formControl.setValue(this.productItem.ModelDesc);}
                                if(field.key=="OtherModelDesc"){ if(field.formControl) field.formControl.setValue(this.motorDetails.VehicleModelDesc);}
                              }
                            }
                            this.onModelChange('direct');
                            if(this.productItem.Make) this.onMakeChange('direct');
                            
                          }
                          else{this.productItem.Make='';this.productItem.Model='';this.productItem.ModelDesc=null;this.productItem.OtherModelDesc=null;}
                      }
                    }
                }
              },
              (err) => { },
            );
          }
          
        }
        onMakeChange(type){
          if(this.productItem.Make!='' && this.productItem.Make!=null){
            let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode,
              "MakeId": this.productItem.Make,
              "BodyId": this.productItem.BodyType
            }
            let urlLink = `${this.CommonApiUrl}master/dropdown/motormakemodel`;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if(data.Result){
                    this.modelList = data.Result;
                    for (let i = 0; i < this.modelList.length; i++) {
                      this.modelList[i].label = this.modelList[i]['CodeDesc'];
                      this.modelList[i].value = this.modelList[i]['Code'];
                      delete this.modelList[i].CodeDesc;
                      if (i == this.modelList.length - 1) {
                        let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                        if(this.fields.length!=0){ this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.modelList);}
                        //if(type=='change') this.productItem.Model = '';
                      
                        if(this.motorDetails){
                          this.productItem.Model = this.modelList.find(ele=>ele.label==this.motorDetails.Vehcilemodel || ele.Code==this.motorDetails.Vehcilemodel)?.Code;
                          this.productItem.ModelDesc = this.motorDetails.VehicleModelDesc;
                          this.productItem.OtherModelDesc = this.motorDetails.VehicleModelDesc;
                          if(this.fields.length!=0){
                            let fields = this.fields[0].fieldGroup[0].fieldGroup;
                            for(let field of fields){
                              if(field.key=="Model"){ if(field.formControl) field.formControl.setValue(this.productItem.Model);}
                              if(field.key=="ModelDesc"){ if(field.formControl) field.formControl.setValue(this.productItem.ModelDesc);}
                              if(field.key=="OtherModelDesc"){ if(field.formControl) field.formControl.setValue(this.productItem.OtherModelDesc);}
                            }
                          }
                          this.onModelChange('direct');
                          
                        }
                       
                    }
                    }
                }
              },
              (err) => { },
            );
          }
          else{
            this.productItem.Model='';
            this.fields[0].fieldGroup[0].fieldGroup[2].props.options = [{ 'label': '-Select-', 'value': '' }];
          }
        }
        onModelChange(type){
          if(this.fields.length!=0){
            let fields = this.fields[0].fieldGroup[0].fieldGroup;
            for(let field of fields){
              if(field.key=='OtherModelDesc'){
                if(type=='change' && field.formControl) {field.formControl.setValue('');}
                if(this.productItem.Model=='99999') {field.hideExpression=false;field.hide=false;}
                else{field.hideExpression=true;field.hide=true;}
              }
            }
          }
        }
        getMotorDetails(type){
          if(type=='direct'){
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo
            }
            let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if(data.Result){
                    this.vehicleDetailsList = data.Result;
                    if(data.Result.length!=0){
                      for(let veh of data.Result){
                        veh['Active'] = true;
                      }
                      let vehicleDetails = data.Result;
                      this.commonDetails = data.Result;
                      this.currencyCode = vehicleDetails[0].Currency;
                      this.getIndividualVehicle(type,vehicleDetails);
                    }
                }
              });
          }
          else this.getIndividualVehicle(type,this.vehicleDetailsList);
        }
        getIndividualVehicle(type,vehicleDetails){
            if(this.vehicleId ==null || this.vehicleId==undefined){
              this.policyStartDate = vehicleDetails[0].PolicyStartDate;
              this.policyEndDate = vehicleDetails[0].PolicyEndDate;
              this.sourceType = vehicleDetails[0]?.SourceTypeId;
              this.sourceCodeDesc=vehicleDetails[0]?.SourceType
              this.Code= vehicleDetails[0]?.SourceTypeId;
              if(this.Code)this.onSourceTypeChange('direct')
              this.customerCode=vehicleDetails[0]?.CustomerCode;
              this.customerName = vehicleDetails[0]?.CustomerName;
              this.vehicleId = vehicleDetails[0].Vehicleid;
            }
            sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleDetails));
            this.commonDetails = this.vehicleDetailsList;
            this.setCommonFormValues(type);
        }
        setCommonFormValues(type){
            if(this.productId!='14'){
              let refNo = sessionStorage.getItem('quoteReferenceNo');
              if(refNo==undefined) refNo = this.requestReferenceNo
              let ReqObj = {
                "RequestReferenceNo": refNo,
                "SectionId":  null
              }
              let urlLink = null;
              //if(this.productId=='39'){ReqObj.SectionId='41';urlLink=`${this.motorApiUrl}api/slide9/getmachinerybreakdown`;}
              if(this.productId=='13' && this.insuranceId!='100046' && this.insuranceId!='100047' && this.insuranceId!='100048' && this.insuranceId!='100049' && this.insuranceId!='100050'){ReqObj.SectionId='35';ReqObj['RiskId']=null;urlLink=`${this.motorApiUrl}api/slide13/getpersonlaaccident`}
              //else if(this.productId=='16'){ReqObj.SectionId='42';urlLink=`${this.motorApiUrl}api/slide10/getmoneydetails`;}
              else if(this.productId=='14'){ReqObj.SectionId='45';urlLink=`${this.motorApiUrl}api/slide7/getempliablity`;}
              else if(this.productId=='15'){ReqObj.SectionId='38';urlLink=`${this.motorApiUrl}api/slide7/getempliablity`;}
              else if(this.productId=='32'){ReqObj.SectionId='43';urlLink=`${this.motorApiUrl}api/slide8/getfidelityemp`;}
             // else if(this.productId=='1'){ReqObj.SectionId='52';urlLink=`${this.motorApiUrl}api/slide3/getburglaryandhouse`;}
              else if(this.productId=='21'){ReqObj.SectionId='3';urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;}
              else if(this.productId=='26' && this.insuranceId!='100046' && this.insuranceId!='100047' && this.insuranceId!='100048' && this.insuranceId!='100049' && this.insuranceId!='100050'){ReqObj.SectionId='3';urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;}
              //else if(this.productId=='25' && this.insuranceId!='100046' && this.insuranceId!='100047' && this.insuranceId!='100048'){ReqObj.SectionId='76';urlLink=`${this.motorApiUrl}api/slide6/getelectronicequip`;}
              //else if(this.productId=='42'){ReqObj.SectionId=this.ProductCode;urlLink=`${this.motorApiUrl}api/slide6/getelectronicequip`;}
              else if(this.productId=='43'){ReqObj.SectionId='70';urlLink=`${this.motorApiUrl}api/slide12/getpublicliability`;}
              else if(this.productId=='27' && this.insuranceId!='100046' && this.insuranceId!='100047' && this.insuranceId!='100048' && this.insuranceId!='100049' && this.insuranceId!='100050'){ReqObj.SectionId='54';urlLink=`${this.motorApiUrl}api/slide12/getpublicliability`;}
              else if(this.productId=='56'){ReqObj.SectionId=this.ProductCode;urlLink=`${this.motorApiUrl}api/slide15/gethealthinsure`;}
              else if(this.productId=='46'){ReqObj['Vehicleid']=this.vehicleId;urlLink=`${this.motorApiUrl}api/getmotordetails`;}
              else if(this.productId=='57' && this.insuranceId!='100046' && this.insuranceId!='100047' && this.insuranceId!='100048' && this.insuranceId!='100049' && this.insuranceId!='100050'){ReqObj['SectionId']='45';urlLink=`${this.motorApiUrl}api/slide13/getpersonlaaccident`;}
              //else if(this.productId=='60'){ReqObj.SectionId='106';urlLink=`${this.motorApiUrl}api/slide15/gethumantype`;}
              this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                  if (data.Result) {
                      let details = data?.Result;
                      
                        this.productItem = new ProductData();
                        this.motorDetails = data.Result;
                        this.vehicleDetails = data.Result;
                        this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
                        this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
                        this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
                        this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
                        this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
                        this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
                        this.productItem.ChassisNo = this.vehicleDetails.Chassisnumber;
                        this.productItem.RegistrationNo = this.vehicleDetails.Registrationnumber;
                        this.productItem.ManufactureYear = data.Result.ManufactureYear;
                        this.customerName = this.vehicleDetails?.CustomerName;
                        this.productItem.Color = data.Result.Color;
                        // this.productItem.EngineNo = 
                        if(this.productItem.ChassisNo == this.productItem.RegistrationNo){this.productItem.RegistrationNo=null;}
                        if(this.customerDetails) this.productItem.OwnerName = this.customerDetails.ClientName;
                        this.productItem.SeatingCapacity = data.Result.SeatingCapacity;
                        this.productItem.EngineNo = data.Result.EngineNumber;
                        this.productItem.EngineCapacity = data.Result.EngineCapacity;
                        this.productItem.MotorCategory = data.Result.MotorCategory;
                          if(this.customerDetails?.PolicyHolderType){
                            this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
                          } 
                          this.getFuelTypeList();
                          this.getYearList();
                          this.getColorsList();
                          this.getBodyTypeList();
                          this.getUsageList();
                          this.getMotorCategoryList();
                          this.getMakeList();
                          if(type=='Group'){
                             this.saveMotorRiskDetails(type,'indirect')
                          }
                      
                      
                  }
                },
                (err) => { },
              );
            }
          }
          saveMotorRiskDetails(type,saveType){
            let make = "",color='',fuel='',usageDesc='',bodyType='',motorCategoryDesc='';
            let model=null,modelDesc = null;
            let insuranceType = '73';
            if(type!='Group' || (type=='Group' && saveType=='direct')){
              if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
                let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
                make = entry.label;
          
              }
              if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
                let entry = this.bodyTypeList.find(ele=>ele.Code==this.productItem.BodyType);
                bodyType = entry.label;
              }
              if(this.productItem.Color!='' && this.productItem.Color!=undefined && this.productItem.Color!=null){
                let entry = this.colorList.find(ele=>ele.Code==this.productItem.Color);
                color = entry.label;
              }
              if(this.productItem.FuelType!='' && this.productItem.FuelType!=undefined && this.productItem.FuelType!=null){
                let entry = this.fuelTypeList.find(ele=>ele.Code==this.productItem.FuelType);
                fuel = entry.label;
              }
              if(this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined && this.productItem.MotorUsage!=null){
                let entry = this.usageList.find(ele=>ele.Code==this.productItem.MotorUsage);
                usageDesc = entry.label;
              }
              if(this.productItem.MotorCategory!='' && this.productItem.MotorCategory!=undefined && this.productItem.MotorCategory!=null){
                let entry = this.motorCategoryList.find(ele=>ele.Code==this.productItem.MotorCategory);
                motorCategoryDesc = entry.label;
              }
              
              if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
                let bodyType = this.productItem.BodyType
                  if(bodyType=='1' || bodyType=='2' || bodyType=='3' || bodyType=='4' || bodyType=='5'){
                    if(this.productItem.Model!='' && this.productItem.Model!=null){
                      if(this.productItem.Model=='99999'){
                        modelDesc = this.productItem.OtherModelDesc;
                        model = this.productItem.Model;
                      }
                      else{
                        let entry = this.modelList.find(ele=>ele.Code==this.productItem.Model);
                        modelDesc = entry.label;
                        model = this.productItem.Model;
                      }
                    }
                  }
                  else{
                    model = '99999';
                    modelDesc = this.productItem.ModelDesc;
                  }
              }
            }
            else{
              model = this.vehicleDetails.Vehcilemodel;
              modelDesc = this.vehicleDetails.VehicleModelDesc;
              bodyType = this.vehicleDetails.VehicleTypeDesc;
              fuel = this.vehicleDetails.FuelTypeDesc;
              make = this.vehicleDetails.VehiclemakeDesc;
              motorCategoryDesc = this.vehicleDetails.MotorCategoryDesc
              this.productItem.Make = this.vehicleDetails.Vehiclemake;
              this.productItem.BodyType = this.vehicleDetails.VehicleType;
              this.productItem.FuelType = this.vehicleDetails.FuelType;
              this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
              this.productItem.VehicleType = this.vehicleDetails.VehicleType
            }
            let regNo = null;
            if(this.productItem.RegistrationNo=='' || this.productItem.RegistrationNo==null){
              regNo = this.productItem.ChassisNo;
            }
            else regNo = this.productItem.RegistrationNo;
            let createdBy="";
            let startDate = "",endDate = "",vehicleSI="0",accSI="",windSI="0",tppSI="0";
            if(this.policyStartDate){
              if(String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
              else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
              if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
              else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
            }
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          this.subuserType = sessionStorage.getItem('typeValue');
          console.log("AcExecutive",this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
          let appId = "1",loginId="",brokerbranchCode="";
          if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
            brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
              createdBy = this.commonDetails[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
            if(this.userType!='Issuer'){
              this.brokerCode = this.agencyCode;
              appId = "1"; loginId=this.loginId;
              brokerbranchCode = this.brokerbranchCode;
            }
            else {
              appId = this.loginId;
              loginId = this.brokerLoginId
              brokerbranchCode = this.brokerBranchCode;
            }
          }
          if(this.userType!='Broker' && this.userType!='User'){
              this.sourceType = this.Code
          }
          else {
            this.sourceType = this.subuserType;
            this.customerCode = this.userDetails?.Result.CustomerCode;
            this.customerName = this.userDetails?.Result.CustomerName
          }
            let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
            if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
              IdNo = this.customerDetails?.IdNumber;
              regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
              if(this.customerName ==undefined) this.customerName = null;
              if(this.vehicleId==null || this.vehicleId==undefined){
                let vehicleId:any = null;
                if(this.vehicleDetailsList.length!=0){
                  if(this.vehicleDetailsList[this.vehicleDetailsList.length-1].Vehicleid)  vehicleId =  Number(this.vehicleDetailsList[this.vehicleDetailsList.length-1].Vehicleid)+1;
                  else  vehicleId = this.vehicleDetailsList.length+1;
                  if(this.vehicleDetailsList.some(ele=>String(ele.Vehicleid)==String(vehicleId)) || this.vehicleId==vehicleId){
                    vehicleId = Number(vehicleId)+1;
                  }
                  else if(vehicleId==null) vehicleId = this.vehicleDetailsList.length+1;
                  //vehicleId = Number(this.vehicleDetailsList[this.vehicleDetailsList.length-1].VehicleId)+1;
                }
                else vehicleId = this.vehicleDetailsList.length+1;
                this.vehicleId = vehicleId
              }
              if(this.productItem.VehicleValue==undefined) this.productItem.VehicleValue = null;
              if(this.productItem.Inflation==undefined) this.productItem.Inflation = null;
              let havePromoYN = 'Y';
              if(this.promocode==null || this.promocode=='' || this.promocode==undefined) havePromoYN = 'N'
              let ReqObj = {
                "BrokerBranchCode": brokerbranchCode,
                "AcExecutiveId": null,
                "CommissionType": this.commissionType,
                "CustomerCode": this.customerCode,
                "CustomerName": this.customerName,
                "BdmCode": this.customerCode,
                "BrokerCode": this.brokerCode,
                "LoginId": loginId,
                "SubUserType": this.subuserType,
                "ApplicationId": appId,
                "CustomerReferenceNo": refNo,
                "RequestReferenceNo": this.requestReferenceNo,
                "Idnumber": IdNo,
                "VehicleId": this.vehicleId,
                "AcccessoriesSumInsured": '0',
                "AccessoriesInformation": "",
                "AdditionalCircumstances": "",
                "AxelDistance": '01',
                "Chassisnumber": this.productItem.ChassisNo,
                "Color": this.productItem.Color,
                "ColorDesc": color,
                "CityLimit": null,
                "CoverNoteNo": null,
                "OwnerCategory": this.productItem.OwnerCategory,
                "CubicCapacity": "100",
                "CreatedBy": createdBy,
                "DrivenByDesc": 'Driver',
                "EngineNumber": this.productItem.EngineNo,
                "EngineCapacity": this.productItem.EngineCapacity,
                "FuelType": this.productItem.FuelType,
                "FuelTypeDesc": fuel,
                "Gpstrackinginstalled": 'N',
                "Grossweight": "100",
                "HoldInsurancePolicy": "N",
                "Insurancetype": insuranceType,
                "InsuranceId": this.insuranceId,
                "InsuranceClass": "3",
                "InsurerSettlement": "",
                "InterestedCompanyDetails": "",
                "ManufactureYear":this.productItem.ManufactureYear,
                "ModelNumber": null,
                "MotorCategory": this.productItem.MotorCategory,
                "MotorCategoryDesc": motorCategoryDesc,
                "Motorusage": usageDesc,
                "MotorusageId": this.productItem.MotorUsage,
                "NcdYn": 'N',
                "NoOfClaims": null,
                "NumberOfAxels": "1",
                "BranchCode": this.branchCode,
                "AgencyCode": this.agencyCode,
                "ProductId": this.productId,
                "SectionId": ['73'],
                "PolicyType": IdType,
                "RadioOrCasseteplayer": null,
                "RegistrationYear": regYear,
                "Registrationnumber": regNo,
                "RoofRack": null,
                "SeatingCapacity": this.productItem.SeatingCapacity,
                "SourceTypeId":this.sourceType,
                "SpotFogLamp": null,
                "Stickerno": null,
                "SumInsured": vehicleSI,
                "Tareweight": '100',
                "TppdFreeLimit": null,
                "TppdIncreaeLimit": tppSI,
                "TrailerDetails": null,
                "VehicleModel": modelDesc,
                "Vehcilemodel": modelDesc,
                  "VehcilemodelId": model,
                  "VehicleType": bodyType,
                  "VehicleTypeId": this.productItem.BodyType,
                  "Vehiclemake": make,
                  "VehiclemakeId": this.productItem.Make,
                "WindScreenSumInsured": windSI,
                "Windscreencoverrequired": null,
                "accident": null,
                "periodOfInsurance": "30",
                "PolicyStartDate": startDate,
                "PolicyEndDate": endDate,
                "Currency" : this.currencyCode,
                "ExchangeRate": this.exchangeRate,
                "HavePromoCode": havePromoYN,
                "PromoCode" : this.promocode,
                "CollateralYn": 'N',
                "BorrowerType": null,
                "CollateralName": null,
                "FirstLossPayee": null,
                "FleetOwnerYn": 'N',
                "NoOfVehicles": "1",
                "NoOfComprehensives": null,
                "ClaimRatio": null,
                "SavedFrom": "Owner",
                "UserType": this.userType,
                "SearchFromApi":false,
                "TiraCoverNoteNo": null,
                "EndorsementYn": 'N',
                "EndorsementDate":null,
                "EndorsementEffectiveDate": null,
                "EndorsementRemarks": null,
                "EndorsementType": null,
                "EndorsementTypeDesc": null,
                "EndtCategoryDesc": null,
                "EndtCount":null,
                "EndtPrevPolicyNo":null,
                "EndtPrevQuoteNo": null,
                "EndtStatus": null,
                "IsFinanceEndt": null,
                "OrginalPolicyNo": null,
                "VehicleValueType": this.productItem.VehicleValue,
                "Inflation": this.productItem.Inflation,
                "Ncb":"0",
                "DefenceValue":null,
                "PurchaseDate":null,
                "RegistrationDate": null,
                "Scenarios": {
                  "ExchangeRateScenario": {
                    "OldAcccessoriesSumInsured": null,
                    "OldCurrency": null,
                    "OldExchangeRate": null,
                    "OldSumInsured": null,
                    "OldTppdIncreaeLimit": null,
                    "OldWindScreenSumInsured": null
                  }
                }
              }
              ReqObj['FleetOwnerYn'] = "N";
              if(this.endorsementSection){
                ReqObj['Status'] = this.vehicleDetails.Status;
                ReqObj['PolicyNo'] = this.endorsePolicyNo
              }
              else{
                ReqObj['Status'] = 'Y';
              }
              ReqObj['ClaimType'] = null;
              ReqObj['DriverDetails'] = null;
            let urlLink = `${this.motorApiUrl}api/savemotordetails`;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                let res:any = data;
                if(data.ErrorMessage.length!=0){
                  if(res.ErrorMessage){}
                }
                else{
                  if(data.Result.length!=0){
                   
                  }
                }
              });
        }
        onSourceTypeChange(type){
          this.sourceCodeDesc = null;
          if (this.Code != null && this.Code != '' && this.Code != undefined) {
            let entry = this.productList13.find(ele => ele.Code == this.Code);
            if (entry) this.sourceCodeDesc = entry?.CodeDesc;
          }
          if(this.insuranceId=='100002'){
            let ReqObj = {
              "SourceType": this.sourceCodeDesc,
              "BranchCode": this.branchCode,
              "InsuranceId": this.insuranceId,
              "SearchValue": "",
              "ProductId": this.productId
            }
            let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                //this.branchList = data.Result;
                // this.updateComponent.sourceType = this.Code;
                // this.updateComponent.sourceTypeDesc = this.sourceCodeDesc;
                this.brokerList = data.Result;
                //if(this.Code=='Agent') this.executiveSection = true;
                if (type == 'change') {
                  
                  // this.updateComponent.CustomerCode = null;
                  // this.updateComponent.brokerCode = null;
                  // this.updateComponent.brokerBranchCode = null;
                  // this.updateComponent.brokerLoginId = null;
                  this.customerCode = null;
                  this.customerName = null;
                  this.brokerCode = null;
                  this.brokerBranchCode = null;
                  this.brokerLoginId = null;
                }
                else {
                  //if(this.Code=='Broker' || this.Code=='Agent'){
                  
                  let entry = this.brokerList.find(ele => String(ele.Code) == this.brokerCode);
                  if (entry) {
                    console.log("Found Entries", this.brokerCode, entry, this.Code)
                    this.brokerLoginId = entry.Name;
                    // this.updateComponent.brokerLoginId = this.brokerLoginId;
                    // this.updateComponent.brokerCode = this.brokerCode;
                  }
                  // if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp' || this.sourceCodeDesc == 'Whatsapp'){
                  //   if(type=='change'){
        
                  //   }
                  //   this.getBrokerBranchList('direct');
                  //   this.commonSection = true;
                  // }
                  // else 
                  this.onGetCustomerList('direct', this.customerCode);
                  // }
                  // else if(this.brokerCode){
                  //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
                  //  if(entry){
                  //   this.brokerLoginId = entry.Name; 
                  //   this.brokerBranchCode = null;
                  //   this.updateComponent.brokerCode = this.brokerCode;
                  //   this.updateComponent.brokerLoginId = this.brokerLoginId;
                  //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
                  //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
                  //  }
        
                  // }
                }
        
              },
              (err) => { },
            );
          }
          else{
            let ReqObj = {
              "UserType": this.sourceCodeDesc,
              "SubUserType": this.sourceCodeDesc,
            "BranchCode": this.branchCode,
              "InsuranceId": this.insuranceId
            }
            let urlLink = `${this.CommonApiUrl}admin/dropdown/getbrokerlist`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                  this.brokerList = data.Result;
                  if (type == 'change') {
                    if (this.productId == '5' || this.productId == '46' || this.productId == '29') {  }
                    // this.updateComponent.CustomerCode = null;
                    // this.updateComponent.brokerCode = null;
                    // this.updateComponent.brokerBranchCode = null;
                    // this.updateComponent.brokerLoginId = null;
                    this.customerCode = null;
                    this.customerName = null;
                    this.brokerCode = null;
                    this.brokerBranchCode = null;
                    this.brokerLoginId = null;
                  }
                  else {
                    //if(this.Code=='Broker' || this.Code=='Agent'){
                    let entry = this.brokerList.find(ele => String(ele.Code) == this.brokerCode);
                    if (entry) {
                      console.log("Found Entries", this.brokerCode, entry, this.Code)
                      this.brokerLoginId = entry.Name;
                      // this.updateComponent.brokerLoginId = this.brokerLoginId;
                      // this.updateComponent.brokerCode = this.brokerCode;
                    }
                    // if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp' || this.sourceCodeDesc == 'Whatsapp'){
                    //   if(type=='change'){
          
                    //   }
                    //   this.getBrokerBranchList('direct');
                    //   this.commonSection = true;
                    // }
                    // else 
                    // }
                    // else if(this.brokerCode){
                    //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
                    //  if(entry){
                    //   this.brokerLoginId = entry.Name; 
                    //   this.brokerBranchCode = null;
                    //   this.updateComponent.brokerCode = this.brokerCode;
                    //   this.updateComponent.brokerLoginId = this.brokerLoginId;
                    //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
                    //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
                    //  }
          
                    // }
                    this.onChangeCustomer('direct')
                  }
              },
              (err) => { },
            );
          }
          
        }
      onGetCustomerList(type,code){
      console.log("Search",code);
      if(this.userType=='Issuer'){
        if(code!='' && code!=null && code!=undefined){
          let branch = null;
           branch = this.branchCode
          let ReqObj = {
            "SourceType": this.sourceCodeDesc,
            "BranchCode":  branch,
            "InsuranceId": this.insuranceId,
            "SearchValue":code
          }
          let urlLink = `${this.customApiUrl1}api/search/premiabrokercustomercode`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                  this.customerList = data.Result;
                  if(data.Result.length!=0){
                    
                  }
                  if(type=='change'){
                    this.showCustomerList = true;
                    this.customerName = null;
                  }
                  else{
                    this.showCustomerList = false;
                    let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                    this.customerName = entry.Name;
                    this.setCustomerValue(this.customerCode,this.customerName,'direct')
                  }
                  
            },
            (err) => { },
          );
        }
        else{
          this.customerList = [];
        }
      }
      else{
        this.customerCode = this.userDetails.Result.CustomerCode;
          this.customerName = this.userDetails.Result.UserName;
          //this.updateComponent.CustomerCode = this.userDetails.Result.CustomerCode;
      }
      
    }
    setCustomerValue(code,name,type){
      this.showCustomerList = false;
        this.customerCode = code;
        this.customerName = name;
        
    }
    onChangeCustomer(value) {
      console.log("Entry", value);
      if(this.insuranceId=='100002') this.customerCode = value?.CustomerCode;
      if (this.customerCode != null) {
        if(this.insuranceId=='100002'){
          let entry = this.customerList.find(ele => ele.CustomerCode == this.customerCode);
          this.customerName = entry?.CustomerName;
        }
        else{
          let entry = this.brokerList.find(ele => ele.Code == this.customerCode);
          this.customerName = entry?.CodeDesc;
        }
      }
    }
}

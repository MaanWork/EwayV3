import { Component } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';
import { QuotationPlanComponent } from '../quotation-plan.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styles: [`input{ min-width: 20rem; }`]
})
export class DriverInfoComponent {
  entryList:any=[];
  currencyCode: any;quoteRefNo:any=null;quoteNo:any=null;minDate:any=null;minAltDate:any=null;
  CoverList: any[]=[];subuserType:any=null;userDetails:any=null;currentDate:any=null;
  loginId:any=null;userType:any=null;agencyCode:any=null;branchCode:any=null;
  branchList:any=null;productId:any=null;insuranceId:any=null;loginType:any=null;RiskId:any=null;
  vehicleDetails:any=null;quoteDetails:any=null;Riskdetails:any=null;totalPremium:any=null;
  public AppConfig: any = (Mydatas as any).default;endorsementSection:boolean=false;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;LicenseList:any[]=[];driverOptions:any[]=[];
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;vehicleList:any[]=[];driverDetailsList:any[]=[];
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;EmiYn:any='N';localPremiumCost:any=null;customerRefNo:any=null;
  coverlist: any[];tabIndex:any=0;productName:any=null;
  driverNameError: boolean=false;
  licenseNoError: boolean=false;
  driverDobError: boolean=false;endorseShortCode:any=null;
  driverTypeError: boolean=false;endorsementId:any=null;
  vehicleId: string;endorseCategory:any=null;
  colorList: any;endorsementName:any=null;
  seriesNo: any;enableFieldsList:any[]=[];
  noOfClinder: any;enableCustomerDetails:boolean=false;
  CompanyId: any;enableDocumentDetails:boolean=false;
  SectionId: any;enableDriverDetails:boolean=false;
  vehicleDetailsList: any[]=[];customerDetails:any;
  NoOfDoorList: any[]=[];
  plateTypeList: any[]=[];
  CylinderTypeList: any;lang:any=null;
  NoOfDoorsList: any;
  mobileCodeList: any[]=[];
  nationalityList: any[]=[];
  minDobDate: any;
  CertificateType:any;
  BookId:any;
  CertificateNumber:any;
  CertificateTypeList: any[]=[];
  BookIdList: any[]=[];
  CertificateNumberList: any[]=[];
  MotorUsage: any;dateOfReg: any=null;dateOfCountryReg: any=null;
  constructor(private sharedService: SharedService,private quoteComponent:QuotationPlanComponent,
    private router:Router,private appComp:AppComponent,private translate:TranslateService,
    private datePipe:DatePipe) {
    //this.quoteNo = sessionStorage.getItem('quoteNo');
    //this.updateComponent.quoteNo = this.quoteNo;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    //
    this.CompanyId = this.userDetails.Result.CompanyId;
    this.SectionId = this.userDetails.Result.SectionId;
    //this.SectionId = this.userDetails.Result.SectionId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
     this.quoteNo = sessionStorage.getItem('quoteNo');
     var d= new Date();
     var year = d.getFullYear();
     var month = d.getMonth();
     var day = d.getDate();
      this.currentDate = new Date();
     // this.minDobDate =
    
      this.driverOptions = [
        {"label":'Driver',"value":'2','CodeDesc':'Driver','CodeDescLocal':'Conducteur'},
        {"label":'Owner',"value":'1','CodeDesc':'Owner','CodeDescLocal':'Propriétaire'},
      ];
     this.minDate = new Date(year - 18,month, day );
     this.minAltDate = new Date(year,month, day );
     let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.customerRefNo = referenceNo;
    }
    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementSection = true;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorseShortCode = endorseObj.EndtShortCode;
        if(endorseObj.QuoteNo) this.quoteNo = endorseObj.QuoteNo;
        if(this.endorseShortCode!=42 && this.endorseShortCode!=842){
          this.enableCustomerDetails = this.enableFieldsList.some(ele=>ele=='customerName' || ele=='Title');
          this.enableDocumentDetails = this.enableFieldsList.some(ele=>ele=='documentId');
          this.enableDriverDetails = this.enableFieldsList.some(ele=>ele=='driverName' || ele=='DriverName');
        }
      }
      else{
        this.enableCustomerDetails = false;
        this.enableDocumentDetails = false;
        this.enableDriverDetails = false;
        this.endorsementSection = false;
      }
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    this.getEditQuoteDetails();
    this.getColorsList();
    this.getPlateTypeList();
    this.getCylinderTypeList();
    this.getDoorTypeList();
    this.getNationalityList();
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
   }
    this.getMobileCodeList();
    
  }
 
 
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.Riskdetails = data?.Result?.RiskDetails;
            
            if(this.endorsementSection){
              this.totalPremium = this.quoteDetails?.TotalEndtPremium;
            }
            else {
              if(this.EmiYn !='Y'){
                this.totalPremium = this.quoteDetails?.OverallPremiumFc;
              }
              else{
                this.totalPremium = this.quoteDetails?.DueAmount;
              }   
            }
            //this.quoteComponent.setRiskDetails(this.Riskdetails);
            this.quoteComponent.currencyCode = data?.Result?.QuoteDetails?.Currency;
          for (let cover of this.Riskdetails) {
            let j = 0;
            if(cover?.SectionDetails){
              for (let section of cover?.SectionDetails) {
                let CoverData = section.Covers;
                for (let subsectioncover of section?.Covers) {
                  console.log("subsectioncover", subsectioncover);
                  if (cover?.totalPremium) {
                    cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
                    cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
                  }
                  else {
                    cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
                    cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;
  
                  }
                  let baseCovers = [], otherCovers = [];
                  baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
                  otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
                  section.Covers = baseCovers.concat(otherCovers);
                  console.log("otherCovers", CoverData);
                  this.CoverList.push(cover);
                  console.log("CoverList", this.CoverList);
                  if (j == cover?.SectionDetails) {
                    this.CoverList.push(cover);
                    console.log("vehicleList", this.CoverList);
                  }
                  else j += 1;
                }
              }
            }
          }
            let quoteDetails = data?.Result?.QuoteDetails;
            if(quoteDetails){
            }
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.currencyCode = quoteDetails?.Currency;
           
            if(this.insuranceId!='100028') this.getDriverDetails();
            else this.getOtherVehicleInfo();
            this.localPremiumCost = quoteDetails?.OverallPremiumLc;
            this.quoteComponent.setRiskDetails(data?.Result?.LocationDetails);
            let vehicles:any[] = data?.Result?.RiskDetails;
            this.MotorUsage =vehicles[0].Motorusage;
            if(this.MotorUsage && this.insuranceId=='100028'){this.getCertificateTypeList();this.getBookIdList();}
            if(vehicles.length!=0){
              let i=0;this.vehicleList=[];
              for(let vehicle of vehicles){
                let entry:any;
                // if(this.productId=='5')  entry=vehicle.VehicleDetails;
                // else if(this.productId=='4')  entry=vehicle.TravelPassengerDetails;
                // else if(this.productId=='59')  entry=vehicle.BuildingDetails;
                // else entry = vehicle.CommonDetails;
                entry = vehicle;
                //entry['CoverList'] = vehicle.Covers;
                this.vehicleList.push(entry);
                let obj={
                  "Code":entry.RiskId,
                  "CodeDesc":entry.Registrationnumber,
                  "RiskId": entry.RiskId

                }
                this.LicenseList.push(obj);
                 this.RiskId=entry.RiskId;
                i+=1;
                if(i==vehicles.length){
                  console.log("Final License List",this.LicenseList)
                  //this.setVehicleList();
                  
                }

              }
            }
            if(this.vehicleList.length!=0){

              // if(this.productId=='59'){

              // }
              // else{
              //   this.setVehicleList();
              // }



              // let entry = this.vehicleList.find(ele=>String(ele.Vehicleid)==String(this.vehicleId));
              // if(entry){
              //   let index= this.vehicleList.findIndex(ele=>String(ele.Vehicleid)==entry.VehicleDetails.Vehicleid)
              //   let coverList:any[] = entry.Covers;
              //   if(coverList.length!=0 && this.coverList.length!=0){
              //     let i=0;
              //     for(let event of coverList){
              //       let cover = this.coverList.find(ele=>ele.CoverId == event.CoverId);
              //       if(cover){
              //         cover['selected']= true;
              //         this.onSelectCover(cover,true,this.vehicleId,'vehList');
              //       }
              //       i+=1;
              //       if(i==coverList.length){
              //         this.dataSource = new MatTableDataSource(this.coverList);
              //         this.dataSource.sort = this.sort;
              //         this.dataSource.paginator = this.paginator;
              //         this.applyFilter(this.filterValue);
              //       }
              //     }
              //   }
              //   else{
              //     this.dataSource = new MatTableDataSource(this.coverList);
              //     this.dataSource.sort = this.sort;
              //     this.dataSource.paginator = this.paginator;
              //     this.applyFilter(this.filterValue);
              //   }
              // }
              // else{
              //   this.dataSource = new MatTableDataSource(this.vehicleDetailsList);
              //   this.dataSource.sort = this.sort;
              //   this.dataSource.paginator = this.paginator;
              //   this.applyFilter(this.filterValue);
              // }
            }
            else{

            }
          }
          console.log("Final Total Premium",this.totalPremium);
      },
      (err) => { },
    );

  }
  getHeaderName(menu){
    if(this.productId=='5'){
      let name = menu.Registrationnumber;
      if(menu.SectionName!=null){
        name = name+` (${menu.SectionName})`
      }
      return name;
    }
    else if(this.productId=='4'){
      if(menu.TravelId=='1') return `Kids (${menu.TotalPassengers})`;
      if(menu.TravelId=='2') return `Adults (${menu.TotalPassengers})`;
      if(menu.TravelId=='3') return `Seniors (${menu.TotalPassengers})`;
      if(menu.TravelId=='4') return `Super Seniors (${menu.TotalPassengers})`;
      if(menu.TravelId=='5') return `Grand Seniors (${menu.TotalPassengers})`;
    }
    else if(this.productId!='59' && this.productId!='4' && this.productId!='5' && this.productId!='19' && this.productId!='14' && this.productId!='32') return this.productName;
    else if(this.productId=='59' || this.productId=='19' || this.productId=='14' || this.productId=='32') return menu.SectionName;
    else return '';
  }
  onNextProceed(){
    let veh = this.vehicleDetailsList[this.tabIndex];
    console.log("Filtered Vehicle",veh,this.driverDetailsList)
    let currentIndex,driverList,vehId;
    // for(let entry of this.driverDetailsList){
      currentIndex = this.driverDetailsList.length-1
    // }
    if(this.insuranceId!='100040' && this.insuranceId!='100042'){
     driverList = this.driverDetailsList.filter(ele=>ele.VehicleId==veh.RiskId || ele.RiskId==veh.RiskId );
     }else{

      driverList = this.driverDetailsList.filter(ele=> ele.VehicleId==veh.RiskId || ele.DriverId==currentIndex);
      vehId= veh.VehicleId;
     }
    if(driverList.length!=0){
      let i=0,j=0;
      for(let entry of driverList){
        if(this.insuranceId!='100040' && this.insuranceId!='100042'){
        if(entry.DriverName==null || entry.DriverName=='' || entry.DriverName==undefined){i+=1;entry['driverNameError']=true;}
        else entry['driverNameError']=false;
        if(entry.LicenseNo==null || entry.LicenseNo=='' || entry.LicenseNo==undefined){i+=1;entry['licenseNoError']=true;}
        else entry['licenseNoError']=false;
        if(entry.DriverDob==null || entry.DriverDob=='' || entry.DriverDob==undefined){i+=1;entry['driverDobError']=true;}
        else entry['driverDobError']=false;
        if(entry.DriverType==null || entry.DriverType=='' || entry.DriverType==undefined){i+=1;entry['driverTypeError']=true;}
        else entry['driverTypeError']=false;
        j+=1;
        if(j==driverList.length && i==0) this.tabIndex+=1;
        }
        if(this.insuranceId=='100040' || this.insuranceId=='100042'){
          if(entry.DrivingLicensingAge==null || entry.DrivingLicensingAge=='' || entry.DrivingLicensingAge==undefined){i+=1;entry['drivinglicenseageError']=true;}
          else entry['drivinglicenseageError']=false;
          if(entry.LicenseNo==null || entry.LicenseNo=='' || entry.LicenseNo==undefined){i+=1;entry['licenseNoError']=true;}
          else entry['licenseNoError']=false;
          //j=1;
          j+=1;
          if(this.vehicleDetailsList.length>1){
            if(j==vehId && i==0) this.tabIndex+=1;
            if(i==0 && this.vehicleDetailsList.length==this.tabIndex){
              this.saveVehicleInfo();
            }
          }
         
        }

      }
      return i==0;
    }
  }
  ongetBack(){
    if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.coverlist=[];let i=0;
      for(let vehicle of this.Riskdetails){
        let vehEntry = vehicle.SectionDetails;
        if(vehEntry.length!=0){
          let j=0;
          for(let s of vehEntry){
          let covers = s.Covers;
          if(covers.length!=0){
            let entry = covers.filter(ele=>ele.CoverId == '55');
            if(entry.length!=0){
              this.coverlist.push(entry)
            }
          }
          j+=1;
        }
        }
        i+=1;
      }           
              if(this.coverlist.length!=0){
                 this.router.navigate(['quotation/plan/main/accessories']);
              }
              else{
                if(this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
                else this.router.navigate(['/quotation/plan/premium-details']);
              }
    }
  }
  getDriverDetails(){
    let ReqObj = {
      //"QuoteNo": this.quoteNo
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getmotordrivers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let driverList= data.Result;
          this.driverDetailsList = data.Result;
           if(driverList.length!=0){
              let i=0,finalList=[];
              for(let driver of this.driverDetailsList){
                if(i==0){if(driver.Subscriber==null || driver.Subscriber=='') driver.Subscriber='1'}
              }
              this.getOtherVehicleInfo();
           }
           else{
              this.driverDetailsList = [
                {
                  "QuoteNo": this.quoteNo,
                  "RiskId": null,
                  "DriverId": null,
                  "DriverName": null,
                  "DriverDob": null,
                  "Subscriber":"2",
                  "DriverType": "2",
                  "LicenseNo": null,
                  "EntryDate": null,
                  "CreatedBy": this.loginId,
                  "StateId": null,
                  "CityId": null,
                  "CountryId": null,
                  "SuburbId": null,
                  "AreaGroup": null,
                  "MaritalStatus": null,
                  "DriverLicenseExpiryDate": null,
                  "LicenseIssueDt": null,
                  "Gender": null,
                  "DriverExperience": null,
                  "EndorsementDate": null,
                  "EndorsementRemarks": null,
                  "EndorsementEffectiveDate": null,
                  "OrginalPolicyNo": null,
                  "EndtPrevPolicyNo": null,
                  "EndtPrevQuoteNo": null,
                  "EndtCount": null,
                  "EndtStatus": null,
                  "IsFinanceEndt": null,
                  "EndtCategoryDesc": null,
                  "EndorsementType": null,
                  "EndorsementTypeDesc": null
                }
              ];
              this.getOtherVehicleInfo();
           }
             //this.EffectiveDate = data.Result.DriverDob
             /*if(this.EffectiveDate){
              this.onDateFormatInEdit(this.EffectiveDate);
             }*/
        }
        else{
            this.driverDetailsList = [
              {
                "QuoteNo": this.quoteNo,
                "RiskId": null,
                "DriverId": null,
                "DriverName": null,
                "DriverDob": null,
                "DriverType": "1",
                "LicenseNo": null,
                "EntryDate": null,
                "CreatedBy": this.loginId,
                "StateId": null,
                "CityId": null,
                "CountryId": null,
                "SuburbId": null,
                "Subscriber":"2",
                "AreaGroup": null,
                "MaritalStatus": null,
                "LicenseIssueDt": null,
                "Gender": null,
                "DriverExperience": null,
                "EndorsementDate": null,
                "EndorsementRemarks": null,
                "EndorsementEffectiveDate": null,
                "OrginalPolicyNo": null,
                "EndtPrevPolicyNo": null,
                "EndtPrevQuoteNo": null,
                "EndtCount": null,
                "EndtStatus": null,
                "IsFinanceEndt": null,
                "EndtCategoryDesc": null,
                "EndorsementType": null,
                "EndorsementTypeDesc": null
              }
            ];
            this.getOtherVehicleInfo();
         }
      },
      (err) => { },
    );

  }

  getOtherVehicleInfo(){
    let vehId = this.Riskdetails[this.tabIndex].RiskId;
    this.vehicleId = vehId;
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "RequestReferenceNo": this.quoteRefNo

    }
    let urlLink = `${this.motorApiUrl}api/getothervehicledel`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(data.Result.VehicleDetails){
            this.vehicleDetailsList = data.Result.VehicleDetails;
            if(this.vehicleDetailsList.length!=0){
              for(let veh of this.vehicleDetailsList){
                if(veh.NoCylinder!=null && veh.NoCylinder!='') veh.NoCylinder = String(veh.NoCylinder);
                if(veh.NoDoors!=null && veh.NoDoors!='') veh.NoDoors = String(veh.NoDoors);
                if(veh.PlateColorId!=null && veh.PlateColorId!='') veh.PlateColorId = String(veh.PlateColorId);
                if(veh.CertificateType!=null && veh.CertificateType!='') {
                  veh.CertificateType = String(veh.CertificateType);
                  this.CertificateType = String(veh.CertificateType);
                }
                if(veh.OriginalRegistrationDate!=null && veh.OriginalRegistrationDate!='' && veh.OriginalRegistrationDate!='') {this.dateOfReg=veh.OriginalRegistrationDate}
                else this.dateOfReg=null;
                if(veh.CountryRegistrationDate!=null && veh.CountryRegistrationDate!='' && veh.CountryRegistrationDate!=' ') {this.dateOfCountryReg=veh.CountryRegistrationDate}
                else this.dateOfCountryReg=null;
                if(veh.BookId!=null && veh.BookId!='') {
                  veh.BookId = String(veh.BookId);
                  this.BookId = String(veh.BookId);
                  this.getCertificateNumList(this.BookId)
                }
                if(veh.CertificateNo!=null && veh.CertificateNo!='') {
                  veh.CertificateNo = String(veh.CertificateNo);
                  this.CertificateNumber = String(veh.CertificateNo);
                }
              }
            }
          }
          else{
            if(this.vehicleList.length!=0){
              for(let veh of this.vehicleList){
                let i=0;let entry =null;
                 entry = {
                  "SeriesNo":"",
                  "NoCylinder":"",
                  "PlateType":"",
                  "PlateColorId":"",
                  "NoDoors":"",
                  "VehicleId": veh.RiskId,
                  "CertificateType":null,
                  "BookId" : null,
                  "CertificateNo":null
                }
                this.vehicleDetailsList.push(entry);
              }
            }
          }
          // this.NoOfDoorList = data.Result.NoOfDoorsList;
          // console.log("vehicleDetailsList"+JSON.stringify(data.Result.VehicleDetails[0]));
        }
  },
  (err) => { },
);
}



addNewDriver(vehId){
  console.log(this.driverDetailsList,"this.driverDetailsList");
  this.driverDetailsList.push( {
    "QuoteNo": this.quoteNo,
    "RiskId":vehId,
    "DriverId": this.driverDetailsList.length+1,
    "DriverName": null,
    "DriverDob": null,
    "DriverType": "1",
    "Subscriber":"2",
    "LicenseNo": null,
    "EntryDate": null,
    "CreatedBy": this.loginId,
    "StateId": null,
    "CityId": null,
    "CountryId": null,
    "SuburbId": null,
    "AreaGroup": null,
    "MaritalStatus": null,
    "LicenseIssueDt": null,
    "Gender": null,
    "DriverExperience": null,
    "EndorsementDate": null,
    "EndorsementRemarks": null,
    "EndorsementEffectiveDate": null,
    "OrginalPolicyNo": null,
    "EndtPrevPolicyNo": null,
    "EndtPrevQuoteNo": null,
    "EndtCount": null,
    "EndtStatus": null,
    "IsFinanceEndt": null,
    "EndtCategoryDesc": null,
    "EndorsementType": null,
    "EndorsementTypeDesc": null,
    "RequestReferenceNo":null,
    "Civility": null,
    "PlaceIssue": null,
    "CategoryCode": null,
    "CategoryExDate": null,
    "CategoryDate": null,
    "Email": null,
    "ContactCode": null,
    "Contact": null,
    "DrivingLicensingAge": null
  })
}
  // onAddNewDriver(){
  //   this.driverDetailsList.push( {
  //     "QuoteNo": this.quoteNo,
  //     "RiskId": null,
  //     "DriverId": null,
  //     "DriverName": null,
  //     "DriverDob": null,
  //     "DriverType": "1",
  //     "LicenseNo": null,
  //     "EntryDate": null,
  //     "CreatedBy": this.loginId,
  //     "StateId": null,
  //     "CityId": null,
  //     "CountryId": null,
  //     "SuburbId": null,
  //     "AreaGroup": null,
  //     "MaritalStatus": null,
  //     "LicenseIssueDt": null,
  //     "Gender": null,
  //     "DriverExperience": null,
  //     "EndorsementDate": null,
  //     "EndorsementRemarks": null,
  //     "EndorsementEffectiveDate": null,
  //     "OrginalPolicyNo": null,
  //     "EndtPrevPolicyNo": null,
  //     "EndtPrevQuoteNo": null,
  //     "EndtCount": null,
  //     "EndtStatus": null,
  //     "IsFinanceEndt": null,
  //     "EndtCategoryDesc": null,
  //     "EndorsementType": null,
  //     "EndorsementTypeDesc": null,
  //     "RequestReferenceNo":null,
  //     "Subscriber": null,
  //     "Civility": null,
  //     "PlaceIssue": null,
  //     "CategoryCode": null,
  //     "CategoryExDate": null,
  //     "CategoryDate": null,
  //     "Email": null,
  //     "ContactCode": null,
  //     "Contact": null,
  //     "DrivingLicensingAge": null
  //   })
  // }
  checkDriverDelete(riskId){
    let entry = this.driverDetailsList.filter(ele=>ele.RiskId==riskId);
    return entry.length>1;
  }
  onRemove(index){
    this.driverDetailsList.splice(index,1);
  }
  onsave(){
    let i=0;this.entryList=[];
   for(let driver of this.driverDetailsList){
    let date,CategoryExDate,CategoryDate,LicenseIssueDt,expDate=null;
    if(driver.DriverDob!='' && driver.DriverDob!=null){
      console.log("Dob",driver)
      if(String(driver.DriverDob).includes('/')){
        date = driver.DriverDob;
      }
       else{
        date = this.datePipe.transform(driver.DriverDob, "dd/MM/yyyy");
       }
    }
    if(driver.CategoryExDate!='' && driver.CategoryExDate!=null){
      console.log("Dob",driver)
      if(String(driver.CategoryExDate).includes('/')){
        CategoryExDate = driver.CategoryExDate;
      }
       else{
        CategoryExDate = this.datePipe.transform(driver.CategoryExDate, "dd/MM/yyyy");
       }
    }

    if(driver.CategoryDate!='' && driver.CategoryDate!=null){
      console.log("Dob",driver)
      if(String(driver.CategoryDate).includes('/')){
        CategoryDate = driver.CategoryDate;
      }
       else{
        CategoryDate = this.datePipe.transform(driver.CategoryDate, "dd/MM/yyyy");
       }
    }
    if(driver.DriverLicenseExpiryDate!='' && driver.DriverLicenseExpiryDate!=null){
      console.log("Dob",driver)
      if(String(driver.DriverLicenseExpiryDate).includes('/')){
        expDate = driver.DriverLicenseExpiryDate;
      }
       else{
        expDate = this.datePipe.transform(driver.DriverLicenseExpiryDate, "dd/MM/yyyy");
       }
    }
    if(driver.LicenseIssueDt!='' && driver.LicenseIssueDt!=null){
      console.log("Dob",driver)
      if(String(driver.LicenseIssueDt).includes('/')){
        LicenseIssueDt = driver.LicenseIssueDt;
      }
       else{
        LicenseIssueDt = this.datePipe.transform(driver.LicenseIssueDt, "dd/MM/yyyy");
       }
    }
    
    
    console.log("Before Date2",date)
    var entry = {
      "InsuranceId": this.insuranceId,
        "CreatedBy": this.loginId,
        "DriverDob":date,
        "DriverLicenseExpiryDate": expDate,
        "DriverName": driver.DriverName,
        "DriverType": driver.DriverType,
        "LicenseNo": driver.LicenseNo,
        "QuoteNo": this.quoteNo,
        "RiskId": driver.RiskId,
        "RequestReferenceNo": this.quoteRefNo,
      }
      entry['MaritalStatus'] = driver.MaritalStatus;
      entry['CountryId']=driver.CountryId;
      entry['StateId']=driver.StateId;
      entry['CityId']=driver.CityId;
      entry['AreaGroup']=driver.AreaGroup;
      entry['DriverExperience'] = driver.DriverExperience;
      entry['LicenseIssueDt'] = LicenseIssueDt;
      entry['Gender'] = driver.Gender;
      if(this.insuranceId=='100040' || this.insuranceId=='100042'){
        entry['Subscriber'] = driver.Subscriber;
        entry['Civility']= driver.Civility;
        entry['PlaceIssue']= driver.PlaceIssue;
        entry['CategoryCode']= driver.CategoryCode;
        entry['CategoryExDate']=CategoryExDate;
        entry['CategoryDate'] = CategoryDate;
        entry['Email'] = driver.Email;
        entry['ContactCode'] = driver.ContactCode;
        entry['Contact'] = driver.Contact;
        entry['DrivingLicensingAge']=driver.DrivingLicensingAge;
      }
      if(this.endorsementSection){
        entry['EndtStatus'] = this.quoteDetails?.EndtStatus;
        entry['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
        entry['EndorsementType'] = this.quoteDetails?.EndtTypeId;
        entry['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
        entry['EndtCount'] = this.quoteDetails?.Endtcount;
        entry['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
        entry['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
      }
      let j=0;
      if(this.insuranceId!='100040' && this.insuranceId!='100042'){
        if(entry.DriverName==null || entry.DriverName=='' || entry.DriverName==undefined){j+=1;driver['driverNameError']=true;}
        else driver['driverNameError']=false;
        if(entry.LicenseNo==null || entry.LicenseNo=='' || entry.LicenseNo==undefined){j+=1;driver['licenseNoError']=true;}
        else driver['licenseNoError']=false;
        // if((entry.DriverLicenseExpiryDate==null || entry.DriverLicenseExpiryDate=='' || entry.DriverLicenseExpiryDate==undefined) && this.insuranceId!='100002'){j+=1;driver['licenseExpError']=true;}
        // else driver['licenseExpError']=false;
        if(entry.DriverDob==null || entry.DriverDob=='' || entry.DriverDob==undefined){j+=1;driver['driverDobError']=true;}
        else driver['driverDobError']=false;
        if(entry.DriverType==null || entry.DriverType=='' || entry.DriverType==undefined){j+=1;driver['driverTypeError']=true;}
        else driver['driverTypeError']=false;
       }
        if(this.insuranceId=='100040' || this.insuranceId=='100042'){
          if(entry.DriverLicenseExpiryDate==null || entry.DriverLicenseExpiryDate=='' || entry.DriverLicenseExpiryDate==undefined){j+=1;driver['licenseExpError']=true;}
         else driver['licenseExpError']=false;
          if(entry['DrivingLicensingAge']==null || entry['DrivingLicensingAge']=='' || entry['DrivingLicensingAge']==undefined){j+=1;driver['drivinglicenseageError']=true;}
          else driver['drivinglicenseageError']=false;
          if(entry.LicenseNo==null || entry.LicenseNo=='' || entry.LicenseNo==undefined){j+=1;driver['licenseNoError']=true;}
          else driver['licenseNoError']=false;
          //j=1;
        }
        if(j==0) this.entryList.push(entry);
     
      i++;
      if(i==this.driverDetailsList.length){
        
       // this.saveDriverDetails(entryList);
       if(this.driverDetailsList.length==this.entryList.length){
        
          if(this.insuranceId=='100042' ) this.saveVehicleInfo();
          else this.saveDriverDetails(this.entryList);
       }
      }
      
   }
   if(this.insuranceId=='100028')this.saveDriverDetails(this.entryList);
 }
 saveDriverDetails(entryList){
  console.log("DriverDetails",entryList)
  
  if(this.insuranceId!='100028'){
    let urlLink = `${this.motorApiUrl}api/savemotordrivers`;
    this.sharedService.onPostMethodSync(urlLink,entryList).subscribe(
      (data: any) => {
        console.log("Save motor Res",data)
        if(data.Result){
          // if(this.endorsementSection && this.enableCustomerDetails){
          //      this.saveCustomerDetails();
          // } 
          // else{
            if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
              this.router.navigate(['/Home/customer/ClientDetails']);
            }
            else {
              if(this.EmiYn!='Y'){
                this.router.navigate(['/quotation/plan/main/document-info']);
              }
              else{
                sessionStorage.removeItem('Makepaymentid');
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/Emi-Details']);
              }
              
            }
          
        }
        
      }
    )
  }
  else this.saveVehicleInfo();
 }
 checkError(rowData,type){
  let entry = this.vehicleDetailsList.find(ele=>ele.VehicleId==this.vehicleId), i =0;
  if(entry){
    if(type=='Type'){if(entry['CertificateTypeError']!=undefined) return entry.CertificateTypeError; else return false;}
    if(type=='BookId'){if(entry['BookIdError']!=undefined) return entry.BookIdError; else return false;}
    if(type=='Number'){if(entry['CertificateNumberError']!=undefined) return entry.CertificateNumberError; else return false;}
  }
  else return false;
 }
saveVehicleInfo() {
  let entry = this.vehicleDetailsList.find(ele=>ele.VehicleId==this.vehicleId), i =0;
  entry['CertificateType']=this.CertificateType;entry['BookId']=this.BookId;entry['CertificateNo']=this.CertificateNumber;
  console.log("Entry",entry)
  if(entry.CertificateType==null || entry.CertificateType =="" || entry.CertificateType==undefined){
    i+=1;entry['CertificateTypeError']=true;   
  }
  else entry['CertificateTypeError']=false;
  if(entry.BookId==null || entry.BookId =="" || entry.BookId==undefined){i+=1;entry['BookIdError']=true;
  }
  else{entry['BookIdError']=false;}
  if(entry.CertificateNo==null || entry.CertificateNo =="" || entry.CertificateNo==undefined){
    i+=1;entry['CertificateNumberError']=true;
  }
  else{entry['CertificateNumberError']=false;}
  let regDate=null,orgRegDate=null;
  if(this.dateOfReg!=null && this.dateOfReg!='' && this.dateOfReg!=' '){
    if(String(this.dateOfReg).split('/').length>1){regDate=this.dateOfReg}
    else regDate= this.datePipe.transform(this.dateOfReg,'dd/MM/yyyy');
  }
  if(this.dateOfCountryReg!=null && this.dateOfCountryReg!='' && this.dateOfCountryReg!=' '){
    if(String(this.dateOfCountryReg).split('/').length>1){orgRegDate=this.dateOfCountryReg}
    else orgRegDate= this.datePipe.transform(this.dateOfCountryReg,'dd/MM/yyyy');
  }
  if(i==0){
    let regOp = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId": "101",
      "QuoteNo": this.quoteNo,
      "RequestReferenceNo": this.quoteRefNo,
        "VehicleId": this.vehicleId,
        "SeriesNo": entry.SeriesNo,
        "NoCylinder": entry.NoCylinder,
        "NoCylinderDes": null,
        "PlateType": entry.PlateType,
        "PlateTypeDesc": null,
        "PlateColor": null,
        "PlateColorId": entry.PlateColorId,
        "NoDoors": entry.NoDoors,
        "NoDoorsDes":null,
        "CertificateType":entry.CertificateType,
        "BookId" : entry.BookId,
        "CertificateNo":entry.CertificateNo,
        "OriginalRegistrationDate": regDate,
        "CountryRegistrationDate": orgRegDate
      }
    
    let urlLink = `${this.motorApiUrl}api/othervehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink,regOp).subscribe(
      (data: any) => {
        console.log("Save1", data);
        if (data.Result) {
          if(this.insuranceId!='100028') this.saveDriverDetails(this.entryList);
          else this.router.navigate(['/quotation/plan/main/document-info']);
        }
      //  
      },
      (err) => { },
        )
  }
  
}
onChangeSubscriber(rowData){
  if(rowData.Subscriber=='1'){
    if(this.customerDetails==null || this.customerDetails==undefined){
      let ReqObj = {
        "CustomerReferenceNo": this.customerRefNo,
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {this.customerDetails=data.Result;this.setDriverValues(rowData);}
        })
    }
    else{this.setDriverValues(rowData)}
  }
  else{
    rowData['DriverDob'] = null;
    rowData['DriverName'] = null;rowData['Civility']=null;
    rowData['DriverLicenseExpiryDate'] = null;rowData['Contact']=null;
  }
}
setDriverValues(rowData){
    rowData['DriverDob'] = this.customerDetails.DobOrRegDate;
    rowData['DriverName'] = this.customerDetails.ClientName;rowData['Civility']=this.customerDetails.Nationality;
    rowData['DriverLicenseExpiryDate'] = this.customerDetails.ExpiryDate;rowData['Contact']=this.customerDetails?.MobileNo1;
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
          
      }
    },
    (err) => { },
  );
}
getPlateTypeList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ItemType": "PLATE_TYPE"
  }
  let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          this.plateTypeList = data.Result;
          
      }
    },
    (err) => { },
  );
}
getCylinderTypeList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ItemType": "NO_OF_CYLINDERS"
  }
  let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          this.CylinderTypeList = data.Result;
          
      }
    },
    (err) => { },
  );
}
getDisplayName(){
  if(this.lang=='en') return 'CodeDesc';
  else return 'CodeDescLocal'
}
getDoorTypeList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ItemType": "NO_OF_DOORS"
  }
  let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          this.NoOfDoorsList = data.Result;
          
      }
    },
    (err) => { },
  );
}
 
getMobileCodeList() {
  let ReqObj = { "InsuranceId": this.insuranceId }
  let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.mobileCodeList = data.Result;
         
      }
    },
    (err) => { },
  );
}
getNationalityList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
    "ProductId": this.productId,
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/nationality`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
        this.nationalityList = defaultRow.concat(data.Result);
      }
    },
    (err) => { },
  );
}
getCertificateTypeList(){
  let ReqObj = {
    "CertificateNo" : null,
    "UsageId":this.MotorUsage,
    "CompanyId":this.insuranceId
  }
  let urlLink = `${this.CommonApiUrl}dropdown/getCertificateType`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.data){
          this.CertificateTypeList = data.data;
      }
    },
    (err) => { },
  );
}

getBookIdList(){
  let ReqObj
  let urlLink = `${this.CommonApiUrl}dropdown/getBookId`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.data){
          this.BookIdList = data.data;
          
      }
    },
    (err) => { },
  );
}

getCertificateNumList(rowdata){
  let ReqObj = {
    "CertificateNo" : rowdata,
  }
  let urlLink = `${this.CommonApiUrl}dropdown/getCertificateNo`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.data){
          this.CertificateNumberList = data.data;
      }
    },
    (err) => { },
  );
}
}

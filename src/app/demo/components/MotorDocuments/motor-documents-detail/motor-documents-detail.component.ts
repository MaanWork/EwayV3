import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../app-config.json';
import { Title } from 'chart.js';

@Component({
  selector: 'app-motor-documents-detail',
  templateUrl: './motor-documents-detail.component.html',
  styleUrls: ['./motor-documents-detail.component.scss']
})
export class MotorDocumentsDetailComponent {
  innerTableData: { PolicyType: string; PolicyStartDate: string; VechileType: string; }[];
  customerData: { SectionName: string; CoverName: string; Status: string; MotorList: { BrokerCode: string; LoginId: string; }[]; }[];
  productId: string;
  quoteNo: any;
  search: any;
  searchValue: any;
  ReferenceNo: any;
  pageFrom: any;
  CustomerName: any;
  PolicyNo: any;
  ProductName: any;
  curency: any;
  Emiyn: any;
  customerInfo: any;
  userType: string;
  loginId: any;
  insuranceId: any;
  userDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  ViewRisk: any;
  RopVechileDetails: any;
  PaymentInfo: any;
  chassislist: any[]=[];
  Currency: any;
  PremiumInfo: any;
  sectionnameopted: any;
  tiradetails: any;
  DocumentInfo: any[]=[];
  CommonDoc: any[]=[];
  tittlepay: any[]=[];
  PremiumInfoList: any;
  sectionname: any;
  addInfoDetail: {};
  DriverInfo: any;
  accessoriesList: any;
  LocationList: any;
  risk: any;branchCode:any=null;
  AllRiskSumInsured: any;
  ContentSumInsured: void;
  PersonalLiability: any[]=[];
  riskDetails: any[]=[];
  riskHeader: any;
  LocationName:any[]=[];
  riskDetailsNonMotor:any=[];
  sectionName: any[]=[];
  SectionDetails: any;
  sectionCovers: any[]=[];
  viewImageUrl: any;
  viewImageFileName: any;
  viewImageSection:boolean=false;
  ColatralDetails: any;
  viewQuoteData: any;
  CRMPath: string;
  constructor(private router:Router,private sharedService: SharedService, private route: ActivatedRoute) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchCode = this.userDetails.Result.BranchCode
  }
  ngOnInit(): void {
      this.route.queryParamMap.subscribe(params => {
      const rawData = params.get('data');
      this.CRMPath = params.get('path');
      if (rawData) {
        try {
          this.viewQuoteData  = JSON.parse(decodeURIComponent(rawData)); 
          let ReqObj = {
            "Search": "",
            "SearchValue": this.viewQuoteData.QuoteNo,
            "QuoteNo": this.viewQuoteData.QuoteNo,
            "RequestReferenceNo": this.viewQuoteData.RequestReferenceNo,
            "ProductId": this.viewQuoteData.productId,
            "pageFrom": 'policy',
            "CustomerName": this.viewQuoteData.ClientName,
            "ProductName": this.viewQuoteData.ProductName,
            "PolicyNo": this.viewQuoteData.PolicyNo,
            "Currency": this.viewQuoteData.Currency,
            "EmiYn": this.viewQuoteData?.EmiYn
          }
          sessionStorage.setItem('editCustomer', JSON.stringify(ReqObj));
          const userDetails = JSON.parse(
            sessionStorage.getItem(
              'Userdetails',
            ) as any,
          );
          userDetails.Result['ProductId'] = this.viewQuoteData.productId;
          userDetails.Result['ProductName'] = this.viewQuoteData.ProductName;
          sessionStorage.setItem(
            'Userdetails',
            JSON.stringify(userDetails),
          );
        } catch (error) {
          console.error('Invalid JSON passed in data param:', error);
        }
      }
    });

    this.addInfoDetail= [
      {tittle:'Driver Details'},
      {tittle:'Additional Information'},
      {tittle:'Collateral Details'}
    ]
   
    let CustomerObj = JSON.parse(sessionStorage.getItem('editCustomer'));
         
     
    this.search=CustomerObj?.Search;
    this.searchValue=CustomerObj.SearchValue;
    this.quoteNo=CustomerObj.QuoteNo;
    this.ReferenceNo=CustomerObj.RequestReferenceNo;
    this.pageFrom = CustomerObj?.pageFrom;
    this.productId=CustomerObj?.ProductId;
    this.CustomerName=CustomerObj?.CustomerName
    this.PolicyNo=CustomerObj?.PolicyNo
    this.ProductName=CustomerObj?.ProductName;
    this.curency=CustomerObj?.Currency;
    this.Emiyn=CustomerObj?.EmiYn;
    if(CustomerObj?.BranchCode) this.branchCode = CustomerObj?.BranchCode;
        if(this.quoteNo || this.ReferenceNo){
        this.onCustomerSearch();
        this.quoterisk();
        this.onPremium();
        this.VechileTira();
        this.payment();
        this.getDriverDetails();
        this.Documentview();
        this.domesticRisk();
        this.getRiskDetails();
        //  this.getallriskDetails();
       this.getTiraDetails();
        }
        if(this.productId!='42'){
         this.getbuilding();
        }
        if(this.productId == '39'){
         this.getmachinerydetails();
        }

        // && this.quoteNo || this.ReferenceNo 
        if(this.productId =='5'){
        
         //this.onRisk();
         this.getDriverDetails();
         this.getAccessories();
         
         // this.getBorrowerList();
        }
        if(this.productId =='4' && this.ReferenceNo){
         this.onTravelRisk();
        }
        if(this.productId =='59' && this.ReferenceNo){
         //this.onDomesRisk();
         this.getContentDetails();
         this.getPersonalAccidentDetails();
         this.getPersonalIntermediaryDetails();
         
        }
        if(this.productId =='16'){
         this.getMoneyDetails();
        }
        if(this.Emiyn=='Y'){
         this.getCurrentEmiDetails();
        }

       //  if(this.ReferenceNo){
       //   this.onRating()
       //  }

        if(this.productId =='46'){
         this.getmotordetails();
        }
        if(this.productId=='5' || this.productId=='46'){
        //  this.VechileTira();
        }
        if(this.quoteNo){
         if(this.productId=='14' || this.productId=='32'){
           this.getEmployeeDetails();
         }
         if(this.productId=='42'){
           this.getCyberDetails();
         }
         if(this.productId!='5'){
          // this.ViewRiskss();
          //this.onDomesRisk()
          // this.getRiskDetails();
         }
         this.getMachineryRisk();

        }
   //  if(this.searchValue){
   //    this.onCustomerSearch();
   //  }


    this.customerData=[{
      "SectionName":"VISN10018954",
        "CoverName":"Wind Cover",
        "Status":"Y",
        "MotorList":[{
          "BrokerCode": "10065",
          "LoginId": "broker71",
        }]
  },
  {
    "SectionName":"VFGDSA89765",
      "CoverName":"Motor Vechile Cover",
      "Status":"No",
      "MotorList":[{
        "BrokerCode": "10065",
        "LoginId": "broker71",
      }]
},
  ];


 
  /*this.innerColumnHeader=[
      { key: 'PolicyType', display: 'Policy Type' },
      { key: 'PolicyStartDate', display: 'Policy StartDate' },
      { key: 'VechileType', display: 'VechileType' },
      { key: 'Premium', display: 'Premium' },
      { key: 'QuoteDate', display: 'Quote Date' },
      { key: 'EffectiveDate', display: 'Effective Date' },
        /*{
          key: 'actions',
          display: 'Edit',
          config: {
          isEdit: true,
          },
        },
 
  ];*/

  this.innerTableData= [
        
      {
          "PolicyType":"PrivateComprehensive",
            "PolicyStartDate":"31/01/2023",
            "VechileType":"Private"

      },
  ];
 
     console.log('jjjjjjjjjjj',this.innerTableData)


 }

 vehicleDocuments(){
  if(this.productId!='5' && this.productId!='4' && this.productId!='59') return 'Individual Documents';
  else if(this.productId=='5') return 'Vehicle Documents';
  else if(this.productId=='4') return 'Passenger Documents';
  else if(this.productId=='59') return 'Location Documents';

 }
 addInfoDetails(){
  if(this.productId=='5') {
   
  }
  // return 'Driver Details';
  // else if(this.productId=='5') return 'Additional Information';
  // else if(this.productId!='5') return 'Additional Information';
  // else if(this.productId=='5') return 'Collateral Details';
 }
 getAccessories(){
  let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
  let ReqObj = {
    "QuoteNo": this.quoteNo,
    "SectionId": "99999"
  }
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res: any = data;
      if(res.Result){
        if (res.Result.ContentRiskDetails) {
         if(res.Result.ContentRiskDetails.length!=0){
           this.accessoriesList= res.Result.ContentRiskDetails;
           console.log('Get details of Accessories', this.accessoriesList);
         }
        }
     
      }
    })
}

 getDriverDetails(){
  let ReqObj = {
    "QuoteNo": this.quoteNo
  }
  let urlLink = `${this.motorApiUrl}api/getmotordrivers`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
         this.DriverInfo= data.Result;
         console.log("License List ",this.DriverInfo)
      }
    },
    (err) => { },
  );
}
  getallriskDetails() {
    throw new Error('Method not implemented.');
  }
  getbuilding() {
    throw new Error('Method not implemented.');
  }
  getmachinerydetails() {
    throw new Error('Method not implemented.');
  }

  onTravelRisk() {
    throw new Error('Method not implemented.');
  }
  getContentDetails() {
    throw new Error('Method not implemented.');
  }
  getPersonalAccidentDetails() {
    throw new Error('Method not implemented.');
  }
  getPersonalIntermediaryDetails() {
    throw new Error('Method not implemented.');
  }
  getMoneyDetails() {
    throw new Error('Method not implemented.');
  }
  getCurrentEmiDetails() {
    throw new Error('Method not implemented.');
  }
  getmotordetails() {
    throw new Error('Method not implemented.');
  }
 
  getEmployeeDetails() {
    throw new Error('Method not implemented.');
  }
  getCyberDetails() {
    throw new Error('Method not implemented.');
  }
  ViewRiskss() {
    throw new Error('Method not implemented.');
  }
  getMachineryRisk() {
    throw new Error('Method not implemented.');
  }
  getDriverName(Id){
    let DriverList=[];
    DriverList.push({ "Code":"1", "CodeDesc": "Owner"},
    { "Code":"2", "CodeDesc": "Driver"});
    let entry = DriverList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.CodeDesc;
    }
   }
   getLocationName(Id){
    let entry = this.chassislist.find(ele=>ele.Code==Id);
    if(entry){
      return entry.CodeDesc;
    }
  }
  getLocationNames(Id){
    let entry = this.LocationList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.CodeDesc;
    }
  }
  Documentview(){
 
    let ReqObj={
      "QuoteNo": this.quoteNo,
      "ProductId":this.productId,
      "RequestReferenceNo":this.ReferenceNo,
    }
    let urlLink = `${this.CommonApiUrl}api/viewdocumentdetails`;
    //http://192.168.1.91:8086/dropdown/viewdocumentdetails
  
   
   
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log('Document Info',data.Result);
        if(data?.Result){
              
          if(data.Result.IndividualDocumentRes){
            this.DocumentInfo=data?.Result?.IndividualDocumentRes;
            console.log(this.DocumentInfo);
          }
  
          if(data.Result.CommonDocumentRes){
            this.CommonDoc=data?.Result?.CommonDocumentRes;
          }
            
            // this.CommonDoc=data?.Result?.CommonDocumentRes;
            //this.quoteno=data.Result.QuoteNo
  
  
        }
  
      },
      (err) => { },
    );
  }
  
  getTiraDetails(){
    let ReqObj={
      "QuoteNo":this.quoteNo,
    }
    let urlLink = `${this.CommonApiUrl}api/tiraview`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result){
            this.tiradetails=data?.Result;
            console.log('tiradetails',this.tiradetails);
        }
      },
      (err) => { },
    );
  }
  getHeaderName(row){
    if(this.productId!='5' && this.productId!='46') return row.LocationName;
    else return row.SectionDetails[0].Registrationnumber;
  }
  getRiskDetails(){
    let ReqObj={
      "QuoteNo":this.quoteNo,
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result){
          let Risk=[],entry,i=0;
          this.LocationName = data.Result.LocationDetails;
          for( entry of data.Result.LocationDetails){
            
            this.SectionDetails=entry.SectionDetails;
            console.log(entry.SectionDetails,"this.riskDetailsNonMotor");
            this.DriverInfo=entry.DriverDetails;
          }
          this.ColatralDetails=data?.Result.RiskDetails[0];
          console.log(this.ColatralDetails,"this.riskDetailsNonMotor");
          // for(let entry2 of this.SectionDetails){
          //   let CoverName = entry2.Covers[0].CoverName;
          //   alert(CoverName)
          //   this.sectionCovers = entry2.Covers;
          //   // const filtered = entry2.Covers.filter(cover => cover.CoverName.includes(entry2.Covers.CoverName));
          //   console.log(this.sectionCovers,"filteredfilteredfiltered");
            
          //   // this.riskDetailsNonMotor.push(filtered)
          // }
        }
      },
      (err) => { },
    );
  }
  coverList(data){
    this.sectionCovers = data.Covers;
    console.log(this.sectionCovers,"sectionCoverssectionCoverssectionCoverssectionCovers");
    
  }
  onCustomerSearch(){
    let app
       if(this.userType == 'Issuer'){
         app=this.loginId
       }
       else{
         app="1"
       }
       //if(this.searchValue){
         //this.customerData = [];
         let ReqObj = {
          "ApplicationId": app,
          "QuoteNo":this.quoteNo,
          "ProductId":this.productId,
          "LoginId": this.loginId,
          "BranchCode": this.branchCode,
          "CustomerCode": null,
          "InsuranceId": this.insuranceId,
          "MotorCategory": null,
          "RequestReferenceNo":this.ReferenceNo,
          "SearchKey":this.search,
          "SearchValue": this.searchValue,
          "UserType": null,
          "VehicleMake": null,
          "VehicleModel": null,
          "VehicleType": null
   
         }
         let urlLink = `${this.CommonApiUrl}api/adminviewcustomerdetails`;
         this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
           (data: any) => {
             console.log(data);
             if(data?.Result){
                 this.customerInfo=data?.Result;
                 console.log('kkkkkkkkk',this.customerInfo)
                 //this.quoteno=data.Result.QuoteNo
             }
           },
           (err) => { },
         );
       //}
     }
     quoterisk(){
      let Reqobj={
        "QuoteNo": this.quoteNo,
        "ProductId": this.productId,
        "RequestReferenceNo": this.ReferenceNo,
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}api/viewquotedetails`;
      this.sharedService.onPostMethodSync(urlLink, Reqobj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.ViewRisk=data?.Result;
              //this.ChasNo(this.ViewRisk,this.ViewRisk[0].Chassisnumber,'1');
              console.log('mmmmmmmmmm',this.ViewRisk)
          }
        },
        (err) => { },
      );
    
    }

    domesticRisk(){
      
      let Reqobj={
        "QuoteNo": this.quoteNo,
        "ProductId": this.productId,
        "RequestReferenceNo": this.ReferenceNo,
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}api/adminviewquoteriskdetails`;
      this.sharedService.onPostMethodSync(urlLink, Reqobj).subscribe(
        (data: any) => {
          console.log(data);
          
          if(data?.Result){
            if(data?.Result.BurglaryRisk)this.riskDetails=data?.Result.BurglaryRisk;
            console.log(this.riskDetails,"this.riskDetails");
            if(data?.Result.EmpLiability)this.riskDetails=data?.Result.EmpLiability;
            if(data?.Result.AllRisk){
              this.AllRiskSumInsured=data?.Result.AllRisk.AllRiskSumInsured;
              this.ContentSumInsured=data?.Result.ContentRisk.ContentSumInsured;
              this.PersonalLiability=data?.Result.PersonalLiability;
            }
             
          }
        },
        (err) => { },
      );
    
    }
    onCommonDocumentDownload(index){
      let entry = this.CommonDoc[index];
      console.log("onCommonDocumentDownload",index);
      
      let ReqObj = {
       "Id": index.Id,
        "QuoteNo": this.quoteNo,
        "UniqueId": index.UniqueId
      }
      let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', data?.Result?.ImgUrl);
          link.setAttribute('download', data?.Result?.OriginalFileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
        (err) => { },
      );
    } 
    onViewCommonDocument(index){
      let entry = this.CommonDoc[index];
      //this.viewImageSection = true;
      console.log("onCommonDocumentDownload",index);
      
      let ReqObj = {
       "Id": index.Id,
        "QuoteNo": this.quoteNo,
        "UniqueId": index.UniqueId
      }
      let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.viewImageUrl = data.Result.ImgUrl;
            this.viewImageFileName =  data.Result.FileName;
            this.viewImageSection = true;
          }
      },
        (err) => { },
      );
    } 
    VechileTira(){
      let ReqObj={
        "QuoteNo":this.quoteNo,
         "ProductId":this.productId,
         "RequestReferenceNo": this.ReferenceNo,
         "InsuranceId":this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}api/adminviewropvehicledetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.RopVechileDetails=data?.Result?.VehicleDetails;
              console.log('RopInformation',this.RopVechileDetails)
              //this.quoteno=data.Result.QuoteNo
          }

        },
        (err) => { },
      );
     }
     payment(){

      let ReqObj={
        "QuoteNo":this.quoteNo,
         "ProductId":this.productId
      }
      let urlLink = `${this.CommonApiUrl}api/adminviewpaymentinfo`;
     
     
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
    
              this.PaymentInfo=data?.Result;
              this.tittlepay=[{tittle:data?.Result[0]?.PaymentTypedesc
              }]
    
    
          }
    
        },
        (err) => { },
      );
    }
    onPremium(){
      let ReqObj={
        "RequestReferenceNo":this.ReferenceNo,
         "ProductId":this.productId,
         "InsuranceId":this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}api/view/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
         
              this.PremiumInfo=data?.Result;
              this.sectionnameopted=this.PremiumInfo[0]?.SectionName;
              this.Currency=this.PremiumInfo[0].Currency;
              for(let s of this.PremiumInfo){
                this.PremiumInfoList = s?.CoverList
                this.sectionname = s?.CoverList?.SectionName;
              }
              console.log('PREEEEEEEEEEEEEEE',this.sectionname);
             // this.PremiumInfoList = this.PremiumInfo?.CoverList
             
              if(data.Result.length!=0){
                let i=0;
               for(let s of data.Result){
                this.risk=s?.RiskDetails;
                console.log('RiskDetails',this.risk);
                let j=0;
                   if(this.risk.length!=0){
                    this.chassislist.push({ "Code": String(i + 1), "CodeDesc": this.risk.Chassisnumber});
                    console.log('Chasiissss List',this.chassislist);
                    // for(let g of risk){
                    //   this.chassislist.push({ "Code": String(i + 1), "CodeDesc": g.Chassisnumber});
                    //   console.log('Chasiissss List',this.chassislist);
                    //   j+=1;
                    // }
                   }
                  i+=1;
               }
              }
              
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
     }
  redirectToCRM(){
  window.open(this.CRMPath, '_self');
 }
}



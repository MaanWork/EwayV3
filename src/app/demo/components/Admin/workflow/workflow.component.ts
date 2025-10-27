import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit{
  items: MenuItem[] | undefined;
  quoteOptions: any[] = [{label: 'Quotes', value: 'quotes'}, {label: 'Endrosements', value: 'endrosements'}];
  value: string = 'quotes';
  branches: MenuItem[] | undefined;
  selectedBranch: MenuItem | undefined;
  tableActions:MenuItem[] | undefined;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails:any;loginId:any=null;
  agencyCode:any=null;brokerbranchCode:any=null;
  branchCode:any=null;productId:any=null;
  userType:any=null;insuranceId:any=null;
  brokerCode:any=null;brokerList:any[]=[];
  quoteData:any[]=[];
  ApprovedquoteData:any[]=[];
  limit:any=0;totalQuoteRecords: any=null;
  pageCount: any=null;
  quotePageNo: any=null;
  startIndex: any=null;
  endIndex: any=null;
  section: any='quote';
  columns:string[] = [];
  columnss:string[] = [];
  ApproveredList:any[]=[];
  tableView = 'table'; 
  ApproverbrokerCode: any;
  Rejecedbrokercode: any;
  RejectedquoteData:any[]=[];
  ReQuoteList:any[]=[];ReQuoteData:any[]=[];
  RequoteBrokerCode: string;
  incomingList: any[]=[];
  assignedList: any[]=[];
  revokedList: any[]=[];
  approvedList: any[]=[];
  escalatedList: any[]=[];
  RejectedList: any[]=[];
  visible: boolean=false;
  workflowData: any[]=[];
  assigned: any[]=[];
  approved: any[]=[];
  escalation: any[]=[];
  rejected: any[]=[];
  revoked: any[]=[];
  quoteNumber: any;
  RefNo: any;
  statusTracking: boolean=false;
  workflowlevelList: any[]=[];
  ProposalId: any;
  tabStatusList: any[]=[];
  
  constructor(private router: Router,private sharedService: SharedService,private datePipe: DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;

  }
  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'WorkFlow'}];
    this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}];
    this.branches = [
      { label: 'Test', target: 'T' },
    ];
    //if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.columns = ['ReferenceNo','Customer Name','Duration','Start Date','End Date','Issued Date','Quote Finalised','Actions'];
      this.columnss = ['ReferenceNo','Customer Name','Start Date','End Date']
    //}
    this.getTabStatus();
    this.getExistingQuotes();
    this.getAssignedQuotes();
    this.getRevokedQuotes();
    this.getRejectedQuotes();
    this.getapprovedQuotes();
    this.getEscalatedQuotes();
  }


  getBrokerList(){
    let type=null;
    if(this.section=='quote'){type='Q'}
    else type='E';
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Type": type
    }
    let urlLink = `${this.CommonApiUrl}api/adminreferralpendingsdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
          ///  this.getExistingQuotes(null,'change')
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
           // this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );
  }
  getTabStatus(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "LoginId": this.loginId
    }
  let urlLink = `${this.CommonApiUrl}approver/menubasedonlevel`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        this.tabStatusList = data.Result;
      }
    },
    (err) => { },
  );
  }
    getExistingQuotes(){
    
        let ReqObj = {
          "CompanyId": this.insuranceId,
          "ProductId": this.productId,
          "LoginId": this.loginId
        }
      let urlLink = `${this.CommonApiUrl}approver/incomingforeach`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.incomingList = data.Result
          }
        },
        (err) => { },
      );
    }
    getAssignedQuotes(){
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId
      }
    let urlLink = `${this.CommonApiUrl}approver/assignedforeach`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.assignedList = data.Result
        }
      },
      (err) => { },
    );
    }

    getRevokedQuotes(){
   
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId
      }
    let urlLink = `${this.CommonApiUrl}approver/revokedforeach`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.revokedList = data.Result
        }
      },
      (err) => { },
    );
    }

    getapprovedQuotes(){
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId
      }
    let urlLink = `${this.CommonApiUrl}approver/approvedforeach`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.approvedList = data.Result
        }
      },
      (err) => { },
    );
    }

    getRejectedQuotes(){
   
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId
      }
    let urlLink = `${this.CommonApiUrl}approver/rejectedforeach`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.RejectedList = data.Result
        }
      },
      (err) => { },
    );
    }

  
    getEscalatedQuotes(){
   
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId
      }
    let urlLink = `${this.CommonApiUrl}approver/escalatedforeach`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.escalatedList = data.Result
        }
      },
      (err) => { },
    );
    }

  onEditQuotes(rowData){
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.setItem('QuoteStatus','AdminRP');
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    sessionStorage.setItem('FromWorkFlow','true');
    sessionStorage.setItem('ProposalId',rowData.ProposalId);
    sessionStorage.removeItem('vehicleDetailsList')
    this.router.navigate(['quotation/plan/premium-info']);
  }

  IncomingQuote(rowData){
    Swal.fire({
      title: '<strong></strong>',
      icon: 'info',
      html:
        `<ul class="list-group errorlist">
          <li>Do You Want Assign the Quote?</li>
      </ul>`,
       //showCloseButton: false,
        focusConfirm: true,
        showCancelButton:true,
  
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
      this.assign(rowData);
      }
  })
  }
  assign(rowData){
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId,
        "ProposalId": rowData.ProposalId,
        "ActionTaken": 'AS',
        "ActionRemarks": null,
      }
     let urlLink = `${this.CommonApiUrl}approver/takeaction`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            let msg =data.Result.Message;
            this.getExistingQuotes();
            this.getAssignedQuotes();
            Swal.fire({
              title: '<strong></strong>',
              icon: 'success',
              html:
                `<ul class="list-group errorlist">
                  <li>${msg}</li>
              </ul>`,
               //showCloseButton: false,
                focusConfirm: true,
          
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ok',
            })
          }
        },
        (err) => { },
      );
    }
activeStep = 0;  // Start at the first step
// workflowData = [
//   {
//     "WorkflowId": "9",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver1",
//     "HierarchyLevel": "Level 1",
//     "HierarchyValue": "1",
//     "ProposalId": "2",
//     "ActionTaken": "AS",
//     "ActionDateTime": "27/12/2024 12:20:21 pm",
//     "ActionRemarks": "assigned by level1",
//     "CustomerReferenceNo": null,
//     "RequestReferenceNo": null,
//     "QuoteNo": null
//   },
//   {
//     "WorkflowId": "10",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver1",
//     "HierarchyLevel": "Level 1",
//     "HierarchyValue": "1",
//     "ProposalId": "2",
//     "ActionTaken": "AP",
//     "ActionDateTime": "27/12/2024 12:58:46 pm",
//     "ActionRemarks": "approved by level1",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   },
//   {
//     "WorkflowId": "19",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver2",
//     "HierarchyLevel": "Level 2",
//     "HierarchyValue": "2",
//     "ProposalId": "2",
//     "ActionTaken": "AS",
//     "ActionDateTime": "28/12/2024 01:10:08 pm",
//     "ActionRemarks": "assigned by level 2",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   },
//   {
//     "WorkflowId": "20",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver2",
//     "HierarchyLevel": "Level 2",
//     "HierarchyValue": "2",
//     "ProposalId": "2",
//     "ActionTaken": "RV",
//     "ActionDateTime": "28/12/2024 01:10:48 pm",
//     "ActionRemarks": "revoked by level 2",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   },
//   {
//     "WorkflowId": "21",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver2",
//     "HierarchyLevel": "Level 2",
//     "HierarchyValue": "2",
//     "ProposalId": "2",
//     "ActionTaken": "AS",
//     "ActionDateTime": "28/12/2024 01:24:07 pm",
//     "ActionRemarks": "assigned by level 2",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   },
//   {
//     "WorkflowId": "22",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver2",
//     "HierarchyLevel": "Level 2",
//     "HierarchyValue": "2",
//     "ProposalId": "2",
//     "ActionTaken": "AP",
//     "ActionDateTime": "28/12/2024 01:24:21 pm",
//     "ActionRemarks": "approved by level 2",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   },
//   {
//     "WorkflowId": "23",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver3",
//     "HierarchyLevel": "Level 3",
//     "HierarchyValue": "3",
//     "ProposalId": "2",
//     "ActionTaken": "AS",
//     "ActionDateTime": "28/12/2024 01:24:53 pm",
//     "ActionRemarks": "assigned by level 3",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   },
//   {
//     "WorkflowId": "24",
//     "CompanyId": "100002",
//     "ProductId": "5",
//     "LoginId": "Ashok_Approver3",
//     "HierarchyLevel": "Level 3",
//     "HierarchyValue": "3",
//     "ProposalId": "2",
//     "ActionTaken": "AP",
//     "ActionDateTime": "28/12/2024 01:25:12 pm",
//     "ActionRemarks": "approved by level 3",
//     "CustomerReferenceNo": "AIC-CUST-12839",
//     "RequestReferenceNo": "AIC-MOT-17100",
//     "QuoteNo": ""
//   }
// ];

// Define steps dynamically
steps = this.workflowData.map(step => ({
  label: step.ActionRemarks,
  content: step // You can customize what content to show for each step
}));

// assigned = this.workflowData.filter(ele => ele.ActionTaken=='AS')
// approved = this.workflowData.filter(ele => ele.ActionTaken=='AP')
// escalation = this.workflowData.filter(ele => ele.ActionTaken=='ES')
// rejected = this.workflowData.filter(ele => ele.ActionTaken=='RJ')
// revoked = this.workflowData.filter(ele => ele.ActionTaken=='RV')
getView(rowData){
  // this.visible = true;
  // this.workflowData = [
  //   {
  //     "phase": "Phase 1",
  //     "description": "PHASE 1 DESCRIPTION TEXT...",
  //     "details": [
  //       "Phase 1 details...",
  //       "Phase 1 details...",
  //       "Phase 1 details...",
  //       "Phase 1 details..."
  //     ]
  //   },
  //   {
  //     "phase": "Phase 2",
  //     "description": "PHASE 2 DESCRIPTION TEXT...",
  //     "details": [
  //       "Phase 2 details...",
  //       "Phase 2 details...",
  //       "Phase 2 details...",
  //       "Phase 2 details..."
  //     ]
  //   },
  //   {
  //     "phase": "Phase 3",
  //     "description": "PHASE 3 DESCRIPTION TEXT...",
  //     "details": [
  //       "Phase 3 details...",
  //       "Phase 3 details...",
  //       "Phase 3 details...",
  //       "Phase 3 details..."
  //     ]
  //   },
  //   {
  //     "phase": "Phase 4",
  //     "description": "PHASE 4 DESCRIPTION TEXT...",
  //     "details": [
  //       "Phase 4 details...",
  //       "Phase 4 details...",
  //       "Phase 4 details...",
  //       "Phase 4 details..."
  //     ]
  //   },
  //   {
  //     "phase": "Phase 5",
  //     "description": "PHASE 5 DESCRIPTION TEXT...",
  //     "details": [
  //       "Phase 5 details...",
  //       "Phase 5 details...",
  //       "Phase 5 details...",
  //       "Phase 5 details..."
  //     ]
  //   },
  //   {
  //     "phase": "Phase 6",
  //     "description": "PHASE 6 DESCRIPTION TEXT...",
  //     "details": [
  //       "Phase 6 details...",
  //       "Phase 6 details...",
  //       "Phase 6 details...",
  //       "Phase 6 details..."
  //     ]
  //   }
  // ]
  this.quoteNumber = rowData.QuoteNo;
  this.RefNo = rowData.RequestReferenceNo;
  this.ProposalId = rowData.ProposalId;
  let ReqObj = {
    "CompanyId": this.insuranceId,
    "ProductId": this.productId,
  }
let urlLink = `${this.CommonApiUrl}hierarchy/getall`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    if(data.Result){
      this.visible = true;
      this.workflowlevelList = data.Result;
      
    }
  },
  (err) => { },
);
}
getTrackedStatus(rowData){
  
  let ReqObj = {
   "CompanyId": this.insuranceId,
    "ProductId": this.productId,
    "ProposalId": this.ProposalId,
    "HierarchyValue":rowData
  }
let urlLink = `${this.CommonApiUrl}workflow/fetchallbyproposalidandlevel`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    if(data.Result){
      this.statusTracking = true;
      this.workflowData = data.Result;
      
    }
  },
  (err) => { },
);
}
 parseDate(dateString) {
  const parts = dateString.split("/"); // Split the string by "/"
  // parts[0] = day, parts[1] = month, parts[2] = year

  // Adjust for month index (JavaScript months are 0-indexed, i.e., 0 = January)
  return new Date(parts[2], parts[1] - 1, parts[0]);
}
getDuration(date: Date): string {
  let endDate = new Date();
  let d1 = this.parseDate(date)

  return this.calculateDateDuration(d1, endDate);
}

 calculateDateDuration(startDate, endDate) {
  console.log(startDate,endDate);
  
  // Convert strings to Date objects if needed

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Ensure both dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid date';
  }
  // Calculate the difference in years, months, and days
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust for negative months or days
  if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); // Get the last day of the previous month
  }
  let result = 'Today';
  if(days>1){
  // Format the result as dd/MM/yyyy
   result = `${String(days).padStart(2, '0')} days ago`;
  }
  else if(days==1){
    result = `${String(days).padStart(2, '0')} day ago`;
  }
  console.log(result);
  return result;
}
calculateDateDuration1(startDate, endDate) {
  // Convert strings to Date objects if needed
console.log(startDate,endDate);

  const start = new Date(this.parseDate(startDate));
  const end = new Date(this.parseDate(endDate));
console.log(start,end);

  // Ensure both dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid date';
  }
  // Calculate the difference in years, months, and days
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  
  
  // Adjust for negative months or days
  if (days < 0) {
      months--;
     // years--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); // Get the last day of the previous month
  }
  console.log(days);
  
  let result = 'Same day';
  if(days>1){
  // Format the result as dd/MM/yyyy
   result = `${String(days).padStart(2, '0')} days ago`;
  }
  else if(days==1){
    result = `${String(days).padStart(2, '0')} day ago`;
  }
  console.log(result);
  return result;
}

}

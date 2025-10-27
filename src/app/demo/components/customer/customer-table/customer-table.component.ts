import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '@app/_services/shared.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styles: [] 
})

export class CustomerTableComponent implements OnInit{
  items: MenuItem[] | undefined;
  tableActions:MenuItem[] | undefined;
  columns:string[] = []; 
  customers:any[] = []; 
  tableView = 'table';
  userDetails:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  userType:any=null;brokerbranchCode:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  searchValue: any=null;deActiveCustomers:any[]=[];
  clearSearchSection: boolean=false;pendingCustomers:any[]=[];
  activeCustomers: any[]=[];lang:any=null;
  taxList:any[]=[];
  insurerEdit: boolean=false;
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
        this.setHeaders()
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
      this.setHeaders();
    }
    this.getCustomersList();
    this.getTaxExcepted();
  }
  ngOnInit() {
   
    this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}, {label: 'Delete',icon: PrimeIcons.TRASH}];
    
    
    this.customers = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];

  }
  setHeaders(){
    if(this.lang=='en'){ 
      if(this.insuranceId!='100028') this.columns = [ 'Reference No','Customer Name',  'Customer Type','ID Number', 'Mobile No', 'TaxExempted', 'Created By', 'Status', 'Action'];
      else this.columns = [ 'Reference No','Customer Name',  'Customer Type','ID Number', 'Mobile No', 'Created By', 'Status', 'Action'];
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Customer'}];
    }
    else if(this.lang=='po'){ 
      if(this.insuranceId!='100028') this.columns = [ 'Número de referência','Nome do cliente',  'Tipo de Cliente','Número de identidade', 'Número de telemóvel', 'Isento de Imposto', 'Criado por', 'Estado', 'Ação'];
      else this.columns = [ 'Número de referência','Nome do cliente',  'Tipo de Cliente','Número de identidade', 'Número de telemóvel',  'Criado por', 'Status', 'Ação'];
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Cliente'}];
    }
    else if(this.lang=='fr'){ 
      if(this.insuranceId!='100028') this.columns = [ 'Numéro de référence','Nom du client',  'Type de client',"Numéro d'identification", 'Numéro de portable', "Exonéré d'impôt", 'Créé par', 'Statut', 'Action'];
      
      this.items = [{ label: 'Accueil', routerLink:'/' }, {label:'Client'}];
    }
  }
  onAddCustomer(rowData){
    if(rowData){
      sessionStorage.setItem('customerReferenceNo',rowData?.CustomerReferenceNo);
      if(this.insuranceId=='100040' || this.insuranceId=='100027'){
        //this.insurerEdit=true;
        sessionStorage.setItem('insurerEdit','insurerEdit');
      }
    }
    else{sessionStorage.removeItem('customerReferenceNo')}
    this.router.navigate(['customer/create']);
  }
  getCustomersList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
    let ReqObj = {
    "BrokerBranchCode": brokerbranchCode,
    "InsuranceId":this.insuranceId,
    "ProductId": this.productId,
    "CreatedBy":this.loginId,
    "BranchCode":this.branchCode,
    "UserType": this.userType,
    "Limit":"0",
    "Offset":"100"
    }
    if (this.insuranceId == '100050') {
      if (this.productId == '5' || this.productId == '93') {
        ReqObj["CustomerType"] = "Domestic";
      } else {
        ReqObj["CustomerType"] = "Commercial";
      }
    }
    let urlLink = `${this.CommonApiUrl}api/getallcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customers = data?.Result;
            this.activeCustomers = data?.Result.filter(ele=>ele.Clientstatus=='Y');
            this.deActiveCustomers = data?.Result.filter(ele=>ele.Clientstatus=='N');
            this.pendingCustomers = data?.Result.filter(ele=>ele.Clientstatus=='P');
            this.searchValue = "";
            if(this.clearSearchSection){
              this.clearSearchSection = false;
            }
        }

      },
      (err) => { },
    );
  }

  getTaxExcepted(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "CUSTOMER_VAT_TYPE",
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
      console.log(data);
      if(data.Result){
        this.taxList = data.Result;
      }
      },
      (err) => { },
    );
    }
    getDesc(rowData){
     let entry  = this.taxList.find(ele=>ele.Code==rowData)?.CodeDesc;
      return entry
    }
}

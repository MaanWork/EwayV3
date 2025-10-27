import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CustomerTableComponent } from '../customer/customer-table/customer-table.component';
import { CustomerCreateFormComponent } from '../customer/customer-create-form/customer-create-form.component';
import { VehicleTableComponent } from '../vehicle/vehicle-table/vehicle-table.component';
import { VehicleCreateFormComponent } from '../vehicle/vehicle-create-form/vehicle-create-form.component';
import { CustomerDetailComponent } from '../customer/customer-detail/customer-detail.component';
import { PolicyTableComponent } from '../policy/policy-table/policy-table.component';
import { CommonQuoteDetailsComponent } from '../common-quote-details/common-quote-details.component';
import { QuotationTableComponent } from '../quotation/quotation-table/quotation-table.component';
import { TiraSearchComponent } from '../tira-search/tira-search.component';
import { ReferralComponent } from '../referral/referral.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ReportComponent } from '../report/report.component';
import { ReferralCasesComponent } from '../Admin/referralCases/referral-cases.component';
import { SearchComponent } from '../Search/search.component';
import { EndorsementComponent } from '../portfolio/endorsement/endorsement.component';
import { EndorsementTypeComponent } from '../portfolio/endorsement-type/endorsement-type.component';
import { MotorDocumentsDetailComponent } from '../MotorDocuments/motor-documents-detail/motor-documents-detail.component';
import { CustomerComponent } from '../auth/login/customer/customer.component';
import { CustomerInfoComponent } from '../auth/login/customer-info/customer-info.component';
import { CustomerProductsComponent } from '../auth/login/customer-products/customer-products.component';
import { ReInsuranceComponent } from '../Admin/re-insurance/re-insurance.component';
import { ClaimIntimateComponent } from '../portfolio/claim-intimate/claim-intimate.component';
import { CustomerAsInsurerComponent } from '../customer/customer-as-insurer/customer-as-insurer.component';
import { EmiDetailsNewComponent } from '../quotation/quotation-plan/Emi-Details/emi-details.component';
import { WorkflowComponent } from '../Admin/workflow/workflow.component';
import { PaymentStatusComponent } from '../Admin/payment-status/payment-status.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DashboardComponent },
    { path: 'customer', component: CustomerTableComponent },
    { path: 'customer/create', component: CustomerCreateFormComponent },
    { path: 'customer/insurer', component: CustomerAsInsurerComponent },
    { path: 'customer/detail', component: CustomerDetailComponent },
    { path: 'vehicle', component: VehicleTableComponent },
    { path: 'vehicle/create', component: VehicleCreateFormComponent },
    { path: 'quotation', component: QuotationTableComponent },
    { path: 'quotation/plan', loadChildren: () => import('../quotation/quotation-plan/quotation-plan.module').then(m => m.QuotationPlanModule) },
    { path: 'policy', component: PolicyTableComponent },
    { path: 'policyDetails', component: CommonQuoteDetailsComponent },
    { path: 'tira-search', component: TiraSearchComponent },
    { path: 'referral', component: ReferralComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'logincreation', loadChildren: () => import('../Admin/login-creation/login-creation.module').then(m => m.LoginCreationModule) },
    { path: 'customerProducts', component: CustomerProductsComponent },
    { path: 'portfolio/endorsement', component: EndorsementComponent },
    { path: 'portfolio/claimIntimate', component: ClaimIntimateComponent },
    { path: 'portfolio/endorsementtype', component: EndorsementTypeComponent },
    { path: 'portfolio/motorDocuments', component: MotorDocumentsDetailComponent },
    { path: 'report', component: ReportComponent },
    { path: 'referralCases', component: ReferralCasesComponent },
    { path: 'Search', component: SearchComponent },
    { path: 'reinsurance', component: ReInsuranceComponent },
    { path: 'customerview', component: CustomerComponent },
    { path: 'customer-info', component: CustomerInfoComponent },
    // { path: 'Home/credit-controller', loadChildren: () => import('../../components/Admin/payment-Controller/credit-Controller/credit-Controller.module').then(m => m.CreditControllerModule)},
    // { path: 'Home/surveyor', loadChildren: () => import('../../components/Admin/payment-Controller/surveyor/surveyor.module').then(m => m.SurveyorModule)},
    // { path: 'Home/uw-controller', loadChildren: () => import('../../components/Admin/payment-Controller/uw-controller/uw-Controller.module').then(m => m.UWControllerModule)},
    { path: 'yakeenSearch', loadChildren: () => import('../../components/yakeen-search/yakeen-search.module').then(m => m.YakeenSearchModule) },
    { path: 'tirastatus', loadChildren: () => import('../../components/tira-status/tira-status.module').then(m => m.TiraStatusModule) },
    { path: 'Admin', loadChildren: () => import('../Admin/admin.module').then(m => m.AdminModule) },
    { path: 'Home/others/premiaintegration', loadChildren: () => import('../../components/othersmenu/premia.module').then(m => m.PremiaIntegrationViewModule) },
    {
      path: 'Home/ApproverPortfolio',
      loadChildren: () => import('../approverportfolio/approverportfolio.module').then(m => m.ApproverPortfolioModule),
    },
    {
      path: 'ApproverPortfolio/NewDetails',
      loadChildren: () => import('../newpage/newpage.module').then(m => m.NewPageModule),
    },
    {
      path: 'Home/Followup', loadChildren: () => import('../../../demo/components/FollowUp/followup.module').then(m => m.FollowupModule),
    },
    {
      path: 'Home/Mail', loadChildren: () => import('../../components/Mail/mail.module').then(m => m.MailModule),
    },
    {
      path: 'Home/Sms', loadChildren: () => import('../../components/Sms/Sms.module').then(m => m.SmsModule),
    },
    { path: "portfolio/emiDetails", component: EmiDetailsNewComponent },
    { path: 'workFlow', component: WorkflowComponent },
    { path: 'payment-status', component: PaymentStatusComponent },
    // {path:'crmHome',loadChildren: () => import('../../components/CRM/crm-home.module').then(m => m.CRMHomeModule)},
    { path: 'renewal', loadChildren: () => import('../../components/Renewal/renewal.module').then(m => m.RenewalModule) },
    // {path:'garage',loadChildren: () => import('../../components/garage/garage.module').then(m => m.GarageModule)},
      {path:"home" , component:LandingPageComponent},
          

  ])],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }

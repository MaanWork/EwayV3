import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { QuotationPlanRoutingModule } from './quotation-plan-routing.module';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { VehiclePlanComponent } from './vehicle-plan/vehicle-plan.component';
import { AccesoriesComponent } from './accesories/accesories.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { QuotationTypeInfoComponent } from './quotation-type-info/quotation-type-info.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoverDetailsComponent } from './cover-details/cover-details.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { SharedModule } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/_services/directives.module';
import { PolicyInfoComponent } from './policy-info/policy-info.component';
import { VehicleCreateFormComponent } from './vehicle-create-form/vehicle-create-form.component';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ExcessDiscountComponent } from './excess-discount/excess-discount.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PersonalQuoteDetailsComponent } from './personal-quote-details/personal-quote-details.component';
import { FormlyModule } from '@ngx-formly/core';
import { DatepickerTypeComponent } from './formlyTypes/DatepickerTypeComponent';
import { TablesTypeComponent } from './formlyTypes/formlytable';
import { TableTypeComponent } from './formlyTypes/tableType';
import { CommaSeparatorInput } from './formlyTypes/commaSeperatorInput';
import { NgSelect } from './formlyTypes/ngselect';
import { RadioList } from './formlyTypes/radioList';
import { DisplayLabels } from './formlyTypes/displayformly';
import { DisplayLabel } from './formlyTypes/displayText';
import { RepeatTypeComponent } from './formlyTypes/repeatArray.type';
import { MultiSchemaTypeComponent } from './formlyTypes/multiSchemaType';
import { ArrayTypeComponent } from './formlyTypes/arrayType';
import { FormlyFieldStepper } from './formlyTypes/stepper.type';
import { FormlyFieldTabs } from './formlyTypes/tab.type';
import { NullTypeComponent } from './formlyTypes/nullType';
import { ObjectTypeComponent } from './formlyTypes/objectType';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { InputFieldType } from './formlyTypes/inputFieldType';
import { DateFieldType } from './formlyTypes/dateFieldType';
import { CommonProductDetailsComponent } from './common-product-details/common-product-details.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { TreeSelect, TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { ListboxModule } from 'primeng/listbox';
import { RiskDetailsComponent } from './Riskpage/Riskdetails.component';
import { NgSelectAlt } from './formlyTypes/ngselectAlt';
import { CopyQuoteComponent } from './copyQuote/copyquote.component';
import { ShortQuoteComponent } from './short-quote/short-quote.component';
import { TravelQuoteDetailsComponent } from './travel-quote-details/travel-quote-details.component';
import { CustomerInfoComponent } from '../../auth/login/customer-info/customer-info.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { EmiDetailsNewComponent } from './Emi-Details/emi-details.component';
import { DisplayLabelFire } from './formlyTypes/displayTextFire';
import { TextareaTypeComponent } from './formlyTypes/textareaTypeField';
import { PolicyformComponent } from './policyform/policyform.component';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HomePremiumComponent } from './home-premium/home-premium.component';
import { SlicePairsPipe, TableDoubleTypeComponent } from './formlyTypes/tableDoubleType';
import { CoInsuranceDetailsComponent } from './co-insurance-details/co-insurance-details.component';
import { TreeModule } from 'primeng/tree';
import { BadgeModule } from 'primeng/badge';
import { ProductRiskDetailsComponent } from './product-risk-details/product-risk-details.component';
import { DetoriationOfStockComponent } from './product-risk-details/Products/detoriation-of-stock/detoriation-of-stock.component';
import { FireComponent } from './product-risk-details/Products/fire/fire.component';
import { GlassComponent } from './product-risk-details/Products/glass/glass.component';
import { StateBenefitsComponent } from './product-risk-details/Products/state-benefits/state-benefits.component';
import { CommercialPackageComponent } from './product-risk-details/Products/commercial-package/commercial-package.component';
import { AccidentalDamageComponent } from './product-risk-details/Products/accidental-damage/accidental-damage.component';
import { AccountsRecivableComponent } from './product-risk-details/Products/accounts-recievable/accounts-recivable.component';
import { MachineryBreakdownComponent } from './product-risk-details/Products/machinery-breakdown/machinery-breakdown.component';
import { TheftComponent } from './product-risk-details/Products/theft/theft.component';
import { UmbrellaLiablityComponent } from './product-risk-details/Products/umberlla-liability/umberlla-liability.component';
import { BuildingComponent } from './product-risk-details/Products/building/building.component';
import { ElectronicEquipmentComponent } from './product-risk-details/Products/electronic-equipment/electronic-equipment.component';
import { EmployersLiabilityComponent } from './product-risk-details/Products/employers-liability/employers-liability.component';
import { FidelityComponent } from './product-risk-details/Products/fidelity/fidelity.component';
import { BusinessAllRiskComponent } from './product-risk-details/Products/business-all-risk/business-all-risk.component';
import { MoneyComponent } from './product-risk-details/Products/money/money.component';
import { OfficeContentsComponent } from './product-risk-details/Products/office-contents/office-contents.component';
import { HouseownersComponent } from './product-risk-details/Products/houseowners/houseowners.component';
import { GoodsInTransitComponent } from './product-risk-details/Products/goods-in-transit/goods-in-transit.component';
import { PersonalAllRisksComponent } from './product-risk-details/Products/personal-all-risks/personal-all-risks.component';
import { DirectorOfficerComponent } from './product-risk-details/Products/director-officer/director-officer.component';
import { KidnapAndRansomComponent } from './product-risk-details/Products/kidnapAndRansom/kidnapAndRansom.component';
import { CashInTransitComponent } from './product-risk-details/Products/cash-in-transit/cash-in-transit.component';
import { PublicLiabilityComponent } from './product-risk-details/Products/public-liability/public-liability.component';
import { HouseHoldersComponent } from './product-risk-details/Products/house-holders/house-holders.component';
import { ThirdpartyLiabilityComponent } from './product-risk-details/Products/thirdparty-liability/thirdparty-liability.component';
import { PensionFundTrusteeComponent } from './product-risk-details/Products/Pension-Fund-Trustee/Pension-Fund-Trustee.component';
import { PersonalLiabilityComponent } from './product-risk-details/Products/personal-liability/personal-liability.component';
import { ConstructionAllRiskComponent } from './product-risk-details/Products/construction-all-risk/construction-all-risk.component';
import { ProfessionalIndeminityComponent } from './product-risk-details/Products/professional-Indeminity/professional-Indeminity.component';
import { CourtBondComponent } from './product-risk-details/Products/court-bond/court-bond.component';
import { FuelGuaranteeComponent } from './product-risk-details/Products/fuelguarantee/fuelguarantee.component';
import { LivestockComponent } from './product-risk-details/Products/livestock/livestock.component';
import { PerformanceGuaranteeComponent } from './product-risk-details/Products/performance-guarantee/performance-guarantee.component';
import { PlantAllRiskComponent } from './product-risk-details/Products/plant-all-risk/plant-all-risk.component';
import { GroupPersonalAccidentComponent } from './product-risk-details/Products/group-personal-accident/group-personal-accident.component';
import { CustomsAndTransitBondComponent } from './product-risk-details/Products/customs-and-transit-bond/customs-and-transit-bond.component';
import { BidTenderBondComponent } from './product-risk-details/Products/bid-tender-bond/bid-tender-bond.component';
import { PersonalPackagePlusComponent } from './product-risk-details/Products/personal-package-plus/personal-package-plus.component';
import { NichePackagePlusComponent } from './product-risk-details/Products/niche-package-plus/niche-package-plus.component';
import { AgricultureComponent } from './product-risk-details/Products/agriculture/agriculture.component';
import { GoodsInTransitTZAComponent } from './product-risk-details/Tanzaniya/goods-in-transit/goods-in-transit.component';
import { CarrierLegalLiabilityComponent } from './product-risk-details/Tanzaniya/carrier-legal-liability/carrier-legal-liability.component';
import { CarUptoBillionComponent } from './product-risk-details/Tanzaniya/car-upto-billion/car-upto-billion.component';
import { CarAboveBillionComponent } from './product-risk-details/Tanzaniya/car-above-billion/car-above-billion.component';
//import { textareaTypeField } from './formlyTypes/textareaTypeField';
export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}
@NgModule({
  declarations: [
    VehicleCreateFormComponent,
    PolicyInfoComponent,
    CoverDetailsComponent,
    VehiclePlanComponent, 
    AccesoriesComponent,
    DocumentInfoComponent, 
    DriverInfoComponent, 
    QuotationTypeInfoComponent, 
    PaymentInfoComponent,
    ExcessDiscountComponent,
    PersonalQuoteDetailsComponent,
    CopyQuoteComponent,
    ObjectTypeComponent,
    ArrayTypeComponent,
    NullTypeComponent,
    InputFieldType,
    DateFieldType,
    FormlyFieldStepper,
    CommaSeparatorInput,
    DatepickerTypeComponent,
    FormlyFieldTabs,
    RepeatTypeComponent,
    TableTypeComponent,
    TablesTypeComponent,
    TableDoubleTypeComponent,
    SlicePairsPipe,
    TextareaTypeComponent,
    RadioList,
    NgSelect,
    NgSelectAlt,
    CommonProductDetailsComponent,
    RiskDetailsComponent,
    ShortQuoteComponent,
    TravelQuoteDetailsComponent,
    CustomerInfoComponent,
    EmiDetailsNewComponent,
    PolicyformComponent,
    HomePremiumComponent,
    CoInsuranceDetailsComponent,
    ProductRiskDetailsComponent,
    DetoriationOfStockComponent,FireComponent,
    GlassComponent,
    StateBenefitsComponent,
    CommercialPackageComponent,
    MachineryBreakdownComponent,
    AccidentalDamageComponent,
    AccountsRecivableComponent,
    TheftComponent,
    UmbrellaLiablityComponent,
    BuildingComponent,
    ElectronicEquipmentComponent,
    EmployersLiabilityComponent,
    FidelityComponent,
    BusinessAllRiskComponent,
    MoneyComponent,
    OfficeContentsComponent,
    HouseownersComponent,
    GoodsInTransitComponent,
    PersonalAllRisksComponent,
    DirectorOfficerComponent,
    KidnapAndRansomComponent,
    CashInTransitComponent,
    PublicLiabilityComponent,
    HouseHoldersComponent,
    ThirdpartyLiabilityComponent,
    PensionFundTrusteeComponent,
    PersonalLiabilityComponent,
    ConstructionAllRiskComponent,
    ProfessionalIndeminityComponent,
    CourtBondComponent,
    FuelGuaranteeComponent,
    PerformanceGuaranteeComponent,
    LivestockComponent,
    PlantAllRiskComponent,
    GroupPersonalAccidentComponent,
    BidTenderBondComponent,
    CustomsAndTransitBondComponent,
    PersonalPackagePlusComponent,
    NichePackagePlusComponent,CarUptoBillionComponent,CarAboveBillionComponent,
    AgricultureComponent,GoodsInTransitTZAComponent,CarrierLegalLiabilityComponent
  ],
  imports: [
    CommonModule,
    QuotationPlanRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbModule, 
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    CardModule,
    TreeSelectModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    CheckboxModule,
    SidebarModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    PipesModule,
    SelectButtonModule,
    RadioButtonModule,
    DirectivesModule,
    AccordionModule,
    SplitButtonModule,
    SpeedDialModule,
    CalendarModule,
    ConfirmDialogModule,
    InputNumberModule,
    MatDialogModule,
    MaterialModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    AutoCompleteModule,
    TreeTableModule,
    ListboxModule,BadgeModule,
    // InputGroupModule,
    // InputGroupAddonModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' },
      { name: 'maxlength', message: maxlengthValidationMessage },],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
        { name: 'tabs', component: FormlyFieldTabs, wrappers: [] },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'display', component: DisplayLabel },
        { name: 'displayFire', component: DisplayLabelFire },
        { name: 'displays', component: DisplayLabels },
        {name: 'ngselect', component:NgSelect},
        {name: 'ngselectAlt', component:NgSelectAlt},
        { name: 'commaSeparator', component: CommaSeparatorInput, wrappers: ['form-field'] },
        { name: 'commaSeparators', component: CommaSeparatorInput, wrappers: ['form-field'] },
        { name: 'table', component: TableTypeComponent, wrappers: ['form-field'] },
        { name: 'double-table', component: TableDoubleTypeComponent, wrappers: ['form-field'] },
        { name: 'tables', component: TablesTypeComponent, wrappers: ['form-field'] },
        { name: 'primeTextArea', component: TextareaTypeComponent, wrappers: ['form-field'] },
        { name: 'radioList', component: RadioList },
        {
          name: 'datepicker',
          component: DatepickerTypeComponent,
          //wrappers: ['form-field'],
          defaultOptions: {
            defaultValue: new Date(),
            templateOptions: {
              datepickerOptions: {},
            },
          },
        },
        // {
        //   name: 'my-autocomplete',
        //   component: NgSelectFormlyComponent
        // },
        {
          name: 'string',
          extends: 'input'
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number'
            }
          }
        },
        {
          name: 'date',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'datepicker'
            }
          }
        },
        { name: 'input', component: InputFieldType },
        // { name: 'textarea', component: textareaTypeField },
        // {
        //   name: 'date',
        //    component: DateFieldType
        // }
      ],
		  }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FormlyMaterialModule,
    FormlyBootstrapModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
		FormlyMatToggleModule,
    SelectButtonModule
  ],
  providers : [
    RepeatTypeComponent,
    TreeModule
  ]
})
export class QuotationPlanModule { }

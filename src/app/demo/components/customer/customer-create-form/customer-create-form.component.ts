import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { ProductData } from './product';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { CustomerTanzaniya } from '../../quotation/quotation-plan/models/Tanzaniya/CustomerTanzaniya';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Region } from '../../Admin/Masters/region/new-regiondetails/regionModal';
import { CustomerIvory } from '../../quotation/quotation-plan/models/sanlamIvory/CustomerIvory';
import { CustomerBurkina } from '../../quotation/quotation-plan/models/sanlamBurkina/CustomerBurkina';
import { CustomerSanlam } from '../../quotation/quotation-plan/models/sanlam/CustomerSanlam';
import { CustomerOromia } from '../../quotation/quotation-plan/models/Oromia/CustomerOromia';
import { CustomerUganda } from '../../quotation/quotation-plan/models/Uganda/CustomerUganda';
import { CustomerMadison } from '../../quotation/quotation-plan/models/Madison/CustomerMadison';
import { CustomerKenya } from '../../quotation/quotation-plan/models/Kenya/CustomerKenya';
import { CustomerSaudiarabia } from '../../quotation/quotation-plan/models/Saudiarabia/CustomerSaudiarabia';
import { CustomerPhoneix } from '../../quotation/quotation-plan/models/phoneix/PhoenixBotswana/CustomerPhoneix';
import { CustomerPhoneixZambia } from '../../quotation/quotation-plan/models/phoneix/PhoenixZambia/CustomerPhoneixZambia';
import { CustomerPhoneixSwazilnd } from '../../quotation/quotation-plan/models/phoneix/PhoenixSwazilnd/CustomerPhoneixSwazilnd';
import { CustomerPhoneixNamibia } from '../../quotation/quotation-plan/models/phoneix/PhoenixNamibia/CustomerPhoneixNamibia';
import { debounceTime } from 'rxjs';
import { CustomerEagle } from '../../quotation/quotation-plan/models/Eagle/CustomerEagle';
import { SharedService } from 'src/app/_services/shared.service';
import { CustomerPhoneixMozambique } from '../../quotation/quotation-plan/models/phoneix/PhoenixMozambique/CustomerPhoneixMocambique';
@Component({
	selector: 'app-customer-create-form',
	templateUrl: './customer-create-form.component.html',
	styles: [`
  .card .form-container .flex-column { min-width: 200px; }
  .card .form-container div label { font-weight: bold; }
  `],
	providers: [MessageService, ConfirmationService, TranslateService]
})
export class CustomerCreateFormComponent implements OnInit {
	messages: Message[] = [];
	items: MenuItem[] | undefined;
	customerTypes: any[] | undefined;
	currentCustomerType: string = 'personal';
	ownerCategoryOptions: any[] | undefined;
	selectedOwnerCategory: any | undefined;
	statusOptions: string = ''; maxTextLen: any = '10';
	date: Date | undefined;
	userDetails: any = null; maxDate: any = null;
	maxDobDate: any = null; loginId: any = null;
	agencyCode: any = null; branchCode: any = null;
	productId: any = null; insuranceId: any = null;
	loginType: any = null; userType: any = null; quoteNo: any = null;
	brokerbranchCode: any = null; typeValue: any = null;
	statusList: any[] = []; notificationList: any[] = [];
	taxExcemptedList: any[] = []; policyHolderList: any[] = [];
	public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
	customerReferenceNo: any = null; titleList: any[] = []; CustomerTypeList: any[] = [];
	regionList: any[] = []; stateList: any[] = []; enableFieldsList: any[] = [];
	countryList: any[] = []; genderList: any[] = []; flagList: any[] = [];
	occupationList: any[] = []; mobileCodeList: any[] = []; personalInfoFields: any[] = []
	businessTypeList: any[] = []; productItem: any = null; endorsementName: any = null;
	policyHolderTypeList: any[] = []; dob: any = null; stateOptions: any[] = [];
	value1: string = 'en'; final1: boolean = false; final2: any = false; final3: any = false; final4: any = false; final5: any = false;
	final6: any = false; final7: any = false; endorseCategory: any = null;
	shows: boolean = false; final: boolean = false; endorsementId: any = null;
	Idnumber: any; shortQuoteYN: boolean = false; enableCustomerDetails: boolean = false;
	Idnumber1: any; endorsementSection: boolean = false; additionalInfoFields: any[] = []; addressInfoFields: any[] = [];
	Idnumber2: any; lang: any = null;
	public form = new FormGroup({});
	fields: any[] = [];
	socioProfessionalList: any[] = [];
	dobMin: Date;
	nationalityList: any[] = [];
	departmentList: any[] = [];
	taxList: any[] = [];
	insurer: any = 'N';
	maretialStatusList: any[] = [];
	PolicyHolderTypeid: any;
	locationList: any[] = [];
	newLocation: any = {};
	locationDialogVisible = false;
	editingIndex: number | null = null;
	quoteDialogVisible: boolean = false;

	quoteList : any[]=[];

	policyDialogVisible: boolean = false;

	policyList :any[]=[];
	claimList: any[]=[];
	claimDialogVisible: boolean = false;
	quoteGlobalFilter: string = '';
	policyGlobalFilter: string = '';
	quoteFilters: any = {};
	policyFilters: any = {};
	claimFilters: any = {};
	locationNameError: string;
	addressError: string;
	IndustryTypeList: any[] = [];
	WealthSourceList: any[] = [];
	LegalStructureList: any[] = [];
	ComplianceStatusList: any[] = [];
	OwnersList: any[];
	constructor(private confirmationService: ConfirmationService, private sharedService: SharedService, private datePipe: DatePipe,
		private messageService: MessageService, private router: Router, private translate: TranslateService, private appComp: AppComponent,
		private primeNGConfig: PrimeNGConfig, private cdRef: ChangeDetectorRef) {
		this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
		if (sessionStorage.getItem('otpValidated')) {
			sessionStorage.removeItem('otpValidated');
			window.location.reload();
		}
		let type = sessionStorage.getItem('QuoteType')
		if (type) this.shortQuoteYN = true;
		//this.maxDate = new Date();
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		this.appComp.getLanguage().subscribe((res: any) => {
			if (res) this.lang = res;
			else this.lang = 'en';
			this.translate.setDefaultLang(this.lang);
		});
		if (!this.lang) {
			if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
			else this.lang = 'en';
			sessionStorage.setItem('language', this.lang)
			this.translate.setDefaultLang(sessionStorage.getItem('language'));
			this.setHeaders();
			this.checkFieldNames()
		}
		this.maxDobDate = new Date(year - 18, month, day);
		// if(this.productItem.IdType=='1' || this.productItem.IdType==1){
		// 	this.productItem.dobOrRegDate=this.maxDobDate;
		// }
		this.loginId = this.userDetails.Result.LoginId;
		this.agencyCode = this.userDetails.Result.OaCode;
		this.branchCode = this.userDetails.Result.BranchCode;
		this.productId = this.userDetails.Result.ProductId;
		this.insuranceId = this.userDetails.Result.InsuranceId;
		this.loginType = this.userDetails.Result.LoginType;
		this.userType = this.userDetails.Result.UserType;
		this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue');
		if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
			this.getCustomerType();
		}
		if(this.insuranceId == '100047'){
			this.getIndustryTypeList();
			this.getWealthSourceList();
			this.getComplianceStatus();
			this.getLegalStructure();
			this.getOwnersList();
		}
		this.stateOptions = [
			{ label: 'English', value: 'en' },
			{ label: 'Portugese', value: 'po' },
			// { label: 'French', value: 'fr' },
			// { label: 'Telugu', value: 'te' },
			// { label: 'Urdu', value: 'ur' },
		];
		// this language will be used as a fallback when a translation isn't found in the current language


		this.statusList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'Active', Code: 'Y' },
			{ CodeDesc: 'DeActive', Code: 'N' },
			{ CodeDesc: 'Pending', Code: 'P' }
		];
		// this.notificationList = [
		// 	{ CodeDesc: 'Select', Code: '',CodeDescLocal:'Sélectionner' },
		// 	{ CodeDesc: 'SMS', Code: 'Sms',CodeDescLocal:'SMS -P' },
		// 	{ CodeDesc: 'Mail', Code: 'Mail',CodeDescLocal:'E-mail -P' },
		// 	{ CodeDesc: 'Whatsapp', Code: 'Whatsapp',CodeDescLocal:'Whatsapp -P' }
		// ];
		this.taxExcemptedList = [
			{ CodeDesc: '-Select-', Code: '', 'CodeDescLocal': 'Sélectionner' },
			{ CodeDesc: 'Yes', Code: 'Y', 'CodeDescLocal': 'Sim' },
			{ CodeDesc: 'No', Code: 'N', 'CodeDescLocal': 'Não' }
		];
		let refNo = sessionStorage.getItem('customerReferenceNo');
		if (refNo) {
			this.productItem = new ProductData()
			this.customerReferenceNo = refNo;
		}
		else {

			this.customerReferenceNo = null;
			this.productItem = new ProductData()
			this.productItem.IdType = '1';
		}

		if (this.insuranceId == "100040" || this.insuranceId == "100042" || this.insuranceId == "100027" || this.insuranceId == "100002" || this.insuranceId == "100019" || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {

			this.getSocioProfessional();
			this.getStateList('direct');
			this.getRegionList('direct');
			this.getNationalityList();
			this.getOccupationLists('direct');
			this.getPolicyIdTypeList();
			if (this.insuranceId == "100040") this.getMaretialStatusList();
		}
		if (this.insuranceId == '100028') { this.getNationalityList(); this.getMaretialStatusList(); }
		if ((this.insuranceId == '100002' || this.insuranceId == "100019" || this.insuranceId == '100040' || this.insuranceId == '100027' || this.insuranceId == '100044' || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') && this.customerReferenceNo) {
			this.getOccupationLists('direct');
			if (this.customerReferenceNo) { this.setValues() }
		}
		this.getTaxExcepted();
		if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
			if (this.customerReferenceNo) {
				this.getQuotePolicyList();
				this.getLocationList();
			}
			else {
				this.quoteList = [];
				this.policyList = [];
				this.locationList = [];
			}
		}

	}
	getLocationList(){
		const urlLink = `${this.CommonApiUrl}api/getCustomerLocationDetail?customerRefNo=${this.customerReferenceNo}`;

		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				if (data.Result) {
					this.locationList = data.Result;
				}
			},
			(err) => {
				console.error('Error Fetching location details:', err);
			}
		);
	}
	getQuotePolicyList() {
		let ReqObj = {
			"CompanyId": this.insuranceId,
			"CustomerReferenceNo": this.customerReferenceNo
		};
		const urlLink = `${this.CommonApiUrl}api/fetchCustomerQuoteAndPolicyDetails`;

		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				if (data.Result != null) {
					this.quoteList = data.Result.quoteNos;
					this.policyList = data.Result.policyNos;
				}
			},
			(err) => {
				console.error('Error Fetching quote and policy details:', err);
			}
		);
	}
	getHeaders(codeDesc) {
		return 'HOME.' + codeDesc
	}
	setHeaders() {
		if (this.lang == 'en') { this.items = [{ label: 'Home', routerLink: '/' }, { label: 'Customer', routerLink: '/customer' }, { label: 'Create Customer' }]; }
		else if (this.lang == 'po') { this.items = [{ label: 'Lar', routerLink: '/' }, { label: 'Cliente', routerLink: '/customer' }, { label: 'Criar cliente' }]; }
		else if (this.lang == 'fr') { this.items = [{ label: 'Accueil', routerLink: '/' }, { label: 'Client', routerLink: '/customer' }, { label: 'Créer un client' }]; }
	}
	onLanguageChange(item: any) {
		this.translate.use(item.value);
	}

	getTitleList() {
		let urlLink;
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode
		}
		if (this.insuranceId == '100028') urlLink = `${this.CommonApiUrl}dropdown/nametitle`;
		else urlLink = `${this.CommonApiUrl}dropdown/title`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				if (data.Result) {
					this.titleList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.titleList.length; i++) {
						this.titleList[i].label = this.titleList[i]['CodeDesc'];
						this.titleList[i].value = this.titleList[i]['Code'];
						if (i == this.titleList.length - 1) {
							this.getOccupationLists('direct');
							let fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'Title') {
									let entry
									if (this.productItem.IdType == 1) {
										entry = "I"
									} else {
										entry = "C"
									}
									if (field.templateOptions) field.templateOptions.options = defaultRow.concat(this.titleList.filter(ele => ele.TitleType == entry));
									else field.props.options = defaultRow.concat(this.titleList.filter(ele => ele.TitleType == entry));
									this.checkFieldNames()
									console.log(field.props.options, "field.props.optionsfield.props.options");

								}

							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	ngOnView() {

	}
	ngOnInit(): void {

		let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
		if (endorseObj) {
			this.endorsementSection = true;
			this.endorseCategory = endorseObj.Category;
			this.endorsementName = endorseObj?.EndtName;
			this.enableFieldsList = endorseObj.FieldsAllowed;
			this.endorsementId = endorseObj.EndtTypeId;
			if (endorseObj.QuoteNo) this.quoteNo = endorseObj.QuoteNo;
			if (this.endorsementId != 42 && this.endorsementId != 842) {
				this.enableCustomerDetails = this.enableFieldsList.some(ele => ele == 'customerName' || ele == 'Title');
			}
		}
		else {
			this.endorsementSection = false; this.enableCustomerDetails = false;
		}
		this.primeNGConfig.ripple = true;
		this.ownerCategoryOptions = [{ name: 'Category', code: 'category' }];
		this.customerTypes = [{ label: 'Personal', value: 'personal' }, { label: 'Corporate', value: 'corporate' }];
		this.personalInfoFields = [];
		let fireData: any = null, fireData2: any = null;
		if (this.insuranceId == '100002') {
			fireData = new CustomerTanzaniya();
		}
		if (this.insuranceId == '100047') {
			fireData = new CustomerPhoneix();
		}
		if (this.insuranceId == '100046') {
			fireData = new CustomerPhoneixZambia();
		}
		if (this.insuranceId == '100048') {
			fireData = new CustomerPhoneixMozambique();
		}
		if (this.insuranceId == '100049') {
			fireData = new CustomerPhoneixSwazilnd();
		}
		if (this.insuranceId == '100050') {
			fireData = new CustomerPhoneixNamibia();
		}
		if (this.insuranceId == '100040') {
			fireData = new CustomerIvory();
		}
		if (this.insuranceId == '100042') {
			fireData = new CustomerBurkina();
		}
		if (this.insuranceId == '100027') {
			fireData = new CustomerSanlam();
		}
		if (this.insuranceId == '100028') {
			fireData = new CustomerEagle();
		}
		if (this.insuranceId == '100018') {
			fireData = new CustomerOromia();
		}
		if (this.insuranceId == '100019') {
			fireData = new CustomerUganda();
		}
		if (this.insuranceId == '100004') {
			fireData = new CustomerMadison();
		}
		if (this.insuranceId == '100020') {
			fireData = new CustomerKenya();
		}
		if (this.insuranceId == '100044') {
			fireData = new CustomerSaudiarabia();
		}

		this.personalInfoFields[0] = fireData?.fields?.fieldGroup[0];
		this.additionalInfoFields[0] = fireData?.fields?.fieldGroup[1];
		this.addressInfoFields[0] = fireData?.fields?.fieldGroup[2];

		// if(this.customerReferenceNo=='' || this.customerReferenceNo==null || this.customerReferenceNo==undefined){
		this.getCountryList()
		this.getGenderList();
		this.getBusinessTypeList();
		this.getMobileCodeList();
		this.getPolicyHolderList('change');
		if (this.insuranceId == '100028' || this.insuranceId == '100040') this.getVipFlagList();
		//this.getPolicyIdTypeList()
		// }

		if (this.insuranceId == '100002' || this.insuranceId == '100019' || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050'
			|| this.insuranceId == '100044' || this.insuranceId == '100028' || this.insuranceId == '100020') {
			let regionHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['Country'].valueChanges.subscribe(() => {
						this.getRegionList('change')
					});
				}
			}
			let regionHooks1 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['Region'].valueChanges.subscribe(() => {
						this.getStateList('change')
					});
				}
			}
			let fieldList = this.addressInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'Country') {
					field.hooks = regionHooks;
				}
				if (field.key == 'Region') {
					field.hooks = regionHooks1;
				}
			}
			let titleHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['Title'].valueChanges.subscribe(() => {
						this.onTitleChange('change')
					});
				}
			}
			let occupationHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['Occupation'].valueChanges.subscribe(() => {
						this.onOccupationChange()
					});
				}
			}
			let fieldList1 = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList1) {
				if (field.key == 'Title') {
					field.hooks = titleHooks;
				}
				if (field.key == 'Occupation') {
					field.hooks = occupationHooks;
				}
			}
		}
		if (this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100027' || this.insuranceId == '100019' || this.insuranceId == '100002' || this.insuranceId == '100028' || this.insuranceId == '100048') {
			let MobileNumberKeypress = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['MobileNo'].valueChanges.subscribe(() => {
						this.onKeyPress(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						console.log('Key pressed:', event.key);
						this.onKeyPress(event) // Call your method on key press
					};

				}
			}
			let PhoneNumberKeypress = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['PhoneNo'].valueChanges.subscribe(() => {
						//this.taxExcepted();
						this.onKeyPressPhoneNo(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						console.log('Key pressed:', event.key);
						this.onKeyPressPhoneNo(event) // Call your method on key press
					};

				}
			}
			let alphabetHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['ClientName'].valueChanges.subscribe(() => {
						//this.taxExcepted();
						this.onCheckAlphabets(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						console.log('Key pressed:', event.key);
						this.onCheckAlphabets(event) // Call your method on key press
					};

				}
			}
			let alphabetHooks2 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['LastName'].valueChanges.subscribe(() => {
						//this.taxExcepted();
						this.onCheckAlphabetsLast(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						console.log('Key pressed:', event.key);
						this.onCheckAlphabetsLast(event) // Call your method on key press
					};

				}
			}
			let alphabetHooks3 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['MiddleName'].valueChanges.subscribe(() => {
						//this.taxExcepted();
						this.onCheckAlphabetsMiddle(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						console.log('Key pressed:', event.key);
						this.onCheckAlphabetsMiddle(event) // Call your method on key press
					};
				}
			}
			let alphabetHooks4;
			if (this.productItem.IdType == 2 || this.productItem.IdType == '2') {
				alphabetHooks4 = {
					onInit: (field: FormlyFieldConfig) => {
						field.form.controls['CompanyName'].valueChanges.subscribe(() => {
							//this.taxExcepted();
							this.onCheckAlphabetsCompany(event)
						});
						field.props.onKeydown = (event: KeyboardEvent) => {
							console.log('Key pressed:', event.key);
							this.onCheckAlphabetsCompany(event) // Call your method on key press
						};

					}
				}
			}

			let emailHooks3 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['EmailId'].valueChanges.subscribe(() => {
						//this.taxExcepted();
						this.onKeyPressEmail(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						console.log('Key pressed:', event.key);
						this.onKeyPressEmail(event) // Call your method on key press
					};

				}
			}

			let fieldList1 = this.personalInfoFields[0].fieldGroup;
			let fieldList2 = this.addressInfoFields[0].fieldGroup;
			for (let field of fieldList1) {
				if (field.key == 'ClientName') { field.hooks = alphabetHooks }
				if (field.key == 'LastName') { field.hooks = alphabetHooks2 }
				if (field.key == 'MiddleName') { field.hooks = alphabetHooks3 }
				if (field.key == 'CompanyName') { field.hooks = alphabetHooks4 }
				if (field.key == 'EmailId') { field.hooks = emailHooks3 }
				if (field.key == 'dobOrRegDate') {
					let dobOrRegDate;
					if (this.productItem.IdType == '1' || this.productItem.IdType == 1) {
						if (String(this.maxDobDate).includes('/')) {
							dobOrRegDate = this.maxDobDate;
						}
						else dobOrRegDate = this.datePipe.transform(this.maxDobDate, 'dd/MM/yyyy')
						field.templateOptions.maxDate = dobOrRegDate;
						// field.templateOptions.de
						console.log(field, "this.productItem");
					}
					else {
						field.templateOptions.minDate = new Date();
					}

				}

				if (field.key == 'MobileNo') { field.hooks = MobileNumberKeypress }
				if (field.key == 'PhoneNo') { field.hooks = PhoneNumberKeypress }


			}
			let exceptedHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['isTaxExempted'].valueChanges.subscribe(() => {
						this.taxExcepted();
					});
				}
			}


			let idTypeHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['IdNumber'].valueChanges.pipe(
						// Wait 300ms after the last input before calling idTypechange
					).subscribe(() => {
						this.onKeyPressIdNumber(event)  // Call your method on value change
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						this.onKeyPressIdNumber(event) // Call your method on key press
					};
				}

			}
			let idTypeHooks1 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['PolicyHolderTypeid'].valueChanges.pipe(
						debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
					).subscribe(() => {
						if (this.insuranceId != '100048') this.idtypechange('change');  // Call your method on value change
					});
				}

			}
			let fieldList = this.additionalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'isTaxExempted') {
					field.hooks = exceptedHooks;
				}
				if (field.key == 'IdNumber') {
					field.hooks = idTypeHooks;
				}
				if (field.key == 'PolicyHolderTypeid') {
					field.hooks = idTypeHooks1;
				}

			}
			let regionHooks1 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['Region'].valueChanges.subscribe(() => {
						//this.productItem.Department=''
						this.getDepartmentList('direct');
					});
				}
			}
			let poBoxHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['PinCode'].valueChanges.pipe(
						// Wait 300ms after the last input before calling idTypechange
					).subscribe(() => {
						this.onKeyPressPoBox(event)  // Call your method on value change
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						this.onKeyPressPoBox(event) // Call your method on key press
					};
				}

			}
			let addressHooks = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['Address1'].valueChanges.pipe(
						// Wait 300ms after the last input before calling idTypechange
					).subscribe(() => {
						this.onKeyPressAddress(event)  // Call your method on value change
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						this.onKeyPressAddress(event) // Call your method on key press
					};
				}

			}
			for (let field of fieldList2) {
				// if(field.key=='Country'){
				// 	field.hooks = regionHooks1;
				// }
				if (field.key == 'Region') {
					field.hooks = regionHooks1;
				}
				if (field.key == 'Address1') {
					field.hooks = addressHooks;
				}
				if (field.key == 'PinCode') {
					field.hooks = poBoxHooks;
				}
			}
		}
		if (this.insuranceId == '100004') {
			this.getType3('direct');

		}
		else {
			this.getTitleList();
		}
		this.appComp.getLanguage().subscribe((res: any) => {
			if (res) this.lang = res;
			else this.lang = 'en';
			this.translate.setDefaultLang(this.lang);
			if (this.lang) { this.checkFieldNames(); this.setHeaders(); }
		});
		if (!this.lang) {
			if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
			else this.lang = 'en';
			sessionStorage.setItem('language', this.lang)
			this.translate.setDefaultLang(sessionStorage.getItem('language'));
			this.setHeaders();
			this.lang = sessionStorage.getItem('language');
			this.checkFieldNames();
		}
		this.lang = sessionStorage.getItem('language');
		this.checkFieldNames();
	}
	getDisplayName() {
		if (this.lang == 'en') return 'CodeDesc';
		else return 'CodeDescLocal'
	}
	checkFieldNames() {
		if (this.personalInfoFields.length != 0) {
			let fieldList = this.personalInfoFields[0].fieldGroup;
			let i = 0;
			for (let field of fieldList) {
				let key = null;
				if (field.id) key = field.id
				else key = field.key
				if (key != 'IDNumber1' && key != 'IDNumber2') {
					this.translate.get('HOME.' + key).subscribe((translation: string) => {
						if (field.props) {
							field.props.label = translation;
							if (field.props.options) {
								for (let entry of field.props.options) {
									if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
										entry['CodeDescLocal'] = 'Other';
									}

									if (this.lang == 'en') { entry['label'] = entry.CodeDesc; }
									else entry['label'] = entry.CodeDescLocal
								}
							}
						}
						else if (field.templateOptions) {
							field.templateOptions.label = translation;
							if (field.templateOptions.options) {
								for (let entry of field.templateOptions.options) {
									if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
										entry['CodeDescLocal'] = 'Other';
									}
									if (this.lang == 'en') entry['label'] = entry.CodeDesc
									else entry['label'] = entry.CodeDescLocal
								}
							}
						}
					});
				}
				if (field.key == 'LastName' && this.insuranceId == '100050') {
					field.templateOptions.label = 'Surname';
					field.templateOptions.placeholder = 'Enter Surname';
				}
				i += 1;
				if (i == fieldList.length) { }
			}
		}
		if (this.additionalInfoFields.length != 0) {
			let fieldList = this.additionalInfoFields[0].fieldGroup;
			console.log(fieldList + "fieldList");

			let i = 0;
			for (let field of fieldList) {
				let key = null;
				if (field.id) key = field.id
				else key = field.key
				if (key != 'IDNumber1' && key != 'IDNumber2') {
					console.log(field.key);
					this.translate.get('HOME.' + key).subscribe((translation: string) => {
						if (field.props) {
							field.props.label = translation;
							if (field.key === 'GstNumber' && this.insuranceId === '100047') {
								field.props.label = 'VAT Number';
								field.props.placeholder = 'VAT Number';
							}
							if (field.props.options) {
								for (let entry of field.props.options) {
									if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
										entry['CodeDescLocal'] = 'Other';
									}
									if (this.lang == 'en') entry['label'] = entry.CodeDesc
									else entry['label'] = entry.CodeDescLocal
								}
							}
						}
						else if (field.templateOptions) {
							field.templateOptions.label = translation;
							if (field.templateOptions.options) {
								for (let entry of field.templateOptions.options) {
									if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
										entry['CodeDescLocal'] = 'Other';
									}
									if (this.lang == 'en') entry['label'] = entry.CodeDesc
									else entry['label'] = entry.CodeDescLocal
								}
							}
						}
					});
				}
				i += 1;
				if (i == fieldList.length) console.log('Final Field Lang', fieldList);
			}
		}
		if (this.addressInfoFields.length != 0) {
			let fieldList = this.addressInfoFields[0].fieldGroup;
			console.log(fieldList + "fieldList");

			let i = 0;
			for (let field of fieldList) {
				let key = null;
				if (field.id) key = field.id
				else key = field.key
				if (key != 'IDNumber1' && key != 'IDNumber2') {
					this.translate.get('HOME.' + key).subscribe((translation: string) => {
						if (field.props) {
							field.props.label = translation;
							if (field.props.options) {
								for (let entry of field.props.options) {
									if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
										entry['CodeDescLocal'] = 'Other';
									}
									if (this.lang == 'en') entry['label'] = entry.CodeDesc
									else entry['label'] = entry.CodeDescLocal
								}
							}
						}
						else if (field.templateOptions) {
							field.templateOptions.label = translation;
							if (field.templateOptions.options) {
								for (let entry of field.templateOptions.options) {
									if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
										entry['CodeDescLocal'] = 'Other';
									}
									if (this.lang == 'en') entry['label'] = entry.CodeDesc
									else entry['label'] = entry.CodeDescLocal
								}
							}
						}
					});
				}
				i += 1;
				if (i == fieldList.length) console.log('Final Field Lang', fieldList);
			}
		}
	}

	ongetBack() {
		if (sessionStorage.getItem('endorsePolicyNo')) {
			this.router.navigate(['/portfolio/endorsementtype'])
		}
		else {
			let entry = sessionStorage.getItem('PageFrom');
			let type = sessionStorage.getItem('QuoteType')
			if (entry == 'yakeen') {
				this.router.navigate(['/yakeenSearch'])
			}
			else if (type == 'SQ') this.router.navigate(['/quotation/plan/shortQuote'])
			else { this.router.navigate(['/customer']) }
		}

	}
	getSocioProfessional() {
		let ReqObj = null, urlLink = null;
		ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
		}
		urlLink = `${this.CommonApiUrl}dropdown/socioProfessional`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				if (data.Result) {
					this.socioProfessionalList = data.Result;
					if (this.socioProfessionalList.length != 0) {
						let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
						for (let i = 0; i < this.socioProfessionalList.length; i++) {
							this.socioProfessionalList[i].label = this.socioProfessionalList[i]['CodeDesc'];
							this.socioProfessionalList[i].value = this.socioProfessionalList[i]['Code'];
							if (i == this.socioProfessionalList.length - 1) {
								let fieldList = this.personalInfoFields[0].fieldGroup;
								for (let field of fieldList) {
									if (field.key == 'SocioProfessionalcategory') {
										field.props.options = defaultObj.concat(this.socioProfessionalList);
										this.checkFieldNames()
									}
								}
							}
						}
					}
				}
			});
	}

	public async onSubmit(data) {

		this.messages = [];
		let appointmentDate = "", dobOrRegDate = "", expiryDate = null, taxExemptedId = null, cityName = null, stateName = null, businessType = null;
		//  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
		// 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
		//  }
		if (this.insuranceId != '100004') {
			if (this.stateList.length != 0 && this.insuranceId != '100048') cityName = this.stateList.find(ele => String(ele.Code) == String(data.CityName))?.CodeDesc;
			else if (this.departmentList.length != 0) cityName = this.departmentList.find(ele => String(ele.Code) == String(data.CityName))?.CodeDesc;

		}
		else if (this.insuranceId == '100004') {
			if (data?.districtcode == null || data?.districtcode == '' || data?.districtcode == undefined) {
				if (data.CityName != '' && data.CityName != null && data.CityName != '99999') {
					cityName = this.stateList.find(ele => ele.Code == data.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else if (data.CityName != '99999') {
				if (data.CityName != '' && data.CityName != null) {
					cityName = this.stateList.find(ele => ele.Code == data.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else cityName = data?.districtcode;
		}
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();

		if ((this.productItem.IdType != 2 && this.productItem.IdType != '2') && this.insuranceId != '100040' && this.insuranceId != '100042' && this.insuranceId != '100027' && this.insuranceId != '100028') {

			data.dobOrRegDate = new Date(year - 18, month, day - 2);
		}

		if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem?.TaxExemptedId;
		//this.productItem.TaxExemptedId;
		if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
		if (this.insuranceId == '100028') businessType = this.productItem.BusinessType;
		else if (this.insuranceId == '100048') businessType = this.productItem.BusinessType;
		let codes = this.productItem.MobileCode
		if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {

			let code = this.mobileCodeList.find(ele => ele.Code == codes)
			if (code) {
				if (code?.label) this.productItem.MobileCodeDesc = code.label;
				else this.productItem.MobileCodeDesc = '';
			}
			else this.productItem.MobileCodeDesc = '';
		}
		if (data.GstNumber == '' || data.GstNumber == undefined || data.GstNumber == null) { data.GstNumber = null };
		if (this.loginType == 'B2CFlow') data.Clientstatus = 'Y';
		let type = null;
		if (this.productId == '46' && (this.productItem?.PolicyHolderTypeid == null || this.productItem?.PolicyHolderTypeid == '' || this.productItem?.PolicyHolderTypeid == undefined)) {
			if (this.productItem.IdType == 1 || this.productItem.IdType == '1') { this.productItem.PolicyHolderTypeid = '3'; }
			else { this.productItem.PolicyHolderTypeid = '6'; }
			var minm = 1000000000;
			var maxm = 9876543210;
			this.productItem.IdNumber = Math.floor(Math
				.random() * (maxm - minm + 1)) + minm;
		}
		if ((this.productItem.IdType == '2' || this.productItem.IdType == 2) && this.insuranceId != '100040' && this.insuranceId != '100042' && this.insuranceId != '100027') {
			if (dobOrRegDate == '' || dobOrRegDate == null || dobOrRegDate == undefined || (new Date(dobOrRegDate)).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0) || dobOrRegDate == null || dobOrRegDate == '') {
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth();
				var day = d.getDate();
				var sysDay = new Date(year, month, day - 2);
				dobOrRegDate = this.datePipe.transform(sysDay, 'dd/MM/yyyy');
			}
		}
		if (data.IdType == '1') {
			if (this.productItem?.PolicyHolderTypeid == '1' && this.insuranceId == '100004' && this.insuranceId != '100040' && this.insuranceId != '100042' && this.insuranceId != '100027' && this.insuranceId != '100028') {
				if (this.productItem.IdNumber != null && this.productItem.IdNumber != '') {
					let year = this.productItem.IdNumber.substr(0, 4);
					let month = this.productItem.IdNumber.substr(4, 2);
					let day = this.productItem.IdNumber.substr(6, 2);
					if (year != null && year != undefined && month != null && month != undefined && day != null && day != undefined) {
						dobOrRegDate = day + '/' + month + '/' + year;
					}
				}
			}
		}
		let policyid: any;
		if (data?.PolicyHolderTypeid == '1' && this.insuranceId == '100004') {
			policyid = this.Idnumber.concat(this.Idnumber1).concat(this.Idnumber2);
		}
		else {
			policyid = data?.IdNumber;
		}
		if (this.insuranceId == "100002" || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') data.state = this.productItem.Region; data.RegionCode = this.productItem.Country
		// if (this.insuranceId == "100040") {
		// 	data.state = this.productItem.Department;
		// 	stateName = this.departmentList.find(ele => ele.Code == data.state).CodeDesc                                                                                                                                
		// 	data.RegionCode = this.productItem.Region;
		// 	data.Address2 = this.productItem.Address2;
		// }
		if (this.insuranceId == "100042") {
			data.state = "99999";
		}
		else {
			data.state = this.productItem.Region;
		}
		if ((this.productItem.IdType == '2' || this.productItem.IdType == 2) && this.insuranceId != '100002') {
			//data.Title='1';
			data.ClientName = data?.CompanyName;
			data.Occupation = '99999';
			data.occupationdesc = 'Others';
			data.MaritalStatus = 'S';
		}
		if (data.dobOrRegDate != undefined && data.dobOrRegDate != null && data.dobOrRegDate != '' && this.insuranceId != '100040' && this.insuranceId != '100042' && this.insuranceId != '100027') {
			if (String(data.dobOrRegDate).includes('/')) {
				dobOrRegDate = data.dobOrRegDate;
			}
			else dobOrRegDate = this.datePipe.transform(data.dobOrRegDate, 'dd/MM/yyyy')
		}
		if (data.ExpiryDate != undefined && data.ExpiryDate != null && data.ExpiryDate != '' && (this.insuranceId == '100040' || this.insuranceId == '100027')) {
			if (String(data.ExpiryDate).includes('/')) {
				expiryDate = data.ExpiryDate;
			}
			else expiryDate = this.datePipe.transform(data.ExpiryDate, 'dd/MM/yyyy')
		}
		if (data.SocioProfessionalcategory == undefined || data.SocioProfessionalcategory == '') data.SocioProfessionalcategory = null;
		if (this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100027' || this.insuranceId == '100028') {
			if (data?.PolicyHolderTypeid == null || data?.PolicyHolderTypeid == '') {
				data.PolicyHolderTypeid = this.productItem.PolicyHolderTypeid;
			}
			if (this.productItem.dobOrRegDate != undefined && this.productItem.dobOrRegDate != null && this.productItem.dobOrRegDate != '') {
				if (String(this.productItem.dobOrRegDate).includes('/')) {
					dobOrRegDate = this.productItem.dobOrRegDate;
				}
				else dobOrRegDate = this.datePipe.transform(this.productItem.dobOrRegDate, 'dd/MM/yyyy')
			}
			if (this.productItem.Nationality) {
				data.NationalityDesc = this.nationalityList.find(ele => ele.Code == data.Nationality).CodeDesc
			}
			else {
				data.NationalityDesc = ''
			}
		}
		let assessmentDate = null;
		if (data?.RiskAssessmentDate != null && data?.RiskAssessmentDate != '') {
			if (String(data?.RiskAssessmentDate).split('/').length > 1) { assessmentDate = data?.RiskAssessmentDate }
			else assessmentDate = this.datePipe.transform(data?.RiskAssessmentDate, 'dd/MM/yyyy');
		}
		if (this.insuranceId == '100028') { data.isTaxExempted = 'N' }
		if (this.insuranceId == '100048' || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100049' || this.insuranceId == '100050' ||
			this.insuranceId == '100002' || this.insuranceId == '100019' || this.insuranceId == '100018') {
			data.Department = data?.state;
			data.state = this.productItem.Region;
		}
		if (this.insuranceId == '100040' || this.insuranceId == '100027') {
			data.CityName = data.Department;
			cityName = stateName
		}
		//let clientName=data?.ClientName;
		if (data.IdType == '2' || data.IdType == 2) { data.ClientName = data?.CompanyName }
		if (this.insuranceId == '100002') {
			data.Nationality = data.Country
			if (data.Nationality) data.NationalityDesc = this.countryList.find(ele => ele.Code == data.Country).CodeDesc
		}
		let ReqObj = {
			"BrokerBranchCode": this.brokerbranchCode,
			"CustomerReferenceNo": this.customerReferenceNo,
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"ProductId": this.productId,
			"AppointmentDate": appointmentDate,
			"Address1": data?.Address1,
			"Address2": data?.Address2,
			"BusinessType": businessType,
			"CityCode": data?.CityName,
			"CityName": cityName,
			"ClientName": data.ClientName,
			"Clientstatus": data?.Clientstatus,
			"CreatedBy": this.loginId,
			"DobOrRegDate": dobOrRegDate,
			"ExpiryDate": expiryDate,
			"Email1": data?.EmailId,
			"Email2": null,
			"Email3": null,
			"Fax": null,
			"Gender": data?.Gender,
			"IdNumber": policyid,
			"IdType": data.PolicyHolderTypeid,
			"IsTaxExempted": data.isTaxExempted,
			"Language": "1",
			"MobileNo1": data.MobileNo,
			"MobileNo2": data.PhoneNo,
			"MobileNo3": data.LandLineNo,
			"Nationality": data.Nationality,
			"NationalityName": data.NationalityDesc,
			"Country": data.Country,
			"CountryName": this.countryList.find(ele => ele.Code == data?.Country)?.CodeDesc,
			"Occupation": data?.Occupation,
			"OtherOccupation": data?.occupationdesc,
			"Placeofbirth": "Chennai",
			"PolicyHolderType": data.IdType,
			"PolicyHolderTypeid": data?.PolicyHolderTypeid,
			"PreferredNotification": data?.PreferredNotification,
			"RegionCode": data?.state,
			"MobileCode1": data?.MobileCode,
			"WhatsappCode": data?.CountryCodeWA,
			"MobileCodeDesc1": "1",
			"WhatsappDesc": "1",
			"WhatsappNo": data.WhatsAppNo,
			"StateCode": data?.Department,
            "StateName": stateName || this.regionList.find((f: any) => f.Code == data?.state)?.CodeDesc,
			"Status": data?.Clientstatus,
			"Street": data?.Address1,
			"Type": type,
			"TaxExemptedId": taxExemptedId,
			"TelephoneNo1": data?.TelephoneNo,
			"PinCode": data?.PinCode,
			"TelephoneNo2": null,
			"TelephoneNo3": null,
			"Title": data.Title,
			"VrTinNo": data.GstNumber,
			"SaveOrSubmit": 'Submit',
			"MiddleName": data?.MiddleName,
			"LastName": data?.LastName,
			"Zone": "1",
			"SocioProfessionalCategory": data?.SocioProfessionalcategory,
			// "CompanyName":data?.CompanyName, 
			"Activities": data?.BusinessType,
			"CustomerAsInsurer": data?.Insurer,
			"MaritalStatus": data?.MaritalStatus,
			"VipFlag": data?.VipFlag,
			"RiskAssessmentDate": assessmentDate,
			"PhoneNoCode": data?.PhoneCode,
			"CustomerType": this.CustomerTypeList.find(ele => ele.Code === data.CustomerTypes)?.CodeDesc || null,
			"IndustryType": this.IndustryTypeList.find(ele => ele.Code === data.IndustryType)?.CodeDesc || null,
			"IndustryTypeId": data.IndustryType || null,
			'WealthSource': this.WealthSourceList.find(ele => ele.Code === data.WealthSource)?.CodeDesc || null,
			'WealthSourceId': data.WealthSource,
	    	'ComplianceStatus': this.ComplianceStatusList.find(ele => ele.Code === data.ComplianceStatus)?.CodeDesc || null,
			'ComplianceStatusId':data.ComplianceStatus,
			'LegalStructure':this.LegalStructureList.find(ele => ele.Code === data.LegalStructure)?.CodeDesc || null,
			'LegalStructureId': data.LegalStructure,
			'Owners': this.OwnersList?.find(ele => ele.Code === data.Owners)?.CodeDesc || null,
			'OwnersId': data.Owners
		}

		let quoteNo = sessionStorage.getItem('quoteNo'), refNo = null;
		if (this.loginType == 'B2CFlow' || (this.loginType == 'B2CFlow2')) {

			ReqObj['Type'] = 'b2c';
			if (quoteNo != undefined) ReqObj['QuoteNo'] = quoteNo;
			else ReqObj['QuoteNo'] = null;
			ReqObj['RequestReferenceNo'] = sessionStorage.getItem('quoteReferenceNo')
		}


		// if(this.userType == 'Broker'){
		// 	ReqObj['CustCatgCode'] = '20';
		// 	// ReqObj['CustType'] = '001';
		// }
		// else if(this.userType == 'Issuer'){
		// 	ReqObj['CustCatgCode'] = '25';
		// }
		// else if(this.userType == 'Direct'){
		// 	ReqObj['CustCatgCode'] = '30';
		// }

		if (this.userType == 'Broker' || this.userType == 'Issuer' || this.userType == 'Direct') {
			ReqObj['CustCatgCode'] = '35';
		}
		let urlLink = `${this.CommonApiUrl}api/savecustomerdetails`;
		console.log("City Name", ReqObj)
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				let res: any = data;
				console.log(data);
				if (data.ErrorMessage.length != 0) {
					if (res.ErrorMessage) {
						const errorList: any[] = res.ErrorMessage;
						let ulList: any = '';
						for (let index = 0; index < errorList.length; index++) {
							const element = errorList[index];
							//this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
							this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
							console.log('Final Messages', this.messages)

						}
						// Swal.fire({
						// title: '<strong>Form Validation</strong>',
						// icon: 'info',
						// html:
						// 	`<ul class="list-group errorlist">
						// 	${ulList}
						// </ul>`,
						// showCloseButton: true,
						// focusConfirm: false,
						// confirmButtonText:
						// 	'<i class="fa fa-thumbs-down"></i> Errors!',
						// confirmButtonAriaLabel: 'Thumbs down, Errors!',
						// })
					}
				}
				else {
					// if(this.endorsementSection){
					// 	this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);	
					// }
					// else{
					if((this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050')&& this.customerReferenceNo && this.locationList?.length>0){
							this.locationList.forEach(location => {
								location.customerReferenceNo = data.Result.SuccessId;
							});
							this.saveLocation(data);
							console.log('location save');
					}
					else{
					this.navigateToNext(data);
					}
					//}
				}
			},

			(err: any) => { console.log(err); },
		);
	}
	navigateToNext(data){
		let quoteNo = sessionStorage.getItem('quoteNo');
					if (this.loginType == 'B2CFlow') {
						sessionStorage.setItem('customerReferenceNo', data.Result.SuccessId);
						this.router.navigate(['/policyDetails']);
						//this.onBuyPolicy();
					}
					else if ((this.loginType == 'B2CFlow2' && quoteNo != undefined && quoteNo != null)) { }
					else if (sessionStorage.getItem('VechileDetails')) {
						sessionStorage.setItem('customerReferenceNo', data.Result.SuccessId);
						this.router.navigate(['/policyDetails']);
					}
					else if (sessionStorage.getItem('QuoteType') || this.endorsementSection) {
						if (this.productId == '5') this.router.navigate(['/policyDetails']);
						else this.router.navigate(['/quotation/plan/quote-details']);
					}
					else {
						if (this.productItem.Insurer == 'N' && (this.insuranceId == '100027' || this.insuranceId == '100040')) {
							// let insurerReferenceNo =sessionStorage.getItem('insurerReferenceNo');
							// if(insurerReferenceNo=='' || insurerReferenceNo==null){
							sessionStorage.setItem('customerReferenceNo', data.Result.SuccessId)
							// }
							this.router.navigate(['/customer/insurer'])
						}
						else {

							this.router.navigate(['/customer/'])
						}
					}
	}
	submit() {
		this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Added Successfully' });
	}
	getPolicyHolderList(type) {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode
		}

		let urlLink = `${this.CommonApiUrl}dropdown/policyholdertype`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.policyHolderList = data.Result;
					let defaultRow = []

					this.policyHolderList = defaultRow.concat(this.policyHolderList);
					// this.getPolicyIdTypeList()
				}
			});
	}
	getPolicyIdTypeList() {
		//if(this.productItem.policyholderidtype)alert(this.productItem.policyholderidtype);this.form.controls['policyholderidtype'].setValue(this.productItem.policyholderidtype )
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"PolicyTypeId": this.productItem.IdType
		}
		let urlLink = `${this.CommonApiUrl}dropdown/policyholderidtype`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					if (data.Result.length != 0) {
						this.policyHolderTypeList = data.Result;
						for (let i = 0; i < this.policyHolderTypeList.length; i++) {
							this.policyHolderTypeList[i].label = this.policyHolderTypeList[i]['CodeDesc'];
							this.policyHolderTypeList[i].value = this.policyHolderTypeList[i]['Code'];
							if (i == this.policyHolderTypeList.length - 1) {
								let fieldList = this.additionalInfoFields[0].fieldGroup;
								for (let field of fieldList) {
									if (field.key == 'PolicyHolderTypeid') {
										field.props.options = defaultRow.concat(this.policyHolderTypeList);
										this.checkFieldNames()
									}
								}
							}
						}
					}
					else {
						let fieldList = this.additionalInfoFields[0].fieldGroup;
						for (let field of fieldList) {
							if (field.key == 'PolicyHolderTypeid') { field.props.options = defaultRow }
						}
					}
					//this.holderTypeValue = null;

					// if (this.customerReferenceNo) {
					// 	this.setValuescall()
					// }
					//this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
					// if (type == 'change'){this.dob = "";this.productItem.PolicyHolderTypeid='';
					//this.productItem.IdNumber=null
					//}
				}


			},
			(err) => { },
		);
	}
	getGenderList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
		}
		let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.genderList = data.Result;

					// this.getOccupationLists('direct');

					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.genderList.length; i++) {
						this.genderList[i].label = this.genderList[i]['CodeDesc'];
						this.genderList[i].value = this.genderList[i]['Code'];
						if (i == this.genderList.length - 1) {
							let fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'Gender') {
									field.props.options = defaultRow.concat(this.genderList);
									this.checkFieldNames()

								}
							}

						}

					}


					//this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);

				}
			},
			(err) => { },
		);
	}
	getVipFlagList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "VIP_FLAG"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.flagList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					//this.countryList = defaultRow.concat(this.countryList);
					for (let i = 0; i < this.flagList.length; i++) {
						this.flagList[i].label = this.flagList[i]['CodeDesc'];
						this.flagList[i].value = this.flagList[i]['Code'];
						if (i == this.flagList.length - 1) {
							let fieldList = this.additionalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'VipFlag') {
									field.props.options = defaultRow.concat(this.flagList);
								}
							}
						}
					}
				}
			});
	}
	getCountryList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.countryList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					//this.countryList = defaultRow.concat(this.countryList);
					for (let i = 0; i < this.countryList.length; i++) {
						this.countryList[i].label = this.countryList[i]['CodeDesc'];
						this.countryList[i].value = this.countryList[i]['Code'];
						if (i == this.countryList.length - 1) {
							let fieldList = this.addressInfoFields[0].fieldGroup;
							if (this.insuranceId=='100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
								this.productItem.Country = this.countryList[0].Code;
								this.getRegionList('direct');
							}
							for (let field of fieldList) {
								
								if (field.key == 'Country') {
									if (this.insuranceId == '100028' || this.insuranceId == '100027') {
										if (this.insuranceId == '100028') {
											this.productItem.Country = 'MUS'
											this.getRegionList('direct');
										}
										if (this.insuranceId == '100027') {
											this.productItem.Country = "AGO";
											field.form.controls['Country'].setValue("AGO");
											this.getRegionList('direct');
										}
										if (this.insuranceId == '100040') {
											this.productItem.Country = "IVY"; field.form.controls['Country'].setValue("IVY");
											this.getRegionList('direct');
										}
										
										if (this.insuranceId == '100019') {
											this.productItem.Country = 'UGA'
											this.getRegionList('direct');
										}
									}
									field.props.options = defaultRow.concat(this.countryList);
									this.checkFieldNames()
								}
							}

						}

					}
				}
			},
			(err) => { },
		);
	}
	getMaretialStatusList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "MARITAL_STATUS",
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.maretialStatusList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					//this.countryList = defaultRow.concat(this.countryList);
					for (let i = 0; i < this.maretialStatusList.length; i++) {
						this.maretialStatusList[i].label = this.maretialStatusList[i]['CodeDesc'];
						this.maretialStatusList[i].value = this.maretialStatusList[i]['Code'];
						if (i == this.maretialStatusList.length - 1) {
							let fieldList1 = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList1) {
								if (field.key == 'MaritalStatus') {
									field.props.options = defaultRow.concat(this.maretialStatusList);
								}
							}

						}

					}
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
					this.nationalityList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					//this.countryList = defaultRow.concat(this.countryList);
					for (let i = 0; i < this.nationalityList.length; i++) {
						this.nationalityList[i].label = this.nationalityList[i]['CodeDesc'];
						this.nationalityList[i].value = this.nationalityList[i]['Code'];
						if (i == this.nationalityList.length - 1) {
							let fieldList1 = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList1) {
								if (field.key == 'Nationality') {
									field.props.options = defaultRow.concat(this.nationalityList);
								}
							}

						}

					}
				}
			},
			(err) => { },
		);
	}

	// getOccupationList(){
	// 	let ReqObj = {
	// 			"InsuranceId": this.insuranceId,
	// 			"BranchCode": this.branchCode,
	// 	}
	// 	let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
	// 	this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
	// 		(data: any) => {
	// 			console.log(data);
	// 			if (data.Result) {
	// 				this.occupationList = data.Result;
	// 				let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
	// 				for (let i = 0; i < this.occupationList.length; i++) {
	// 					this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
	// 					this.occupationList[i].value = this.occupationList[i]['Code'];
	// 					if (i == this.occupationList.length - 1) {
	// 						let fieldList=this.personalInfoFields[0].fieldGroup;
	// 						for(let field of fieldList){
	// 							if(field.key=='Occupation'){

	// 								field.props.options = defaultRow.concat(this.occupationList);
	// 							}
	// 						}
	// 					}
	// 				}
	// 						//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[0].props.options = defaultRow.concat(this.occupationList);

	// 						//this.getBusinessTypeList();
	// 			}
	// 		},
	// 		(err) => { },
	// 	);
	// }
	getBusinessTypeList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
		}
		let urlLink = `${this.CommonApiUrl}dropdown/businesstype`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.businessTypeList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.businessTypeList.length; i++) {
						this.businessTypeList[i].label = this.businessTypeList[i]['CodeDesc'];
						this.businessTypeList[i].value = this.businessTypeList[i]['Code'];
						if (i == this.businessTypeList.length - 1) {
							let fieldList = [];
							if (this.insuranceId == '100028') fieldList = this.additionalInfoFields[0].fieldGroup;
							else fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'BusinessType') {
									field.props.options = defaultRow.concat(this.businessTypeList);
									this.checkFieldNames()
								}
							}
						}

					}

					//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[10].props.options = defaulObj.concat(this.businessTypeList);


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
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.mobileCodeList.length; i++) {
						this.mobileCodeList[i].label = this.mobileCodeList[i]['CodeDesc'];
						this.mobileCodeList[i].value = this.mobileCodeList[i]['Code'];
						if (i == this.mobileCodeList.length - 1) {
							let fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'MobileCode' || field.key == 'PhoneCode') {
									if (this.mobileCodeList.length > 1) {
										field.props.options = defaultRow.concat(this.mobileCodeList);
										this.checkFieldNames()
									}
									else {
										field.props.options = defaultRow.concat(this.mobileCodeList);
										if (field.key == 'MobileCode') field.form.controls['MobileCode'].setValue(this.mobileCodeList[0].Code);
										if (field.key == 'PhoneCode') field.form.controls['PhoneCode'].setValue(this.mobileCodeList[0].Code);
										this.checkFieldNames()
									}
								}
							}
						}

					}

					if (this.customerReferenceNo) {

						this.setValues();
						this.getPolicyIdTypeList()
					}
					else {
						sessionStorage.removeItem('editSection')
						this.productItem = new ProductData();

						// this.productItem.isTaxExempted = 'N'; 
						this.productItem.PreferredNotification = '';
						this.productItem.Gender = '';
						this.productItem.RiskAssessmentDate = '';
						//this.productItem.PolicyHolderTypeid = '';
						this.productItem.IdType = '1';
						this.productItem.ExpiryDate = null;
						this.setPolicyType();
						if (this.mobileCodeList.length != 0 && this.mobileCodeList.length > 1) {
							this.productItem.MobileCode = this.mobileCodeList[1].Code;
							this.productItem.PhoneCode = this.mobileCodeList[1].Code;
						}
						if (this.countryList.length != 0 && this.countryList.length > 1 && (this.productItem.Country == null || this.productItem.Country == '')) {
							if (this.insuranceId == '100040') this.productItem.Country = "IVY";
							else if (this.insuranceId == '100027') this.productItem.Country = "AGO";
							else if (this.insuranceId == '100019') this.productItem.Country = 'UGA';
							else if (this.insuranceId == '100002') this.productItem.Country = 'TZA';
							else this.productItem.Country = this.countryList[1].Code;

							this.getRegionList('change');
						}
						else if (this.countryList.length > 1 && (this.productItem.Country == null || this.productItem.Country == '')) {
							if (this.insuranceId == '100040') this.productItem.Country = "IVY";
							else if (this.insuranceId == '100027') this.productItem.Country = "AGO";
							else if (this.insuranceId == '100019') this.productItem.Country = 'UGA';
							else if (this.insuranceId == '100002') this.productItem.Country = 'TZA';
							else this.productItem.Country = this.countryList[0].Code;
							this.getRegionList('change');
						}
						this.productItem.state = '';
						// this.productItem.CityName = '';
						this.productItem.Occupation = '';
						this.productItem.BusinessType = '';
						if (this.insuranceId != '100028' && this.insuranceId != '100018') { this.productItem.Title = '1'; this.onTitleChange('direct'); this.productItem.isTaxExempted = 'N'; }


						if (sessionStorage.getItem('VechileDetails')) {
							let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
							this.productItem.ClientName = motorDetails.ResOwnerName;

						}
						this.productItem.Clientstatus = 'Y';
					}

				}
			},
			(err) => { },
		);
	}
	getStateList(type) {
		let ReqObj, urlLink
		if (this.productItem.Region == null || this.productItem.Region == '' || this.productItem.Region == undefined || this.productItem.Region == 'null') {
			this.productItem.state = '99999'
		}
		else {
			this.productItem.state = this.productItem.Region
		}
		if (this.insuranceId == '100002' || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050' || this.insuranceId == '100044') this.productItem.state = this.productItem.Region;
		if (this.insuranceId == "100040") {
			this.productItem.Country = 'IVY',
				ReqObj = {
					"CountryId": this.productItem.Country,
				}
			urlLink = `${this.CommonApiUrl}master/dropdown/city`
		}
		else if (this.insuranceId == "100042") {
			this.productItem.state = "99999";
			this.productItem.Country = 'BFA',
				ReqObj = {
					"CountryId": this.productItem.Country,
				}
			urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`
		}
		else {
			if (this.insuranceId == '100018') this.productItem.Country = '99999'
			if (this.insuranceId == '100019') this.productItem.Country = 'UGA'
			if (this.insuranceId == '100002') this.productItem.Country = 'TZA'
			if (this.insuranceId == '100050') this.productItem.Country = this.countryList[0]?.Code
			if (this.insuranceId == '100046') this.productItem.Country = this.countryList[0]?.Code
			if (this.insuranceId == '100047') this.productItem.Country = this.countryList[0]?.Code
			if (this.insuranceId == '100048') this.productItem.Country = this.countryList[0]?.Code
			if (this.insuranceId == '100049') this.productItem.Country = this.countryList[0]?.Code
			
			ReqObj = {
				"CountryId": this.productItem.Country,
				"RegionCode": this.productItem.state
			}
			urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`
		}

		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.stateList = data.Result;
					// let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal': '-Sélectionner-' }]
					//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[8].props.options = defaultRow.concat(this.stateList);
					//this.stateList = defaultRow.concat(this.stateList)
					// if (type == 'change') { this.productItem.CityName = ''; }
					// if (type == 'change') { this.productItem.state = ''; this.productItem.CityName = '' };
					let defaultRow1 = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					if(this.stateList.length!=0){
						for (let i = 0; i < this.stateList.length; i++) {
							this.stateList[i].label = this.stateList[i]['CodeDesc'];
							this.stateList[i].value = this.stateList[i]['Code'];
							if (i == this.stateList.length - 1) {
								let fieldList = this.addressInfoFields[0].fieldGroup;
								for (let field of fieldList) {
									if (field.key == 'CityName') {
										// if(this.stateList.length>1){
										field.props.options = defaultRow1.concat(this.stateList);
										this.checkFieldNames()
										// }
										// else{
										// 	field.props.options = this.stateList;
										// }
									}
								}


							}
						}
					}
					else{
						let fieldList = this.addressInfoFields[0].fieldGroup;
						for (let field of fieldList) {
							if (field.key == 'CityName') {
								// if(this.stateList.length>1){
								field.props.options = defaultRow1.concat(this.stateList);
								this.checkFieldNames()
								// }
								// else{
								// 	field.props.options = this.stateList;
								// }
							}
						}
					}

				}
			},
			(err) => { },
		);
	}
	omit_special_char(event) {
		var k;
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 47);
	}
	onTitleChange(type) {
		let title = this.productItem.Title;
		if (title != '' && title != null && title != undefined) {
			if (this.insuranceId != '100028' && this.insuranceId != '100040' && this.insuranceId != '100019' && this.insuranceId != '100027' && this.insuranceId != '100046' && this.insuranceId != '100047' && this.insuranceId != '100048' && this.insuranceId != '100049' && this.insuranceId != '100050' && this.insuranceId != '100018') {
				// if(title=='2') this.productItem.PolicyHolderTypeid = '2';
				// else this.productItem.PolicyHolderTypeid = '1';
				if (title == '1') this.productItem.Gender = 'M';
				else this.productItem.Gender = 'F';
			}

			if (type != 'direct' && this.insuranceId != '100028' && this.insuranceId != '100040' && this.insuranceId != '100048' && this.insuranceId != '100027' && this.insuranceId != '100002' && this.insuranceId != '100046'
				&& this.insuranceId != '100047' && this.insuranceId != '100048' && this.insuranceId != '100049' && this.insuranceId != '100044' && this.insuranceId != '100050' && this.insuranceId != '100019'
			) this.getPolicyIdTypeList();
			let fieldList1 = this.personalInfoFields[0].fieldGroup;
			if (this.insuranceId != '100048' && this.insuranceId != '100018') {
				for (let field of fieldList1) {
					if (field.key == 'Title') { this.productItem.Title = title }
				}
			}

		}
		else {
			//this.productItem.IdType = '';
		}
	}
	onOccupationChange() {

	}
	newidtype() {
		if (this.productItem.PolicyHolderTypeid == '1' && this.insuranceId == '100004') {
			this.shows = true;
		}
		else {
			this.shows = false;
		}
		this.productItem.IdNumber = '';
		if (this.productItem.PolicyHolderTypeid == '7') this.maxTextLen = '14';
		else this.maxTextLen = '10';
	}
	getRegionList(type) {
		let ReqObj = {
			"CountryId": this.productItem.Country
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.regionList = data.Result;
					let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal': '-Sélectionner-' }]
					//this.regionList = defaultRow.concat(this.regionList);

					if (type == 'change') {
						//this.productItem.state = '';
						//	this.productItem.CityName=''
					};
					let defaultRow1 = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.regionList.length; i++) {
						this.regionList[i].label = this.regionList[i]['CodeDesc'];
						this.regionList[i].value = this.regionList[i]['Code'];
						if (i == this.regionList.length - 1) {
							let fieldList = this.addressInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'Region') {
									field.props.options = defaultRow1.concat(this.regionList);
									this.checkFieldNames()
								}
							}

						}

					}

				}
			},
			(err) => { },
		);
	}
	getDepartmentList(type) {
		let ReqObj = {
			"CountryId": this.productItem.Country,
			"RegionCode": this.productItem.Region
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.departmentList = data.Result;
					let defaultRow1 = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.departmentList.length; i++) {
						this.departmentList[i].label = this.departmentList[i]['CodeDesc'];
						this.departmentList[i].value = this.departmentList[i]['Code'];
						if (i == this.departmentList.length - 1) {
							let fieldList = this.addressInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'Department' || field.key == 'CityName') {
									field.props.options = defaultRow1.concat(this.departmentList);
									this.checkFieldNames()
								}
							}

						}

					}

				}
			},
			(err) => { },
		);
	}
	setValues() {
		let ReqObj = {
			"CustomerReferenceNo": this.customerReferenceNo,
			"InsuranceId": this.insuranceId
		}
		let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					sessionStorage.setItem('editSection', 'true')
					let customerDetails = data.Result;
					this.productItem = new ProductData();
					this.productItem.ClientName = customerDetails.ClientName;
					this.productItem.CompanyName = customerDetails.ClientName;
					this.productItem.MiddleName = customerDetails.MiddleName;
					this.productItem.LastName = customerDetails.LastName;
					this.productItem.IdType = customerDetails.PolicyHolderType;
					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					this.productItem.Title = customerDetails.Title;
					// if(customerDetails.AppointmentDate!=null && customerDetails.AppointmentDate!=undefined){
					// 	var dateParts = customerDetails.AppointmentDate.split("/");
					// 	 this.productItem.AppointmentDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
					// }

					this.productItem.Address1 = customerDetails.Street;
					this.productItem.Address2 = customerDetails.Address2;
					this.productItem.BusinessType = customerDetails.BusinessType;
					this.productItem.CityName = customerDetails.CityCode;
					this.productItem.CustomerTypes = this.CustomerTypeList.find(ele => ele.CodeDesc == customerDetails.CustomerType)?.Code || null;
					
					this.productItem.IndustryType = this.IndustryTypeList.find(ele => ele.CodeDesc == customerDetails.IndustryType)?.Code || null;
					this.productItem.WealthSource = this.WealthSourceList.find(ele => ele.CodeDesc == customerDetails.WealthSource)?.Code || null;
					this.productItem.LegalStructure = this.LegalStructureList.find(ele => ele.CodeDesc == customerDetails.LegalStructure)?.Code || null;
					this.productItem.Owners = this.OwnersList?.find(ele => ele.CodeDesc == customerDetails.Owners)?.Code || null;
					this.productItem.ComplianceStatus = this.ComplianceStatusList.find(ele => ele.CodeDesc == customerDetails.ComplianceStatus)?.Code || null;
					
					if (customerDetails.CityCode && (this.insuranceId != '100040' && this.insuranceId != '100027')) this.form.controls['CityName'].setValue(customerDetails.CityCode);
					this.productItem.SocioProfessionalcategory = customerDetails.SocioProfessionalCategory;
					if (this.productItem.SocioProfessionalcategory) {
						this.getSocioProfessional();
					}
					this.productItem.Activities = customerDetails.Activities;
					if (this.productItem.CityName == null) this.productItem.CityName = '';
					this.productItem.districtcode = customerDetails.CityName;
					if (customerDetails.Clientstatus) this.productItem.Clientstatus = customerDetails.Clientstatus;
					else this.productItem.Clientstatus = 'Y';
					this.productItem.EmailId = customerDetails.Email1;
					this.productItem.occupationdesc = customerDetails?.OtherOccupation;
					this.productItem.Country = customerDetails.Country;
					if (this.productItem.Country == null) this.productItem.Country = '';
					if (customerDetails.Nationality != null) {
						this.productItem.Nationality = customerDetails.Nationality;
					}
					else if (this.countryList.length != 0 && this.countryList.length > 1) {
						this.productItem.Country = this.countryList[1].Code;
					}
					if (this.productItem.Country) this.getRegionList('direct')
					if (customerDetails.CustomerAsInsurer != null || customerDetails.CustomerAsInsurer != '') {
						this.productItem.Insurer = customerDetails.CustomerAsInsurer;
					}
					this.productItem.Nationality = customerDetails.Nationality;

					this.productItem.PinCode = customerDetails.PinCode;
					this.productItem.Gender = customerDetails.Gender;
					this.productItem.Region = customerDetails.StateCode;
					this.getStateList('direct')

					//this.productItem.IdNumber = customerDetails.IdNumber;
					if (customerDetails.PolicyHolderType != null && customerDetails.PolicyHolderType != '') {
						this.productItem.IdType = customerDetails.PolicyHolderType;
						this.setPolicyType();
						if ((this.productItem.IdType == '2' || this.productItem.IdType == 2) && (this.insuranceId == '100044' || this.insuranceId == '100002' || this.insuranceId == '100019')) {
							this.productItem.CompanyName = customerDetails?.ClientName;
						}
					}

					this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
					if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
					this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCode = customerDetails.MobileCode1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;
					this.productItem.PhoneNo = customerDetails.MobileNo2;
					this.productItem.LandLineNo = customerDetails.MobileNo3;
					this.productItem.CountryCodeWA = customerDetails.WhatsappCode;
					this.productItem.WhatsAppNo = customerDetails.WhatsappNo;
					if (this.productItem.PolicyHolderTypeid == '1' && this.insuranceId == '100004') {
						this.shows = true;
						if (customerDetails.IdNumber != 'NA') {
							this.Idnumber = customerDetails.IdNumber.substr(0, 5);
							this.Idnumber1 = customerDetails.IdNumber.substr(5, 3);
							this.Idnumber2 = customerDetails.IdNumber.substr(8, 1);
						}
					}
					else {
						this.shows = false;
						if (customerDetails.IdNumber != 'NA') this.productItem.IdNumber = customerDetails.IdNumber;
					}
					this.productItem.PreferredNotification = customerDetails.PreferredNotification;
					if (this.productItem.PreferredNotification == null) this.productItem.PreferredNotification = '';
					//this.productItem.Region = customerDetails.StateCode;
					if (this.productItem.state == null) {
						this.productItem.state = '';

					}

					this.productItem.dobOrRegDate = customerDetails.DobOrRegDate;
					this.productItem.ExpiryDate = customerDetails.ExpiryDate;
					this.productItem.Street = customerDetails.Street;
					this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
					this.productItem.MaritalStatus = customerDetails.MaritalStatus;
					if (this.shortQuoteYN && customerDetails.Occupation == '99999') this.productItem.Occupation = '';
					else this.productItem.Occupation = customerDetails.Occupation;
					this.getTitleList();
					this.getCustomerType();
					this.productItem.Occupation = customerDetails.Occupation;
					this.productItem.GstNumber = customerDetails.VrTinNo;
					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					if (customerDetails.PolicyHolderTypeid) this.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					this.getPolicyIdTypeList();
					if (this.insuranceId == '100040' || this.insuranceId == '100027') {
						this.productItem.Region = customerDetails.RegionCode;
						this.productItem.Department = customerDetails.StateCode;
						this.getStateList('direct');
						this.getDepartmentList('direct');
					}
					if (this.loginType == 'B2CFlow' || (this.loginType == 'B2CFlow2')) {
						if (this.productItem.Address1 == null || this.productItem.Address1 == '') {
							this.productItem.Occupation = '';
							if (this.productItem.Title == '1') this.productItem.Gender = 'M';
							else this.productItem.Gender = 'F';
						}
					}

					if(this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049'|| this.insuranceId == '100050'){
						this.productItem.Occupation = customerDetails.Occupation;
					}
					this.productItem.VipFlag = customerDetails?.VipFlag;
					if (customerDetails.RiskAssessmentDate) this.productItem.RiskAssessmentDate = customerDetails?.RiskAssessmentDate;
					else this.productItem.RiskAssessmentDate = '';
					this.productItem.PhoneCode = customerDetails?.PhoneNoCode;

				}
			},
			(err) => { },
		);
	}
	idfieldvalidate() {
		let customer: any;
		if (this.productItem.IdType == '1') {
			customer = 'corporate'
		}
		else if (this.productItem.IdType == '2') {
			customer = 'Individual'
		}
		let policy: any;
		if (this.productItem.PolicyHolderTypeid != null && this.productItem.PolicyHolderTypeid != '' && this.productItem.PolicyHolderTypeid != undefined) {
			let p = this.policyHolderTypeList.find(ele => ele.Code == this.productItem.PolicyHolderTypeid);
			if (p) {
				policy = p.CodeDesc;
			}
			else {
				policy = null;
			}
		}
		if (this.productItem.PolicyHolderTypeid == '3') {
			let urlLink = `${this.CommonApiUrl}api/validatecustomerid?accounttype=${customer}&identifytype=${policy}&companyid=${this.insuranceId}&id=${this.productItem.IdNumber}&saveOrsubmit=Submit`;
			this.sharedService.onGetMethodSync(urlLink).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Message == "Success") {
						this.final1 = false;
						this.final = false;
					}
					else {
						this.final1 = true;
						this.final = true;
					}
				},
				(err) => { },
			);
		}
	}
	Adressvalidate() {
		let urlLink = `${this.CommonApiUrl}api/validateaddress?address=${this.productItem.Address1}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message == "Success") {
					this.final2 = false;
					this.final = false;
				}
				else {
					this.final2 = true;
					this.final = true;
				}
			},
			(err) => { },
		);
	}
	occupationchange() {

		let occupation: any;
		if (this.productItem.Occupation != null) {
			let occupationa = this.occupationList.find(ele => ele.Code == this.productItem?.Occupation);
			if (occupationa) {
				occupation = occupationa?.CodeDesc;
			}
		}
		let urlLink = `${this.CommonApiUrl}api/validateOccupation?occupation=${occupation}&companyid=${this.insuranceId}&otheroccupation=${this.productItem.occupationdesc}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message == "Success") {
					this.final3 = false;
					this.final = false;
				}
				else {
					this.final3 = true;
					this.final = true;
				}
			},
			(err) => { },
		);
	}

	StatusChange() {
		let urlLink = `${this.CommonApiUrl}api/validatestatus?status=${this.productItem.Clientstatus}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message == "Success") {
					this.final4 = false;
					this.final = false;
				}
				else {
					this.final4 = true;
					this.final = true;
				}
			},
			(err) => { },
		);
	}

	Customervalidate() {
		let urlLink = `${this.CommonApiUrl}api/validateCustomerName?name=${this.productItem.ClientName}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message == "Success") {
					this.final5 = false;
					this.final = false;
				}
				else {
					this.final5 = true;
					this.final = true;
				}
			},
			(err) => { },
		);
	}
	Emailvalidate() {
		let urlLink = `${this.CommonApiUrl}api/ValidateEmail?email=${this.productItem.EmailId}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message == "Success") {
					this.final6 = false;
					this.final = false;
				}
				else {
					this.final6 = true;
					this.final = true;
				}
			},
			(err) => { },
		);

	}
	Mobilevalidate() {
		let urlLink = `${this.CommonApiUrl}api/validatemobilenumber?number=${this.productItem.MobileNo}&companyid=${this.insuranceId}&code=${this.productItem.MobileCode}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message == "Success") {
					this.final7 = false;
					this.final = false;
				}
				else {
					this.final7 = true;
					this.final = true;
				}
			},
			(err) => { },
		);
	}

	blankvalidationcheck(datas) {
		console.log("Total Data", datas);

		let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null, cityName = null, stateName = null, businessType = null;
		//  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
		// 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
		//  }
		if (this.insuranceId != '100004') {
			if (datas.CityName != null && datas.CityName != '') cityName = this.stateList.find(ele => ele.Code == datas.CityName)?.CodeDesc;
		}
		else if (this.insuranceId == '100004') {
			if (datas?.districtcode == null || datas?.districtcode == '' || datas?.districtcode == undefined) {
				if (datas.CityName != '' && datas.CityName != null && datas.CityName != '99999') {
					cityName = this.stateList.find(ele => ele.Code == datas.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else if (datas.CityName != '99999') {
				if (datas.CityName != '' && datas.CityName != null) {
					cityName = this.stateList.find(ele => ele.Code == datas.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else cityName = datas?.districtcode;
		}

		if (datas.state != null && datas.state != '') stateName = this.regionList.find(ele => ele.Code == datas.state)?.CodeDesc;
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		if (this.productItem.IdType != 2) {
			datas.dobOrRegDate = new Date(year - 18, month, day - 2);
		}
		if (datas.dobOrRegDate != undefined && datas.dobOrRegDate != null && datas.dobOrRegDate != '') {
			dobOrRegDate = this.datePipe.transform(datas.dobOrRegDate, "dd/MM/yyyy");
		}
		if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem?.TaxExemptedId;
		//taxExemptedId = this.productItem.TaxExemptedId;
		if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
		let codes = this.productItem.MobileCode
		if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {
			//let code = this.productItem
			let code = this.mobileCodeList.find(ele => ele.Code == codes)
			if (code) {
				if (code?.label) this.productItem.MobileCodeDesc = code.label;
				else this.productItem.MobileCodeDesc = '';
			}
			else this.productItem.MobileCodeDesc = '';

			//this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
		}
		let type = null;
		if (datas.GstNumber == '' || datas.GstNumber == undefined || datas.GstNumber == null) { datas.GstNumber = null };
		if (this.loginType == 'B2CFlow') datas.Clientstatus = 'Y';
		if (this.productId == '46' && (this.productItem?.PolicyHolderTypeid == null || this.productItem?.PolicyHolderTypeid == '' || this.productItem?.PolicyHolderTypeid == undefined)) {
			if (this.productItem.IdType == 1 || this.productItem.IdType == '1') { this.productItem.PolicyHolderTypeid = '3'; }
			else { this.productItem.PolicyHolderTypeid = '6'; }
			var minm = 1000000000;
			var maxm = 9876543210;
			this.productItem.IdNumber = Math.floor(Math
				.random() * (maxm - minm + 1)) + minm;
		}
		let policyid: any;
		if (datas?.PolicyHolderTypeid == '1') {
			policyid = this.Idnumber.concat(this.Idnumber1).concat(this.Idnumber2);
		}
		else {
			policyid = datas?.IdNumber;
		}
		let ReqObj = {
			"BrokerBranchCode": this.brokerbranchCode,
			"CustomerReferenceNo": this.customerReferenceNo,
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"ProductId": this.productId,
			"AppointmentDate": appointmentDate,
			"Address1": datas?.Address1,
			"Address2": datas?.Address2,
			"BusinessType": businessType,
			"CityCode": datas?.CityName,
			"CityName": cityName,
			"ClientName": datas?.ClientName,
			"Clientstatus": datas?.Clientstatus,
			"CreatedBy": this.loginId,
			"DobOrRegDate": dobOrRegDate,
			"Email1": datas?.EmailId,
			"Email2": null,
			"Email3": null,
			"Fax": null,
			"Gender": datas?.Gender,
			"IdNumber": policyid,
			"IdType": datas.IdType,
			"IsTaxExempted": datas.isTaxExempted,
			"Language": "1",
			"MobileNo1": datas.MobileNo,
			"MobileNo2": null,
			"MobileNo3": null,
			"Nationality": datas.Country,
			"Occupation": datas?.Occupation,
			"OtherOccupation": datas?.occupationdesc,
			"Placeofbirth": "",
			"PolicyHolderType": datas.IdType,
			"PolicyHolderTypeid": datas?.PolicyHolderTypeid,
			"PreferredNotification": datas?.PreferredNotification,
			"RegionCode": "01",
			"MobileCode1": datas?.MobileCode,
			"WhatsappCode": datas?.MobileCode,
			"MobileCodeDesc1": "1",
			"WhatsappDesc": "1",
			"WhatsappNo": datas.MobileNo,
			"StateCode": datas?.state,
            "StateName": stateName || this.regionList.find((f: any) => f.Code == this.productItem.Region)?.CodeDesc,
			"Status": datas?.Clientstatus,
			"Street": datas?.Street,
			"Type": type,
			"TaxExemptedId": taxExemptedId,
			"TelephoneNo1": datas?.TelephoneNo,
			"PinCode": datas?.PinCode,
			"TelephoneNo2": null,
			"TelephoneNo3": null,
			"Title": datas.Title,
			"VrTinNo": datas.GstNumber,
			"SaveOrSubmit": 'Submit',
			"MiddleName": datas?.MiddleName,
			"LastName": datas?.LastName,
		}
		let urlLink = `${this.CommonApiUrl}api/blankvalidation`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				let res: any = data;
				console.log(data);
				if (data.ErrorMessage.length != 0) {
					if (res.ErrorMessage) {
						const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
						let ulList: any = '';
						for (let index = 0; index < errorList.length; index++) {

							const element = errorList[index];
							ulList += `<li class="list-group-login-field">
								<div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}&nbsp;(${element?.Code})</div>
								<div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
							</li>`
						}
						Swal.fire({
							title: '<strong>Form Validation</strong>',
							icon: 'info',
							html:
								`<ul class="list-group errorlist">
								${ulList}
							</ul>`,
							showCloseButton: true,
							focusConfirm: false,
							confirmButtonText:
								'<i class="fa fa-thumbs-down"></i> Errors!',
							confirmButtonAriaLabel: 'Thumbs down, Errors!',
						})
					}
				}
				else {
					this.onSubmit(datas);
				}

			},






			(err: any) => { console.log(err); },
		);
	}
	setPolicyType() {

		this.productItem.IdType = String(this.productItem.IdType)
		let value = this.productItem.IdType;
		if (value == 2 || value == '2') {
			this.productItem.Gender = '';
		}
		this.getTitleList();
		this.getCustomerType();
		//if(this.insuranceId!="100048"){
		this.getPolicyIdTypeList();
		//}//
		//this.getOccupationLists("direct")
		if (this.insuranceId == '100004') {
			this.getType3('change');
		}
		let alphabetHooks4
		if (this.productItem.IdType == 2 || this.productItem.IdType == '2') {
			alphabetHooks4 = {
				onInit: (field: FormlyFieldConfig) => {
					field.form.controls['CompanyName'].valueChanges.subscribe(() => {
						//this.taxExcepted();
						this.onCheckAlphabetsCompany(event)
					});
					field.props.onKeydown = (event: KeyboardEvent) => {
						this.onCheckAlphabetsCompany(event) // Call your method on key press
					};

				}
			}

		}
		let fieldList = this.additionalInfoFields[0].fieldGroup;
		let fieldList1 = this.personalInfoFields[0].fieldGroup;
		let fieldList2 = this.addressInfoFields[0].fieldGroup;
		for (let field of fieldList) {

			if ((field.key == 'BusinessType' && this.insuranceId == '100028')) {
				if (this.productItem.IdType == '2' || this.productItem.IdType == 2) { field.hide = false; field.hideExpression = false; field.templateOptions.required = true; }
				else { field.hide = false; field.hideExpression = false; field.templateOptions.required = true; }
			}
		}
		for (let field of fieldList1) {
			if (field.key == 'MobileNo' || field.key == 'PhoneCode' || field.key == 'MobileCode' || field.key == 'PhoneNo') {
				if (sessionStorage.getItem('editSection')) { }
				else { field.formControl.setValue(''); }
			}
			if (this.productItem.IdType == '2' || this.productItem.IdType == 2) {
				if ((field.key == 'BusinessType' && this.insuranceId == '100028') || field.key == 'CompanyName') {
					field.hide = false; field.hideExpression = false;
					if (field.key == 'CompanyName') field.hooks = alphabetHooks4
				}
				if (field.key == 'Title' && this.insuranceId == '100028') { field.templateOptions.required = false; }

				if (field.key == 'ClientName' || field.key == 'LastName' || field.key == 'MiddleName' || field.key == 'Gender' || field.key == 'dobOrRegDate' || field.key == 'Nationality'
					|| field.key == 'SocioProfessionalcategory' || field.key == 'MaritalStatus'
				) {
					field.hide = true; field.hideExpression = true;
					if (field.key == 'dobOrRegDate') { if (this.insuranceId == '100028') { this.productItem.dobOrRegDate = null; } field.label = "Registration Date" }
				}
				if (field.key == 'BusinessType' && this.insuranceId != '100048') {
					field.templateOptions.required = false;
				}
				else if (field.key == 'EmailId') {
					field.templateOptions.required = true;
				}

				if (field.key == 'Title') {
					field.hide = true; field.hideExpression = true;
				}

				if (field.key == 'LandLineNo') {
					field.hide = false; field.hideExpression = false;
				}
			}
			else if (this.productItem.IdType == '1' || this.productItem.IdType == 1) {
				if ((field.key == 'BusinessType' && this.insuranceId != '100028' && this.insuranceId != '100048') || field.key == 'CompanyName') {
					field.hide = true; field.hideExpression = true;
				}
				if (field.key == 'Title') { field.templateOptions.required = true; field.hide = false; field.hideExpression = false; }
				if (field.key == 'ClientName' || field.key == 'LastName' || field.key == 'MiddleName' || field.key == 'Gender' || field.key == 'dobOrRegDate' || field.key == 'Nationality'
					|| field.key == 'SocioProfessionalcategory' || field.key == 'Occupation' || field.key == 'MaritalStatus'
				) {
					field.hide = false; field.hideExpression = false;
				}
				if (field.key == 'ClientName' || field.key == 'LastName' || field.key == 'MiddleName' || field.key == 'Gender') {
					field.hide = false; field.hideExpression = false;
				}
				if (field.key == 'EmailId') {
					field.templateOptions.required = true;
				}
				if (field.key == 'LandLineNo') {
					field.hide = true; field.hideExpression = true;
				}

			}
		}
		for (let field of fieldList) {
			if (this.productItem.IdType == '1' || this.productItem.IdType == 1) {
				if ((field.key == 'dobOrRegDate' && this.insuranceId != '100044' && this.insuranceId != '100028') || (field.key == 'GstNumber' && this.insuranceId != '100048')) {
					field.hide = true; field.hideExpression = true;
				}
				// else if(field.key=='IdNumber' || field.key=='PolicyHolderTypeid' ){
				// 	field.templateOptions.required=false;
				// }
				if (field.key == 'ComplianceStatus' && this.insuranceId == '100047') {
					field.hide = true; field.hideExpression = true;
				}
			}
			else if (this.productItem.IdType == '2' || this.productItem.IdType == 2) {
				if ((field.key == 'dobOrRegDate' && this.insuranceId != '100028') || (field.key == 'GstNumber' && this.insuranceId != '100048')) {
					field.hide = false; field.hideExpression = false;
				}
				else if (field.key == 'PolicyHolderTypeid' || field.key == 'IdNumber' || (field.key == 'dobOrRegDate' && this.insuranceId == '100028')) {
					field.templateOptions.required = true;
				}

				if (field.key == 'GstNumber' && this.insuranceId == '100047') {
					field.templateOptions.label = 'VAT Number';
					field.templateOptions.placeholder = 'VAT Number';
				}

				if (field.key == 'ComplianceStatus' && this.insuranceId == '100047') {
					field.hide = false; field.hideExpression = false;
				}
			}
		}
		for (let field of fieldList2) {
			if (this.productItem.IdType == '1' || this.productItem.IdType == 1) {
				if (field.key == 'Country' || field.key == 'CityName' || field.key == 'Address1') {
					field.templateOptions.required = false;
				}
			}
			else if (this.productItem.IdType == '2' || this.productItem.IdType == 2) {
				if (field.key == 'Country' || field.key == 'CityName' || field.key == 'Address1') {
					field.templateOptions.required = true;
				}
			}
		}
		// this.productItem.IdType =value;
		// this.typeChange()
	}
	navigateToCustomer() {
		this.confirmationService.confirm({
			message: 'All the changes made will be lost. Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				if (this.shortQuoteYN) this.router.navigate(['/quotation/plan/shortQuote']);
				else this.router.navigate(['/customer']);
			},
		});
	}
	onsavedatas(type, data) {
		console.log("Total Data", data);
		if (type == 'Address') {
			this.Adressvalidate();
		}
		else if (type == 'IdValue') {
			this.idfieldvalidate();
		}
		else if (type == 'Email') {
			this.Emailvalidate();
		}
		else if (type == 'Mobile') {
			this.Mobilevalidate();
		}
		else if (type == 'Occupation') {
			this.occupationchange();
		}
		else if (type == 'Status') {
			this.StatusChange();
		}
		else if (type == 'Customer') {
			this.Customervalidate();
		}
		else if (type == 'direct' && !this.final) {
			//this.blankvalidationcheck(data);
			if (this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100027' || this.insuranceId == '100002' || this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050' || this.insuranceId == '100028' || this.insuranceId == '100019') {
				let fieldList = this.personalInfoFields[0].fieldGroup
				let i = 0, j = 0;
				for (let field of fieldList) {
					if ((field.templateOptions.required == true || field.props.required == true) && (field.hide != true)) {
						if (this.productItem[field.key] == null || this.productItem[field.key] == undefined || this.productItem[field.key] == '') {
							j += 1;
							this.form.controls[field.key].errors = true;
							this.form.controls[field.key].touched = true;
							field.templateOptions['errors'] = true;
							field.props['errors'] = true;
						}
						else {
							field.templateOptions['errors'] = false;
							field.props['errors'] = false;
						}
						i += 1;
						if (i == fieldList.length && j == 0) {
							this.errorFunctionadditioal(data);
							// this.onSubmit(data);
						}
					}
					else {
						i += 1;
						if (i == fieldList.length && j == 0) {
							this.errorFunctionadditioal(data);
						}
					}
				}
			}
			else {
				this.onSubmit(data);
			}
		}
		else if (type == 'direct' && this.final) {
			if (this.final1) this.idfieldvalidate();
			if (this.final2) this.Adressvalidate();
			if (this.final3) this.occupationchange();
			if (this.final4) this.StatusChange();
			if (this.final5) this.Customervalidate();
			if (this.final6) this.Emailvalidate();
			if (this.final7) this.Mobilevalidate();
		}
	}


	errorFunctionadditioal(data) {
		let fieldList = this.additionalInfoFields[0].fieldGroup
		let i = 0, j = 0;
		for (let field of fieldList) {
			if ((field.templateOptions.required == true || field.props.required == true) && (field.hide != true)) {
				if (this.productItem[field.key] == null || this.productItem[field.key] == undefined || this.productItem[field.key] == '') {
					j += 1;
					this.form.controls[field.key].errors = true;
					this.form.controls[field.key].touched = true;
					field.templateOptions['errors'] = true;
					field.props['errors'] = true;
					console.log(this.form.controls[field.key]);
				}
				else {
					field.templateOptions['errors'] = false;
					field.props['errors'] = false;
				}
				i += 1;
				if (i == fieldList.length && j == 0) {
					this.errorFunctionaddress(data);
				}
			}
			else {
				i += 1;
				if (i == fieldList.length && j == 0) {
					this.errorFunctionaddress(data);
				}
			}
		}
	}
	errorFunctionaddress(data) {
		let fieldList = this.addressInfoFields[0].fieldGroup
		let i = 0, j = 0;
		for (let field of fieldList) {
			if ((field.templateOptions.required == true || field.props.required == true) && (field.hide != true)) {
				if (this.productItem[field.key] == null || this.productItem[field.key] == undefined || this.productItem[field.key] == '') {
					j += 1;
					this.form.controls[field.key].errors = true;
					this.form.controls[field.key].touched = true;
					field.templateOptions['errors'] = true;
					field.props['errors'] = true;
					console.log(this.form.controls[field.key]);
				}
				else {
					field.templateOptions['errors'] = false;
					field.props['errors'] = false;
				}
				i += 1;
				if (i == fieldList.length && j == 0) {
					this.onSubmit(data);
				}
			}
			else {
				i += 1;
				if (i == fieldList.length && j == 0) {
					this.onSubmit(data);
				}
			}
		}
		//return true;
	}
	getType3(type) {
		let product: any; this.titleList = [];
		if (this.productItem.IdType == '1') {
			product = 'I'
		}
		else if (this.productItem.IdType == '2') {
			product = 'C'
		}
		else {
			product = 'I'
		}
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "NAME_TITLE",
			"BranchCode": "99999",
			"ItemCode": "null",
			"TitleType": product
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.titleList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.titleList.length; i++) {
						this.titleList[i].label = this.titleList[i]['CodeDesc'];
						this.titleList[i].value = this.titleList[i]['Code'];
						if (i == this.titleList.length - 1) {
							let fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								//   if(field.key=='Title'){
								// 	  field.props.options = defaultRow.concat(this.titleList);
								// 	  this.checkFieldNames()
								//   }
								if (field.key == 'Title') {
									let entry
									if (this.productItem.IdType == 1) {
										entry = "I"
									} else {
										entry = "C"
									}
									field.props.options = defaultRow.concat(this.titleList.filter(ele => ele.TitleType == entry));
									this.checkFieldNames()

									console.log(field.props.options, "field.props.optionsfield.props.options");

								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}

	getCustomerType() {
		this.CustomerTypeList = [];
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "CUSTOMER_TYPE"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.CustomerTypeList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.CustomerTypeList.length; i++) {
						this.CustomerTypeList[i].label = this.CustomerTypeList[i]['CodeDesc'];
						this.CustomerTypeList[i].value = this.CustomerTypeList[i]['Code'];
						if (i == this.CustomerTypeList.length - 1) {
							let fieldList = this.additionalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'CustomerTypes') {
									field.props.options = defaultRow.concat(this.CustomerTypeList.filter(ele => ele.CodeDesc != null));
									this.checkFieldNames()
								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	getIndustryTypeList(){
		this.IndustryTypeList = [];
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "INDUSTRY_TYPE"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.IndustryTypeList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					if(this.IndustryTypeList.length>0){
						for (let i = 0; i < this.IndustryTypeList.length; i++) {
							this.IndustryTypeList[i].label = this.IndustryTypeList[i]['CodeDesc'];
							this.IndustryTypeList[i].value = this.IndustryTypeList[i]['Code'];
							if (i == this.IndustryTypeList.length - 1) {
								let fieldList = this.personalInfoFields[0].fieldGroup;
								for (let field of fieldList) {
									if (field.key == 'IndustryType') {
										field.props.options = defaultRow.concat(this.IndustryTypeList.filter(ele => ele.CodeDesc != null));
										this.checkFieldNames()
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
	getWealthSourceList(){
		this.WealthSourceList = [];
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "WEALTH_SOURCE"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.WealthSourceList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.WealthSourceList.length; i++) {
						this.WealthSourceList[i].label = this.WealthSourceList[i]['CodeDesc'];
						this.WealthSourceList[i].value = this.WealthSourceList[i]['Code'];
						if (i == this.WealthSourceList.length - 1) {
							let fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'WealthSource') {
									field.props.options = defaultRow.concat(this.WealthSourceList.filter(ele => ele.CodeDesc != null));
									this.checkFieldNames()
								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	getLegalStructure(){
		this.LegalStructureList = [];
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "LEGAL_STRUCTURE"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.LegalStructureList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.LegalStructureList.length; i++) {
						this.LegalStructureList[i].label = this.LegalStructureList[i]['CodeDesc'];
						this.LegalStructureList[i].value = this.LegalStructureList[i]['Code'];
						if (i == this.LegalStructureList.length - 1) {
							let fieldList = this.additionalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'LegalStructure') {
									field.props.options = defaultRow.concat(this.LegalStructureList.filter(ele => ele.CodeDesc != null));
									this.checkFieldNames()
								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	getComplianceStatus(){
		this.ComplianceStatusList = [];
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "COMPLIANCE_STATUS"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.ComplianceStatusList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.ComplianceStatusList.length; i++) {
						this.ComplianceStatusList[i].label = this.ComplianceStatusList[i]['CodeDesc'];
						this.ComplianceStatusList[i].value = this.ComplianceStatusList[i]['Code'];
						if (i == this.ComplianceStatusList.length - 1) {
							let fieldList = this.additionalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'ComplianceStatus') {
									field.props.options = defaultRow.concat(this.ComplianceStatusList.filter(ele => ele.CodeDesc != null));
									this.checkFieldNames()
								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	getOccupationLists(type) {
		let product: any; this.occupationList = []; let productId = this.productId
		if (this.productItem.IdType == '1' || this.insuranceId == '100028') {
			product = 'I'
		}
		else if (this.productItem.IdType == '2') {
			product = 'C'
		}
		if (type == 'change') {
			this.productItem.Occupation = '';
		}
		if (this.insuranceId == '100004') {
			productId = ''
			product = '';
		}
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"ProductId": productId,
			"TitleType": product
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
							let fieldList = this.personalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'Occupation') {
									field.props.options = defaultRow.concat(this.occupationList);
									this.checkFieldNames()
								}
							}
						}
					}
					// }
					// else{
					// 	this.occupationList = defaultRow.concat(this.occupationList)
					// }
					if (type != 'change') {
						this.getBusinessTypeList();
					}
				}
			},
			(err) => { },
		);
	}
	getOwnersList(){
		this.OwnersList = [];
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "OWNERS"
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.OwnersList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.OwnersList.length; i++) {
						this.OwnersList[i].label = this.OwnersList[i]['CodeDesc'];
						this.OwnersList[i].value = this.OwnersList[i]['Code'];
						if (i == this.OwnersList.length - 1) {
							let fieldList = this.additionalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								if (field.key == 'Owners') {
									field.props.options = defaultRow.concat(this.OwnersList.filter(ele => ele.CodeDesc != null));
									this.checkFieldNames()
								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	taxExcepted() {
		let fieldList = this.additionalInfoFields[0].fieldGroup;
		for (let field of fieldList) {
			if (this.productItem.isTaxExempted == 'Y') {
				if (field.key == 'TaxExemptedId') {
					field.hide = false; field.hideExpression = false;
				}
			}
			else {
				if (field.key == 'TaxExemptedId') {
					field.hide = true; field.hideExpression = true;
				}
			}
		}
	}
	idTypechange() {
		let fieldList = this.additionalInfoFields[0].fieldGroup;
		for (let field of fieldList) {
			if (this.productItem.PolicyHolderTypeid == '1') {
				if (field.key == 'TaxExemptedId') {
					field.formControl.setValue(this.productItem.IdNumber);
					field.templateOptions.disabled = true;
				}
			}
			else {
				if (field.key == 'TaxExemptedId') {
					if (this.productItem.isTaxExempted == 'Y') {
						field.templateOptions.disabled = false;
					}
				}
			}
		}
	}
	idtypechange(type) {
		let fieldList = this.additionalInfoFields[0].fieldGroup;
		let i = 0;
		for (let field of fieldList) {
			if (field.key == 'IdNumber') {
				if (this.productItem.PolicyHolderTypeid == 'NIC' && (this.insuranceId == '100028')) { field.templateOptions.maxLength = 14 }
				else { field.templateOptions.maxLength = 50 }
			}
			if (field.key == 'IdNumber' || field.key == 'TaxExemptedId') {
				if (type == 'change') {
					if (sessionStorage.getItem('editSection')) { }
					else { field.formControl.setValue(''); }
				}
				else {
					if (field.key == 'TaxExemptedId') field.formControl.setValue(this.productItem.TaxExemptedId)
					if (field.key == 'IdNumber') {
						if ((this.productItem.PolicyHolderTypeid == '1' && this.insuranceId == '100004')) {
						}
						else field.formControl.setValue(this.productItem.IdNumber)
					}
				}
			}
			i += 1;
			if (i == fieldList.length && type == 'change') sessionStorage.removeItem('editSection')
		}
	}
	onKeyPress(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
			let fieldList = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'MobileNo' || field.key == 'PhoneNo' || field.key == 'whatsappNo' || field.key == 'CountryCodeWA') {
					field.value = input.value;
					if (String(input.value).charAt(0) == '0' || (String(input.value).charAt(0) != '5' && (this.insuranceId == '100028'))) { field.form.controls['MobileNo'].setValue(''); this.productItem.MobileNo = '' }
				}

			}
		}
	}
	onKeyPressPhoneNo(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
			let fieldList = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'PhoneNo') {
					field.value = input.value;
					if (String(input.value).charAt(0) == '0') { field.form.controls['PhoneNo'].setValue(''); this.productItem.PhoneNo = '' }
				}

			}
		}
	}
	onKeyPressIdNumber(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			if (this.productItem.PolicyHolderTypeid == 'NIC' && (this.insuranceId == '100028')) { input.value = input.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 14); }
			else if (this.insuranceId == '100028') { input.value = input.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 50); }
			else if (this.insuranceId != '100028') input.value = input.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 14);
			let fieldList = this.additionalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'IdNumber') {
					field.value = input.value;
					const firstChar = String(input.value.charAt(0));
					if (!firstChar.match(/[a-zA-Z]/i) && this.productItem.PolicyHolderTypeid == 'NIC') { field.form.controls['IdNumber'].setValue(''); this.productItem.IdNumber = ''; }
				}
			}
		}
	}
	onKeyPressPoBox(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^0-9]/g, '').slice(0, 20);
			let fieldList = this.addressInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'PinCode') {
					field.value = input.value;
				}
			}
		}
	}
	onKeyPressAddress(event: Event): void {
		if (this.insuranceId != '100046' && this.insuranceId != '100047' && this.insuranceId != '100048' && this.insuranceId != '100049' && this.insuranceId != '100050') {
			const input = event.target as HTMLInputElement;
			if (input.value) {
				input.value = input.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 100);
				let fieldList = this.addressInfoFields[0].fieldGroup;
				for (let field of fieldList) {
					if (field.key == 'Address1') { field.value = input.value; }
				}
			}
		}
	}
	onKeyPressEmail(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^a-zA-Z0-9@.]/g, '').slice(0, 50);
			let fieldList = this.addressInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'EmailId') {
					field.value = input.value;
				}
			}
		}
	}
	onCheckAlphabets(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^A-Za-z]/g, "").slice(0, 50);
			let fieldList = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'ClientName') {
					field.value = input.value;
				}
			}
		}
	}
	onCheckAlphabetsLast(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^A-Za-z]/g, "").slice(0, 50);
			let fieldList = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'LastName') {
					field.value = input.value;
				}
			}
		}
	}
	onCheckAlphabetsMiddle(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^A-Za-z]/g, "").slice(0, 50);
			let fieldList = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'MiddleName') {
					field.value = input.value;
				}
			}
		}
	}
	onCheckAlphabetsCompany(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			input.value = input.value.replace(/[^A-Za-z]/g, "").slice(0, 50);
			let fieldList = this.personalInfoFields[0].fieldGroup;
			for (let field of fieldList) {
				if (field.key == 'CompanyName') { field.value = input.value; }
			}
		}
	}
	getTaxExcepted() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"ItemType": "CUSTOMER_VAT_TYPE",
		}
		let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.taxList = data.Result;
					let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
					for (let i = 0; i < this.taxList.length; i++) {
						this.taxList[i].label = this.taxList[i]['CodeDesc'];
						this.taxList[i].value = this.taxList[i]['Code'];
						if (i == this.taxList.length - 1) {
							let fieldList = this.additionalInfoFields[0].fieldGroup;
							for (let field of fieldList) {
								//   if(field.key=='Title'){
								// 	  field.props.options = defaultRow.concat(this.titleList);
								// 	  this.checkFieldNames()
								//   }
								if (field.key == 'isTaxExempted') {
									field.props.options = defaultRow.concat(this.taxList);
									this.checkFieldNames()

									console.log(field.props.options, "field.props.optionsfield.props.options");

								}
							}
						}
					}
				}
			},
			(err) => { },
		);
	}
	onBuyPolicy() {
	}
	openLocationDialog(type: 'new' | 'edit', location: any = null) {
		if (type === 'new') {
			this.newLocation = {
				locationName: '',
				address: ''
			};
			this.editingIndex = null;
		} else {
			this.newLocation = { ...location };
			this.editingIndex = this.locationList.indexOf(location);
		}
		this.locationDialogVisible = true;
	}
	saveLocation(successData?: any) {
		const urlLink = `${this.CommonApiUrl}api/saveMultipleCustomerLocation`;
		this.sharedService.onPostMethodSync(urlLink, this.locationList).subscribe(
			(data: any) => {
				if(data.IsError == true){
					Swal.fire({
						icon: 'error',
						title: 'Save Failed',
						text: data.ErrorMessage.Message || 'Unable to save location.'
					});
				}else if(data.Result != null){
					this.navigateToNext(successData);
				}
			},
			(err) => {
				console.error('Error saving location:', err);
			}
		);
	}
	editLocation(index: number) {
		const location = this.locationList[index];
		this.openLocationDialog('edit', location);
	}

	deleteLocation(index: number, locationId) {
		this.locationList.splice(index, 1);
		if(locationId){
		let ReqObj = {
			"CustomerReferenceNo": this.customerReferenceNo,
			"LocationId": locationId
		}
		const urlLink = `${this.CommonApiUrl}api/deleteLocation`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
			},
			(err) => {
				console.error('Error saving location:', err);
			}
		);
	}
	}
	openQuoteDialog() {
		this.quoteDialogVisible = true;	
	}
	openPolicyDialog() {
		this.policyDialogVisible = true;
	}
	openClaimDialog(){
		this.claimDialogVisible = true;
	}
	onQuoteGlobalFilterChange() {
		this.quoteFilters = { global: { value: this.quoteGlobalFilter, matchMode: 'contains' } };
	}

	onPolicyGlobalFilterChange() {
		this.policyFilters = { global: { value: this.policyGlobalFilter, matchMode: 'contains' } };
	}
AddLocation() {
  this.locationNameError = '';
  this.addressError = '';

  if (!this.newLocation.locationName || this.newLocation.locationName.trim() === '') {
    this.locationNameError = 'Location Name is required.';
  }

  if (!this.newLocation.address || this.newLocation.address.trim() === '') {
    this.addressError = 'Address is required.';
  }

  if (this.locationNameError || this.addressError) {
    return; 
  }

  const isEdit = this.editingIndex !== null;

  if (isEdit) {
    this.locationList[this.editingIndex] = { ...this.newLocation };
  } else {
    const ReqObj = {
      locationName: this.newLocation.locationName,
      address: this.newLocation.address,
      active: "Y",
      companyId: this.insuranceId,
      customerReferenceNo: this.customerReferenceNo
    };
    this.locationList.push(ReqObj);
  }

  this.locationDialogVisible = false;
  this.editingIndex = null;

  // Clear form after closing
  this.newLocation = { locationName: '', address: '' };
}

}

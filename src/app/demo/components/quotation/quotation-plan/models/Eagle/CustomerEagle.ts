import { FormlyFieldConfig } from "@ngx-formly/core";
import { of } from "rxjs";

export class CustomerEagle{
    customerDetails: any;currentDate:any=null;
    commonDetails: any[]=[];minDate:any=null;
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      let finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
      this.subuserType = sessionStorage.getItem('typeValue');
      var d= new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
       this.currentDate = new Date();
      this.minDate = new Date(year - 18,month, day );
      this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      if (commonDetails) this.commonDetails = commonDetails;
      if (sessionStorage.getItem('endorsePolicyNo')) {
          this.endorsementSection = true;
          let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
          if (endorseObj) {
            this.enableFieldsList = endorseObj.FieldsAllowed;
          }
      }
      this.fields={
          props: { label: 'Personal Information' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'CustomerTitle',
                  key: 'Title',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `Customer Title`,
                    id: 'CustomerTitle',
                    name:'CustomerTitle',
                    // placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('Title'),
                    maxLength: 15,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'FirstName',
                  key: 'ClientName',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `First Name`,
                    placeholder: 'Enter First Name',
                    required: true,
                    disabled: this.checkDisable('ClientName'),
                    maxLength: 50,
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'MiddleName',
                  key: 'MiddleName',
                  hide: false,
                  hideExpression:false,
                  
                  templateOptions: {
                    label: `Middle Name`,
                    placeholder: 'Enter Middle Name',
                    required: false,
                    disabled: this.checkDisable('MiddleName'),
                    maxLength: 50
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'LastName',
                  key: 'LastName',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `Last Name`,
                    placeholder: 'Enter Last Name',
                    required: true,
                    disabled: this.checkDisable('LastName'),
                    maxLength: 50
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-8 lg:col-8 xl:col-8 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'CompanyName',
                  key: 'CompanyName',
                  hide: true,
                  hideExpression:true,
                  templateOptions: {
                    label: `Company Name`,
                    placeholder: 'Enter Company Name',
                    required: true,
                    disabled: this.checkDisable('ClientName'),
                    maxLength: 50,
                    pattern: /[a-zA-Z]+/gm,
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Gender',
                  key: 'Gender',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `Gender`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('Gender'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                  type: 'datepicker',
                  id: 'DateOfBirth',
                  key: 'dobOrRegDate',
                  hide: false,
                  hideExpression:false,
                  defaultValue: this.minDate,
                  templateOptions: {
                    type:'date',
                    label: `Date Of Birth`,
                    required: true,
                    disabled: this.checkDisable('dobOrRegDate'),
                    maxLength: 15,
                    datepickerOptions: {
                      // Additional options for the datepicker if necessary
                      max:this.minDate,
                    },
                    
                  },
                 
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-5 lg:col-5 xl:col-5 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'MaritalStatus',
                  key: 'MaritalStatus',
                  templateOptions: {
                    label: `Marital Status`,
                    placeholder: '-Select Marital Status-',
                    required: true,
                    disabled: this.checkDisable('MaritalStatus'),
                    maxLength: 50,
                    options:[]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'CountryCode',
                  key: 'MobileCode',
                  templateOptions: {
                    label: `Country Code`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('CountryCode'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'MobileNumber',
                  key: 'MobileNo',
                  templateOptions: {
                    label: `Mobile Number`,
                    placeholder: 'Enter MobileNo',
                    required: true,
                    disabled: this.checkDisable('MobileNo'),
                    maxLength: 8
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'PhoneCode',
                  key: 'PhoneCode',
                  templateOptions: {
                    label: `Phone Code`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('PhoneCode'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'PhoneNo',
                  key: 'PhoneNo',
                  templateOptions: {
                    label: `Phone Number`,
                    placeholder: 'Enter Phone No',
                    required: true,
                    disabled: this.checkDisable('PhoneNo'),
                    maxLength: 7
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Nationality',
                  key: 'Nationality',
                  hide: false,
                  hideExpression:false,
                  props: {
                    label: `Nationality`,
                    id: 'Nationality',
                    name:'Nationality',
                    required: false,
                    disabled: this.checkDisable('Nationality'),
                    maxLength: 50,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Occupation',
                  key: 'Occupation',
                  templateOptions: {
                    label: `Occupation`,
                    placeholder: '-Select Occupation-',
                    required: true,
                    disabled: this.checkDisable('Occupation'),
                    maxLength: 50,
                    options:[]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'EmailId',
                  key: 'EmailId',
                  templateOptions: {
                    label: `Email Id`,
                    placeholder: 'Enter EmailId',
                    required: false,
                    disabled: this.checkDisable('EmailId'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                }
               
              ]
            },
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'IdentityType',
                  key: 'PolicyHolderTypeid',
                  templateOptions: {
                    label: `Identity Type`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('PolicyHolderTypeid'),
                    maxLength: 15,
                    options:[]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'IDNumber',
                  key: 'IdNumber',
                  templateOptions: {
                    label: `ID Number`,
                    placeholder: 'Enter ID Number',
                    required: true,
                    disabled: this.checkDisable('IdNumber'),
                    maxLength: 14
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'datepicker',
                  id: 'RegistrationDate',
                  key: 'RegistrationDate',
                  hide: true,
                  hideExpression:true,
                  templateOptions: {
                    type: 'date',
                    label: `Registration Date`,
                    placeholder: 'Registration Date',
                    required: true,
                    disabled: this.checkDisable('RegistrationDate'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'PreferedNotification',
                  key: 'PreferredNotification',
                  templateOptions: {
                    label: `Preferred Notification`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('PreferredNotification'),
                    maxLength: 15,
                    options:[
                      { label: '--Select--', value: '','CodeDesc': '--Select--','CodeDescLocal':'---Sélectionner---' },
                      { label: 'SMS', value: 'Sms',CodeDesc: 'SMS','CodeDescLocal':'SMS' },
                      { label: 'Mail', value: 'Mail', CodeDesc: 'Mail','CodeDescLocal':'Mail' },
                      { label: 'Whatsapp', value: 'Whatsapp',CodeDesc: 'Whatsapp','CodeDescLocal':'Whatsapp' }
                    ]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                // {
                //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                //   key: 'isTaxExempted',
                //   id: 'TaxExcempted',
                //   type: 'ngselect',
                //   templateOptions: {
                //     required: true,
                //     disabled: this.checkDisable('isTaxExempted'),
                //     name: 'isTaxExempted',
                //   },
                //   props: {
                //     label: 'Tax Excempted',
                //     options: [
                      
                //     ],
                //   }
                // },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'TaxExcemptedNo',
                  key: 'TaxExemptedId',
                  hide: true,
                  hideExpression:true,
                  templateOptions: {
                    label: `Tax Excempted No`,
                    placeholder: 'Enter Tax Excempted Number',
                    required: true,
                    disabled: this.checkDisable('TaxExcemptedNo'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'VipFlag',
                  key: 'VipFlag',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `VipFlag`,
                    placeholder: '-Select-',
                    required: false,
                    disabled: this.checkDisable('VipFlag'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'CustomerRiskCategory',
                  key: 'BusinessType',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `BusinessType`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('BusinessType'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'datepicker',
                  id: 'RiskAssessmentDate',
                  key: 'RiskAssessmentDate',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    type: 'date',
                    label: `Risk Assessment Date`,
                    placeholder: 'Select Date',
                    required: true,
                    disabled: this.checkDisable('RiskAssessmentDate'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                // {
                //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                //   type: 'input',
                //   id: 'GstNumber',
                //   key: 'GstNumber',
                //   hide: true,
                //   hideExpression:true,
                //   templateOptions: {
                //     label: `VRN/ GST Number`,
                //     placeholder: 'VRN/ GST Number',
                //     required: true,
                //     disabled: this.checkDisable('GstNumber'),
                //     maxLength: 50
                //   },
                  
                //   validators: {
                //   },
                //   hooks: {
                //   },
                //   expressions: {
                //   },
                // },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  key: 'Clientstatus',
                  id: 'Status',
                  type: 'radioList',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    type: 'radioList',
                    required: true,
                    disabled: this.checkDisable('Clientstatus'),
                    name: 'Status',
                  },
                  props: {
                    label: 'Status',
                    options: [{ value: 'Y', label: 'Active', 'CodeDesc':'Active', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'DeActive','CodeDesc':'DeActive', 'CodeDescLocal':'Não' },{ value: 'P', label: 'Pending','CodeDesc':'Pending', 'CodeDescLocal':'Não' }],
                  }
                },
              ]
            },
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'Address',
                  key: 'Address1',
                  templateOptions: {
                    label: `Address`,
                    placeholder: 'Enter Address',
                    required: true,
                    disabled: this.checkDisable('Street'),
                    maxLength: 100
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Country',
                  key: 'Country',
                  templateOptions: {
                    label: `Country`,
                    placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('Country'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Region',
                  key: 'Region',
                  templateOptions: {
                    label: `Region`,
                    required: true,
                    disabled: this.checkDisable('Region'),
                    maxLength: 15,
                    options:[]
                
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'SubLocality',
                  key: 'CityName',
                  templateOptions: {
                    label: `District`,
                    required: true,
                    disabled: this.checkDisable('District'),
                    maxLength: 15,
                    options:[]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'PoBox',
                  key: 'PinCode',
                  templateOptions: {
                    label: `PoBox`,
                    placeholder: 'Enter PoBox',
                    required: true,
                    disabled: this.checkDisable('PinCode'),
                    maxLength: 20
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                }
              ]
            }
          ]
        }
  }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
      checkAlphabets(event:Event){
        return ''
      }
}
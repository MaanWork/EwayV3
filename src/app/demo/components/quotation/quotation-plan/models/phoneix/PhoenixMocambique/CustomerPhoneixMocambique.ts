import { FormlyFieldConfig } from "@ngx-formly/core";

export class CustomerPhoneixMocambique{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
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
                  // {
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  //   type: 'ngselect',
                  //   id: 'CustomerTitle',
                  //   key: 'Title',
                  //   hide: false,
                  //   hideExpression:false,
                  //   templateOptions: {
                  //     label: `Customer Title`,
                  //     placeholder: '-Select-',
                  //     required: true,
                  //     disabled: this.checkDisable('Title'),
                  //     maxLength: 15,
                  //     options: []
                  //   },
                    
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  // {
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  //   type: 'input',
                  //   id: 'ClientName',
                  //   key: 'ClientName',
                  //   hide: false,
                  //   hideExpression:false,
                  //   templateOptions: {
                  //     label: `Client Name`,
                  //     placeholder: 'Enter Client Name',
                  //     required: true,
                  //     disabled: this.checkDisable('ClientName'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    type: 'ngselect',
                    id: 'CustomerTitle',
                    key: 'Title',
                    hide: false,
                    hideExpression:false,
                    templateOptions: {
                      label: `Customer Title`,
                      placeholder: '-Select-',
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
                  // {
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  //   type: 'input',
                  //   id: 'ClientName',
                  //   key: 'ClientName',
                  //   hide: false,
                  //   hideExpression:false,
                  //   templateOptions: {
                  //     label: `Client Name`,
                  //     placeholder: 'Enter Client Name',
                  //     required: true,
                  //     disabled: this.checkDisable('ClientName'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    type: 'input',
                    id: 'FirstName',
                    key: 'ClientName',
                    hide: false,
                    hideExpression:false,
                    templateOptions: {
                      label: `First Name`,
                      // placeholder: 'Enter Client Name',
                      required: true,
                      disabled: this.checkDisable('ClientName'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    type: 'input',
                    id: 'LastName',
                    key: 'LastName',
                    hide: false,
                    hideExpression:false,
                    templateOptions: {
                      label: `Last Name`,
                      // placeholder: 'Enter Client Name',
                      required: true,
                      disabled: this.checkDisable('ClientName'),
                      maxLength: 100
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
                  //   id: 'FatherName',
                  //   key: 'FatherName',
                  //   hide: false,
                  //   hideExpression:false,
                  //   templateOptions: {
                  //     label: `Father Name`,
                  //     placeholder: 'Enter Father Name',
                  //     required: true,
                  //     disabled: this.checkDisable('FatherName'),
                  //     maxLength: 50
                  //   },
                    
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  // {
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  //   type: 'input',
                  //   id: 'MotherName',
                  //   key: 'MotherName',
                  //   hide: false,
                  //   hideExpression:false,
                  //   templateOptions: {
                  //     label: `Mother Name`,
                  //     placeholder: 'Enter Mother Name',
                  //     required: true,
                  //     disabled: this.checkDisable('MotherName'),
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
                  // {
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  //   type: 'ngselect',
                  //   id: 'CustomerType',
                  //   key: 'BusinessType',
                  //   // hide: true,
                  //   // hideExpression:true,
                  //   templateOptions: {
                  //     label: `Customer Type`,
                  //     placeholder: '-Select-',
                  //     required: true,
                  //     disabled: this.checkDisable('BusinessType'),
                  //     maxLength: 15
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
                    type: 'ngselect',
                    id: 'Occupation',
                    key: 'Occupation',
                    templateOptions: {
                      label: `Occupation`,
                      placeholder: '-Select Occupation-',
                      required: true,
                      disabled: this.checkDisable('Occupation'),
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
                      maxLength: 10
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
                    id: 'CountryCode',
                    key: 'CountryCodeWA',
                    templateOptions: {
                      label: `Country Code`,
                      placeholder: 'Enter Country Code`',
                      required: true,
                      disabled: this.checkDisable('CountryCodeWA'),
                      maxLength: 4,
                      minLength: 1
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
                    id: 'Whatsapp',
                    key: 'WhatsAppNo',
                    templateOptions: {
                      label: `Whatsapp Number`,
                      placeholder: 'Enter Whatsapp Number',
                      required: true,
                      disabled: this.checkDisable('WhatsAppNo'),
                      maxLength: 10,
                      minLength: 7
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
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
                    type: 'input',
                    id: 'IDNumber',
                    key: 'IdNumber',
                    templateOptions: {
                      label: `ID Number`,
                      placeholder: 'Enter ID Number',
                      required: true,
                      disabled: this.checkDisable('IdNumber'),
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
                        { label: 'Select', value: '','CodeDesc': 'Select','CodeDescLocal':'Selecione' },
                        { label: 'SMS', value: 'Sms',CodeDesc: 'SMS','CodeDescLocal':'Sms' },
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
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                    key: 'isTaxExempted',
                    id: 'TaxExcempted',
                    type: 'ngselect',
                    templateOptions: {
                      required: true,
                      disabled: this.checkDisable('isTaxExempted'),
                      name: 'isTaxExempted',
                    },
                    props: {
                      label: 'Tax Excempted',
                      options: [
                        
                      ],
                    }
                  },
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
                    type: 'input',
                    id: 'NUITNumber',
                    key: 'GstNumber',
                    // hide: true,
                    // hideExpression:true,
                    templateOptions: {
                      label: `NUIT Number`,
                      placeholder: 'Enter NUITNumber',
                      required: true,
                      disabled: this.checkDisable('GstNumber'),
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
                      options: [{ value: 'Y', label: 'Active', 'CodeDesc':'Active', 'CodeDescLocal':'Active' }, { value: 'N', label: 'DeActive','CodeDesc':'DeActive', 'CodeDescLocal':'DésActivé' },{ value: 'P', label: 'Pending','CodeDesc':'Pending', 'CodeDescLocal':'En attente' }],
                    }
                  },
                ]
              },
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-3 pr-2 pt-1',
                    type: 'textarea',
                    id: 'PhysicalAddress',
                    key: 'Address1',
                    templateOptions: {
                      label: `Physical Address`,
                      placeholder: 'Enter Physical Address',
                      required: true,
                      disabled: this.checkDisable('Physical Address'),
                      maxLength: 200
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
                    type: 'textarea',
                    id: 'CorrespondenceAddress',
                    key: 'Address2',
                    templateOptions: {
                      label: `Correspondence Address`,
                      placeholder: 'Enter Correspondence Address',
                      required: true,
                      disabled: this.checkDisable('CorrespondenceAddress'),
                      maxLength: 200
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
                    id: 'PoBox',
                    key: 'PinCode',
                    templateOptions: {
                      label: `PoBox`,
                      placeholder: 'Enter PoBox',
                      required: false,
                      disabled: this.checkDisable('PinCode'),
                      maxLength: 150
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  // {
                  //   className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  //   type: 'ngselect',
                  //   id: 'Country',
                  //   key: 'Country',
                  //   templateOptions: {
                  //     label: `Country`,
                  //     placeholder: '-Select-',
                  //     required: true,
                  //     disabled: this.checkDisable('Country'),
                  //     maxLength: 15
                  //   },
                    
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
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
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    type: 'ngselect',
                    id: 'District',
                    key: 'CityName',
                    templateOptions: {
                      label: `District`,
                      required: true,
                      disabled: this.checkDisable('District'),
                      maxLength: 15
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  
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
}
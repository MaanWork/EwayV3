import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PensionFundTrusteeNamibia {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if (finalize) this.finalizeYN = finalize;
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
        this.fields = {
            props: { label: 'Professional Indeminity' },
            fieldGroup: [
                {
                    fieldGroupClassName: 'grid', // Make a responsive row container
                    fieldGroup: [
                         {
                            type: 'input',
                            className: 'col-12 md:col-3 lg:col-3 p-2',
                            key: 'PFName',
                            defaultValue: '0',
                            templateOptions: {
                                label: 'Trust Name',
                                maxLength: 15,
                                placeholder:"Enter Name",
                                required: true,
                                disabled: this.checkDisable('PFName'),
                            },
                            validators: {
                                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)],
                            },
                        },
                        {
                            type: 'ngselect',
                            className: 'col-12 md:col-3 lg:col-3 p-2 my-1',
                            key: 'PFIndustryType',
                            defaultValue: '0',
                            props: {
                                label: 'Industry Type',
                                maxLength: 15,
                                required: true,
                                placeholder: 'Select Industry',
                                options:[],
                                disabled: this.checkDisable('PFIndustryType'),
                            },
                            validators: {
                                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)],
                            },
                        },
                        {
                            type: 'commaSeparator',
                            className: 'col-12 md:col-3 lg:col-3 p-2',
                            key: 'PFYears',
                            defaultValue: '0',
                            templateOptions: {
                                label: 'No Of Years',
                                maxLength: 15,
                                placeholder:"Enter Years",
                                required: true,
                                disabled: this.checkDisable('PFYears'),
                            },
                            validators: {
                                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)],
                            },
                        },
                        {
                            type: 'commaSeparator',
                            className: 'col-12 md:col-3 lg:col-3 p-2',
                            key: 'PFSumInsured',
                            defaultValue: '0',
                            templateOptions: {
                                label: 'SumInsured',
                                placeholder: 'Enter Sum Insured',
                                maxLength: 15,
                                disabled: this.checkDisable('PFSumInsured'),
                               
                            },
                            validators: {
                                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)],
                            },
                        }
                    ]
                }
            ]

        }
    }
    fields: FormlyFieldConfig;
    getFieldDetails() { return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
        }
        else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
        else return false;

    }
}
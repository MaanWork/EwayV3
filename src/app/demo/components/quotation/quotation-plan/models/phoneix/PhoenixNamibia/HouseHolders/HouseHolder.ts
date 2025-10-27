import { FormGroup } from "@angular/forms";
import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

export class HouseHoldersContentsNamibia {
    form = new FormGroup({});
    model = {
        contents: [{}],
    };
    options: FormlyFormOptions = {};
  
    fields: FormlyFieldConfig[] = [  // <-- Ensure fields is an array
        {
            key: 'contents',
            type: 'repeat',
            templateOptions: {
                addText: 'Add another investment',
            },
            fieldArray: {
                fieldGroup: [ // <-- Ensure fieldGroup is an array
                    {
                        fieldGroupClassName: 'grid mt-2',
                        fieldGroup: [
                            {
                                type: 'ngselect',
                                key: 'ContentsType',
                                className: 'col-12 md:col-3 lg:col-4 xl:col-4 mt-2',
                                props: {
                                    label: `Contents Type`,
                                    required: true,
                                    options: [],
                                },
                                validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                }
                            },
                            {
                                type: 'commaSeparator',
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                key: 'ContentInsured',
                                props: {
                                    label: `SumInsured`,
                                    maxLength: 15,
                                    required: true,
                                    options: [],
                                },
                                validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                }
                            },
                            {
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                key: 'ContentDescription',
                                type: 'input',
                                
                                props: {
                                    label: 'Description',
                                    required: true,
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ];

    constructor() {}
}
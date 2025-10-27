import { FormGroup } from "@angular/forms";
import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

export class GPANamibia {
    form = new FormGroup({});
    model = {
        GPA: [{}],
    };
    options: FormlyFormOptions = {};
  
    fields: FormlyFieldConfig[] = [  // <-- Ensure fields is an array
        {
           
           
           
                fieldGroup: [ // <-- Ensure fieldGroup is an array
                    {
                        fieldGroupClassName: 'grid mt-2',
                        fieldGroup: [
                            {
                              key: 'occupation',
                              type: 'ngselect',
                              className: 'col-12 md:col-3 lg:col-4 xl:col-4',
                              props: {
                                label: 'Occupation',
                                placeholder: '--Select--',
                                required: false,
                                options: [
                                  
                                ]
                              }
                            },
                              {
                                key: 'NumberofEmployees',
                                type: 'input',
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                props: {
                                  label: 'Number of Employees',
                                  
                                  type: 'number',
                                  required: true
                                }
                              },
                              {
                                key: 'AnnualRemuneration',
                                type: 'commaSeparator',
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                props: {
                                  label: 'Annual Remuneration',
                                  placeholder: 'Select an option',
                                  required: false,
                                  options: [
                                    
                                  ]
                                },
                                },
                            {
                                key: 'TemporaryDisablement',
                                type: 'commaSeparator',
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                props: {
                                  label: 'Temporary Disablement',
                                
                                  //type: 'number',
                                  required: true
                                }
                            },
                            {
                                key: 'Coverage',
                                type: 'ngselect',
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                props: {
                                  label: 'Coverage',
                                  placeholder: '--select--',
                                  //type: 'number',
                                  options:[],
                                  required: false
                                }
                            },
                            {
                                key: 'MedicalExpenses',
                                type: 'commaSeparator',
                                className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                                props: {
                                  label: 'Medical Expenses',
                                 
                                  //type: 'number',
                                  required: true
                                }
                            }
                
                
                          ]
                    }
                ]
            
        }
    ];

    constructor() {}
}
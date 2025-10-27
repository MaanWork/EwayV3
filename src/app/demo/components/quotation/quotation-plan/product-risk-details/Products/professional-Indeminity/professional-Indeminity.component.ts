import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProfessionalIndemnityPhoenix } from '../../../models/phoneix/PhoenixZambia/ProfessionalIndeminity/ProfessionalIndeminity';
import { ProfessionalIndeminityNamibia } from '../../../models/namibia/ProfessionalIndeminity/professionalIndeminity';
@Component({
    selector: 'app-professional-Indeminity',
    templateUrl: './professional-Indeminity.component.html',
    styleUrls: ['./professional-Indeminity.component.scss'],
})
export class ProfessionalIndeminityComponent implements OnInit {
    @Input() form: any;
    coversreuired: any = null;
    insuranceId: any = null;
    @Input() productItem: any;
    userDetails: any = null;
    loginId: any = null;
    @Input() renderType: any = null;
    @Input() locationList: any[] = [];
    @Input() tabIndex: any = null;
    @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>();
    @Output() saveSection = new EventEmitter<any>();
    @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();
    @Output() previousSection = new EventEmitter<any>();
    branchCode: any = null;
    agencyCode: any = null;
    countryId: any = null;
    brokerbranchCode: any = null;
    fieldsProfessionalIndeminity: any[] = [];
    showIndeminityProfessionals: boolean = false;
    IndustryError: boolean;
    IndeminityProfessionalForm: FormGroup;
    endorsementSection: boolean = false;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    professionalIndeminityClaimCost: any[] = [];
    productId: any;
    userType: any;
    buildingColumnHeader: string[];
    orgPolicyNo: string;
    endorsementId: any;
    endorsementCode: any;
    enableFieldsList: any;
    enableAllSection: boolean;
    endorsePolicyNo: any;
    endorseCategory: any;
    endorsementName: any;
    endorseCoverModification: any;
    endorseEffectiveDate: any;
    quoteRefNo: any;
    endorsementDetails: any;
    occupationList: any;
    option: any;
    constructor(
        private sharedService: SharedService,
        private fb: FormBuilder,
    ) {
        this.IndeminityProfessionalForm = this.fb.group({
            indeminityProfessional: this.fb.array([]),
        });
        this.coversreuired = sessionStorage.getItem('coversRequired');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.insuranceId = this.userDetails.Result.InsuranceId;
        this.loginId = this.userDetails.Result.LoginId;
        this.productId = this.userDetails.Result.ProductId;
        this.userType = this.userDetails?.Result?.UserType;
        this.branchCode = this.userDetails.Result.BranchCode;
        this.agencyCode = this.userDetails.Result.OaCode;
        this.countryId = this.userDetails.Result.CountryId;
        this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
        this.branchCode = this.userDetails.Result.BranchCode;
        let contentData = null;
        if (this.productId == '87') {
            let contentData = null;
            contentData = new ProfessionalIndemnityPhoenix();
            this.fieldsProfessionalIndeminity[0] = contentData.fields;
        } else {
            contentData = new ProfessionalIndeminityNamibia();
            this.fieldsProfessionalIndeminity[0] = contentData?.fields;
        }
        this.getOccupationList();
    }
    ngOnInit() {
        let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'));
        if (endorseObj) {
            this.endorsementSection = true;
            this.buildingColumnHeader = ['Location', 'Address'];
        } else {
            this.endorsementSection = false;
            this.buildingColumnHeader = ['Location', 'Address', 'Delete'];
        }
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            if (endorseObj) {
                this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo');
                this.endorsementId = endorseObj.EndtTypeId;
                this.endorsementCode = endorseObj.EndtShortCode;
                this.enableFieldsList = endorseObj.FieldsAllowed;
                let enableAllSection = this.enableFieldsList.some(
                    (ele) =>
                        ele == 'domesticRiskDetails' ||
                        ele == 'AddCovers' ||
                        ele == 'AccessoriesSI',
                );
                if (enableAllSection) this.enableAllSection = true;
                else this.enableAllSection = false;
                this.endorsePolicyNo = endorseObj?.PolicyNo;
                this.endorseCategory = endorseObj.Category;
                this.endorsementName = endorseObj?.EndtName;
                this.endorseCoverModification = endorseObj?.CoverModificationYn;
                this.endorseEffectiveDate = endorseObj?.EffectiveDate;
            }
        }
         if (this.locationList.length != 0) {
            this.onEditData();
        }
    }
    get IndeminityProfessionalArray(): FormArray {
        return this.IndeminityProfessionalForm.get('indeminityProfessional') as FormArray;
    }
    addIndeminityProfessional() {
        const userGroup = this.fb.group({
            NickName: [''],
            DomesticServantType: [''],
            BuildingBuildYear: [''],
            IndeminitySumInsured: [''],
        });
        this.IndeminityProfessionalArray.push(userGroup);
    }
    onEditData() {
        console.log('Locations On Edit PI', this.locationList);
        if (this.renderType == 'Direct') {
            let i = 0;
            for (let obj of this.locationList) {
                if (i == this.tabIndex) {
                    const formArray = this.IndeminityProfessionalForm.get('indeminityProfessional') as FormArray;
                    formArray.clear();
                    const professionalList = obj['SectionList']?.filter((ele: any) => ele['SectionId'] == '246');
                    if (professionalList && professionalList.length) {
                        for (let item of professionalList) {
                            formArray.push(
                                this.fb.group({
                                    NickName: item.NickName,
                                    DomesticServantType: item.IndustryType,
                                    BuildingBuildYear: item.Age,
                                    IndeminitySumInsured: this.CommaFormattedValue(item.SumInsured),
                                })
                            );
                        }
                        this.showIndeminityProfessionals = true;
                    } else {
                        this.showIndeminityProfessionals = true;
                        this.addIndeminityProfessional();
                    }
                }
                i++;
            }
        } else {
            let i = 0;
            for (let loc of this.locationList) {
                if (i == this.tabIndex) {
                    const formArray = this.IndeminityProfessionalForm.get('indeminityProfessional') as FormArray;
                    formArray.clear();
                    const professionalList = loc['SectionList']?.filter((ele: any) => ele['SectionId'] == '246');
                    if (professionalList && professionalList.length) {
                        for (let item of professionalList) {
                            formArray.push(
                                this.fb.group({
                                    NickName: item.NickName,
                                    DomesticServantType: item.IndustryType || item.IndustryId,
                                    BuildingBuildYear: item.Age,
                                    IndeminitySumInsured: this.CommaFormattedValue(item.SumInsured),
                                })
                            );
                        }
                        this.showIndeminityProfessionals = true;
                    } else {
                        this.showIndeminityProfessionals = true;
                        this.addIndeminityProfessional();
                    }
                }
                i++;
            }
        }
        console.log('Final Location', this.locationList);
    }
    removeIndeminityProfessional(index: number) {
        const array = this.IndeminityProfessionalArray;
        if (array && array.length > index) {
            array.removeAt(index);
        }
    }
    CommaFormattedValue(data: any) {
        if (data)
            data = String(data)
                .replace(/[^0-9.]|(?<=\-..*)\./g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return data;
    }
    getOccupationList() {
        let ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchCode,
            ProductId: this.productId,
            TitleType: 'I',
        };
        let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                if (data.Result) {
                    this.occupationList = data.Result;
                    let defaultRow = [];
                    // Format the occupation list
                    for (let i = 0; i < this.occupationList.length; i++) {
                        this.occupationList[i].label =
                            this.occupationList[i]['CodeDesc'];
                        this.occupationList[i].value =
                            this.occupationList[i]['Code'];
                    }
                    let fieldList =
                        this.fieldsProfessionalIndeminity[0]?.fieldGroup[0]?.fieldGroup;
                    console.log(this.fieldsProfessionalIndeminity, 'fieldsProfessionalIndeminity');
                    if (fieldList) {
                        for (let field of fieldList) {
                            if (field.key == 'OccupationType') {
                                field.props.options = defaultRow.concat(
                                    this.occupationList,
                                );
                            }
                        }
                    }
                }
            },
            (err) => { },
        );
    }
    //Industry Change
    IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId =
            this.productItem.IndustryId;
    }
    onProceedData(type: string) {
        let i = 0;
        let locationList = [];
        if (i === 0) {
            let j = 0;
            for (let entry of this.locationList) {
                let obj = {
                    LocationId: j + 1,
                    LocationName: entry.LocationName,
                    CoversRequired: entry.CoversRequired ?? 'BC',
                    BuildingOwnerYn: entry.BuildingOwnerYn ?? 'Y',
                    Address: entry.BuildingAddress,
                    BuildingAddress: entry.BuildingAddress,
                    SectionList: []
                };
                // For the active tab only
                if (j == this.tabIndex) {
                    entry['IndeminityProfessional'] = this.IndeminityProfessionalForm.value.indeminityProfessional;
                    if (entry.SectionList) {
                        obj.SectionList = entry.SectionList.filter((ele: any) => ele.SectionId !== '246');
                    }
                    const IndeminityProfessionalList = entry['IndeminityProfessional'];
                    if (IndeminityProfessionalList?.length) {
                        for (let index = 0; index < IndeminityProfessionalList.length; index++) {
                            const row = IndeminityProfessionalList[index];
                            if (row.IndeminitySumInsured) {
                                let altEntry = {
                                    SectionId: "246",
                                    SectionName: "Professional Indeminity",
                                    CoverId: "579",
                                    NickName: row.NickName,
                                    SumInsured: row.IndeminitySumInsured.replace(/,/g, ''),
                                    Status: "Y",
                                    IndustryType: row.DomesticServantType,
                                    Age: String(row.BuildingBuildYear)
                                };
                                if (altEntry.IndustryType) {
                                    entry.IndustryType = altEntry.IndustryType;
                                    entry.IndustryTypeDesc = this.industryTypeList.find(
                                        (ele) => ele.Code === altEntry.IndustryType
                                    )?.CodeDesc;
                                }
                                obj.SectionList.push(altEntry);
                            }
                        }
                    }
                } else if (entry.SectionList) {
                    obj.SectionList = entry.SectionList;
                }
                locationList.push(obj);
                j++;
                if (j === this.locationList.length) {
                    const res = { locationList, type };
                    if (type == 'packageData') {
                        if(this.tabIndex==this.locationList.length-1){res.type='Submit';this.finalProceed.emit(res)}
                        else {res.type='Next';this.finalProceed.emit(res)}
                    }
                    else { this.finalProceed.emit(res) }
                }
            }
        }
    }
    removeComma(value: string): string {
        if (typeof value === 'string' && value.includes(',')) {
            return value.replace(/,/g, '');
        }
        return value || '';
    }
    CommaFormattedDynamic(event: KeyboardEvent, name: string) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.value) {
            const numericValue = inputElement.value.replace(/[^0-9.]/g, '');
            const formattedValue = numericValue.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
            );
            inputElement.value = formattedValue;
            if (!name || !this.form.controls[name]) {
                return inputElement.value;
            } else
                this.form.controls[name].setValue(inputElement.value, {
                    emitEvent: false,
                });
        }
    }
    onKeyDown(event: KeyboardEvent, field) {
        const inputElement = event.target as HTMLInputElement;
        let maxLength = 0;
        maxLength = 19;
        if (inputElement.value.length >= maxLength) {
            event.preventDefault();
        }
    }
    onExtensionToggle() {
        if (!this.showIndeminityProfessionals) {
            this.form.reset();
        }
    }
    skip() {
        this.skipSection.emit('Professional Indeminity');
    }
    previous() {
        this.previousSection.emit(true);
    }
}
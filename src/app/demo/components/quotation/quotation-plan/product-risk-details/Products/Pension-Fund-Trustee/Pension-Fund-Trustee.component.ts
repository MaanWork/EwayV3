import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PensionFundTrusteeNamibia } from '../../../models/namibia/PensionFundTrustee/pensiontrustee';
import { PensionTrusteeAPINamibia } from '../../../models/namibia/PensionFundTrustee/pensiontrusteeApi';
import { en } from '@fullcalendar/core/internal-common';
@Component({
    selector: 'app-pension-fund-trustee',
    templateUrl: './pension-fund-trustee.component.html',
    styleUrls: ['./pension-fund-trustee.component.scss'],
})
export class PensionFundTrusteeComponent implements OnInit {
    @Input() form: FormGroup;
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
    fieldsPensionTrustee: any[] = [];
    IndustryError: boolean;
    showIndeminityProfessionals: boolean = false;
    PensionTrusteeForm: FormGroup;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    pensionFundClaimCost: any[] = [];
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
    fieldsIPA: any;
    fieldEE: any;
    requestReferenceNo: any;
    constructor(
        private sharedService: SharedService,
        private fb: FormBuilder,
    ) {
        this.PensionTrusteeForm = this.fb.group({
            PensionTrustee: this.fb.array([]),
        });
        let homeObj = JSON.parse(
            sessionStorage.getItem('homeCommonDetails') || null,
        );
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
        contentData = new PensionFundTrusteeNamibia();
        this.fieldsPensionTrustee[0] = contentData?.fields;
    }
    ngOnInit() {
        this.getOccupationEmployers();
        if (this.locationList.length != 0) {
            this.onEditData();
        }
        console.log("final loc",this.locationList)
    }
    get PensionTrusteeArray(): FormArray {
        return this.PensionTrusteeForm.get('PensionTrustee') as FormArray;
    }
    addPensionTrustee() {
        const userGroup = this.fb.group({
            NickName: [''],
            DomesticServantType: [''],
            BuildingBuildYear: [''],
            IndividualSumInsured: [''],
        });
        this.PensionTrusteeArray.push(userGroup);
    }
    onEditData() {
        console.log("Locations On Edit", this.locationList);
        if (this.renderType == 'Direct') {
            let pensionFund = null;
            pensionFund = new PensionTrusteeAPINamibia();
            let i = 0;
            for (let obj of this.locationList) {
                const subDetails = this.locationDetails[i]?.SectionList;
                const updatedObj = pensionFund?.getEditDetails(subDetails, obj);
                console.log('updatedObj', updatedObj);
                if (this.tabIndex == i) {
                    if(obj.SectionList==undefined) obj['SectionList']=[];
                    const pensionTrusteeList = obj.SectionList?.filter((ele: any) => ele['SectionId'] == '235');
                    console.log('pensionTrusteeList', pensionTrusteeList);
                    if (pensionTrusteeList && pensionTrusteeList.length) {
                        for (let item of pensionTrusteeList) {
                            this.PensionTrusteeArray.push(
                                this.fb.group({
                                    NickName: item.NickName,
                                    DomesticServantType: item.IndustryType || item.IndustryId,
                                    BuildingBuildYear: item.Age,
                                    IndividualSumInsured: this.CommaFormattedValue(item.SumInsured),
                                })
                            );
                        }
                        this.showIndeminityProfessionals = true;
                    } else {
                        this.showIndeminityProfessionals=true;
                        this.addPensionTrustee();
                    }
                }
                i++;
            }
        } else {
            let i = 0;
            for (let loc of this.locationList) {
                if (this.tabIndex == i) {
                    console.log("On Next Loc", loc);
                    let subDetails = null;
                    if(loc.SectionList) subDetails = loc.SectionList;
                    else subDetails = this.locationDetails[i]?.SectionList;
                    const pensionTrusteeList = subDetails?.filter((ele: any) => ele['SectionId'] === '235'); // Adjust SectionId if different
                    this.PensionTrusteeArray.clear()
                    if (pensionTrusteeList && pensionTrusteeList.length) {
                        for (let item of pensionTrusteeList) {
                            this.PensionTrusteeArray.push(
                                this.fb.group({
                                    NickName: item.NickName,
                                    DomesticServantType: item.DomesticServantType || item.IndustryType || item.IndustryId,
                                    BuildingBuildYear: item.Age,
                                    IndividualSumInsured: this.CommaFormattedValue(item.SumInsured),
                                })
                            );
                            this.showIndeminityProfessionals = true;
                        }
                    }
                    else{
                         this.showIndeminityProfessionals=true;
                        this.addPensionTrustee();
                    }
                }
                i++;
            }
        }
        console.log(" Final Location", this.locationList);
    }
    removeComma(value: string): string {
        if (typeof value === 'string' && value.includes(',')) {
            return value.replace(/,/g, '');
        }
        return value || '';
    }
    CommaFormattedValue(data: any) {
        if (data)
            data = String(data)
                .replace(/[^0-9.]|(?<=\-..*)\./g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return data;
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
    onProceedData(type: string) {
        let i = 0;
        let locationList = [];
        if (i == 0) {
            let j = 0;
            for (let entry of this.locationList) {
                let obj: any = {
                    LocationId: j + 1,
                    LocationName: entry.LocationName,
                    CoversRequired: entry.CoversRequired ?? 'BC',
                    BuildingOwnerYn: entry.BuildingOwnerYn ?? 'Y',
                    Address: entry.BuildingAddress,
                    BuildingAddress: entry.BuildingAddress,
                    SectionList: []
                };
                if (j == this.tabIndex) {
                    entry['PensionTrustee'] = this.PensionTrusteeForm?.value?.PensionTrustee;
                     if (entry.SectionList) {
                        entry.SectionList = entry.SectionList.filter((ele: any) => ele.SectionId != '235');
                     }
                }
                if (entry.SectionList) {
                    obj['SectionList'] = entry.SectionList;
                    console.log("entry",entry['PensionTrustee'],obj['SectionList'])
                }
                if (entry['PensionTrustee']) {
                    const PensionTrusteeList = entry['PensionTrustee'];
                    if (PensionTrusteeList?.length) {
                        for (const row of PensionTrusteeList) {
                            if (row.IndividualSumInsured) {
                                const altEntry = {
                                    SectionId: "235",
                                    SectionName: "Pension Fund Trustee",
                                    CoverId: "582",
                                    NickName: row.NickName,
                                    SumInsured: this.removeComma(row.IndividualSumInsured),
                                    Status: "Y",
                                    IndustryType: row.DomesticServantType,
                                    Age: String(row.BuildingBuildYear)
                                };
                                obj.SectionList.push(altEntry);
                            }
                        }
                    }
                }
                locationList.push(obj);
                j++;
                if (j == this.locationList.length) {
                    const res = {
                        locationList: locationList,
                        type: type
                    };
                    if (type === 'packageData') {
                        this.saveSection.emit(res);
                    } else {
                        this.finalProceed.emit(res);
                    }
                }
            }
        }
    }
    removePensionTrustee(index: number) {
        this.PensionTrusteeArray.removeAt(index);
    }
    onExtensionToggle() {
        if (!this.showIndeminityProfessionals) {
            this.form.reset();
            this.PensionTrusteeForm.reset();
        }
    }
    skip() {
        this.skipSection.emit('Pension Fund Trustee');
    }
    previous() {
        this.previousSection.emit(true);
    }
    getOccupationEmployers() {
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
                    if (this.requestReferenceNo) {
                        let fieldArray = this.fieldEE[0]?.fieldGroup;
                        if (fieldArray) {
                            for (let fieldGroup of fieldArray) {
                                for (let field of fieldGroup?.fieldGroup[0]
                                    .fieldGroup) {
                                    if (field.key == 'OccupationType') {
                                        field.props.options = defaultRow.concat(
                                            this.occupationList,
                                        );
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
}

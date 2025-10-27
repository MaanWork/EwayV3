import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '@app/layout/service/layout.service';
import { SharedService } from '@app/shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-agriculture-form',
  standalone: false,
  templateUrl: './agriculture-form.component.html',
  styleUrls: ['./agriculture-form.component.scss']
})
export class AgricultureFormComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public MotorApiUrl: any = this.AppConfig.MotorApiUrl;
  PrivoiceList: any[] = [];
  districList: any[] = [];
  CorpList: any[] = [];
  Privoice: any;
  District: any;
  aez: any;
  Crop: any;
  Cost: number;
  CoreAppCode: any;
  EffectiveDateStart: any;
  EffectiveDateEnd: any;
  Status: any = 'Y';
  sno: any;
  Remarks: any;
  userDetails: any;
  selectedCompany: any;
  DispalyCost: string 
  value: any;

  constructor(private router: Router, private sharedService: SharedService, private datepipe:DatePipe,
    private activatedRoute: ActivatedRoute) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let d = sessionStorage.getItem('Agriculture');
    this.sno = JSON.parse(sessionStorage.getItem('sno'));
    console.log(d, "v");

    this.selectedCompany = d
  }
  ngOnInit(): void {
    this.getPrivoiceList();

    this.activatedRoute.queryParams.subscribe(params => {
      this.value = params['value'];
      if (this.value == 'edit') {
        let editSection = JSON.parse(sessionStorage.getItem('EditData'));
        this.CoreAppCode = editSection?.coreAppCode
        this.EffectiveDateStart = new Date(editSection?.effectiveDateStart)
        this.EffectiveDateEnd = new Date(editSection?.effectiveDateEnd)
        this.Status = editSection?.status
        this.sno = editSection?.sno
        this.aez = editSection?.aez
        this.Cost = editSection?.perHaCost
        this.Remarks = editSection?.remarks
        this.selectedCompany = editSection?.companyId
        if (editSection.productId) {
          this.getDistrict();
          // setTimeout(() => {
          //   this.Privoice = editSection.productId;
          //   this.District = editSection.districtId;
          //   this.Crop = editSection.cropId;
          // }, 1000);
        }
      }

    });
    this.getCropList();
  }
  getCropList() {
    // let urlLink = `${this.MotorApiUrl}agriculture/crop-dropdown`;
    // this.sharedService.onGetMethodSync(urlLink).subscribe(
    //   (data: any) => {
    //     if (data) {
    //       this.CorpList = data
    //       // console.log("BankData", this.BankData);
    //       if (this.value == 'edit') {
    //         let editSection = JSON.parse(sessionStorage.getItem('EditData'));
    //         this.Crop = editSection.cropId.toString();

    //       }
    //     }
    //   },
    //   (err) => { },F
    // );


    let ReqObj = {
      "companyId": this.selectedCompany,
      "itemType": "crop"
    }
    let urlLink = `${this.MotorApiUrl}agriculture/crop/dropdowns`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          this.CorpList = data;
          if (this.value == 'edit') {
            let editSection = JSON.parse(sessionStorage.getItem('EditData'));
            this.Crop = editSection.cropId.toString();

          }
        }
      },
      (err) => { },

    );
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  ongetBack() {
    this.router.navigate(['/Admin/agricultureMaster'])
  }

  onProceed() {
    let provienceData = this.PrivoiceList.filter(item => item?.Code == this.Privoice);
    let selectedDist = this.districList.filter(item => item?.Code == this.District);
    let selectedCorp = this.CorpList.filter(item => item.itemCode == this.Crop);
    console.log(selectedCorp, "selectedCorpselectedCorp");
    let date = null,date2=null;
    if(this.EffectiveDateStart!=null && this.EffectiveDateStart!='' && this.EffectiveDateStart!=undefined){
      if(String(this.EffectiveDateStart).split('/').length>1) date = this.EffectiveDateStart;
      else{date=this.datepipe.transform(this.EffectiveDateStart,'dd/MM/yyyy')}
      let dateList = date.split('/')
      var d=  new Date(dateList[2]+'-'+dateList[1]+'-'+dateList[0]);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        date2 = this.datepipe.transform(new Date(year+25, month, day),'dd/MM/yyyy');
        let dateList2 = date2.split('/')
        var d2=  new Date(dateList2[2]+'-'+dateList2[1]+'-'+dateList2[0]);
    }
    let ReqObj =
    {
      "companyId": this.selectedCompany,
      "productId": 104,
      "provinceId": provienceData[0]?.Code,
      "provinceDesc": provienceData[0]?.CodeDesc,
      "districtId": selectedDist[0]?.Code,
      "districtDesc": selectedDist[0]?.CodeDesc,
      "aez": this.aez,
      "cropId": selectedCorp[0].itemCode,
      // "cropDesc": this.Crop,
      "cropDesc": selectedCorp[0].itemValue,
      "perHaCost": this.Cost,
      "coreAppCode": this.CoreAppCode,
      "status": this.Status,
      "effectiveDateStart": d,
      "effectiveDateEnd": d2,
      "sno": this.sno ? this.sno : '',
      "remarks": this.Remarks,
      // "sno":48
    }

    let urlLink = `${this.MotorApiUrl}agriculture/saveOrUpdate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message == 'Saved/Updated Successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            html: data?.Message
          });
          this.ongetBack();
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: data?.ErrorMessage
          });
        }
      },
      (err) => { },

    );
  }

  getPrivoiceList() {
    console.log(this.userDetails);

    let ReqObj = {

      "CountryId": this.userDetails?.Result.CountryId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/region`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.PrivoiceList = data?.Result
          if (this.value == 'edit') {
            let editSection = JSON.parse(sessionStorage.getItem('EditData'));
            console.log(editSection, "editSectioneditSection");

            this.Privoice = editSection.provinceId.toString();;


          }
        }
      },
      (err) => { },

    );
  }

  getDistrict() {
    let ReqObj = {

      "CountryId": this.userDetails?.Result.CountryId,
      "RegionCode": this.Privoice

    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/regionstate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.districList = data?.Result;
          if (this.value == 'edit') {
            let editSection = JSON.parse(sessionStorage.getItem('EditData'));
            this.District = editSection.districtId.toString();;
          }
        }
      },
      (err) => { },

    );
  }

  onCostInput(event: any) {
    const raw = event.target.value.replace(/,/g, '');
    const num = parseFloat(raw);

    this.Cost = isNaN(num) ? null : num;                  
    this.DispalyCost = this.Cost?.toLocaleString('en-US') || '';  // Show commas
  }

}

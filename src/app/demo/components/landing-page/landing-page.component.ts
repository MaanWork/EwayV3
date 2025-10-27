import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../auth/login/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '@environments/environment.prod';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MaterialModule } from '@app/shared/material/material.module';
import { TooltipModule } from 'primeng/tooltip';
import { SharedService } from '@app/_services';
import * as CryptoJS from 'crypto-js';

type FeatureCard = {
  id: string;
  title: string;
  route: string;
  iconBg: string;
  icon: string;
};

interface BookmarkCard {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  route: string;
  bgColor: string;
  isAddNew?: boolean;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule, MaterialModule, TooltipModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private readonly CRMApiUrl: string = environment.CRMApiUrl;

  lang: any = null;
  userType: any;
  userDetails: any;
  selectedIcon: string = 'menu';
  drawerOpen = false;
  index = 0;
  features: FeatureCard[] = [
    {
      id: 'underwriting',
      title: 'Underwriting',
      icon: 'underwriting',
      route: '/auth/login/product',
      iconBg: 'bg-blue-100'
    },
    {
      id: 'servicing',
      title: 'Servicing',
      icon: 'servicing',
      route: '',
      iconBg: 'bg-blue-100'
    },
    {
      id: 'claims',
      title: 'Claims',
      icon: 'claims',
      // route: 'http://147.93.108.104:8085/Claim/#/Login/Home',
      route: 'http://65.0.113.151:8085/Claim/#/Login/Home',
      iconBg: 'bg-yellow-100'
    },
    {
      id: 'reinsurance',
      title: 'ReInsurance',
      icon: 'reinsurance',
      route: '',
      iconBg: 'bg-green-100'
    },
    {
      id: 'renewal',
      title: 'Renewal',
      icon: 'renewal',
      route: 'http://65.0.113.151:8085/Renewal/#/broker',
      // route: 'https://wecorephoenixgroup.com/Renewal/#/broker',
      // route: 'http://65.0.113.151:8085/Renewal/#/broker',
      iconBg: 'bg-purple-100'
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: 'finance',
      // route: 'http://65.0.113.151:8060/',
      route: 'http://65.0.113.151:8060/',
      iconBg: 'bg-green-100'
    },
    {
      id: 'crm',
      title: 'CRM',
      icon: 'crm',
      route: 'http://192.168.1.181:3000/',
      iconBg: 'bg-green-100'
    },
    {
      id: 'bi',
      title: 'BI',
      icon: 'bi',
      route: '',
      iconBg: 'bg-green-100'
    },
    {
      id: 'salvage',
      title: 'Salvage',
      icon: 'salvage',
      route: 'http://65.0.113.151:8085/Bidding/#/register',
      iconBg: 'bg-green-100'
    },
    {
      id: 'employeeClaim',
      title: 'Employee Claim',
      icon: 'employeeClaim',
      route: 'http://65.0.113.151:8070/',
      iconBg: 'bg-green-100'
    }
  
  ];
  bookmarks: BookmarkCard[] = [];
  reInsuranceMaster: any[] = [
    {
      id: 1,
      name: 'Common Master',
      link: 'http://192.168.1.148:3111/common'
    },
    {
      id: 2,
      name: 'Product Peril Mapping',
      link: 'http://192.168.1.148:3111/product'
    },
    {
      id: 3,
      name: 'Customer Master',
      link: 'http://192.168.1.148:3111/broker'
    }
  ];
  reInsuranceTranscation: any[] = [
    {
      id: 4,
      name: 'Policy Treaty Allocation',
      link: 'http://192.168.1.148:3114/tty-alloc/dashboard'
    },
    {
      id: 5,
      name: 'Policy FAC Allocation',
      link: 'http://192.168.1.148:3113/fac-home'
    },
    {
      id: 6,
      name: 'Claim FAC Allocation',
      link: ''
    }
  ];
  reInsuranceList: boolean = false;
  productType: string;

  constructor(private translate: TranslateService,
    private appComp: AppComponent,
    private loginService: LoginService,
    private router: Router,
    private sharedService: SharedService,
    private cd: ChangeDetectorRef
  ) {
    this.sharedService.refresh$.subscribe(() => {
      this.refreshList();
    });
    this.refreshList();
    // this.loginService.setProductId('0');
    this.loginService.productId$.subscribe(id => {
      this.productType = sessionStorage.getItem('ProductId');
      console.log(id, sessionStorage.getItem('ProductId'));
    });
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userType = this.userDetails?.Result?.UserType;
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang);
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language'))
        this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang);
      this.translate.setDefaultLang(sessionStorage.getItem('language'));
    }

    if (
      (this.userType == 'Issuer' ||
        this.userType == 'Broker' ||
        this.userType == 'User') &&
      this.userType != 'SuperAdmin'
    ) {

    }
  }

  getLabelname() {
    if (this.lang == 'en') return 'Welcome to WeCore Portal';
    else if (this.lang == 'fr') return 'Bienvenue chez WeCore Portal';
    else if (this.lang == 'po') return 'Bem-vindo à WeCore Portal';
  }
  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }
  refreshList() {
    const savedBookMark = sessionStorage.getItem('bookmarks');
    if (savedBookMark) {
      this.bookmarks = JSON.parse(savedBookMark);
      console.log('saved bookmarks:', this.bookmarks);
    }
  }
  navigateToFeature(feature: any) {
    if (feature.id == 'crm' || feature.id == 'renewal' || feature.id == 'underwriting' || feature.id == 'employeeClaim' || feature.id == 'finance' || feature.id == 'claims' || feature.id == 'salvage') {
      if (feature.id == 'crm') {
        this.CRM();
      }
      else if (feature.id == 'renewal') {
        this.Renewal();
      }
       else if (feature.id == 'claims') {
           window.open(feature.route, '_blank');
      }
      // else if (feature.id == 'salvage') {
      //   this.Salvage();
      // }
      else if (feature.id == 'underwriting') {
        this.router.navigate(['/auth/login/product']);
      }
      else if (feature.id == 'employeeClaim') {
        window.open(feature.route, '_blank');
      }
      // else if (feature.id == 'reinsurance') {
      //   this.reInsuranceList = true;
      //   this.cd.markForCheck();
      // }
      // else if (feature.id == 'bi') {
      //   this.router.navigate(['/bi']);
      // }
      // else if (feature.id == 'servicing') {
      //   this.router.navigate(['/servicing']);
      // }
      else if (feature.id == 'finance') {
        window.open(feature.route, '_blank');
      }
      else {
        window.open(feature.route, '_blank');
      }
    }
    else {
      alert('This feature is not available yet.');
      this.router.navigate(['/home']);
    }
  }

  navigateToBookmark(bookmark: any) {
    this.router.navigateByUrl(bookmark.route);
  }

  Salvage() {
    const token = sessionStorage.getItem('UserToken');
    if (token && localStorage.getItem('TokenExpired') != 'Expired') {
      const userData = JSON.parse(sessionStorage.getItem('Userdetails'));
      const secretKey = 'secret-key-salvage-123';
      const encryptedData = sessionStorage.getItem('LoginUserDetails');
      if (encryptedData) {
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
          const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
          userData.LoginUserData = JSON.parse(decryptedString);
        } catch (e) {
          userData.LoginUserData = null;
        }
      }
      userData.URL = window.location.href;
      console.log(userData.URL);
      sessionStorage.setItem('Userdetails', JSON.stringify(userData));
      // const url = `${apiUrl}?branchCode=${branchCode}&CountryId=${countryId}&InsuranceId=${insuranceId}&emailId=${LoginUserData.emailId}&pwd=${LoginUserData.password}`;
      // window.open(url, '_self');
      let encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(userData), 'secret key 456').toString());
      window.open(`http://65.0.113.151:1010/Bidding/#/bidder-dashboard?e=${encryptInfo}`, '_self');
      // window.open(`http://147.93.108.104:8085/Bidding/#/bidder-dashboard?e=${encryptInfo}`, '_self');
      //  window.open(`http://65:8085/Bidding/#/bidder-dashboard?e=${encryptInfo}`, '_self');
    }
  }

 Renewal() {
  let branchList = this.userDetails.Result.LoginBranchDetails;
  let branchData = branchList.find(ele =>
    ele.BranchCode == this.userDetails.Result.BranchCode ||
    ele.BranchCode == this.userDetails.Result.BrokerBranchCode
  );
 
  if (branchData) {
    this.userDetails.Result['BelongingBranch'] = branchData?.BelongingBranch;
    this.userDetails.Result['OriginationCountryId'] = branchData?.OriginationCountryId;
    this.userDetails.Result['DestinationCountryId'] = branchData?.DestinationCountryId;
    this.userDetails.Result['SourceCode'] = this.userDetails.Result?.SourceCode;
    this.userDetails.Result['DivisionCode'] = branchData?.DivisionCode;
    this.userDetails.Result['ProductId'] = "95";
    this.userDetails.Result['ProductName'] = "Renewal";
    this.userDetails.Result['UserTypeAlt'] = this.userDetails.Result.UserType;
  }
 
  localStorage.setItem('Userdetails', JSON.stringify(this.userDetails));
  window.addEventListener('message', function (event) { });
 
  let encryptInfo = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(this.userDetails), 'secret key 123').toString());
    // location.href = `http://192.168.1.48:5200/#/branch-dashboard?e=${encryptInfo}`;
    // location.href = `http://193.203.162.152:8085/Renewal/#/branch-dashboard?e=${encryptInfo}`;
    // window.open(`http://147.93.108.104:8085/Renewal/#/branch-dashboard?e=${encryptInfo}`, '_self');
    // window.open(`https://wecorephoenixgroup.com/Renewal/#/broker?e=${encryptInfo}`, '_self');
    //  window.open(`http://65.0.113.151:8085/Renewal/#/broker?e=${encryptInfo}`, '_self');
     location.href = `http://65.0.113.151:8085/Renewal/#/branch-dashboard?e=${encryptInfo}`;
    // window.open(`http://65:8085/Renewal/#/broker?e=${encryptInfo}`, '_self');
    // }
  }
  CRM() {
    let userData = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (sessionStorage.getItem('onlyMotor') == 'false' && userData?.Result?.SubUserType != 'high') {
      sessionStorage.removeItem('reloadDone');
      sessionStorage.removeItem('quoteReferenceNo');
      sessionStorage.removeItem('quoteNo');
      const token = sessionStorage.getItem('UserToken');
      if (token && localStorage.getItem('TokenExpired') != 'Expired') {
        const brokerBranchCode = userData?.Result?.BrokerBranchCode == "None" ? null : userData?.Result?.BrokerBranchCode;
        const branchCode = userData?.Result?.BranchCode;
        const url = `${this.CRMApiUrl}navigationPage?token=${token}&path=${this.router.url}&productId=${this.productType}&branchCode=${branchCode}&brokerBranchCode=${brokerBranchCode}`;        
        window.open(url, '_self');
      }
    }
    else{  
        if (sessionStorage.getItem('onlyMotor') == 'true') {
          alert('This feature is not available for Motor Product.');
        }
        else if(userData?.Result?.SubUserType == 'high' && this.userType == 'Issuer'){
           alert('This feature is not available for your user role.');
          return
        }
    }
  }

  createArray(n: number): any[] {
    return Array(n);
  }

  scrollToItem(id: number): void {
    const el = document.getElementById(`bookmark-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getUserTypeImage(id: any, index: number): string {
    let images: string[] = [];
    const idStr = String(id);

    if (['1', '2', '3'].some(char => idStr.includes(char))) {
      images = [
        './assets/images/UserCreation.jpg',
        './assets/images/workmens.png',
        './assets/images/car-insu-banner.jpg'
      ];
    } else if (['4', '5', '6'].some(char => idStr.includes(char))) {
      images = [
        './assets/images/allQuotations.webp',
        './assets/images/authenticate.webp',
        './assets/images/corporate.jpg',
      ];
    }

    if (images.length === 0) {
      return './assets/images/default.jpg';
    }

    return images[index % images.length]; // loop safely if more cards than images
  }


  ReDirect(data: any) {
    if (data.link) {
      window.open(data.link, '_self');
    }
    else {
      alert('This feature is not available yet.');
    }
  }
}

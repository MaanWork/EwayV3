import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './_services/product.service';
import { CountryService } from './_services/country.service';
import { CustomerService } from './_services/customer.service';
import { EventService } from './_services/event.service';
import { IconService } from './_services/icon.service';
import { NodeService } from './_services/node.service';
import { PhotoService } from './_services/photo.service';
import { AuthGuard } from './demo/components/auth/Auth/auth.guard';
import { AuthService } from './demo/components/auth/Auth/auth.service';
import { PipesModule } from './_pipes/pipes.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './demo/components/HttpInterceptors/http-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomLoadingService } from './demo/shared/custom-loading.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormlyModule } from '@ngx-formly/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { MotorDocumentsDetailComponent } from './demo/components/MotorDocuments/motor-documents-detail/motor-documents-detail.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, MotorDocumentsDetailComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormlyModule,
        ButtonModule,
        SelectButtonModule,
        AppLayoutModule,
        PipesModule,
        TreeModule,
        TabViewModule,
        TableModule,
        CardModule,
        ToastModule,
        AccordionModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AuthService,
        CustomLoadingService,
        AuthGuard, DatePipe, MessageService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

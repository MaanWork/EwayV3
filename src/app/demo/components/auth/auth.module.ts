import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AppComponent } from 'src/app/app.component';
import { InterfaceComponent } from '../interface/interface.component';

@NgModule({
    declarations: [
        InterfaceComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule { }

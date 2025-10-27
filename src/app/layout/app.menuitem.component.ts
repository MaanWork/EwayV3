import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { LayoutService } from './service/layout.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-menuitem]',
    templateUrl: './app.menuitem.component.html',
    animations: [
        trigger('children', [
            state('collapsed', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
    styles: [`
        .layout-menuitem-icon { font-size: 20px; }
    `]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    active = false;

    isMenuExpanded = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    menuExpandSubscription: Subscription;

    key: string = "";

    constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef, public router: Router, private menuService: MenuService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
            Promise.resolve(null).then(() => {
                if (value.routeEvent) {
                    this.active = (value.key === this.key || value.key.startsWith(this.key + '-')) ? true : false;
                }
                else {
                    if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuExpandSubscription = this.menuService.menuExpand$.subscribe(value => {
            this.isMenuExpanded = value;
        })

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            });
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }
    checkActiveRouting(rowData) {
        const path = this.router.url;
        if (rowData.title == 'New Quote') {
            if (path == '/quotation/plan/quote-details' || path == '/policyDetails') { return true }
            else return false;
        }
        else return path == rowData.routerLinkActiveOptions;
    }
    updateActiveStateFromRoute() {
        const activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });
        if (activeRoute) {
            this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
        }
    }

    itemClick(event: Event, rowData) {
        sessionStorage.removeItem('vehicleDetailsList');
        sessionStorage.removeItem('customerReferenceNo')
        sessionStorage.removeItem('quoteReferenceNo');
        sessionStorage.removeItem('homeCommonDetails');
        sessionStorage.removeItem('HomeInsQuoteRefNo')
        sessionStorage.removeItem('TravelQuoteRefNo')
        sessionStorage.removeItem('QuoteStatus');
        sessionStorage.removeItem('endorsePolicyNo');
        sessionStorage.removeItem('quoteNo');
        sessionStorage.removeItem('updatebar');
        sessionStorage.removeItem('endorseTypeId');
        sessionStorage.removeItem('commonDetails');
        sessionStorage.removeItem('QuoteType');
        sessionStorage.removeItem('reloadType');
        sessionStorage.removeItem('b2cType');
        sessionStorage.removeItem('FireObj');
        sessionStorage.removeItem('PageFrom');
        sessionStorage.removeItem('emiPayment');
        sessionStorage.removeItem('editCustomer');
        
         if (rowData.CodeDesc == 'New Quote') { sessionStorage.setItem('newQuote', 'newQuote') }
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        if (this.item.items) {
            this.active = !this.active;
        }

        this.menuService.onMenuStateChange({ key: this.key });
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
    }

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active && !this.root;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }

        if (this.menuExpandSubscription) this.menuExpandSubscription.unsubscribe();
    }
}

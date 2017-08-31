import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/components/about.component";
import {ModuleWithProviders} from "@angular/core";
import {EditOrderComponent} from "./editOrder/components/editOrder.component";
import {AddOrderComponent} from "./addOrder/components/addOrder.component";
import {DetailsOrderComponent} from "./detailsOrder/components/detailsOrder.component";
import {PreArrivalNoticeComponent} from "./preArrivalNotice/components/preArrivalNotice.component";
import {DetailsASNComponent} from "./detailsASN/components/detailsASN.component";
import {AddPoOrderComponent} from "./addPOOrder/components/addPoOrder.component";
import {AddASNComponent} from "./addASN/components/addASN.component";
import {OrderComponent} from "./order/components/order.component";
import {OrderListComponent} from "./orderList/components/orderList.component";
import {TestOrderComponent} from "./order/components/orderList.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'addPOOrder', pathMatch: 'full'},
     {path: 'testOrder', component: TestOrderComponent},
    {path: 'addPOOrder', component: AddPoOrderComponent},
    {path: 'addASN', component: AddASNComponent},
    {path: 'detailsOrder', component: DetailsOrderComponent, data: {title: 'About'}},
    {path: 'detailsASN' , component: DetailsASNComponent, data: {title: 'About'}},
    {path: 'about', component: AboutComponent, data: {title: 'About'}},
    {path: 'editOrder', component: EditOrderComponent, data: {title: 'EditOrder'}},
    {path: 'addOrder', component: AddOrderComponent},
    {path: 'preArrivalNotice', component: PreArrivalNoticeComponent, data: {title: 'PreArrivalNotice'}},
    {path: 'orderList', component: OrderListComponent, data: {title: 'OrderList'}},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

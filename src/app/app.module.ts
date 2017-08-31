import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule} from "@angular/common";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import { MaterialModule } from '@angular/material';
import {routing, appRoutingProviders} from './app.routing';
import {AboutComponent} from "./about/components/about.component";
import {EditOrderComponent} from "./editOrder/components/editOrder.component";
import {AddOrderComponent} from "./addOrder/components/addOrder.component";
import {AddPoOrderComponent} from "./addPOOrder/components/addPoOrder.component";
import {AddASNComponent} from "./addASN/components/addASN.component";
import {OrderComponent} from "./order/components/order.component";
import {OrderListComponent} from "./orderList/components/orderList.component";
import {TestOrderComponent} from "./order/components/orderList.component";
import {DetailsOrderComponent} from "./detailsOrder/components/detailsOrder.component";
import {PreArrivalNoticeComponent} from "./preArrivalNotice/components/preArrivalNotice.component";
import {AgGridModule} from 'ag-grid-ng2/main';
import {DetailsASNComponent} from "./detailsASN/components/detailsASN.component";
import {Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {StkInComponent} from "./detailsASN/components/detailsASN.component";
import {GoodsComponent} from "./detailsASN/components/detailsASN.component";
import {PutawayComponent} from "./detailsASN/components/detailsASN.component";
import { HttpModule } from '@angular/http';
// import { FormService} from './service/form.service';
import { PreArrivalNoticeService} from './preArrivalNotice/service/preArrivalNoticeService';import { OrderListService} from './orderList/service/orderList.service';import { detailsOrderService} from './detailsOrder/service/detailsOrderService';
import { detailsASNService} from './detailsASN/service/detailsASNService';
import { AddPoOrderService} from './addPOOrder/service/addPoOrder.service';
import { OrderListService} from './orderList/service/orderList.service';import { editOrderService} from './editOrder/service/editOrderService'
@NgModule({    imports:  [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        CommonModule,
        MaterialModule.forRoot(),
        AgGridModule.forRoot(),
        Ng2Bs3ModalModule
        ],
    declarations: [
        AppComponent,
        AboutComponent,
        EditOrderComponent,
        AddOrderComponent,
        DetailsOrderComponent,
        AddPoOrderComponent,
        AddASNComponent,
        PreArrivalNoticeComponent,
		OrderComponent,
        DetailsASNComponent,
        StkInComponent,
        GoodsComponent,
        OrderListComponent,
        TestOrderComponent,
        PutawayComponent    ],  
 providers: [
        appRoutingProviders,
        OrderListService,
        PreArrivalNoticeService,
       
		AddPoOrderService
		detailsOrderService,
        detailsASNService,
        editOrderService    ],    bootstrap: [AppComponent]
})
export class AppModule {
}
/**
 * Created by chengyanyan on 2016/11/14.
 */
import {Component,ViewChild} from "@angular/core";
import {OnInit} from "@angular/core";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
declare var $:any;

@Component({
    templateUrl: './app/order/components/orderList.component.html'
})
export class TestOrderComponent implements OnInit {

	@ViewChild('productModal')
    modal1: ModalComponent;
    closeProductModal() {
        this.modal1.close();
    }
    
    openProductModal() {
        this.modal1.open();
    }
    
    @ViewChild('suplierModal')
    modal2: ModalComponent;
	closeSuplierModal() {
        this.modal2.close();
    }
    
    openSuplierModal() {
        this.modal2.open();
    }

    ngOnInit() {

    	$(function () {

			                console.log("aaa");
            });
    }
}     
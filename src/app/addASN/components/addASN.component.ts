/**
 * Created by caikaijie on 2016/11/14.
 */
import { Component,AfterViewInit, ViewContainerRef, ViewChild } from "@angular/core";
import { OnInit } from "@angular/core";
import { GridOptions } from 'ag-grid/main';
import { addASNInitData } from '../mockData/addASNInitData'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgEditorComponent } from 'ag-grid-ng2/main';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgRendererComponent } from 'ag-grid-ng2/main';

let agrid;
let isCellClass=[];
let isClickCount=[];
let sumBoxNum=0;
let sumMustPay=0;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////订单号列设置///////////////////////////////////////////////////////////////////////

@Component({
    selector: 'orderNum-cell',
    styles: ['>>> .modal-xl { width: 80%!important; }'],
    template:`<div style="width: 200px; height: 100%; top:-3px !important;position: relative">
               <div class="eleInline">
                   <input #input  [(ngModel)]="value" id="inputFocus" style="outline:none;margin-top: -3px;width:155px; height: 24px; outline: none;text-align: center;border:none !important" (keydown)="onKeyDown($event)">
               </div>
               <div class="eleInline" style="padding-left: 10px;position: absolute;right: 5px;top:4px;width: 20px;padding: 0;" (click)="open()">
                   <i class="fa fa-search" style="color: #CCCCCC;  cursor: pointer;"></i>
               </div>
           </div>
           <modal #modal [keyboard]="false" [backdrop]="'static'" (onClose)="closed()" (onDismiss)="dismissed()" (onOpen)="opened()" cssClass="modal-xl">
                 <modal-header [show-close]="false">
                            <button type="button" aria-label="Close" class="close" data-dismiss="modal">
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">查询订单号</h4>
                 </modal-header>
                 <modal-body>
                   <div>
                      <div class="md-dialog-content modalGrid">
                          <div class=" col-lg-12" style="position:relative;z-index:10000">
                                <form name="modalForm">
                                  <div class="col-lg-12">
                                    <div class="col-lg-3 col-md-4 col-sm-12">
                                      <div class="col-lg-4 col-md-4 col-sm-4 modal-input-padding">
                                        <span>来源单号:</span>
                                      </div>
                                      <div class="col-lg-8 col-md-8 col-sm-8 modal-input-padding">
                                        <input  class="form-control"  disabled/>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-12 ">
                                      <div class="col-lg-4 col-md-4 col-sm-4 modal-input-padding">
                                        <span>收货时间:</span>
                                      </div>
                                      <div class="col-lg-8 col-md-8 col-sm-8 modal-input-padding">
                                        <input class="form-control"  disabled/>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-12">
                                      <div class="col-lg-4 col-md-4 col-sm-4 modal-input-padding">
                                        <span>单号检索:</span>
                                      </div>
                                      <div class="col-lg-8 col-md-8 col-sm-8 modal-input-padding">
                                        <input id="searchCode" class="form-control" /> <!--ng-keyup="query(1,modalForm.searchCode)"-->
                                      </div>
                                    </div>
                                  </div>
                                </form>
                          </div>
                      </div>
                      <table class="table table-striped b-t b-light modalTablePadding">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>单号</th>
                                  <th>店名称</th>
                                  <th>订单来源号</th>
                                  <th>备注</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr *ngFor="let data of modalData; let i = index;" (dblclick)="chooseRow(i)" (disabled)="true">
                                    <td>
                                        <span><input type="radio" name="identity" (click)="oneCheck(i)"/></span> <!--ng-change="hasCheckedOrNot(data)" ng-model="data.checked"  (click)="oneCheck(this)">x<input type="radio"  (click)="checkRow(lineInde)"-->
                                    </td>
                                    <td>{{data.orderNum}}</td>
                                    <td>{{data.getGoodsStore}}</td>
                                    <td>{{data.orderFrom}}</td>
                                    <td>{{data.notes}}</td>
                                </tr>
                              </tbody>
                      </table>

                   </div>
                </modal-body>
                <modal-footer>
                      <button class="btn btn-primary" (click)="dismissed()">取消</button>
                      <button class="btn btn-success" (click)="returnData()">确定</button>
                </modal-footer>
               </modal>
              `
})
class OrderNumEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:any;
    private cancelBeforeStart:boolean = false;
    private checkRowData:any;
    private rowData:any;
    private checkOneRowData:any;
    @ViewChild('input', {read: ViewContainerRef}) private input;
    @ViewChild('modal')  modal:ModalComponent
    selected:string;
    output:string;

    index:number = 0;
    backdropOptions = [true, false, 'static'];
    cssClass:string = '';

    animation:boolean = true;
    keyboard:boolean = true;
    backdrop:string | boolean = true;
    css:boolean = false;

    closed() {
        this.output = '(closed) ' + this.selected;
    }

    dismissed() {
        this.output = '(dismissed)';
    }

    opened() {
        this.output = '(opened)';
    }

    open() {
        this.modal.open();
    }

    ngAfterViewInit() {
        this.input.element.nativeElement.focus();
    }

    agInit(params:any):void {
        this.params = params;
        // agrid.editRowIndex = params.node.id; //应该需要，由于报错所以先注释掉
        this.value = this.params.value;

    }

    getValue():any {
        if (this.input.element.nativeElement.value == "") {
            return this.params.value;
        } else {
            return this.input.element.nativeElement.value;
        }
    }

    isCancelBeforeStart():boolean {
        return this.cancelBeforeStart;
    }

    isCancelAfterEnd():boolean {
        return this.value == "";
    };
    modalData: any[] = [
        {
            "id":"41",
            "orderNum":"a200000000097",
            "getGoodsStore" : "001武胜路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190010",
            "singlePay":"3",
            "boxNum":"5",
            "mustPay":"9",
            "busLine" : "1-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100",
            "mood": "Sad"
        },
        {
            "id":"42",
            "orderNum":"a200000000098",
            "getGoodsStore" : "002桂林路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190011",
            "singlePay":"5",
            "boxNum":"5",
            "mustPay":"9",
            "busLine" : "2-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"43",
            "orderNum":"a200000000099",
            "getGoodsStore" : "003漕宝路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190012",
            "singlePay":"5",
            "boxNum":"5",
            "mustPay":"9",
            "busLine" : "3-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"44",
            "orderNum":"a2000000000100",
            "getGoodsStore" : "004虹桥路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190013",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "4-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"45",
            "orderNum":"a2000000000101",
            "getGoodsStore" : "005佘山路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190014",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "5-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"46",
            "orderNum":"a2000000000102",
            "getGoodsStore" : "006田林路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190015",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "6-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"47",
            "orderNum":"a2000000000103",
            "getGoodsStore" : "007商城路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190016",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "7-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"48",
            "orderNum":"a2000000000104",
            "getGoodsStore" : "008花木路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190017",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "8-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"49",
            "orderNum":"a2000000000105",
            "getGoodsStore" : "009金桥路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190013",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "9-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"50",
            "orderNum":"a2000000000106",
            "getGoodsStore" : "010金海路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190018",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "10-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"51",
            "orderNum":"a2000000000107",
            "getGoodsStore" : "011太原路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190013",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "11-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"52",
            "orderNum":"a2000000000108",
            "getGoodsStore" : "012北京路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190019",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "12-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"53",
            "orderNum":"a2000000000109",
            "getGoodsStore" : "013南京路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190020",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "13-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"54",
            "orderNum":"a2000000000110",
            "getGoodsStore" : "014广德路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190021",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "14-默认线路",
            "notes" : "ffffff",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"55",
            "orderNum":"a2000000000111",
            "getGoodsStore" : "015河南路店",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"56",
            "orderNum":"a2000000000112",
            "getGoodsStore" : "015河南南路店2",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"57",
            "orderNum":"a2000000000113",
            "getGoodsStore" : "015河南路店3",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"58",
            "orderNum":"a2000000000114",
            "getGoodsStore" : "015河南路店4",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"59",
            "orderNum":"a2000000000115",
            "getGoodsStore" : "015河南路店5",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"60",
            "orderNum":"a2000000000116",
            "getGoodsStore" : "015河南路店6",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"61",
            "orderNum":"a2000000000117",
            "getGoodsStore" : "015河南路店7",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"62",
            "orderNum":"a2000000000118",
            "getGoodsStore" : "015河南路店8",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"63",
            "orderNum":"a2000000000119",
            "getGoodsStore" : "015河南路店9",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"64",
            "orderNum":"a2000000000120",
            "getGoodsStore" : "015河南路店10",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"65",
            "orderNum":"a2000000000121",
            "getGoodsStore" : "015河南路店11",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"66",
            "orderNum":"a2000000000122",
            "getGoodsStore" : "015河南路店12",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"67",
            "orderNum":"a2000000000123",
            "getGoodsStore" : "015河南路店13",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"68",
            "orderNum":"a2000000000124",
            "getGoodsStore" : "015河南路店14",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"69",
            "orderNum":"a2000000000125",
            "getGoodsStore" : "015河南路店15",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"70",
            "orderNum":"a2000000000126",
            "getGoodsStore" : "015河南路店16",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"71",
            "orderNum":"a2000000000127",
            "getGoodsStore" : "015河南路店17",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"72",
            "orderNum":"a2000000000128",
            "getGoodsStore" : "015河南路店18",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"73",
            "orderNum":"a2000000000129",
            "getGoodsStore" : "015河南路店19",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"74",
            "orderNum":"a2000000000130",
            "getGoodsStore" : "015河南路店20",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"75",
            "orderNum":"a2000000000131",
            "getGoodsStore" : "015河南路店21",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"76",
            "orderNum":"a2000000000132",
            "getGoodsStore" : "015河南路店22",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"77",
            "orderNum":"a2000000000133",
            "getGoodsStore" : "015河南路店23",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"78",
            "orderNum":"a2000000000134",
            "getGoodsStore" : "015河南路店24",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"79",
            "orderNum":"a2000000000135",
            "getGoodsStore" : "015河南路店25",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        },
        {
            "id":"80",
            "orderNum":"a2000000000136",
            "getGoodsStore" : "015河南路店26",
            "getGoodsDate" : "2016-04-20 16:30:00",
            "notime":"2016-04-20",
            "orderFrom" : "JH001604190022",
            "singlePay":"3",
            "boxNum":"3",
            "mustPay":"9",
            "busLine" : "15-默认线路",
            "notes" : "ffffffddddddd",
            "specification":"1*20",
            "boxCount":"5+0",
            "stockCount":"100"
        }
    ];
    public chooseRow(index):void{
        this.checkRowData = this.modalData[index];
        //console.log(index);
        agrid.rowData.splice(agrid.editRowIndex, 1, this.checkRowData);
        agrid.api.setRowData(agrid.rowData);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////收货门店列设置/////////////////////////////////////////////////////////////////////
@Component({
    selector: 'store-component',
    template:`<div style="width:200px; height:100%;position:relative;background:#E2F3EF !important;top:-3px">
                <input #container type="text" class="clearable" style="outline:none !important;width:200px; height:100%;text-align: center;border:none !important" id="getGoodsStoreInput" [(ngModel)]="value"/>
               <div style="position:absolute;right:10px;top:3px;color:#CBCBCB;cursor:pointer" (click)="clearText()">
                  <i class="fa fa-times" aria-hidden="true"></i>
               </div>
            </div>
`
})
class StoreEditorComponent implements AgEditorComponent, AfterViewInit {
    private params: any;
    private value: any;
    private cancelBeforeStart: boolean = false;

    @ViewChild('container', {read: ViewContainerRef}) private container;

    ngAfterViewInit() {
        this.container.element.nativeElement.focus();
        return this.container;
    }

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;
    }

    getValue(): any {
        if(this.container.element.nativeElement.value==""){
            return this.value;
        }else{
            return this.container.element.nativeElement.value;
        }
    }

    isCancelBeforeStart(): boolean {
        return this.cancelBeforeStart;
    }


    isCancelAfterEnd(): boolean {
        return this.value == "";
    };

    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if (key == 38 || key == 40) {  //up // down
            event.stopPropagation();
        }

        if (!(key == 38) && !(key == 190) && !(key == 110) && !(key == 46) && !(key == 8) && !(key == 37) && !(key == 39)) {
            if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {
                event.returnValue = false;
            }
        }
    }
    clearText():void{
        this.container.element.nativeElement.value = '';
    }
}

///////////////////////////总数量（仓库数量）////////////////////////////

@Component({
    selector: 'stockCount-component',
    template:`<input
          #container
          [(ngModel)]="value"
          type="text"
          style="outline:none;margin-top: -3px;width:200px; height:100%;text-align: center;border:none !important"
          (keydown)="onKeyDown($event)">
        `

})
class stockCountEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('container', {read: ViewContainerRef}) private container;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        return this.container.element.nativeElement.value;
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.container.element.nativeElement.focus();
    }

    onKeyDown(event):void {
        let key = event.which || event.keyCode;


        if (key >= 48 && key <= 57 || key == 8 || key == 46) {  //up // down
            event.stopPropagation();
        }else{
            event.returnValue = false;
        }

    }
}
//////////////////////////////////////箱数///////////////////////////////////////////////
@Component({
    selector: 'boxCount-component',
    template:`<input #container type="text" class="clearable" style="outline:none;margin-top: -3px;width:200px; height:100%;text-align: center;border:none !important" id="stockCountInput"  [(ngModel)]="value" (keydown)="onKeyDown($event)"/>`
})
class boxCountEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('container', {read: ViewContainerRef}) private container;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        if(this.container.element.nativeElement.value==""){
            return this.params.value
        }else{
            return this.container.element.nativeElement.value;
        }
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.container.element.nativeElement.focus();
    }

    onKeyDown(event):void {
        let key = event.which || event.keyCode;


        if (key >= 48 && key <= 57 || key == 8 || key == 46) {  //up // down
            event.stopPropagation();
        }else{
            event.returnValue = false;
        }

    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////规格设置//////////////////////////////////////////////////////////////////////

@Component({
    selector: 'specificationEditor-cell',
    template: `
            <select  #select style="outline:none;margin-top: -3px;width: 100%;height: 100%;;padding-left:35px;border:none !important"  [(ngModel)]="value">
                <option>1*5</option>
                <option>1*10</option>
                <option>1*15</option>
                <option>1*20</option>
                <option>1*25</option>
                <option>1*30</option>
                <option>1*35</option>
            </select>

    `
})
class specificationEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('select', {read: ViewContainerRef}) private select;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        return this.select.element.nativeElement.value;
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.select.element.nativeElement.focus();
    }

    onKeyDown(event):void {
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////排车路线设置//////////////////////////////////////////////////////////////////////

@Component({
    selector: 'busLineEditor-cell',
    template: `
            <select  #select style="outline:none;margin-top: -3px;width: 100%;height: 100%;;padding-left:35px;border:none !important;text-align:center"  [(ngModel)]="value">
                <option>1-默认线路</option>
                <option>2-默认线路</option>
                <option>3-默认线路</option>
                <option>4-默认线路</option>
                <option>5-默认线路</option>
                <option>6-默认线路</option>
                <option>7-默认线路</option>
            </select>`
})
class busLineEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('select', {read: ViewContainerRef}) private select;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        return this.select.element.nativeElement.value;
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.select.element.nativeElement.focus();
    }

    onKeyDown(event):void {
    }
}
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////单个金额///////////////////////////////////////////
@Component({
    selector: 'singlePay-component',
    template:`<input #container type="text" class="clearable" style="outline:none;margin-top: -3px;width:200px; height:100%;text-align: center;border:none !important" id="stockCountInput" [(ngModel)]="value" (keydown)="onKeyDown($event)"/>`
})
class singlePayEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('container', {read: ViewContainerRef}) private container;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        if(this.container.element.nativeElement.value==""){
            return this.value;
        }else{
            return this.container.element.nativeElement.value;
        }
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.container.element.nativeElement.focus();
    }

    onKeyDown(event):void {
        let key = event.which || event.keyCode;


        if (key >= 48 && key <= 57 || key == 8 || key == 46) {  //up // down
            event.stopPropagation();
        }else{
            event.returnValue = false;
        }

    }
}
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////订单来源////////////////////////////////////////////
@Component({
    selector: 'orderFrom-cell',
    template: `
        <div style="width:100%;height:100%;position:relative">{{textForSelect}}
          <div style="position:absolute;right:10px;top:0px"><i style="color:#CBCBCB" class="fa fa-caret-down" aria-hidden="true"></i></div>
        </div>
    `
})
class orderFromRendererComponent implements AgRendererComponent {
    private params:any;
    private mood:string;
    private textForSelect:string;

    agInit(params:any):void {
        this.params = params;
        this.setMood(params);
    }

    refresh(params:any):void {
        this.params = params;
        this.setMood(params);
    }

    private setMood(params) {
        this.mood = params.value;
        this.textForSelect = this.mood;
    };
}
@Component({
    selector: 'orderFromEditor-cell',
    template: `
            <select  #select style="outline:none;margin-top: -3px;width: 100%;height: 100%;padding-left:35px;border:none !important"  [(ngModel)]="value">
                <option>Celica1</option>
                <option>Celica2</option>
                <option>JH001604190015</option>
                <option>Celica4</option>
                <option>Celica5</option>
                <option>Celica6</option>
                <option>Celica7</option>
            </select>
    `
})
class orderFromEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('select', {read: ViewContainerRef}) private select;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        return this.select.element.nativeElement.value;
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.select.element.nativeElement.focus();
    }

    onKeyDown(event):void {
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////箱数列设置/////////////////////////////////////////////////////////////////////////

@Component({
    selector: 'boxNumEditor-cell',
    template: `

        <input  #number type="number" style="outline:none;margin-top: -3px;width: 100%;height: 100%;text-align: center;border:none !important" min="0" [(ngModel)]="value"  (keydown)="onKeyDown($event)">`
})
class boxNumEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('number', {read: ViewContainerRef}) private number;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        if(this.number.element.nativeElement.value==""){
            return this.params.value;
        }else{
            return this.number.element.nativeElement.value;
        }
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.number.element.nativeElement.focus();
    }

    onKeyDown(event):void {
        let key = event.which || event.keyCode;


        if (key == 8 || key == 38 || key == 40) {  //up // down
            event.stopPropagation();
        }
        //除去数字键操作其他所有键值都不返回
        if (!(event.keyCode == 38) && !(event.keyCode == 40) && !(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39)) {
            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
                event.returnValue = false;
            }
        }


    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////日历编辑列设置/////////////////////////////////////////////////////////////////////

@Component({
    selector: 'CanderEditor-cell',
    template: `
      <div style="height:100%;width:100%;position:relative;top:-3px">
          <input readonly #input style="border:none !important;width: 100%;height: 100%;text-align: center;border:0px;outline:none " (keydown)="onKeyDown($event)" [(ngModel)]="value" class="clearable" type="text" onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:false})" (keydown)="onKeyDown($event)">
          <div style="position:absolute;top:3px;right:10px"><i style="color:#cccccc" class="fa fa-calendar" aria-hidden="true"></i></div>
      </div>
    `
})
class CanderEditorComponent implements AgEditorComponent, AfterViewInit {
    private params:any
    private value:number;
    @ViewChild('input', {read: ViewContainerRef}) private input;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        return this.input.element.nativeElement.realValue;
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.input.element.nativeElement.focus();
    }

    onKeyDown(event):void {
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////日历编辑列无时间设置////////////////////////////////////////////////////////////////
@Component({
    selector: 'CanderNoTimeEditor-cell',
    template: `
        <div style="height:100%;width:100%;position:relative;top:-3px">
          <input readonly #input style="border:none !important;width: 100%;height: 100%;text-align: center;border:0px;outline:none " (keydown)="onKeyDown($event)" [(ngModel)]="value" class="clearable" type="text" onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false})" (keydown)="onKeyDown($event)">
          <div style="position:absolute;top:3px;right:10px"><i style="color:#cccccc" class="fa fa-calendar" aria-hidden="true"></i></div>
      </div>
    `
})
class CanderEditorComponentNoTime implements AgEditorComponent, AfterViewInit {
    private params:any;
    private value:number;
    @ViewChild('input', {read: ViewContainerRef}) private input;

    agInit(params:any):void {
        this.params = params;
        this.value = this.params.value;
    };

    getValue():any {
        return this.input.element.nativeElement.realValue;
    }

    isCancelBeforeStart():boolean {
        return;
    }

    isCancelAfterEnd():boolean {
        return;
    };

    isPopup():boolean {
        return false;
    }

    ngAfterViewInit() {
        this.input.element.nativeElement.focus();
    }

    onKeyDown(event):void {
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////删除//////////////////////////////////////////////////////////////////////////
@Component({
    selector: 'mood-cell',
    template: `<div><i class="fa fa-trash grid-delete" aria-hidden="true"></i></div>`
})
class MoodRendererComponent implements AgRendererComponent {
    private params:any;
    private mood:string;
    private imgForMood:string;

    agInit(params:any):void {
        this.params = params;
        this.setMood(params);
    }

    refresh(params:any):void {
        this.params = params;
        this.setMood(params);
    }

    private setMood(params) {
        this.mood = params.value;

    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////主组件/////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
    templateUrl: './app/addASN/components/addASN.component.html'
})
export class AddASNComponent{
    private gridOptions: GridOptions;//申明gridOptions配置项
    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = addASNInitData;
        this.gridOptions.columnDefs = this.createColumnDefs();
    };
    agrid = this.gridOptions;
    private createColumnDefs() {
        return [
            {
                headerName: "行",
                field: "id",
                width: 45,
                suppressSorting: true,
                cellStyle: function (params) {
                    return {backgroundColor: '#E5E5E5'}
                }
            },
            {
                headerName: "订单号",
                field: "orderNum",
                editable: true,
                cellEditorFramework: {
                    component: OrderNumEditorComponent,
                    moduleImports: [ FormsModule, CommonModule,Ng2Bs3ModalModule]
                },
            },
            {
                headerName: "收货门店",
                field: "getGoodsStore",
                editable: true,
                cellEditorFramework: {
                    component: StoreEditorComponent,
                    moduleImports: [FormsModule,CommonModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },
            },
            {
                headerName: "收货日期", field: "getGoodsDate",
                editable: true,
                cellEditorFramework: {
                    component: CanderEditorComponent,
                    moduleImports: [FormsModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "无时间选择", field: "notime",
                editable: true,
                cellEditorFramework: {
                    component: CanderEditorComponentNoTime,
                    moduleImports: [FormsModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "订单来源", field: "orderFrom",
                editable: true,
                cellRendererFramework: {
                    component: orderFromRendererComponent
                },
                cellEditorFramework: {
                    component: orderFromEditorComponent,
                    moduleImports: [FormsModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "箱数", field: "boxNum",
                editable:true,
                cellEditorFramework: {
                    component: boxNumEditorComponent,
                    moduleImports: [FormsModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "单个金额（￥）",
                field: "singlePay",
                editable: true,
                cellRenderer: singlePayCellRenderer,
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },
                cellEditorFramework: {
                    component: singlePayEditorComponent,
                    moduleImports: [FormsModule]
                },

            },
            {
                headerName: "总金额（￥）",
                field: "mustPay",
                cellRenderer: mustPayCellRenderer,
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return {color: 'black', backgroundColor: '#E5E5E5'};
                    }
                },

            },
            {
                headerName: "排车路线",
                field: "busLine",
                editable: true,
                cellEditorFramework: {
                    component: busLineEditorComponent,
                    moduleImports: [FormsModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "规格",
                field: "specification",
                editable: true,
                cellEditorFramework: {
                    component: specificationEditorComponent,
                    moduleImports: [FormsModule]
                },
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "移库箱数",
                field: "boxCount",
                editable: true,
                cellRenderer: boxCountCellRenderer,
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },
                cellEditorFramework: {
                    component: boxCountEditorComponent,
                    moduleImports: [FormsModule]
                },

            },
            {
                headerName: "库存数量",
                field: "stockCount",
                editable: true,
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return {color: 'black', backgroundColor: '#E5E5E5'};
                    }
                },
                cellEditorFramework: {
                    component: stockCountEditorComponent,
                    moduleImports: [FormsModule]
                },


            },
            {
                headerName: "备注",
                field: "notes",
                editable: true,
                cellStyle: function (params) {
                    var p = params.data.id + params.colDef.field;
                    if (isCellClass[p] == true) {
                        return {color: '#E80005', backgroundColor: '#5CB85C'};
                    } else {
                        return null;
                    }
                },

            },
            {
                headerName: "删除",
                field: "delete",
                cellRendererFramework: {
                    component: MoodRendererComponent
                },
                width: 150
            },
        ]
    };
    /**
     * 单元格值改变
     */
    private onCellValueChanged(params) {
        if (params.colDef.field == 'boxNum' || params.colDef.field == 'singlePay') {
            params.data.mustPay = Number(params.data.boxNum) * Number(params.data.singlePay);
            this.gridOptions.api.refreshView();
        } ;
        this.onSelectionChanged();
        if (params.colDef.field == 'stockCount') {
            params.data.boxCount = Math.floor((params.newValue) / parseInt(params.data.specification.split("*")[1])) + "+" + ((params.newValue) % parseInt(params.data.specification.split("*")[1]));
            this.gridOptions.api.refreshView();
        }
        if (params.colDef.field == 'boxCount') {
            if (params.newValue.split("+")[1] == null) {
                params.data.stockCount = parseInt((params.newValue.split("+")[0])) * parseInt(params.data.specification.split("*")[1]) + 0;
            } else {
                params.data.stockCount = parseInt((params.newValue.split("+")[0])) * parseInt(params.data.specification.split("*")[1]) + parseInt((params.newValue.split("+")[1]));
            }
            this.gridOptions.api.refreshView();
        }
        if (params.colDef.field == 'specification') {
            params.data.stockCount = parseInt((params.data.boxCount.split("+")[0])) * parseInt(params.newValue.split("*")[1]) + parseInt((params.data.boxCount.split("+")[1]));
            this.gridOptions.api.refreshView();
        }
        let count = 0;
        let thisnode = params.data.id + params.colDef.field;
        for (var i = 0; i < isClickCount.length; i++) {1
            if (thisnode == isClickCount[i]) {
                count++;
            }
        }
        if (params.oldValue != params.newValue) {
            isCellClass[thisnode] = true;
            isClickCount.push(thisnode);
            if (params.colDef.field == 'boxNum' || params.colDef.field == 'singlePay') {
                let thisnode1 = params.data.id + 'mustPay';
                isCellClass[thisnode1] = true;
            };
            this.gridOptions.api.refreshView();
            isCellClass[thisnode] = true
        } else {
            if (count == 0) {
                this.gridOptions.api.refreshView();
                isCellClass[thisnode] = false;
            } else {
                this.gridOptions.api.refreshView();
                isCellClass[thisnode] = true;
            }
        }

    }
    /**
     * 选择后重计算
     */
    private onSelectionChanged(){
        let selectedRows = this.gridOptions.api.getSelectedRows();
        sumBoxNum = 0;
        selectedRows.forEach(function (selectedRow, index) {
            sumBoxNum += Number(selectedRow.boxNum);
        });
        sumMustPay = 0;
        selectedRows.forEach(function (selectedRow, index) {
            sumMustPay += Number(selectedRow.mustPay);
        });
        // this.sumBoxNumShow=sumBoxNum;
        // this.sumMustPayShow=sumMustPay;
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////
function singlePayCellRenderer(params) {
    return "￥" + params.value
}
function mustPayCellRenderer(params) {
    return "￥" + params.data.boxNum * params.data.singlePay;
}
function boxCountCellRenderer(params) {
    if(params.value.split("+")[1] == null){
        params.data.boxCount= params.value + '+0';
        console.log( params.data.boxCount);
        return   params.data.boxCount;
    }else{
        return  params.value;
    }
}


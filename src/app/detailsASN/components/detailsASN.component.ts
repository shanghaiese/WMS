/**
 * Created by luyongjie on 2016/11/15.
 */
/**
 * Created by zhangying on 2016/11/14.
 */
import {Component, AfterViewInit, ViewContainerRef, ViewChild} from "@angular/core";
import {AgEditorComponent} from 'ag-grid-ng2/main';
import {OnInit} from "@angular/core";
import {GridOptions} from 'ag-grid/main';
import {AgRendererComponent} from 'ag-grid-ng2/main';
import {CommonModule} from "@angular/common";
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {detailsASNService} from '../service/detailsASNService'

@Component({
    templateUrl: './app/detailsASN/components/detailsASN.html'
})
export class DetailsASNComponent implements OnInit {
    private gridOptions: GridOptions;//申明gridOptions配置项
    // private uuid:any;
    detailsASNDataObject = {
        "owner": {},
        "dock": {}
    };
    details = [];
    ngOnInit() {

    }

    constructor(private detailsASNService: detailsASNService) {
        this.detailsASNService.getSpecifiedASN('asn/100').then(resp=> {
            console.log(resp);
            this.detailsASNDataObject = resp.obj;//获取后台返回的Form中信息
            this.details = resp.obj.details[0];//获取四个金额
            // this.uuid=resp.obj.uuid;
            // console.log(this.uuid)
        })
    }
    closeASN(): void {
        this.detailsASNService.closeASNOrder('asn/100/close').then(resp=> {
            console.log(resp);
        })
    }

}


//收货内置模板
@Component({
    selector: 'StkInEditor-cell',
    template: `
               <button #button id="btn_stkin" (click)="open()">收货</button>   
                <div *ngIf="isshowStkIn" class="div_show">
                    <div style="width: 100%;height: 40px;background: #A9B7B7 ;border-top-left-radius: 2px;border-top-right-radius: 2px">
                        <div style="width: 50%;float: left;padding-left:10px "><span style="float: left;margin-top: 10px;margin-left20px;font-size: 16px;">收货</span></div>
                        <div style="width: 50%;float: left;padding-right:10px"><i (click)="dismiss()" class="fa fa-times" aria-hidden="true" style="font-size: 16px;margin-top: 10px;float: right"></i></div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-lg-12">
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">货品</label>
                                <span style="padding-left: 0" class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7">雀巢咖啡</span>
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">规格</label>
                                <span style="padding-left: 0" class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7">1*12</span>
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">订单数量</label>
                                <span style="padding-left: 0" class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7">100</span>
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">已收数量</label>
                                <span style="padding-left: 0" class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7">0</span>
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">代收数量</label>
                                <input  value="100" class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7 input-focus">
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">生成日起</label>
                                <input class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7 input-focus">
                                       <div class="right-icon"><i class="fa fa-calendar-minus-o" aria-hidden="true"></i></div>
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">收货货位</label>
                                <input  class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7 input-focus">
                                       <div class="right-icon"><i class="fa fa-search" aria-hidden="true"></i></div>
                            </div>
                            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12" style="height: 40px">
                                <label class="col-lg-5 col-xl-5 col-md-5 col-sm-5 col-xs-5"
                                       style="text-align: right;padding-left: 0">批次属性</label>
                                <input class="col-lg-7 col-xl-7 col-md-7 col-sm-7 col-xs-7 input-focus">
                                       <div class="right-icon"><i class="fa fa-search" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px">
                        <div style="float: right;margin-bottom:20px;margin-right: 20px;font-size: 14px;">
                            <input type="checkbox"/>
                            <span>创建新一个收货</span>
                            <button style="margin-left:30px;width: 100px;border:0;border-radius:2px;background:#00BB9C;color:white;height: 36px">
                                确定
                            </button>
                        </div>
                    </div>
                </div>
     
              `,
    styles: [`
        
`]
})
class stkRenderComponent implements AgEditorComponent, AfterViewInit {
    private params: any;
    private value: number;
    private isshowStkIn: boolean;
    @ViewChild('button', {read: ViewContainerRef}) private button;
    @ViewChild('modal') modal: ModalComponent;

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;
    };


    getValue(): any {
        return this.button.element.nativeElement.value;
    }

    open() {
        this.isshowStkIn = true;
    }

    dismiss() {
        this.isshowStkIn = false;
    }

    isCancelBeforeStart(): boolean {
        return;
    }

    isCancelAfterEnd(): boolean {
        return;
    };

    isPopup(): boolean {
        return false;
    }

    ngAfterViewInit() {
        this.button.element.nativeElement.focus();
    }

    onKeyDown(event): void {
    }
}
@Component({

    selector: 'Goods',
    template: `<ag-grid-ng2 #agGrid style="width:100%;height:500px;padding-top: 10px" class="ag-fresh sly" [gridOptions]="gridOptions"
                    [rowData]="rowData"
                    rowSelection="multiple"
                    enableSorting
                    enableFilter
                    suppressRowClickSelection
                    [localeText]="localeText"
                    rowHeight="30"
                    headerHeight="40">
    </ag-grid-ng2>`,
})
export class GoodsComponent {
    private gridOptions: GridOptions;//申明gridOptions配置项
    ngOnInit() {

    }

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.columnDefs = this.createColumnDefs();
    };

    private createColumnDefs() {
        return [
            {headerName: "行", field: "id", width: 45, suppressSorting: true,},
            {headerName: "订单号", field: "orderNum",},
            {headerName: "收货门店", field: "getGoodsStore"},
            {headerName: "收货日期", field: "getGoodsDate"},
            {headerName: "无时间选择", field: "notime"},
            {headerName: "订单来源", field: "orderFrom"},
            {
                headerName: "收货",
                field: "StkIn",
                cellRendererFramework: {
                    component: stkRenderComponent,
                    moduleImports: [CommonModule, Ng2Bs3ModalModule]
                },
            },
            {headerName: "箱数", field: "boxNum"},
            {headerName: "单个金额", field: "singlePay"},
            {headerName: "总额", field: "mustPay"},
            {headerName: "排车路线", field: "busLine"},
            {headerName: "规格", field: "specification",},
            {headerName: "移库箱数", field: "boxCount"},
            {headerName: "库存数量", field: "stockCount"},
            {headerName: "备注", field: "notes"}
        ]
    };

    /**
     * 配置假数据
     */
    private createRowData() {
        return [
            {
                "id": "1",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "2",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "3",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "4",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "5",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "6",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "7",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "8",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "9",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "10",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"
            }
        ];
    }


}


@Component({

    selector: 'StkIn',
    template: `<ag-grid-ng2 #agGrid style="width:100%;height:500px;padding-top: 10px" class="ag-fresh sly" [gridOptions]="gridOptions"
                    [rowData]="rowData"
                    rowSelection="multiple"
                    enableSorting
                    enableFilter
                    suppressRowClickSelection
                    [localeText]="localeText"
                    rowHeight="30"
                    headerHeight="40">
    </ag-grid-ng2>`,
})
export class StkInComponent {
    private gridOptions: GridOptions;//申明gridOptions配置项
    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.columnDefs = this.createColumnDefs();
    };

    private createColumnDefs() {
        return [
            {headerName: "订单号", field: "orderNum",},
            {headerName: "收货门店", field: "getGoodsStore"},
            {headerName: "收货日期", field: "getGoodsDate"},
            {headerName: "无时间选择", field: "notime"},
            {headerName: "订单来源", field: "orderFrom"},
            {headerName: "箱数", field: "boxNum"},
            {headerName: "单个金额", field: "singlePay"},
            {headerName: "总额", field: "mustPay"},
            {headerName: "排车路线", field: "busLine"},
            {headerName: "规格", field: "specification",},
            {headerName: "移库箱数", field: "boxCount"},
            {headerName: "库存数量", field: "stockCount"},
            {headerName: "备注", field: "notes"}
        ]
    };

    /**
     * 配置假数据
     */
    private createRowData() {
        return [
            {
                "id": "1",
                "orderNum": "1",
                "getGoodsStore": "1",
                "getGoodsDate": "1",
                "notime": "1",
                "orderFrom": "1",
                "singlePay": "1",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "2",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "3",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "4",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "5",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "6",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "7",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "8",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "9",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "10",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"
            }
        ];
    }
}

@Component({
    selector: 'Putaway',
    template: `<ag-grid-ng2 #agGrid style="width:100%;height:500px;padding-top: 10px" class="ag-fresh sly" [gridOptions]="gridOptions"
                    [rowData]="rowData"
                    rowSelection="multiple"
                    enableSorting
                    enableFilter
                    suppressRowClickSelection
                    [localeText]="localeText"
                    rowHeight="30"
                    headerHeight="40">
    </ag-grid-ng2>`,
})
export class PutawayComponent {
    private gridOptions: GridOptions;//申明gridOptions配置项

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.columnDefs = this.createColumnDefs();
    };

    private createColumnDefs() {
        return [
            {headerName: "订单号", field: "orderNum",},
            {headerName: "收货门店", field: "getGoodsStore"},
            {headerName: "收货日期", field: "getGoodsDate"},
            {headerName: "无时间选择", field: "notime"},
            {headerName: "订单来源", field: "orderFrom"},
            {headerName: "箱数", field: "boxNum"},
            {headerName: "单个金额", field: "singlePay"},
            {headerName: "总额", field: "mustPay"},
            {headerName: "排车路线", field: "busLine"},
            {headerName: "规格", field: "specification",},
            {headerName: "移库箱数", field: "boxCount"},
            {headerName: "库存数量", field: "stockCount"},
            {headerName: "备注", field: "notes"}
        ]
    };

    /**
     * 配置假数据
     */
    private createRowData() {
        return [
            {
                "id": "1",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "2",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "3",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "4",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "5",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "6",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "7",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "8",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "9",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"

            },
            {
                "id": "10",
                "orderNum": "a1000000000212",
                "getGoodsStore": "006田林路店",
                "getGoodsDate": "2016-04-20 16:30:00",
                "notime": "2016-04-20",
                "orderFrom": "JH001604190015",
                "singlePay": "3",
                "boxNum": "3",
                "mustPay": "9",
                "busLine": "6-默认线路",
                "notes": "ffffff",
                "specification": "1*20",
                "boxCount": "5+0",
                "stockCount": "100"
            }
        ];
    }
}







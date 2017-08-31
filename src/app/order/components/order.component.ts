/**
 * Created by luyongjie on 2016/11/15.
 */
/**
 * Created by luyongjie on 2016/11/14.
 */
import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {GridOptions} from 'ag-grid/main';

@Component({
    templateUrl: './app/order/components/order.component.html'
})
export class OrderComponent implements OnInit {
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
            { headerName: "行", field: "id", width: 45, suppressSorting: true, },
            { headerName: "订单号", field: "orderNum", },
            { headerName: "收货门店", field: "getGoodsStore" },
            { headerName: "收货日期", field: "getGoodsDate" },
            { headerName: "无时间选择", field: "notime" },
            { headerName: "订单来源", field: "orderFrom" },
            { headerName: "箱数", field: "boxNum" },
            { headerName: "单个金额", field: "singlePay"},
            { headerName: "总额", field: "mustPay"},
            { headerName: "排车路线", field: "busLine" },
            { headerName: "规格", field: "specification", },
            { headerName: "移库箱数", field: "boxCount" },
            { headerName: "库存数量", field: "stockCount" },
            { headerName: "备注", field: "notes" }
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
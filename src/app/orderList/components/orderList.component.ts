
/**
 * Created by caikaijie on 2016/11/14.
 */
import { Component,AfterViewInit, ViewContainerRef, ViewChild } from "@angular/core";
import { OnInit } from "@angular/core";
import { GridOptions } from 'ag-grid/main';
import { EditOrderInitData } from '../mockData/editOrderInitData'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgEditorComponent } from 'ag-grid-ng2/main';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgRendererComponent } from 'ag-grid-ng2/main';
import { OrderListService } from '../service/orderList.service'
import { RowData } from '../mockData/rowData'

let agrid;
let isCellClass=[];
let isClickCount=[];
let sumBoxNum=0;
let sumMustPay=0;
let isAllSlected = false;
let globalAgGridData = [];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////订单号列设置///////////////////////////////////////////////////////////////////////

@Component({
  selector: 'orderNum-cell',
  styles: ['>>> .modal-xl { width: 80%!important; }'],
  template:`<div style="width: 200px; height: 100%; top:-3px !important;position: relative">
               <div class="eleInline" style="background: white;height: 25px;">
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
                        <div class="row">
                          <form class="form-horizontal form-horizontal-update col-xs-12 col-sm-12 col-md-12 col-xl-12 col-lg-12 form-height" role="form">
                            <div class="form-group" style="padding:10;font-size:14px">
                                <label class="col-xs-2 col-sm-2 col-md-2 col-xl-2 col-lg-2 control-label" style="padding: 0">来源单号:</label>
                                <div class="col-xs-10 col-sm-10 col-md-10 col-xl-10 col-lg-10" style="position: relative">
                                    <input type="text" class="form-control" placeholder="审核">

                                </div>
                            </div>
                            <div class="form-group" style="padding:10;font-size:14px">
                                <label class="col-xs-2 col-sm-2 col-md-2 col-xl-2 col-lg-2 control-label" style="padding: 0">订单时间:</label>
                                <div class="col-xs-10 col-sm-10 col-md-10 col-xl-10 col-lg-10" style="position: relative">
                                    <input type="text" class="form-control" placeholder="2016-12-12">

                                </div>
                            </div>
                            <div class="form-group" style="padding:10;font-size:14px">
                                <label class="col-xs-2 col-sm-2 col-md-2 col-xl-2 col-lg-2 control-label" style="padding: 0">单号查询:</label>
                                <div class="col-xs-10 col-sm-10 col-md-10 col-xl-10 col-lg-10" style="position: relative">
                                    <input type="text" class="form-control" placeholder="1234567890">

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
                                  <th>货主</th>
                                  <th>租户</th>
                                  <th>备注</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr *ngFor="let data of modalData; let i = index;" (dblclick)="chooseRow(i)" (disabled)="true">
                                    <td>
                                        <span><input type="radio" name="identity" (click)="oneCheck(i)"/></span> <!--ng-change="hasCheckedOrNot(data)" ng-model="data.checked"  (click)="oneCheck(this)">x<input type="radio"  (click)="checkRow(lineInde)"-->
                                    </td>
                                    <td>{{data.billNo}}</td>
                                    <td>{{data.owner}}</td>
                                    <td>{{data.tenantUuid}}</td>
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
class OrderNumEditorComponent implements AgEditorComponent, AfterViewInit ,OnInit {
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
  modalData: any[] = [];
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
  constructor(private orderListService:OrderListService) {

  }
  ngOnInit(): void {
    this.orderListService.getOrderList('po')
        .then(resp => {
          var arr = resp.obj.records;
          console.log("po-list="+JSON.stringify(arr.length));
          for(var i=0;i<arr.length;i++){

            arr[i].whoCreate = arr[i].whoCreate.name +'-'+ arr[i].whoCreate.time +'-' + arr[i].whoCreate.uuid;
            arr[i].whoEdit = arr[i].whoEdit.name + '-' + arr[i].whoEdit.time + '-' + arr[i].whoEdit.uuid;
            arr[i].owner = arr[i].owner.ownerCode + '-' + arr[i].owner.ownerNameC+ '-' + arr[i].owner.ownerNameE+ '-' + arr[i].owner.ownerUuid;
            arr[i].supplier = arr[i].supplier.supplierCode + '-' + arr[i].supplier. supplierNameC+ '-' + arr[i].supplier.supplierNameE+ '-' + arr[i].supplier.supplierUuid;
          }
          this.modalData = arr;
        });

  }

  ngAfterViewInit() {
    this.input.element.nativeElement.focus();
  }

  agInit(params:any):void {
    this.params = params;
     agrid.editRowIndex = params.node.id; //应该需要，由于报错所以先注释掉
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
  onKeyDown(event): void {
  }

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
  template: `<div><i  style="height: 100%;padding: 5px;;color:red;cursor:pointer" class="fa fa-times-circle" aria-hidden="true"></i></div>`
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
   templateUrl: './app/orderList/components/orderList.html'
})
export class OrderListComponent{
    private gridOptions: GridOptions;//申明gridOptions配置项
    showAgGridDragSetting = false;//显示agGrid表格设置
    togglePreArrivalNoticeForm = false;//收起表单
    agGridChineseNameArray =
        ['单号','公司UUID','送货日期:开始日期',
          '失效日期:截止日期','备注','货主代码','货主中文名',
          '货主英文名','货主UUID','状态','供应商代码','供应商中文名',
          '供应商英文名','供应商UUID','租户UUID','订单类型','自定义属性',
          '自定义属性','自定义属性','自定义属性','自定义属性','自定义属性',
          '自定义属性','自定义属性','唯一标识','创建人','最后修改人'
         ];//表格中文字典
    agGridRowDataArray = [];//表格所有行真实数据
    constructor(private orderListService:OrderListService) {
        this.gridOptions = <GridOptions>{};
        //this.gridOptions.rowData = this.getRowData();
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.getRowData();
        agrid = this.gridOptions;

    };
    private getRowData(){
      this.orderListService.getOrderList('po')
          .then(resp => {
            var arr = resp.obj.records;
            console.log("po-list="+JSON.stringify(arr.length));
            for(var i=0;i<arr.length;i++){

              arr[i].whoCreate = arr[i].whoCreate.name +'-'+ arr[i].whoCreate.time +'-' + arr[i].whoCreate.uuid;
              arr[i].whoEdit = arr[i].whoEdit.name + '-' + arr[i].whoEdit.time + '-' + arr[i].whoEdit.uuid;
              arr[i].owner = arr[i].owner.ownerCode + '-' + arr[i].owner.ownerNameC+ '-' + arr[i].owner.ownerNameE+ '-' + arr[i].owner.ownerUuid;
              arr[i].supplier = arr[i].supplier.supplierCode + '-' + arr[i].supplier. supplierNameC+ '-' + arr[i].supplier.supplierNameE+ '-' + arr[i].supplier.supplierUuid;
            }
            console.log("po-list-modify="+JSON.stringify(arr));
            globalAgGridData = arr;
            this.agGridRowDataArray = arr;
            this.gridOptions.api.setRowData(this.agGridRowDataArray);
            //return this.agGridRowDataArray;

          });
    }
    private createColumnDefs() {
        return [
            {
                headerName: "索引",
                checkboxSelection: true,
                width: 50,
                cellStyle: { 'text-align': 'center' },
                headerCellTemplate: function (params: any) {
                var eCell = document.createElement('div');//checked="checked"
                eCell.innerHTML = '<input id="headerInput" name="headerInput" type="checkbox" style="width: 16px;height: 16px;margin-top: 4px"/>';
                eCell.firstChild.addEventListener('click', function () {
                    isAllSlected = !isAllSlected;
                    if (isAllSlected) {
                    document.getElementById('headerInput').setAttribute('checked', 'checked');
                    agrid.api.selectAll();
                    } else {
                    document.getElementById('headerInput').removeAttribute('checked');
                    agrid.api.deselectAll();
                    }
                })
                return eCell;
                },

            },
            {
                headerName: "行",
                field: "id",
                width: 45,
                suppressSorting: true,
                cellStyle: function (params) {
                    return {backgroundColor: '#F5F5F5'}
                }
            },
            {
                headerName: "单号",
                field: "billNo",
                editable: true,
                cellEditorFramework: {
                  component: OrderNumEditorComponent,
                  moduleImports: [ FormsModule, CommonModule,Ng2Bs3ModalModule]
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
            headerName: "公司UUID",
            field: "companyUuid",
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
              headerName: "送货日期:开始日期", field: "expectedArriveDate1",
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
              headerName: "失效日期:截止日期", field: "expectedArriveDate2",
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
              headerName: "货主代码", field: "owner",
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
            headerName: "状态",
            field: "status",
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
            headerName: "供应商代码", field: "supplier",
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
            headerName: "租户UUID",
            field: "tenantUuid",
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
            headerName: "订单类型",
            field: "type",
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
            headerName: "自定义属性",
            field: "userDefine01",
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
            headerName: "自定义属性",
            field: "userDefine02",
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
            headerName: "自定义属性",
            field: "userDefine03",
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
            headerName: "自定义属性",
            field: "userDefine04",
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
            headerName: "自定义属性",
            field: "userDefine05",
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
            headerName: "自定义属性",
            field: "userDefine06",
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
            headerName: "自定义属性",
            field: "userDefine07",
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
            headerName: "自定义属性",
            field: "userDefine08",
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
            headerName: "唯一标识",
            field: "uuid",
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
            headerName: "创建人",
            field: "whoCreate",
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
            headerName: "最后修改人",
            field: "whoEdit",
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
        for (var i = 0; i < isClickCount.length; i++) {
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
  /**
   * 显示列配置
   */
  showAgGridSetting():void{
      this.showAgGridDragSetting = true;

  }
  /**
   * 隐藏列配置
   */
  hideAgGridSetting():void{
       this.showAgGridDragSetting = false;
  }
  /**
   * 隐藏表单
   */
  togglePreArrivalFormFuc():void{
      this.togglePreArrivalNoticeForm = !this.togglePreArrivalNoticeForm;
  }

  /**
   * 审核订单
   */
  checkOrder():void{
    this.orderListService.checkOrders('po','1234','audit')  //po/:uuid/audit
        .then(resp => {

          console.log('审核订单返回='+JSON.stringify(resp));

        });
  }
  /**
   * 关闭订单
   */
  closeOrder():void{
    this.orderListService.closeOrders('po','1234','close')   //po/:uuid/close
        .then(resp => {



        });
  }
  /**
   * 删除订单
   */
  deleteOrder():void{
    this.orderListService.deleteOrders('po','1234')   //po/:uuid
        .then(resp => {



        });
  }
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


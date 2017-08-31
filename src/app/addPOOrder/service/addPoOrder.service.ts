/**
 * Created by luyongjie on 2016/11/28.
 */
import { Injectable }    from '@angular/core';
import { Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { baseUrl } from '../../service/baseUrl';

@Injectable()
export class AddPoOrderService {
    private headers = new Headers({'Content-Type': 'application/json'}); /*,'Access-Control-Request-Method':'PUT'*/

    constructor(private http: Http) { }

    //新增采购订单
    createPoOrder(url: string , newPoData:any): Promise<any> {
        return this.http
            .post(baseUrl+url, JSON.stringify({newPoData: newPoData}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }


    //处理返回报错
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
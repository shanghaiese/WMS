/**
 * Created by luyongjie on 2016/11/28.
 */
import { Injectable }    from '@angular/core';
import { Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { baseUrl } from '../../service/baseUrl';

@Injectable()
export class PreArrivalNoticeService {
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http) { }

    getAsnList(url: string): Promise<any> {
       return  this.http.get(baseUrl+url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    //审核订单
    checkOrders(url: string,uuid:string,audit:string): Promise<any> {
        const url = `${baseUrl}${url}/${uuid}/${audit}`;
        return  this.http.put(url,'',{headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    //关闭订单
    closeOrders(url: string,uuid:string,close:string): Promise<any> {
        return  this.http.put(baseUrl+url+'/'+uuid+'/'+close,'',{headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    //删除订单
    deleteOrders(url: string,uuid:string): Promise<any> {
        return  this.http.delete(baseUrl+url+'/'+uuid,{headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
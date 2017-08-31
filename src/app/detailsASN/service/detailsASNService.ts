/**
 * Created by luyongjie on 2016/11/29.
 */
import { Injectable }    from '@angular/core';
import { Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { baseUrl } from '../../service/baseUrl';

@Injectable()
export class detailsASNService {
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http) { }

    getSpecifiedASN(url: string): Promise<any> {
        console.log(baseUrl+url);
        return  this.http.get(baseUrl+url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    closeASNOrder(url: string): Promise<any> {
        console.log(baseUrl+url);
        return  this.http.put(baseUrl+url,'')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
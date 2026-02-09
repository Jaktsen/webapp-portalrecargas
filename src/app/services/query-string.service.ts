import { GlobalObjectService } from './global-object.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryStringService {

  public paramsStore: {[key: string]: any} = {
    canal: null,
    rec: null,
    admin: null,
    num: null,
    root: null,
    token: null,
    idxp: 0,
    mp: 0
  };

  constructor(private globalObjectService: GlobalObjectService) { }

  extraerQueryStringMultiple(queryStringNames: string[]) {
    for (const val of queryStringNames) {
      this.extraerQueryString(val);
    }
  }

  extraerQueryString(queryStringName: any) {
    const results = new RegExp('[?&]' + queryStringName + '=([^&#]*)').exec(
      this.globalObjectService.getWindowLocationHref()
    );

    if (results == null) {
      this.paramsStore[queryStringName] = null;
    } else {
      this.paramsStore[queryStringName] = decodeURI(results[1]);
    }
    return this.paramsStore[queryStringName];
  }

  getQueryString(queryStringName: any) {
    return this.paramsStore[queryStringName];
  }
}

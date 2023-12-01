import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  listIpa(): Promise<any>{
    return this.http.get('https://unisa-sviluppo.ddns.net:8443/UNISAGatewayRest/rest/fatture/listIpa').toPromise().then(
      res=>res).catch();

  }
}

import { Injectable } from '@angular/core';


import { Observable, throwError } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DataContainer, Container } from './containers';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contacts = [
    {id: 1, name: "Contact 001", description: "Contact 001 des", email: "c001@email.com"},
    {id: 2, name: "Contact 002", description: "Contact 002 des", email: "c002@email.com"},
    {id: 3, name: "Contact 003", description: "Contact 003 des", email: "c003@email.com"},
    {id: 4, name: "Contact 004", description: "Contact 004 des", email: "c004@email.com"}
  ];

	constructor(
		private http: HttpClient,
		private sanitizer: DomSanitizer,
		//public http: HttpInterceptor
	) { }

	setBasic(){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			})
		  };

		return httpOptions;

	}

  // public getContacts():Array<{id, name, description, email}>{
  //   return this.contacts;
  // }
  // public createContact(contact: {id, name, description, email}){
  //   this.contacts.push(contact);
  // }

  public getContainers(): Observable<DataContainer> {
    let api;
    api = '/api/containers/list';

    return this.http.get(api, this.setBasic()).pipe(
      map((response) => response as DataContainer),
      catchError((err) => throwError(err))
    );
  }

  public actionContainers(action, containerId): Observable<Array<Container>> {
    console.log('actionContainers');
    let api;
    api = '/api/containers/'+action+'/'+ containerId;


    return this.http.put(api, this.setBasic()).pipe(
      map((response) => response as Array<Container>),
      catchError((err) => throwError(err))
    );
  }

  
}

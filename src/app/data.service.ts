import { Injectable } from '@angular/core';


import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DataContainer, Container } from './containers';
import { DataImage, Image, ImageRequestAction, ImageRequestContainerCreate } from './images';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  public getContainers(): Observable<DataContainer> {
    let api = '/api/containers/list';
    

    return this.http.get(api, this.setBasic()).pipe(
      map((response) => response as DataContainer),
      catchError((err) => throwError(err))
    );
  }

  public actionContainers(action, containerId): Observable<Array<Container>> {
    console.log('actionContainers');
    let api = '/api/containers/'+action+'/'+ containerId;

    return this.http.put(api, this.setBasic()).pipe(
      map((response) => response as Array<Container>),
      catchError((err) => throwError(err))
    );
  }

  public getImages(): Observable<DataImage> {
    let api = '/api/images/list';

    return this.http.get(api, this.setBasic()).pipe(
      map((response) => response as DataImage),
      catchError((err) => throwError(err))
    );
  }

  public actionImages(action, imageId): Observable<Array<ImageRequestAction>> {
    let api = '/api/images/'+action+'/';
    let imageDataRequest: ImageRequestAction = { 'id' : imageId };

    return this.http.put(api, imageDataRequest, this.setBasic()).pipe(
      map((response) => response as Array<Image>),
      catchError((err) => throwError(err))
    );
  }

  public saveImageContainerCreate(formContainerCreate): Observable<Array<ImageRequestAction>> {
    let api = '/api/images//container/create/';
    //let formContainerCreate: ImageRequestContainerCreate = { 'imageId' : image.id, 'command': commandImageContainerCreate };

    return this.http.post(api, formContainerCreate, this.setBasic()).pipe(
      map((response) => response as Array<Image>),
      catchError((err) => throwError(err))
    );
  }

  
  
}

import { Component, PipeTransform, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataContainer, Container } from '../containers';
import { Alert } from '../utils'


function search(text: string, pipe: PipeTransform): Container[] {
  return this.containers.filter(container => {
    const term = 'cmky';
    return container.name.toLowerCase().includes(term);
  });
}



@Component({
  selector: 'app-containers-list',
  templateUrl: './containers-list.component.html',
  styleUrls: ['./containers-list.component.scss'],
  providers: [DecimalPipe]
})
export class ContainersListComponent implements OnInit {

  containers: Container;

  alerts: Alert[] = []
  selectedContainer;
  constructor(public dataService: DataService) { }

  ngOnInit() {
      this.listContainers();
  }

  public listContainers(){
      this.alerts = [];
      this.dataService.getContainers()
      .subscribe(
        (response) => {
          this.containers = response.data;
        }, 
        e => { 
          this.showError('Error list containers') 
        }
      );
  }


  public actionContainer(action, containerId, containerName){
  this.dataService.actionContainers(action, containerId)
      .subscribe(
        (response) => {
          this.listContainers();
        }, 
        e => { 
          this.showError('Error '+action+' container '+ containerName) 
        }
      );
  }

  public showError(msgError){
    this.alerts.push({
      type: 'danger',
      message: msgError,
    })
  }

  public close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }


}

export class NgbdTableFiltering {

  containers$: Observable<Container[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.containers$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }
}
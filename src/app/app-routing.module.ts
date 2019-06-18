import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersListComponent } from './containers-list/containers-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'containers/list', component: ContainersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

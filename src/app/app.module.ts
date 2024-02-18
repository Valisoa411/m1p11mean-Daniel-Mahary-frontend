import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from 'primeng/dragdrop';

import { clientRoutes } from './routes/clientRoutes';
import { employeRoutes } from './routes/employeRoutes';
import { managerRoutes } from './routes/managerRoutes';

import { SignUpComponent } from './client/sign-up/sign-up.component';
import { LinksListComponent } from './util/links-list/links-list.component';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { ServiceComponent } from './manager/service/service.component';
import { ServiceFormComponent } from './manager/service/service-form/service-form.component';
import { ServiceListComponent } from './manager/service/service-list/service-list.component';
import { RendezVousComponent } from './client/rendez-vous/rendez-vous.component';
import { HoraireComponent } from './employe/horaire/horaire.component';
import { HoraireFormComponent } from './employe/horaire/horaire-form/horaire-form.component';

const routes: Routes = [
  { path: '', component: LinksListComponent },

  ...clientRoutes,
  ...managerRoutes,
  ...employeRoutes,

];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LinksListComponent,
    ManagerLoginComponent,
    ServiceComponent,
    ServiceFormComponent,
    ServiceListComponent,
    RendezVousComponent,
    HoraireComponent,
    HoraireFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Ajoutez le module de routage à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

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
import { InscriptionloadComponent } from './client/inscriptionload/inscriptionload.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { LoginComponent } from './client/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListEmployeComponent } from './manager/list-employe/list-employe.component';
import { CreateEmployeComponent } from './manager/create-employe/create-employe.component';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { ServiceComponent } from './manager/service/service.component';
import { ServiceFormComponent } from './manager/service/service-form/service-form.component';
import { HoraireComponent } from './employe/horaire/horaire.component';
import { HoraireFormComponent } from './employe/horaire/horaire-form/horaire-form.component';
import { SigninComponent } from './employe/signin/signin.component';
import { AccueilEmployeComponent } from './employe/accueil-employe/accueil-employe.component';
import { ProfilComponent } from './employe/profil/profil.component';
import { RendezVousComponent } from './client/rendez-vous/rendez-vous.component';
import { WaitingPageComponent } from './client/waiting-page/waiting-page.component';
import { OffreSpecialComponent } from './manager/offre-special/offre-special.component';
import { OffreSpecialFormComponent } from './manager/offre-special/offre-special-form/offre-special-form.component';
import { SidebarComponent } from './manager/list-employe/sidebar/sidebar.component';
import { SettingPanelComponent } from './manager/list-employe/setting-panel/setting-panel.component';
import { FooterComponent } from './manager/list-employe/footer/footer.component';
import { ListeRdvComponent } from './employe/liste-rdv/liste-rdv.component';
import { SuivitacheComponent } from './employe/suivitache/suivitache.component';
import { ListerdvComponent } from './client/listerdv/listerdv.component';
import { ListerdvemployeComponent } from './manager/listerdvemploye/listerdvemploye.component';
import { MoyenneComponent } from './manager/list-employe/moyenne/moyenne.component';
import { FicheEmployeComponent } from './manager/fiche-employe/fiche-employe.component';
import { NombrereservationComponent } from './manager/nombrereservation/nombrereservation.component';
import { ChiffreaffaireComponent } from './manager/chiffreaffaire/chiffreaffaire.component';
import { CreatedepenseComponent } from './manager/createdepense/createdepense.component';
import { DepenseComponent } from './manager/depense/depense.component';
import { ListedepenseComponent } from './manager/listedepense/listedepense.component';
import { BeneficeComponent } from './manager/benefice/benefice.component';
import { FicheComponent } from './manager/fiche/fiche.component';
import { ClientListEmployeComponent } from './client/client-list-employe/client-list-employe.component';
import { ClientNavbarComponent } from './client/client-navbar/client-navbar.component';

const routes: Routes = [
  // { path: '/list', component: LinksListComponent },

  ...clientRoutes,
  ...managerRoutes,
  ...employeRoutes,

];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LinksListComponent,
    InscriptionloadComponent,
    AccueilComponent,
    LoginComponent,
    ListEmployeComponent,
    CreateEmployeComponent,
    ManagerLoginComponent,
    ServiceComponent,
    ServiceFormComponent,
    RendezVousComponent,
    HoraireComponent,
    HoraireFormComponent,
    SigninComponent,
    AccueilEmployeComponent,
    ProfilComponent,
    WaitingPageComponent,
    OffreSpecialComponent,
    OffreSpecialFormComponent,
    SidebarComponent,
    SettingPanelComponent,
    FooterComponent,
    ListeRdvComponent,
    SuivitacheComponent,
    ListerdvComponent,
    ListerdvemployeComponent,
    MoyenneComponent,
    FicheEmployeComponent,
    NombrereservationComponent,
    ChiffreaffaireComponent,
    CreatedepenseComponent,
    DepenseComponent,
    ListedepenseComponent,
    BeneficeComponent,
    FicheComponent,
    ClientListEmployeComponent,
    ClientNavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Ajoutez le module de routage à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

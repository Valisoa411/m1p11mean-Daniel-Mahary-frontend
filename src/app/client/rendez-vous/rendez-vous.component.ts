import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RendezVousApi } from 'src/app/api/rendezVous.api';
import { ServiceApi } from 'src/app/api/service.api';
import { Employe } from 'src/app/model/employe.model';
import { RendezVous } from 'src/app/model/rendezVous.model';
import { Service } from 'src/app/model/service.model';
import { jourSemaine } from 'src/app/util/data';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {
  rendezVous: RendezVous = new RendezVous();
  date: string = '';
  heure: string = '';

  services: Service[] = [];
  availabilities: any[] = [];
  jourSemaine: string[] = jourSemaine;

  availableEmployes: Employe[] = [];
  draggedEmploye: Employe | undefined | null;

  inputErrors: any = {};
  message: string = '';
  success: boolean = false;

  constructor(
    private rendezVousApi: RendezVousApi,
    private serviceApi: ServiceApi
  ) {
    this.loadServices();
  }

  ngOnInit(): void {

  }

  test() {
    console.log("test: ", this.availabilities);
  }

  onServiceChange(index: number) {
    this.rendezVous.service = this.services[index];
    this.rendezVous.prixFinal = this.services[index].prix;
  }

  onDateChange(newDate: string) {
    this.date = newDate;
    if (this.rendezVous.service?._id) {
      this.serviceApi.getAvailability(this.rendezVous.service._id, newDate).subscribe((data) => {
        this.availabilities = data.availabilities;
        if (this.availabilities.length === 0) {
          this.inputErrors = {
            ...this.inputErrors,
            date: "Pas de disponibilité"
          }
        } else {
          this.inputErrors = {
            ...this.inputErrors,
            date: null,
          }
        }
      })
    }
  }

  onHeureChange(newHeure: string) {
    this.heure = newHeure;
    this.rendezVous.date = `${this.date}T${this.heure}`;
    if (this.rendezVous.service?._id) {
      this.serviceApi.getEmployeAvailable(this.rendezVous.service._id, `${this.date}T${this.heure}`).subscribe((data) => {
        this.availableEmployes = data.employees;
      })
    }
  }

  loadServices(): void {
    this.serviceApi.allServices().subscribe((data) => {
      this.services = data.services;
    })
  }

  takeRendezVous(form: NgForm): void {
    this.rendezVousApi.addRendezVous(this.rendezVous).subscribe({
      next: (data) => {
        this.success = true;
        this.message = data.message;
      },
      error: (error) => {
        this.success = false;
        this.message = error.error.message;
      }
    })
  }





  //CODE FOR DRAG AND DROP START-----------------
  dragStart(employe: Employe) {
    this.draggedEmploye = employe;
  }

  drop() {
    if (this.draggedEmploye) {
      this.rendezVous.employes = this.rendezVous.employes || [];
      let draggedProductIndex = this.findIndex(this.draggedEmploye);
      this.rendezVous.employes = [...this.rendezVous.employes, this.draggedEmploye];
      this.availableEmployes = this.availableEmployes?.filter((val, i) => i != draggedProductIndex);
      this.draggedEmploye = null;
    }
  }

  dragEnd() {
    this.draggedEmploye = null;
  }

  findIndex(employe: Employe) {
    let index = -1;
    for (let i = 0; i < (this.availableEmployes as Employe[]).length; i++) {
      if (employe._id === (this.availableEmployes as Employe[])[i]._id) {
        index = i;
        break;
      }
    }
    return index;
  }
  //CODE FOR DRAG AND DROP END-------------------

}

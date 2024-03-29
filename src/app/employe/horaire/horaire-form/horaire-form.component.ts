import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HoraireApi } from 'src/app/api/horaire.api';
import { Horaire } from 'src/app/model/horaire.model';
import { jourSemaine } from 'src/app/util/data';

@Component({
  selector: 'app-horaire-form',
  templateUrl: './horaire-form.component.html',
  styleUrls: ['./horaire-form.component.css']
})
export class HoraireFormComponent implements OnInit, OnChanges {
  @Input() selectedHoraire?: Horaire;
  @Input() isUpdate?: boolean;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onInsert: EventEmitter<Horaire> = new EventEmitter<Horaire>();
  @Output() onUpdate: EventEmitter<Horaire> = new EventEmitter<Horaire>();

  requiredInput: string[] = [
    'jour',
    'debut',
    'fin',
  ]
  jourSemaine: string[] = jourSemaine;
  horaire: Horaire = new Horaire();
  inputErrors: any = {};
  success: boolean = false;
  message: string = "";

  constructor(
    private horaireApi: HoraireApi
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedHoraire && this.isUpdate) {
      this.horaire = {
        ...this.selectedHoraire,
      };
    } else {
      this.horaire = new Horaire();
    }
  }

  ngOnInit(): void {
    if (this.selectedHoraire && this.isUpdate) {
      this.horaire = {
        ...this.selectedHoraire,
      };
    } else {
      this.horaire = new Horaire();
    }
  }

  emitCancel() {
    this.onCancel.emit();
  }

  test(){
    console.log("test: ", this.selectedHoraire);
    console.log("test: ", this.horaire);

  }

  isHoraireValid(form: NgForm) {
    this.requiredInput.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.inputErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.inputErrors[key] = null;
      }
    })
  }

  isErrorExisting(): boolean {
    return Object.keys(this.inputErrors).some(key => {
      return !!this.inputErrors[key];
    })
  }

  errorKeys(){
    return Object.keys(this.inputErrors);
  }

  addHoraire(form: NgForm) {
    console.log("addHoraire");
    this.isHoraireValid(form);
    if(!this.isErrorExisting()) {
      this.horaireApi.addHoraire(this.horaire).subscribe({
        next: (data) => {
          this.horaire._id = data.idHoraire;
          this.onInsert.emit(this.horaire);
          this.success = true;
          this.message = data.message;
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        }
      })
    }
  }

  updateHoraire(form: NgForm) {
    console.log("updateHoraire");
    this.isHoraireValid(form);
    if(!this.isErrorExisting()) {
      this.horaireApi.updateHoraire(this.horaire).subscribe({
        next: (data) => {
          this.onUpdate.emit(this.horaire);
          this.success = true;
          this.message = data.message;
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        }
      })
    }
  }
}

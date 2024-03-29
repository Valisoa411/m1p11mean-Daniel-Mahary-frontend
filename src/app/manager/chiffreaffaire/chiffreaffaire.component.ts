import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Chart, registerables } from 'chart.js';

// Enregistrez les modules nécessaires (y compris le contrôleur de bar)
Chart.register(...registerables);

@Component({
  selector: 'app-chiffreaffaire',
  templateUrl: './chiffreaffaire.component.html',
  styleUrls: ['./chiffreaffaire.component.css']
})
export class ChiffreaffaireComponent {
  rendezVousData: any[] = [];
  chartByDay!: Chart;
  chartByMonth!: Chart;
  currentYear: number;
  selectedYearByMonth: number;
  selectedYearByDate: number;
  selectedMonth: number;

  constructor(private managerApi: ManagerApi, private route: Router) {
    this.currentYear = new Date().getFullYear();
    this.selectedYearByMonth = this.currentYear;
    this.selectedYearByDate = this.currentYear;
    this.selectedMonth = 1; // Valeur par défaut, par exemple, janvier
  }

  ngOnInit(): void {
    this.loadMonth();
    this.loadDate(); // Remplacez 2024 par l'année que vous souhaitez
  }

  ngOnDestroy(): void {
    // Détruire les graphiques lors de la destruction du composant
    if (this.chartByMonth) {
      this.chartByMonth.destroy();
    }
    if (this.chartByDay) {
      this.chartByDay.destroy();
    }
  }
  loadMonth(): void {
    // Détruire le graphique existant avant d'en créer un nouveau
    if (this.chartByMonth) {
      this.chartByMonth.destroy();
    }
  
    // Créer une liste complète des mois de l'année
    const allMonths = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const formattedMonth = month < 10 ? `0${month}` : month;
      return `${this.selectedYearByMonth}-${formattedMonth}`;
    });
  
    this.managerApi
      .byMonthChiffreAffaire(this.selectedYearByMonth)
      .subscribe(
        (data: any[]) => {
          const monthDataMap: { [key: string]: number } = {};
          data.forEach(entry => {
            monthDataMap[entry._id] = entry.chiffreAffaire;
          });
  
          // Remplir les mois manquants avec un chiffre d'affaires de 0
          allMonths.forEach(month => {
            monthDataMap[month] = monthDataMap[month] || 0;
          });
  
          // Trier les données par mois
          const sortedData = Object.entries(monthDataMap).sort((a, b) => a[0].localeCompare(b[0]));
  
          // Extraire les labels et les données triées
          const labels = sortedData.map(entry => this.getMonthName(entry[0]));
          const counts = sortedData.map(entry => entry[1]);
  
          this.chartByMonth = new Chart('chartByMonth', {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Chiffre d\'affaires par Mois',
                  data: counts,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  type: 'linear', // Assurez-vous que le type d'échelle est correct
                  beginAtZero: true,
                },
              },
            },
          });
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }
  loadDate(): void {
    // Détruire le graphique existant avant d'en créer un nouveau
    if (this.chartByDay) {
      this.chartByDay.destroy();
    }
  
    // Créer une liste complète des jours du mois avec format yyyy-mm-dd
    const daysInMonth = new Date(this.selectedYearByDate, this.selectedMonth, 0).getDate();
    const formattedMonth = this.selectedMonth < 10 ? `0${this.selectedMonth}` : this.selectedMonth;
    const allDays = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const formattedDay = day < 10 ? `0${day}` : day;
      return `${this.selectedYearByDate}-${formattedMonth}-${formattedDay}`;
    });
  
    this.managerApi
      .byDateChiffreAffaire(this.selectedYearByDate, this.selectedMonth)
      .subscribe(
        (data: any[]) => {
          console.log(data);
  
          // Créer un objet pour stocker les chiffres d'affaires par jour
          const caByDay: { [key: string]: number } = {};
          data.forEach(entry => {
            caByDay[entry._id] = entry.chiffreAffaire;
          });
  
          // Remplir les jours manquants avec un chiffre d'affaires de 0
          allDays.forEach(day => {
            caByDay[day] = caByDay[day] || 0;
          });
  
          // Extraire les labels et les données triées
          const sortedData = allDays.map(day => caByDay[day]);
  
          this.chartByDay = new Chart('chartByDay', {
            type: 'bar',
            data: {
              labels: allDays,
              datasets: [
                {
                  label: "Chiffre d'affaires par jour",
                  data: sortedData,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  type: 'linear', // Assurez-vous que le type d'échelle est correct
                  beginAtZero: true,
                },
              },
            },
          });
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }
  
  
  

  onYearByMonthChange(): void {
    this.loadMonth();
  }

  onYearByDateChange(): void {
    this.loadDate();
  }

  onMonthChange(): void {
    this.loadDate();
  }

  getMonthName(monthString: string): string {
    const [year, month] = monthString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return `${monthNames[monthIndex]} ${year}`;
  }

  logout(): void {
    this.managerApi.logout();
    this.route.navigate(['manager/login']);
  }
}

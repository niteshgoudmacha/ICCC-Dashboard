import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // line chart
  message: string;
  isUserExists: boolean;
  Contest = [];
  Rank = [];
  Score = [];
  ProblemsSolved = [];
  Percentage = [];
  ScoreLinechart = [];
  NoOfProblemsSolvedLinechart = [];
  PercentageLinechart = [];
  PieChart = [];
  profile: any;
  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  isLoading: boolean = false;
  // --- line chart ---
  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
                this.isUserExists = false;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe( params => {
      this.dataService.getProfile(params.handle).subscribe((profile) => {
        this.isLoading = false;
        this.message = '';
        console.log(profile);
        this.profile = profile['user'];
        this.generateRanksGraph();
      },
      (err) => {
        this.isLoading = false;
        this.message = 'Error: ' + err.error.message;
        console.log(err.error.message);
        this.isUserExists = true;
      });
    });
  }

  generateRanksGraph() {
      let completelySolved = 0;
      let partiallySolved = 0;
      let unsolved = 0;
      this.profile.contestsList.forEach(element => {
        console.log(element);
        this.Contest.push(element.contestName);
        this.Rank.push(element.Rank);
        this.Score.push(element.score);
        this.Percentage.push(element.percentage);
        let problemsSolved = 0;
        element.problemsList.forEach(problem => {
          if (problem.score !== 0) {
            problemsSolved++;
          }
          if (problem.score === problem.maxScore) {
            completelySolved++;
          } else if (problem.score !== 0) {
            partiallySolved++;
          } else {
            unsolved++;
          }
        });
        this.ProblemsSolved.push(problemsSolved);
      });

      setTimeout(() => {
        this.chart = new Chart(this.myPieChart.nativeElement, {
          type: 'pie',
          data: {
              labels: [
                'Completely Solved',
                'Partially Solved',
                'UnSolved'
              ],
              datasets: [
                  {
                      data: [completelySolved, partiallySolved, unsolved],
                      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
                      borderColor: '#3cba9f',
                  },
              ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
          }
        });

        // this.PieChart = new Chart('pieChart', {
        //   type: 'pie',
        //   data: {
        //     labels: [
        //       'Completely Solved',
        //       'Partially Solved',
        //       'UnSolved'
        //     ],
        //     dataSets: [
        //       {
        //         data: [10, 20, 30],
        //         borderColor: '#3cba9f',
        //         // label: 'Points',
        //         backgroundColor: ['#e67e22', '#16a085', '#2980b9'],
        //         fill: true
        //       }
        //    ]
        //   }
        // });
      }, 500);

      this.ScoreLinechart = new Chart('score', {
        type: 'line',
        data: {
          labels: this.Contest,
          datasets: [
            {
              data: this.Score,
              borderColor: '#3cb371',
              backgroundColor: '#C9E0CA',
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Score Of Each Contest'
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              // stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Contests',
                fontSize: 14,
                fontColor: 'black'
              }
            }],
            yAxes: [{
              // stacked: true,
              display: true,
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Scores',
                fontSize: 14,
                fontColor: 'black'
              },
            }],
          }
        }
      });

      this.PercentageLinechart = new Chart('percentage', {
        type: 'line',
        data: {
          labels: this.Contest,
          datasets: [
            {
              data: this.Percentage,
              borderColor: '#3cb371',
              backgroundColor: '#C9E0CA',
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Percentage Of Each Contest'
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              // stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Contests'
              }
            }],
            yAxes: [{
              // stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Percentage'
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: (value, index, values) => {
                    return value + '%';
                },
                beginAtZero: true
              }
            }],
          }
        }
      });

      this.NoOfProblemsSolvedLinechart = new Chart('noOfProblemsSolved', {
        type: 'line',
        data: {
          labels: this.Contest,
          datasets: [
            {
              data: this.ProblemsSolved,
              borderColor: '#3cb371',
              backgroundColor: '#C9E0CA',
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Problems Solved In Each Contest'
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              // stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Contests'
              }
            }],
            yAxes: [{
              // stacked: true,
              display: true,
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'No Of Problems Solved'
              }
            }],
          }
        }
      });
    // line chart
  }

}

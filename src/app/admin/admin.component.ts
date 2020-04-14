import {
  Component,
  OnInit
} from '@angular/core';
import * as XLSX from 'xlsx';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  DataService
} from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  uploadForm: FormGroup;
  successMessage: string;
  dataString;
  contestName: string;
  problemsList: any;
  testLink: string;
  isLoading: boolean = true;
  ngOnInit(): void {}

  constructor(private dataService: DataService) {
    this.problemsList = [{
        name: '',
        score: ''
      },
      {
        name: '',
        score: ''
      },
      {
        name: '',
        score: ''
      },
      {
        name: '',
        score: ''
      },
      {
        name: '',
        score: ''
      }
    ];
  }


  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {
        type: 'binary'
      });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataString = [];
      for (const i in jsonData) {
        if (!!jsonData[i] && typeof (jsonData[i]) === 'object') {
          for (const j in jsonData[i]) {
            if (j) {
              let user = {};
              let problem = {};
              user['rank'] = Number(j) + 1;
              user['contestName'] = this.contestName;
              user['testLink'] = this.testLink;
              user['problemsList'] = [];
              for (const o in jsonData[i][j]) {
                if (o === 'Name') {
                  user['fullName'] = jsonData[i][j][o];
                } else if (o === 'Email') {
                  user['email'] = jsonData[i][j][o];
                } else if (o === 'Started at') {
                  user['startedAt'] = jsonData[i][j][o];
                } else if (o === 'Time taken') {
                  user['timeTaken'] = jsonData[i][j][o];
                } else if (o === 'Total score (500)') {
                  user['score'] = jsonData[i][j][o];
                  user['maxScore'] = 500;
                } else if (o === 'Total percentage (100%)') {
                  user['percentage'] = jsonData[i][j][o];
                } else if (o === 'Effective Time taken') {
                  user['effectiveTimeTaken'] = jsonData[i][j][o];
                } else if (o === 'Profile URL') {
                  user['profileUrl'] = jsonData[i][j][o];
                } else {
                  for (const p in this.problemsList) {
                    if (o === this.problemsList[p].name + ' (' + this.problemsList[p].score + ')') {
                      let problem = {};
                      problem['name'] = this.problemsList[p].name;
                      problem['score'] = jsonData[i][j][o];
                      problem['maxScore'] = this.problemsList[p].score;
                      user['problemsList'].push(problem);
                      break;
                    }
                  }
                }
              }
              this.dataString.push(user);
            }
          }
        }
      }
      console.log(this.dataString);
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat('...');
      // this.setDownload(dataString);
    };
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      el.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute('download', 'xlsxtojson.json');
    }, 1000);
  }


  upload() {
    this.isLoading = true;
    this.dataService.uploadData(this.dataString).subscribe((res) => {
      this.isLoading = false;
      this.successMessage = 'Updated Successfully';
      console.log(res);
    }, (err) => {
      this.isLoading = false;
      this.successMessage = err.error.message;
      console.log(err);
    });
  }
}

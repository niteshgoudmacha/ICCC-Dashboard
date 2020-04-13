import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

export interface UserData {
  Name: string;
  Hackerearth_Handle: string;
  Hackerearth_Url: string;
  Profile_Link: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  handle: any;
  displayedColumns: string[] = ['Name', 'Hackerearth_Handle', 'Profile_Link'];
  dataSource: MatTableDataSource<UserData>;
  users;
  isLoading: boolean = false;
  message: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {
        this.route.params.subscribe( params => console.log(params.term));
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.getUsers().subscribe(users => {
      // setTimeout(() => this.isLoading = false, 4000);
      this.isLoading = false;
      this.message = '';
      this.users = users;
      console.log(users);
      const ds = [];
      const c = 1;
      const prevR = -1;
      this.users.forEach(element => {
          ds.push({
            Name: element.fullName,
            Hackerearth_Handle: element.profileUrl.split('@')[1],
            Hackerearth_Url: element.profileUrl,
            Profile_Link: '/profile/' + element.handle
          });
        // if (prevR !== element.Rating) {
        //   c++;
        //   prevR = element.Rating;
        // }
      });
      this.dataSource = new MatTableDataSource(ds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (err) => {
      console.log(err);
      this.isLoading = false;
      this.message = 'Error :  + err.error.message;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

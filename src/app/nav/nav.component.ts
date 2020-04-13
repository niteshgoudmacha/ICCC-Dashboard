import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }
}

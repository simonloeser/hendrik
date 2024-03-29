import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hendrik-frontend';
  constructor(private router: Router) {

  }

  goToPage(this: any, pageName:string) {
    this.router.navigate([`${pageName}`]);
  }
}

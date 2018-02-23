import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  admin: boolean = false;

  constructor(
      private router: Router
  ) {
      router.events.subscribe((val) => {
        console.log(this.router.url);
          this.admin = this.router.url.indexOf('admin') > -1;
      });
  }
}

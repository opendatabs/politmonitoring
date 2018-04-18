import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  admin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
      router.events.subscribe(() => {
          if (this.router.url.indexOf('admin') > -1) {
            this.authService.requestLogin().subscribe(
              event => {
                if (event) {
                  this.admin = event;
                  this.authService.changeAdminState(this.admin);
                }
              },
              error => console.log(error));
          }
      });
  //   this.route.url.subscribe(
  //     (url) => {
  //       if (url.length >= 1)
  //         if (url[url.length - 1].path === 'admin')
  //           this.authService.requestLogin().subscribe(
  //             event => {this.admin = event
  //             console.log('triggered')},
  //             error => console.log(error)
  //           );
  //     });
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  admin: boolean;
  @ViewChild('content', { static: false }) content: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    // Listen for reroutes to authentication
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
    }
}

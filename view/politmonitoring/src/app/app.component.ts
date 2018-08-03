import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  admin: boolean;
  @ViewChild('content') content: ElementRef;
  firstDisplay: boolean = true;


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal
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
    }
    ngAfterViewInit(): void {
      if (this.firstDisplay && !this.admin) {
        // do this async (not in same digest). Otherwise it will throw expressionChangedAfterItHasBeenCheckedError
        setTimeout(()=> {
          this.modalService.open(this.content, {size: 'lg'});
          this.firstDisplay = false;
        }, 0);
      }
    }
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

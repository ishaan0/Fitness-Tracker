import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs' ;
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false ;
  authSubscription: Subscription ;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus ;
    }) ;
  }

  onSidenavToogle(){
    this.sidenavToggle.emit() ;
  }

  onLogout(){
    this.onSidenavToogle() ;
    this.authService.logOut() ;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe() ;
  }

}

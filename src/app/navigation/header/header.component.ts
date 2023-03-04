import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  screenWidth!: Number;
  isLargeScreen: boolean = false;
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    if (this.screenWidth > 599) {
      this.isLargeScreen = true;
    }

    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  onSidenavToogle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

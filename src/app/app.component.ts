import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  screenWidth!: Number;
  isLargeScreen: boolean = false;

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
    this.authService.initAuthListener();
  }
}

import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isAuth()){
      return true ;
    }
    else{
      this.router.navigate(['/login']) ;
      return false ;
    }
  }

  canLoad(route: Route){
    if(this.authService.isAuth()){
      return true ;
    }
    else{
      this.router.navigate(['/login']) ;
      return false ;
    }
  }
}

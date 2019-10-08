import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate  {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(!this.authService.currentUser)
    {
      this.router.navigate(['/login'])
      return false;
    }
    if(this.authService.currentUser.isSuper) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
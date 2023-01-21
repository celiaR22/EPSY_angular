import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authentificationService: AuthenticationService,
    private router: Router
  ){}

  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      return this.checkLogin(state.url);
    }
  
  private checkLogin(url: string): boolean{
    if (AuthenticationService.isLoggedIn()){
      return true;
    }
    // on conserve le lien demandé
    this.authentificationService.redirectUrl = url;

    // reidrection vers la page de login
    this.router.navigate(['/login']);
    return false;
  }
  
}

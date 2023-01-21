import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AuthentificationResponse{
  status: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl = '/';

  constructor() { }

  static isLoggedIn(){
    // check if there is a saved token and it's still valid
    const token = AuthenticationService.getToken();
    return !!token && !AuthenticationService.isTokenExpired(token);
  }

  static isTokenExpired(token: string){
    // le vrai code 
    // try{
    //  const decodec = jwt_decode(token);
    //  return compileDeclareNgModuleFromMetadata.exp < Date.now() / 1000;
    //  }
    // }catch(err){
    //  return false,
    // }
    // la simulation
    return false;
  }

  static setToken(idToken: string){
    // saves user token to sessionstorage
    sessionStorage.setItem('id_token',idToken);
  }

  static getToken(){
    // retrieves the user token  from  sessionstorage
    return sessionStorage.getItem('id_token');
  }

  static logout(){
    // clear user token and profile data from sessionstorage
    sessionStorage.removeItem('id_token');
  }

  loginWithRole(username,password,role): Observable<AuthentificationResponse>{
    /**le vrai code
     * const url = `${this.authentificationUrl}/login`;
     * const httpOptions= {
     * headers: new HttpHeaders({
     * 'Content-type': 'application/json'
     * })
     * }
     * 
     * return this.httpClient.request<AuthentificationResponse>('POST', url, {
     * body: {
     * username,
     * password,
     * role
     * },
     * header: httpOptions.headers
     * }).pipe(
     *  tap((data: AuthentificationResponse)
     *    => AuthentificationService.setToken(data.token))
     * // setting the token in sessionstorage)
     * );
     */
    // la simulation
    const response: AuthentificationResponse = { status: true, message: 'HTTP 200', token:'atoken'};
    AuthenticationService.setToken('token');
    return of(response);
  }
}

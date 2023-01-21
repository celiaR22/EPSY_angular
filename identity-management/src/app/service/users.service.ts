import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { UserLdap } from '../models/user-ldap';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'// disponible a la racine
})

export class UsersService {

  users: UserLdap[]= LDAP_USERS;
  private usersUrl ='';
  private httpOptions = new HttpHeaders({'Content-type': 'application/json'});
  
  constructor(private http: HttpClient) {
    this.usersUrl = environment.usersApiUrl;
   }

  addUser(user: UserLdap): Observable<UserLdap>{
    return this.http.post<UserLdap>(this.usersUrl, user,{ headers : this.httpOptions});
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap>{
    return this.http.put<UserLdap>(this.usersUrl + '/' + userToUpdate.id, userToUpdate, {headers: this.httpOptions})
  }


  getUsers(): Observable<UserLdap[]>{
    return this.http.get<UserLdap[]>(this.usersUrl);
    //methode get accepte un template : userLdap
    //necessite uniquement une url
  }

  /// prend le login en parametre et va chercher dans le tableau de Users le user 
  //qui a le meme login et retounr le résultats
  getUser(id: number): Observable<UserLdap>{
    return of(this.users.find(user => user.id === id))
    // return this.http.get<UserLdap>( this.usersUrl + '/' + id)
  }

  deleteUser(id: number): Observable<UserLdap>{
    return this.http.delete<UserLdap>(this.usersUrl+ '/' + id, { headers : this.httpOptions})
    // accetpe un template
    // necessite url
    // peut avoir des options
  }

}

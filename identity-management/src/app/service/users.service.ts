import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { UserLdap } from '../models/user-ldap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'// disponible a la racine
})

export class UsersService {

  users: UserLdap[]= LDAP_USERS;

  constructor() { }

  getUsers(): Observable<UserLdap[]>{
    return of(this.users); /// transforme le tableau users en liste observable
  }

  /// prend le login en parametre et va chercher dans le tableau de Users le user 
  //qui a le meme login et retounr le résultats
  getUser(login: string): Observable<UserLdap>{
    return of(this.users.find(user => user.login === login))
  }

}

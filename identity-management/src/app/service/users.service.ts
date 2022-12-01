import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { UserLdap } from '../models/user-ldap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'// disponible a la racine
})

export class UsersService {

  users: UserLdap[]= LDAP_USERS;

  constructor() { }

  addUser(user: UserLdap): Observable<UserLdap>{
    //ajout dans la liste
    this.users.push(user);
    // UsersService.users.push(user);
    return of(user);

  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap>{
    //modif utilisateur
    const user = this.users.find( u => u.login === userToUpdate.login)
    if(user){
      userToUpdate.nom= userToUpdate.nom;
      userToUpdate.prenom= userToUpdate.prenom;
      userToUpdate.nomComplet= userToUpdate.nomComplet;
      userToUpdate.motDePasse= userToUpdate.motDePasse;
      return of(userToUpdate)
    }
    return throwError('utilisateur non trouvé');
  }


  getUsers(): Observable<UserLdap[]>{
    return of(this.users); /// transforme le tableau users en liste observable
  }

  /// prend le login en parametre et va chercher dans le tableau de Users le user 
  //qui a le meme login et retounr le résultats
  getUser(login: string): Observable<UserLdap>{
    return of(this.users.find(user => user.login === login))
  }

}

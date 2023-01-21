import { Injectable } from '@angular/core';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { UserLdap } from '../models/user-ldap';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryUsersService implements InMemoryDbService {
  createDb(){
    const users: UserLdap[] = LDAP_USERS;
    return {users};
  }

  //overrides the genId method to ensure that a user always has an id
  //if the users array is empty
  //the method below returns the initial number (4)
  //if the users array is not empty the method below returns the highest
  //user id+1
  genId(users: UserLdap[]): number{
    return users.length > 0 ? Math.max(...users.map(user => user.id))+1 : 4
  }

  constructor() { }
}

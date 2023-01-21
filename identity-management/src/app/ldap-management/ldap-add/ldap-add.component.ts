import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
import { InMemoryUsersService } from '../../service/in-memory-users.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapAddComponent  extends LdapDetailComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    fb: FormBuilder,
    router: Router,
    private snackBar : MatSnackBar,
    userService: InMemoryUsersService
  ) {
    super(true, fb, router, userService)}

  ngOnInit(): void {
    super.onInit();
  }

  validateForm():void{
    this.processValidateRunning = true;
    this.usersService.addUser(this.getUserFromFormControl()).subscribe(
      data =>{
        this.processValidateRunning = false;
        this.errorMessage ='';
        this.snackBar.open('Utilisateur ajouté !', 'X');
        this.goToLdap();
      },
      error =>{
        this.processValidateRunning = false;
        this.errorMessage = "L'utilisateur n'a pas pu être ajouté";
        this.snackBar.open("Erreur dans l'ajout de l'utilisateur", "X");
      }
    )
  }

}

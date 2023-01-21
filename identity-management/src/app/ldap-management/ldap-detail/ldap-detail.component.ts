import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../service/users.service';
import { UserLdap } from '../../models/user-ldap';
import { FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';
import { InMemoryUsersService } from '../../service/in-memory-users.service';
import { LDAP_USERS } from '../../models/ldap-mock-data';

export abstract class LdapDetailComponent {
  
  users: UserLdap[]= LDAP_USERS;
  passwordPlaceholder: string;
  user: UserLdap;
  processLoadRunning: boolean = false;
  processValidateRunning: boolean = false;
  errorMessage: string = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
    private userService: InMemoryUsersService
  ) {
    this.passwordPlaceholder = 'mot de passe' +( this.addForm ? '' : '(vide si inchange)')
  }

  ///création formulaire formbuilder
  userForm = this.fb.group({
    login: [''], 
    nom: [''],
    prenom: [''],
    // groupe de données imbriquées
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: [''],
    }, {validators: passwordValidator}),
    mail: {value: '', disabled: true},
    employeNumero: [],
    employeNiveau: [],
    dateEmbauche : [''],
    publisherId : [],
    active: false
  })

  protected onInit(): void{
  }

  private formGetValue(name: string): any{
    return this.userForm.get(name).value /// retourne valeur du input 
  }

  goToLdap(): void{
    this.router.navigate(['/users/list']);/// navigation jusqu'a l'user list
  }
  abstract validateForm():void

  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin(): void{
    // on ne fait la mise a jour que lors de l'ajout d'un utilisateur
   if(this.addForm){
    this.userForm.get('login').setValue((this.formGetValue('prenom') 
    + '-'+ this.formGetValue('nom')).toLowerCase());
    this.updateMail();
   }
  }

  updateMail(): void{
     // on ne fait la mise a jour que lors de l'ajout d'un utilisateur
    if(this.addForm){
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@domain.com');
    }
  }

  /// permet d'afficher les proprietes de userldap dans le formulaire
  protected copyUserToFormControl(): void{
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail)
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId);
    this.userForm.get('active').setValue(this.user.active);
  }

  protected getUserFromFormControl(): UserLdap{
    
    return{
      id: this.user === undefined ? this.userService.genId(this.users) :this.user.id  ,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      employeNumero: this.userForm.get('employeNumero').value,
      employeNiveau:this.userForm.get('employeNiveau').value,
      dateEmbauche:this.userForm.get('dateEmbauche').value,
      publisherId: this.userForm.get('publisherId').value,
      active: this.userForm.get('active').value,
      motDePasse: '',
      role:'ROLE_USER',
    }
  }

  isFormValid(): boolean { 
    return this.userForm.valid
  }


}

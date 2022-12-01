import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../service/users.service';
import { UserLdap } from '../models/user-ldap';
import { FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';

// @Component({
//   selector: 'app-ldap-detail',
//   templateUrl: './ldap-detail.component.html',
//   styleUrls: ['./ldap-detail.component.scss']
// })

export abstract class LdapDetailComponent {
  
  passwordPlaceholder: string;
  user: UserLdap;
  processLoadRunning: boolean = false;
  processValidateRunning: boolean = false;
  errorMessage: string = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  protected constructor(
    public addForm: boolean,
    // private route: ActivatedRoute,
    // private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordPlaceholder = 'mot de passe' +( this.addForm ? '' : '(vide si inchange)')
  }

  ///création formulaire formbuilder
  userForm = this.fb.group({
    login: [''], /// valeur de départ vide
    nom: [''],
    prenom: [''],
    // groupe de données imbriquées
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: [''],
    }, {validators: passwordValidator}),
    mail: {value: '', disabled: true},
  })

  protected onInit(): void{
    //permet initialiser le formulaire au cas ou
    // nous n'en avaons pas besoin ici
  }

  // ngOnInit(): void {
  //   this.getUser();
  // }
//////
// m"thode déplacer dans ldapeditcomponent
  // private getUser(): void{
  //   const login = this.route.snapshot.paramMap.get('id');
  //   this.usersService.getUser(login).subscribe(user => {
  //     this.user = user;
  //   });
  // }
//////
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
    // this.userForm('login').setValue(this.user.login);
    // this.userForm('nom').setValue(this.user.nom);
    // this.userForm('prenom').setValue(this.user.prenom);
    // this.userForm('mail').setValue(this.user.mail);
    /**
     il faudra ajouter les champs suivant au formulaire
     this.userForm.get('employeNumero').setValue(this.user.employeNumero);
     this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
     this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
     this.userForm.get('publisherId').setValue(this.user.publisherId);
     this.userForm.get('active').setValue(this.user.active);
     */
  }
  protected getUserFromFormControl(): UserLdap{
    return{
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + '-' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      ///les valeurs suivantes devraient etre reprise du formulaire
      employeNumero: 1,
      employeNiveau:1,
      dateEmbauche:' 2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: 'test',
      role:'ROLE_USER',
    }
  }

  //permet de recup valeur formulaire
  // de retourner un objet userldap avec des valeurs

  isFormValid(): boolean { 
    return this.userForm.valid
    //   && ( !this.addForm || this.formGetValue('passwordGroup.password' !== ''));
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../service/users.service';
import { UserLdap } from '../models/user-ldap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ldap-detail',
  templateUrl: './ldap-detail.component.html',
  styleUrls: ['./ldap-detail.component.scss']
})
export class LdapDetailComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  user: UserLdap;
  processLoadRunning: boolean = false;
  processValidateRunning: boolean = false;

  ///création formulaire formbuilder
  userForm = this.fb.group({
    login: [''], /// valeur de départ vide
    nom: [''],
    prenom: [''],
    // groupe de données imbriquées
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: [''],
    }),
    mail: {value: '', disabled: true},
  })

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void{
    const login = this.route.snapshot.paramMap.get('id');
    this.usersService.getUser(login).subscribe(user => {
      this.user = user;
    });
  }

  private formGetValue(name: string): any{
    return this.userForm.get(name).value /// retourne valeur du input 
  }

  goToLdap(): void{
    this.router.navigate(['/users/list']);/// navigation jusqu'a l'user list
  }

  onSubmitForm(): void {
    // a voir plus tard
  }

  updateLogin(): void{
    this.userForm.get('login').setValue((this.formGetValue('prenom') 
    + '-'+ this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }

  updateMail(): void{
    this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }

  isFormValid(): boolean { return false;}


}

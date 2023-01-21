import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  processRunning: boolean = false;
  private formSubmitAttempt : boolean;

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthenticationService,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /// on vérifie si les champs du form sont valide ou pas
  isFieldInvalid(field: string){
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
      );
  }

  /// validation du formulaire , si tout est bon on redirige l'utilisateur, sinon on affiche une erreur
  onSubmit(){
    if(this.form.valid){
      this.processRunning = true;
      this.authentificationService.loginWithRole(
        this.form.get('userName').value,
        this.form.get('password').value,
        'ROLE_SUPER_ADMIN'
      ).subscribe(()=>{
        if(AuthenticationService.isLoggedIn()){
          this.processRunning = false;
          this.router.navigate([this.authentificationService.redirectUrl]);
        }else{
          throw new Error();
        }
      },
      (error: HttpErrorResponse) => {
        this.processRunning = false;
        this.snackBar.open('Login ou mot de passe invalide','X');
      });
    }
    this.formSubmitAttempt = true;
  }
}

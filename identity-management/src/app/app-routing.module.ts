import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { LdapDetailComponent } from './ldap-detail/ldap-detail.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';
import { LdapAddComponent } from './ldap-add/ldap-add.component';

const routes: Routes = [
  // {path: 'users/list', component: LdapListComponent},
  {path: 'users/dashboard', component: LdapListComponent},
  // {path: 'user/add', component: LdapAddComponent},
  // {path:'user/:id', component:LdapEditComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

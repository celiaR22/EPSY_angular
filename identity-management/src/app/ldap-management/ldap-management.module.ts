import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdapManagementRoutingModule } from './ldap-management-routing.module';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { LdapAddComponent } from './ldap-add/ldap-add.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';
import { AlertComponent } from '../share/alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryUsersService } from '../service/in-memory-users.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    LdapListComponent,
    LdapAddComponent,
    LdapEditComponent,
    AlertComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryUsersService, {dataEncapsulation: false})
  ]
})
export class LdapManagementModule { }

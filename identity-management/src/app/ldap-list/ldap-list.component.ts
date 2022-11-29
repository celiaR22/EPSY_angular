import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserLdap } from '../models/user-ldap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})

export class LdapListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nomComplet','mail','employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);
  unactiveSelected = false;
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;   
    this.getUsers();
  }

  ngAfterViewInit(): void {
  }

  private getUsers(): void{
    this.usersService.getUsers().subscribe(
      users =>{
        if(this.unactiveSelected){
          this.dataSource.data = users.filter( user =>
            user.active === false
          );
        }else{
          this.dataSource.data = users
        }
      }
    )
  }

  unactiveChanged($event: MatSlideToggleChange ): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(login: string){
    this.router.navigate(['/user',login]).then( (e)=>{
      if(! e){
        console.log("navigate has failed");
      }
    });
  }

}

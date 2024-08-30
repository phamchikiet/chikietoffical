import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../users/users.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-homepage',
  standalone:true,
  imports:[MatButtonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private usersService:UsersService,
    private spinner: NgxSpinnerService
  ){}
  items:any[] = [
    {id:1,Title:'resume',alt:'',src:'resume.png',link:'#'},
    {id:1,Title:'ecommerce',alt:'',src:'shopping.png',link:'#'},
    {id:1,Title:'ERP',alt:'',src:'work.png',link:'/erp'},
    {id:1,Title:'entertainment',alt:'entertainment.png',src:'entertainment.png',link:'#'},
  ];
  ngOnInit() {
  }

  logout(){
    this.spinner.show();
    this.usersService.Dangxuat().subscribe((res:any)=>{
      if(res){
        setTimeout(()=>{
          location.reload();
        },500)
      }
    });
  }

}

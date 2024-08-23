import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone:true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  items:any[] = [
    {id:1,Title:'resume',alt:'',src:'resume.png',link:'#'},
    {id:1,Title:'ecommerce',alt:'',src:'shopping.png',link:'#'},
    {id:1,Title:'project',alt:'',src:'work.png',link:'/todos'},
    {id:1,Title:'entertainment',alt:'entertainment.png',src:'',link:'#'},
  ];
  ngOnInit() {
  }

}

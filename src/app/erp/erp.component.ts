import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erp',
  standalone:true,
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.css']
})
export class ErpComponent implements OnInit {

  constructor() { }
  items:any[] = [
    {id:1,Title:'Project Manager',alt:'',src:'projectmanager-icon.png',link:'/quanlyduan'},
    {id:1,Title:'HR Management',alt:'',src:'shopping.png',link:'#'},
    {id:1,Title:'Asset Management',alt:'',src:'resume.png',link:'#'},
    {id:1,Title:'CRM',alt:'entertainment.png',src:'entertainment.png',link:'#'},
  ];
  ngOnInit() {
  }

}

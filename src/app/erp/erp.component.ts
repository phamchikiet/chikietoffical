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
    {id:1,Title:'Quản Lý Dự Án',alt:'',src:'projectmanager-icon.png',link:'/quanlyduan'},
    {id:1,Title:'Quản Lý Nhân Sự',alt:'',src:'shopping.png',link:'#'},
    {id:1,Title:'Quản Lý Tài Sản, Thiết Bị',alt:'',src:'resume.png',link:'#'},
    {id:1,Title:'Quản Lý Quan Hệ Khách hàng',alt:'entertainment.png',src:'entertainment.png',link:'#'},
  ];
  ngOnInit() {
  }

}

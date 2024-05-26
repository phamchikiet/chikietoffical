import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ketoan',
  standalone: true,
  imports: [],
  templateUrl: './ketoan.component.html',
  styleUrl: './ketoan.component.scss'
})
export class KetoanComponent implements OnInit{
  List:any[]=[]
  Detail:any={}
  
  constructor(){}
  ngOnInit(): void {

  }
}

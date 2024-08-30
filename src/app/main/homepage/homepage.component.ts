import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoading = true;

  constructor(
    private usersService: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  items: any[] = [
    {id: 1, Title: 'resume', alt: 'Resume', src: 'resume.png', link: '#'},
    {id: 2, Title: 'ecommerce', alt: 'E-commerce', src: 'shopping.png', link: '#'},
    {id: 3, Title: 'ERP', alt: 'ERP', src: 'work.png', link: '/erp'},
    {id: 4, Title: 'entertainment', alt: 'Entertainment', src: 'entertainment.png', link: '#'},
  ];

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simulate loading for 2 seconds
  }

  logout() {
    this.spinner.show();
    this.usersService.Dangxuat().subscribe((res: any) => {
      if (res) {
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    });
  }

  generateSkeletonArray(): number[] {
    return Array(this.items.length).fill(0).map((_, i) => i);
  }
}

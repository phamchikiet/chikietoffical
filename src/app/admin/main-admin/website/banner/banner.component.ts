import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import Swiper, { Pagination } from 'swiper';

@Component({
  selector: 'app-banner',
  standalone:true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    const swiper = new Swiper('.banner', {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },
      navigation:true,
      slidesPerView:1,
      spaceBetween: 20,
    });
  }
}

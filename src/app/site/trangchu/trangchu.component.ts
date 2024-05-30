import { CUSTOM_ELEMENTS_SCHEMA, Component, ComponentFactoryResolver, Inject, Input, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BannerComponent } from '../../admin/main-admin/website/banner/banner.component';
import { AboutusComponent } from '../../admin/main-admin/website/aboutus/aboutus.component';
import { SanphamnoibatComponent } from '../../admin/main-admin/website/sanphamnoibat/sanphamnoibat.component';
import { DanhgiaComponent } from '../../admin/main-admin/website/danhgia/danhgia.component';
import { PromoComponent } from '../../admin/main-admin/website/promo/promo.component';
import { DownloadappComponent } from '../../admin/main-admin/website/downloadapp/downloadapp.component';
import { SlideSanphamComponent } from '../../admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import  Swiper, { Pagination } from 'swiper';
import { SanphamService } from '../../admin/main-admin/sanpham/sanpham.service';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { SlidesiteComponent } from '../../slide/slidesite/slidesite.component';
import { SlideService } from '../../slide/slide.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-trangchu',
  standalone:true,
  imports:[
    BannerComponent,
    AboutusComponent,
    SanphamnoibatComponent,
    DanhgiaComponent,
    PromoComponent,
    DownloadappComponent,
    SlideSanphamComponent,
    MatButtonModule,
    SlidesiteComponent,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {
  drawerMode:any
  isMobile:boolean=false
  ListsSanpham: any=[]
  Sanphams: any=[]
  Slides: any=[]
  ListSlides: any=[]
  SearchParams: any = {
    pageSize:50,
    pageNumber:0,
    Status:1
  };
  Danhmucs:any=[]
  _SanphamService:SanphamService = inject(SanphamService)
  _DanhmucService:DanhmucService = inject(DanhmucService)
  _SlideService:SlideService = inject(SlideService)
  constructor(
    private _breakpointObserver:BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: object,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  @ViewChild('injectHere', { read: ViewContainerRef }) injectHere!: ViewContainerRef;
  @ViewChild('injectHere1', { read: ViewContainerRef }) injectHere1!: ViewContainerRef;
  async loadSlideComponent(Detail:any,Config:any)
  {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SlidesiteComponent);
    //this.injectHere.clear();
    const componentRef = this.injectHere.createComponent(componentFactory);
    componentRef.instance.Detail = Detail;
    componentRef.instance.Config = Config;
  }
  async loadSlideSanphamComponent(Danhmuc:any,Slug:any,Title:any,Ordering:any)
  {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SlideSanphamComponent);
    //this.injectHere.clear();
    const componentRef = this.injectHere1.createComponent(componentFactory);
    componentRef.instance.Danhmuc = Danhmuc;
    componentRef.instance.Title = Title;
    componentRef.instance.Ordering = Ordering;
  }
  async ngOnInit() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches ? true : false;
    });
    // this.Danhmucs = await this._DanhmucService.getAllDanhmuc()
   // this.Sanphams = await this._SanphamService.getAllSanpham()
    this.Slides = await this._SlideService.getAllSlide()
    //this.ListSlides = (await this._DanhmucService.getAllDanhmuc()).filter((v: any) => v.Type == 'slide' && v.Status == 1);
    this.ListSlides = (await this._DanhmucService.SearchDanhmuc({
      pageSize:50,
      pageNumber:0,
      Type:'slide',
      Status:1
    })).items;
    
    this.ListsSanpham = (await this._DanhmucService.SearchDanhmuc({
      pageSize:50,
      pageNumber:0,
      Type:'sanpham',
      Status:1
    })).items;
    //this.ListsSanpham = (await this._DanhmucService.getAllDanhmuc()).filter((v: any) => v.Type == 'sanpham' && v.Status == 1);
    this.ListsSanpham.forEach(async (v: any) => {
      // v.Sanphams = this.Sanphams.filter((s: any) => s.idDM == v.id)
      v.Sanphams = (await this._SanphamService.SearchSanpham({pageSize:8,
        pageNumber:0,
        idDM:v.id,
        Status:1})).items
    })

    this.ListSlides.forEach((v: any) => {
      v.Slides = this.Slides.filter((s: any) => s.idDM == v.id)
    })   
    // console.log(this.ListSlides);
    this.ListSlides.forEach(async (v:any,k:any) => {
      await this.loadSlideComponent(v,this.GetConfig(v))
    });
    this.ListsSanpham.forEach(async (v:any,k:any) => {
      await this.loadSlideSanphamComponent(v,v.Slug,v.Title,v.Ordering)
    });
    
  }
  GetConfig(Danhmuc:any){
    const Config:any = {}
    Config.modules = [Pagination];
    Config.pagination = {
      el: '.swiper-pagination',
      clickable: true
    };
    Config.loop = true;
    Config.infinity = true;
    Config.navigation = true;
    Config.spaceBetween = 10;
    Config.speed = 5000;
    Config.autoplay = {
      delay: 5000
    };
  
    Config.slidesPerView = Number(Danhmuc?.Config?.default) || 3;
    Config.breakpoints = {
      640: {
        slidesPerView: Number(Danhmuc?.Config?.xs) || 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: Number(Danhmuc?.Config?.md) || 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: Number(Danhmuc?.Config?.lg) || 3,
        spaceBetween: 10,
      },
    };
    return Config
  }
}

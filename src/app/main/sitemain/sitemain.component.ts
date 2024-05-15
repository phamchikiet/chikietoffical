import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomeditorComponent } from '../../shared/customeditor/customeditor.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { isPlatformBrowser } from '@angular/common';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-sitemain',
  standalone: true,
  imports: [
    FormsModule,
    CustomeditorComponent,
    MatSidenavModule,
    MatTreeModule
  ],
  templateUrl: './sitemain.component.html',
  styleUrl: './sitemain.component.scss'
})
export class SitemainComponent {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    console.log('Scrolled:', window.scrollY); // Check for scroll event firing
  }
  isOpen:boolean=false
  DrawerMode:any = 'over'
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver,
  ) {}
  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe((breakpoints: any) => {
      if (breakpoints.matches) {
        this.isOpen = false;
        this.DrawerMode = 'over'
      } else {
        this.DrawerMode = 'side'
        this.isOpen = true;
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      const myDiv: any = document.getElementById('myDivId');
      const verticalScroll = myDiv.scrollTop;
      const horizontalScroll = myDiv.scrollLeft;
      console.log('Vertical scroll:', verticalScroll);
      console.log('Horizontal scroll:', horizontalScroll);
    }
    this.treedataSource.data = [
      {id:4,pid:0,Title:"Bài Viết" ,Slug:"baiviet",
      children:[
        {id:1,pid:4,Title:"Tin Tức" ,Slug:"tintuc"},
        {id:1,pid:4,Title:"Khuyến Mãi" ,Slug:"tintuc"},
      ]
      },
      {id:3,pid:0,Title:"Đơn Hàng" ,Slug:"donhang"},
      {id:4,pid:0,Title:"Xuất Nhập Tồn" ,Slug:"xnt",
      children:[
        {id:1,pid:4,Title:"Xuất Kho" ,Slug:"xuatkho"},
        {id:1,pid:4,Title:"Nhập Kho" ,Slug:"nhapkho"},
        {id:1,pid:4,Title:"Tồn Kho" ,Slug:"tonkho"},
      ]
      }
    ]
  }
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  treedataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;
}

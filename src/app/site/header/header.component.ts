import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, OnInit, TemplateRef, ViewChild, effect, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MainComponent } from '../main/main.component';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { GiohangService } from '../../admin/main-admin/website/giohang/giohang.service';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuItem } from 'primeng/api';
import { UsersService } from '../../admin/users/auth/users.service';
import { LocalStorageService } from '../../shared/localstorage.service';
import { AuthService } from '../../admin/users/auth/auth.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SanphamService } from '../../admin/main-admin/sanpham/sanpham.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SanphamblockComponent } from '../../sanpham/sanphamblock/sanphamblock.component';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    RouterLinkActive,
    MatBadgeModule,
    RouterLink,
    OverlayModule,
    SidebarModule,
    ButtonModule,
    MegaMenuModule,
    InputTextModule,
    MatTreeModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SanphamblockComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  // isOpen:any = false;
  _AppService: AppService = inject(AppService);
  _MainComponent: MainComponent = inject(MainComponent);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  _GiohangService: GiohangService = inject(GiohangService);
  _UsersService: UsersService = inject(UsersService);
  _AuthService: AuthService = inject(AuthService);
  _SanphamService: SanphamService = inject(SanphamService);
  _Router: Router = inject(Router);
  _LocalStorageService: LocalStorageService = inject(LocalStorageService);
  SearchParams: any = {
    Status:1,
    pageSize: 50,
    pageNumber: 0,
    Type:'sanpham',
  };
  darkmode: boolean = false
  Danhmucs: any = {}
  User: any = {}
  Timkiem:any
  Token:any=this._LocalStorageService.getItem('token') ?? null;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
  Menus: any[] = []

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      Slug: node.Slug,
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
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;
  Today:any= new Date()
  Timkiems:any=[]
  constructor(
    private dialog:MatDialog,
    private _snackBar:MatSnackBar,
  ) {
    this._AppService.isDarkTheme$.subscribe((isDarkTheme:any) => {
      document.body.classList.toggle('dark', isDarkTheme);
    });
    this._GiohangService.getDonhang()
    this._GiohangService.donhang$.subscribe((data: any) => {
      this.Soluong = data?.Giohangs?.Sanpham?.reduce((acc: any, item: any) => acc + item.Soluong, 0);
      this.Tongcong = data?.Giohangs?.Sanpham?.reduce((acc: any, item: any) => acc + item.Giachon?.gia * item.Soluong, 0);
    })
    if(this.Token)
    {
      this._UsersService.getProfile()
      this._UsersService.profile$.subscribe((data) => {
        if (data) {
          this.User = data
          // console.log(data);
        }
      })
    }
  }
  Soluong = 0
  Tongcong = 0
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string = '';
  onSelect(option: string) {
    this.selectedOption = option;
  }
  async ngOnInit(): Promise<void> {
    this.Danhmucs = await this._DanhmucService.SearchDanhmuc(this.SearchParams)
    this.Menus =[
    { id: 1, Title: 'Về Chúng Tôi', Slug: 'blog/gioi-thieu/ve-chung-toi' },
    {
      id: 2, Title: 'Sản Phẩm', Slug: 'danh-muc', Show: false,
      children:this.Danhmucs.items
    },
    { id: 3, Title: 'Khuyến Mãi', Slug: 'blog/khuyen-mai' },
    { id: 4, Title: 'Món Ngon', Slug: 'blog/mon-ngon-moi-ngay' },
    { id: 5, Title: 'Tin tức', Slug: 'blog/tin-tuc' },
    // {
    //   id: 3, Title: 'Về chúng tôi ', Slug: 've-chung-toi', Show: false,
    //   children: [
    //     { id: 101, Title: 'Giới Thiệu Chung', Slug: 'gioi-thieu-chung' },
    //     // { id: 102, Title: 'Qui Trình', Slug: 'quy-trinh' },
    //     // { id: 103, Title: 'Hỏi Đáp', Slug: 'hoi-dap' },
    //     // { id: 104, Title: 'Tuyển Dụng', Slug: 'tuyen-dung' },
    //   ]
    // },
    { id: 3, Title: 'Liên hệ', Slug: 'lien-he' },
  ]
  this.dataSource.data = this.Menus;
  }

  toggleTheme() {
    this._AppService.toggleTheme();
  }
  toggleDrawer() {
    this._MainComponent.drawer.toggle()
  }
  onMouseEnter(name: string) {
    console.log("mouse enter", name);
  }
  onMouseOut(name: string) {
    console.log("mouse out", name);
  }
  Dangxuat()
  {
    const result = this._AuthService.Dangxuat()
    if(result){
      window.location.href ='/'
    }
  }
  TimkiemDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {
        this.Timkiems = []
    });
  }
  async DoSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      const Sanpham = await this._SanphamService.SearchSanpham({Query:value,Status:1})
      console.log(Sanpham);
      this.Timkiems = Sanpham.items
    }
    else {
      this.Timkiems = []
    }
  }
  AddtoCart(data:any)
  {
    let item:any={}
    item = data
    item.Giachon = data.Giagoc[0]
    item.Giachon.SLTT = data.Giagoc[0].khoiluong
    item.Soluong=1
    this._GiohangService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }
}

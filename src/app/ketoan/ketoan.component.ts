import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeModule } from '@angular/material/tree';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ketoan',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTreeModule,
    RouterModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './ketoan.component.html',
  styleUrls: ['./ketoan.component.scss']
})
export class KetoanComponent implements OnInit {
  FilterLists: any[] = []
  Menus: any[] = [
    {
      id: 1, Title: 'Hoá Đơn', URL: 'ketoan/hoadon',
      Children: [
        { id: 5, Title: 'Tổng Hợp', URL: 'ketoan/hoadon' },
        { id: 6, Title: 'Hoá Đơn Chi Tiết', URL: 'ketoan/hoadonchitiet' },
      ]
    },
    { id: 1, Title: 'Xuất Nhập Tồn', URL: 'ketoan/xuatnhapton' },
    // { id: 1, Title: 'Khách Hàng', URL: 'khach-hang' },
    // { id: 3, Title: 'Dịch Vụ', URL: 'dich-vu' },
    // {
    //   id: 4, Title: 'Cấu Hình', URL: 'cau-hinh', Children: [
    //     { id: 5, Title: 'Hạng Thành Viên', URL: 'cau-hinh/hang-thanh-vien' },
    //     { id: 6, Title: 'Chi Nhánh', URL: 'cau-hinh/chi-nhanh' },
    //   ]
    // },
  ]
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.Children && node.Children.length > 0,
      Title: node.Title,
      URL: node.URL,
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
    node => node.Children,
  );
  hasChild = (_: number, node: any) => node.expandable;
  dataSource: any
  isOpen: boolean = true
  DrawerMode: any = 'side'
  @ViewChild('drawer') drawer!: MatSidenav;
  constructor(private breakpointObserver: BreakpointObserver) { }
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe((breakpoints: any) => {
        // console.log(breakpoints);
        // console.log(Breakpoints.XSmall);
        // console.log(breakpoints.matches);
        if (breakpoints.matches) {
          this.isOpen = false;
          this.DrawerMode = 'over'
        } else {
          this.DrawerMode = 'side'
          this.isOpen = true;
        }
      });
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.Menus;
  }
  applyFilter(query: any) {

  }

}


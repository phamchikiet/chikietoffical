import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { convertToSlug } from '../../shared/shared.utils';
import { UsersService } from '../../users/users.service';
import { QuanlyduanService } from '../quanlyduan/quanlyduan.service';
import { CategoryService } from '../../category/category.service';
import { ListviewComponent } from './listview/listview.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { filter } from 'rxjs';
@Component({
  selector: 'app-quanlyduan',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    RouterModule,
    RouterLinkActive,
    DetailComponent,
    ListviewComponent,
    MatTreeModule,
    MatListModule
  ],
  templateUrl: './quanlyduan.component.html',
  styleUrls: ['./quanlyduan.component.scss']
})

export class QuanlyduanComponent implements OnInit {

  Detail: any = {location:'main'};
  Task: any = {}
  Lists: any = {}
  isOpen:boolean=true
  FilterLists: any[] = []
  Category: any = {location:'main'};
  Categories: any[] = []
  FilterCategories: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    pageSize: 9999,
    pageNumber: 0,
    isDelete: false,
  };
  sidebarVisible: boolean = false;
  leftsidebar: boolean = false;
  isHaveQuanlyduan: boolean = true;
  drawerMode: any = 'side';
  ListTrangThaiQuanlyduans: any = []
  _QuanlyduansService: QuanlyduanService = inject(QuanlyduanService)
  _UsersService: UsersService = inject(UsersService)
  _CategoryService: CategoryService = inject(CategoryService)
  Profile: any = {}
  SelectItem: any = {}
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  treeControl!: FlatTreeControl<any>;
  dataSource!: MatTreeFlatDataSource<any, any>;
  _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      node:node,
      level: level,
    };
  }
  hasChild = (_: number, node: any) => node.expandable;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _breakpointObserver:BreakpointObserver,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this._UsersService.getProfile().then((data) => {
      this.Profile = data
      console.log(this.Profile);

    })
   this.spinner.show();
  }
  async ngOnInit(): Promise<void> {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.expandActiveNodes();
    });
    this.treeControl = new FlatTreeControl<any>(
      node => node.level,
      node => node.expandable,
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, new MatTreeFlattener(
      this._transformer,
      node => node.level,
      node => node.expandable,
      node => node.children,
    ));
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.leftsidebar = result.matches ? false : true;
      if (result.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });

    this._QuanlyduansService.isHaveQuanlyduan$.subscribe((data:any) => this.isHaveQuanlyduan = data);
    this.Categories = this.FilterCategories = await this._CategoryService.getAllCategory();
    Promise.all(this.Categories.map(async (v) => {
      const children = await this._QuanlyduansService.SearchQuanlyduans({...this.SearchParams, idDM: v.id,idUser:this.Profile.id});
      v.TypeMenu ='Category'
      if (children.totalCount > 0) {
        children.items.forEach((v:any) => {
          v.TypeMenu ='Task'
        })
        v.children = children.items;
      }
      return v;
    })).then((updatedCategories:any) => {
      const filterCategories = updatedCategories.filter((v:any) => v?.children?.length > 0);
      console.log(filterCategories);

      this.dataSource.data = filterCategories
    });
     this.spinner.hide();

    // await this._QuanlyduansService.SearchQuanlyduans(this.SearchParams)

    // this._QuanlyduansService.quanlyduans$.subscribe((data:any) => {
    //   this.FilterLists = this.dataSource.data = this.Categories.map((v) =>({...v,children:data}))
    //   console.log(this.dataSource.data);
    // });
 }

 logout() {
  this.spinner.show();
  this._UsersService.Dangxuat().subscribe((res: any) => {
    if (res) {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  });
}

expandActiveNodes() {
  const expandNodes = (node: any) => {
    if (this.router.isActive('/quanlyduan/task/' + node.id, true)) {
      this.treeControl.expand(node);
      return true;
    }
    if (node.children) {
      const childExpanded = node.children.some(expandNodes);
      if (childExpanded) {
        this.treeControl.expand(node);
        return true;
      }
    }
    return false;
  };

  this.dataSource.data.forEach(expandNodes);
}
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    const filterTree = (node: any): boolean => {
      if (node.Title.toLowerCase().includes(filterValue)) {
        return true;
      }
      if (node.children) {
        node.children = node.children.filter(filterTree);
        return node.children.length > 0;
      }
      return false;
    };

    if (filterValue.length > 2) {
      this.dataSource.data = this.FilterCategories.filter(filterTree);
      this.treeControl.expandAll();
    } else {
      this.dataSource.data = this.Categories;
      this.treeControl.collapseAll();
    }

  }

  async onPageChange(event: any) {
   // console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.Lists = await this._QuanlyduansService.SearchQuanlyduans(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
          this._CategoryService.CreateCategory(this.Category).then(() => this.ngOnInit())
      }
    });
  }
  addTask(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        console.log(this.Profile);

          this.Task.idUser = [{idUser:this.Profile.id,name:this.Profile.name}]
          this._QuanlyduansService.CreateQuanlyduans(this.Task).then(() => this.ngOnInit())
      }
    });
  }
  updateTask(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
          this._QuanlyduansService.UpdateQuanlyduans(this.Task).then(() => this.ngOnInit())
      }
    });
  }
  deleteTask(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.Task.isDelete = true
        this._QuanlyduansService.UpdateQuanlyduans(this.Task).then(() => this.ngOnInit())
      }
    });
  }
 CreateCategory(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
          this._CategoryService.CreateCategory(this.Category).then(() => this.ngOnInit())
      }
    });
  }
  updateCategory(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
          this._CategoryService.UpdateCategory(this.Category).then(() => this.ngOnInit())
      }
    });
  }
  deleteCategory(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        console.log(this.Category);

        this.Category.isDelete = true
        this._CategoryService.UpdateCategory(this.Category).then(() => this.ngOnInit())
      }
    });
  }
  ToSlug()
  {
    this.Category.Slug = convertToSlug(this.Category.Title)
  }
  ToSlugTask()
  {
    this.Task.Slug = convertToSlug(this.Task.Title)
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetName1 = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      const worksheet1 = workbook.Sheets[sheetName1];
      const QuanlyduansAdmin = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      // QuanlyduansAdmin.forEach((v: any, k: any) => {
      //   setTimeout(() => {
      //     const item: any = {}
      //     const Image: any = { Main: v.photo, Thumb: v.thumb }
      //     item.id = v.id
      //     item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
      //     this._QuanlyduansService.UpdateQuanlyduans(item)
      //     // this._QuanlyduansAdminService.CreateQuanlyduansAdmin(item)
      //     console.log(item);
      //   }, 100 * k);
      // });
    };
    fileReader.readAsArrayBuffer(file);
  }
  writeExcelFile() {
    let Giagoc: any = []
    let item: any = {}
    this.FilterLists.forEach((v: any) => {
      item.idSP = v.id
      item.TenSP = v.Title
      v.Giagoc.forEach((gg: any) => {
        item = { ...item, ...gg }
        Giagoc.push(item)
      });
    });
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'QuanlyduansAdmin');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'QuanlyduansAdmin_' + moment().format("DD_MM_YYYY"));
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
  GetStatus(item: any, field: any) {
    // const result = this.ListTrangThaiQuanlyduans.find((v) => v.id == item)
    // if (result) { return result[field] }
  }
  GetHinhthucthanhtoan(item: any, field: any) {
    // const result = ListHinhthucthanhtoan.find((v) => v.id == item)
    // if (result) { return result[field] }
  }
  ChangeStatus(item: any, item1: any) {
    item.Status = item1.id
    this._QuanlyduansService.UpdateQuanlyduans(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.SelectItem.isDelete = true
        this._QuanlyduansService.DeleteQuanlyduans(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
  addItem(node: any) {
    console.log(node);
  }
  editItem(node: any) {
    console.log(node);
  }
  removeItem(node: any) {
    console.log(node);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../users/users.service';
import { TodosService } from './todos.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TodocategoryService } from '../todocategory/todocategory.service';
import { MatSelectModule } from '@angular/material/select';
import { convertToSlug } from '../shared/shared.utils';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    RouterLink,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    RouterLinkActive,
    DetailComponent
  ],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  Detail: any = {location:'main'};
  Lists: any = {}
  isOpen:boolean=true
  isOpen1:boolean=true
  FilterLists: any[] = []
  Category: any = {location:'main'};
  Categories: any[] = []
  FilterCategories: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    pageSize: 9999,
    pageNumber: 0,
    isDelete: false
  };
  sidebarVisible: boolean = false;
  leftsidebar: boolean = false;
  isHaveTodo: boolean = true;
  drawerMode: any = 'over';
  ListTrangThaiTodos: any = []
  _TodosService: TodosService = inject(TodosService)
  _UsersService: UsersService = inject(UsersService)
  _TodocategoryService: TodocategoryService = inject(TodocategoryService)
  Profile: any = {}
  SelectItem: any = {}
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Title','CreateAt','Status','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _breakpointObserver:BreakpointObserver,
    private spinner: NgxSpinnerService
  ) {
    this._UsersService.getProfile()
    this._UsersService.profile$.subscribe((data) => {
      if (data) {
        this.Profile = data
      }
    })
    this.spinner.show();
  }
  async ngOnInit(): Promise<void> {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.drawerMode = result.matches ? 'over' : 'side';
      this.isOpen = result.matches ? false : true;
      this.leftsidebar = result.matches ? false : true;
    });
    this._TodosService.isHaveTodo$.subscribe((data:any)=>{
      this.isHaveTodo = data
    })
    this.Categories = this.FilterCategories = await this._TodocategoryService.getAllTodocategory()
    await this._TodosService.SearchTodos(this.SearchParams).then((data)=>
    {
      this.spinner.hide();
      console.log("searchdata",data);
    })
    this._TodosService.todoss$.subscribe((data:any)=>
    {
      this.FilterLists = data
    //  this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v < this.Lists.totalCount);
      this.dataSource = new MatTableDataSource(this.FilterLists);
     // console.log(this.FilterLists);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'Diachi': return item.Todoss.Khachhang.Diachi;
          case 'Hoten': return item.Todoss.Khachhang.Hoten;
          case 'SDT': return item.Todoss.Khachhang.SDT;
          case 'Hinhthuc': return item.Thanhtoan.Hinhthuc;
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
 }
 filteredCategories(location:any) {
  return this.Categories.filter((v) => v.location == location);
 }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      // this.FilterLists = this.Lists.items.filter((v: any) => {
      //   return v.MaTodos.toLowerCase().includes(value.toLowerCase())
      //     || v.Khachhang?.SDT?.toLowerCase().includes(value.toLowerCase())
      //     || v.Khachhang?.Hoten?.toLowerCase().includes(value.toLowerCase())
      //     || v.Khachhang?.Diachi?.toLowerCase().includes(value.toLowerCase())
      // })
    }
    else { this.FilterLists = this.Lists.items }
  }
  async onPageChange(event: any) {
   // console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.Lists = await this._TodosService.SearchTodos(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        this._TodocategoryService.CreateTodocategory(this.Category)
      }
    });
  }
  ToSlug()
  {
    this.Category.Slug = convertToSlug(this.Category.Title)
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
      const TodosAdmin = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      // TodosAdmin.forEach((v: any, k: any) => {
      //   setTimeout(() => {
      //     const item: any = {}
      //     const Image: any = { Main: v.photo, Thumb: v.thumb }
      //     item.id = v.id
      //     item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
      //     this._TodosService.UpdateTodos(item)
      //     // this._TodosAdminService.CreateTodosAdmin(item)
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
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'TodosAdmin');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'TodosAdmin_' + moment().format("DD_MM_YYYY"));
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
    // const result = this.ListTrangThaiTodos.find((v) => v.id == item)
    // if (result) { return result[field] }
  }
  GetHinhthucthanhtoan(item: any, field: any) {
    // const result = ListHinhthucthanhtoan.find((v) => v.id == item)
    // if (result) { return result[field] }
  }
  ChangeStatus(item: any, item1: any) {
    item.Status = item1.id
    this._TodosService.UpdateTodos(item).then(() => {
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
        this._TodosService.DeleteTodos(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
}

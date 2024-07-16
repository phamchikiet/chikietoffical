  import { CommonModule } from '@angular/common';
  import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatInputModule } from '@angular/material/input';
  import { MatMenuModule } from '@angular/material/menu';
  import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
  import { MatDialog, MatDialogModule} from '@angular/material/dialog';
  import { MatButtonModule} from '@angular/material/button';
  import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TodosService } from '../todos.service';
import { convertToSlug } from '../../shared/shared.utils';
  @Component({
  selector: 'app-listview',
  standalone:true,
    imports:[
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
      MatPaginatorModule
    ],
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {
    Detail: any = {};
    Lists: any={}
    FilterLists: any[] = []
    pageSizeOptions: any[] = []
    Sitemap: any = { loc: '', priority: '' }
    SearchParams: any = {
      pageSize:9999,
      pageNumber:0,
      isDelete:false
    };
    sidebarVisible: boolean = false;
    Profile: any = {}
    SelectItem: any = {}
    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
    displayedColumns: string[] = ['Title', 'Status', 'CreateAt'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() onEmitDetail = new EventEmitter<any>();
    constructor(
      private dialog: MatDialog,
      private _snackBar: MatSnackBar,
    ) { }
    route: ActivatedRoute = inject(ActivatedRoute);
    _TodosService: TodosService = inject(TodosService);
    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe((params) => {
        console.log("Primary outlet params",params.get('slug'));
      });
      this.Lists = await this._TodosService.SearchTodos(this.SearchParams)
      this.FilterLists = this.Lists.items
      // this.FilterLists.forEach((v)=>{
      //   if(v.Title=='')
      //   {
      //     this._TodosService.DeleteTodos(v)
      //   }
      //   else
      //   {
      //     v.Slug = convertToSlug(v.Title)
      //     this._TodosService.UpdateTodos(v)
      //   }

      // })
      this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v < this.Lists.totalCount);
      this.dataSource = new MatTableDataSource(this.FilterLists);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'Diachi': return item.Giohangs.Khachhang.Diachi;
          case 'Hoten': return item.Giohangs.Khachhang.Hoten;
          case 'SDT': return item.Giohangs.Khachhang.SDT;
          case 'Hinhthuc': return item.Thanhtoan.Hinhthuc;
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    async OpenDetail(item:any)
    {
      console.log(item);

      const Todo = await this._TodosService.getTodosByid(item.id)
      console.log(Todo);
    }
    applyFilter(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      if (value.length > 1) {
        this.FilterLists = this.Lists.items.filter((v:any) => {
       return  v.MaDonHang.toLowerCase().includes(value.toLowerCase())
       ||v.Khachhang?.SDT?.toLowerCase().includes(value.toLowerCase())
       ||v.Khachhang?.Hoten?.toLowerCase().includes(value.toLowerCase())
       ||v.Khachhang?.Diachi?.toLowerCase().includes(value.toLowerCase())
         })
      }
      else {this.FilterLists = this.Lists.items}
    }
    async onPageChange(event:any)
    {
      console.log(event);
      this.SearchParams.pageSize=event.pageSize
       this.SearchParams.pageNumber=event.pageIndex
       this.Lists = []
       this.FilterLists = this.Lists.items
    }
    openDialog(teamplate: TemplateRef<any>): void {
      const dialogRef = this.dialog.open(teamplate, {
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {

        }
      });
    }
    readExcelFile(event: any) {
     }
    writeExcelFile() {
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
    GetStatus(item:any,field:any)
    {
      const result:any = []
      if(result){return result[field]}
    }
    GetHinhthucthanhtoan(item:any,field:any)
    {
      const result:any =[]
      if(result){return result[field]}
    }
    ChangeStatus(item: any, item1: any) {
     }
       XoaDialog(teamplate: TemplateRef<any>): void {
        const dialogRef = this.dialog.open(teamplate, {
        });
      }
  }

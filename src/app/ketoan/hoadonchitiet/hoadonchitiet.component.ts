import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { KetoanComponent } from '../ketoan.component';
import { HoadonService } from '../hoadon/hoadon.service';
@Component({
selector: 'app-hoadonchitiet',
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
    MatPaginatorModule,
    KetoanComponent
  ],
templateUrl: './hoadonchitiet.component.html',
styleUrls: ['./hoadonchitiet.component.scss']
})
export class HoadonchitietComponent implements OnInit {
  Token:any
  Detail: any = {};
  Lists: any={}
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    pageSize:9,
    pageNumber:0,
    isDelete:false
  };
  sidebarVisible: boolean = false;
  // ListTrangThaiDonhang:any=ListTrangThaiDonhang
  _HoadonService:HoadonService = inject(HoadonService)
  _KetoanComponent:KetoanComponent = inject(KetoanComponent)
  // _UsersService: UsersService = inject(UsersService)
  Profile: any = {}
SelectItem: any = {}
@ViewChild('drawer', { static: true }) drawer!: MatDrawer;
displayedColumns: string[] = ['shdon','Type','ngaytao','ten','dvtinh','sluong','dgia','thtien','tsuat','tlckhau','Action'];

// {
//   "idhdon": "7d48f70f-833f-4ca6-907b-badea7b5a496",
//   "id": "9378188a-05a4-4288-ba33-ad2dca17e2d9",
//   "dgia": 8700,
//   "dvtinh": "Lon",
//   "ltsuat": "10%",
//   "sluong": 1500,
//   "stbchu": null,
//   "stckhau": 0,
//   "stt": 1,
//   "tchat": 1,
//   "ten": "SN Nước Yến Sannest Lon T",
//   "thtcthue": null,
//   "thtien": 13050000,
//   "tlckhau": 0,
//   "tsuat": 0.1,
//   "tthue": null,
//   "sxep": 1,
//   "ttkhac"


dataSource!: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
DataDrives:any=[]
Chitiets:any=[]
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    // this._UsersService.getProfile()
    // this._UsersService.profile$.subscribe((data) => {
    //   if (data) {
    //     this.Profile = data
    //   }
    // })
  }
  async ngOnInit(): Promise<void> {
    this.Token = localStorage.getItem('Token')||null
    const Drives = await this._HoadonService.getDrive();
    this.DataDrives = Drives
    console.log(Drives);

    this.Lists = await this._HoadonService.SearchHoadon(this.SearchParams)
    this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v < this.Lists.totalCount);

    console.log(this.FilterLists);
    this.Chitiets = this.FilterLists.flatMap((v: any) => {
      const dulieu = v.hdhhdvu as any[];
      return dulieu.map((v1: any) => ({Type:v.Type,shdon:v.shdon,tdlap:v.tdlap,...v1}));
    });
    this.dataSource = new MatTableDataSource(this.Chitiets);
    console.log(this.Chitiets);
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
  toggledraw()
  {
    this._KetoanComponent.drawer.toggle();
  }
  GetChitiet(item:any)
  {
    console.log(item);

    this._HoadonService.getChitiet(item.nbmst,item.khhdon,item.shdon,item.khmshdon,item.Type,this.Token)
  }
  async GetAll()
  {
    const promises = this.DataDrives.map((v:any) => this.GetChitiet(v));
    await Promise.all(promises);
    console.log("All elements processed!");
  }
  UpdateToken()
  {
    localStorage.setItem('Token',this.Token)
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
   //  this.Lists = await this._GiohangService.SearchDonhang(this.SearchParams)
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      //  this._GiohangService.CreateDonhang(this.Detail)
      }
    });
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
      const DonhangAdmin = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc:any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      DonhangAdmin.forEach((v:any,k:any) => {
        // setTimeout(() => {
        //   const item:any={}
        //   const Image:any = {Main:v.photo,Thumb:v.thumb}
        //   item.id = v.id
        //   item.Giagoc = groupByfield(Giagoc).find((gg:any)=>gg.idSP==v.id).children||[]
        //    this._GiohangService.UpdateDonhang(item)
        //   // this._DonhangAdminService.CreateDonhangAdmin(item)
        //   console.log(item);
        // }, 100*k);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  writeExcelFile() {
    let Giagoc:any=[]
    let item:any={}
    this.FilterLists.forEach((v:any) => {
        item.idSP =v.id
        item.TenSP =v.Title
        v.Giagoc.forEach((gg:any) => {
          item = {...item,...gg}
          Giagoc.push(item)
        });
    });
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'DonhangAdmin');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'DonhangAdmin_'+ moment().format("DD_MM_YYYY"));
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
    // const result = ListTrangThaiDonhang.find((v)=>v.id==item)
    // if(result){return result[field]}
    return true
  }
  GetHinhthucthanhtoan(item:any,field:any)
  {
    // const result = ListHinhthucthanhtoan.find((v)=>v.id==item)
    // if(result){return result[field]}
    return true
  }
  ChangeStatus(item: any, item1: any) {
     item.Status=item1.id
      // this._GiohangService.UpdateDonhang(item).then(() => {
      //   this._snackBar.open('Cập Nhật Thành Công', '', {
      //     horizontalPosition: "end",
      //     verticalPosition: "top",
      //     panelClass: 'success',
      //     duration: 1000,
      //   });
      // })
     }
     XoaDialog(teamplate: TemplateRef<any>): void {
      const dialogRef = this.dialog.open(teamplate, {
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          this.SelectItem.isDelete = true
       //  this._GiohangService.DeleteDonhang(this.SelectItem).then(() => this.ngOnInit())
        }
      });
    }

}

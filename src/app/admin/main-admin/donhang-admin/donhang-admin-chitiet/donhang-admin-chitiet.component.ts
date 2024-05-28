import { Component, Inject, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DonhangAdminComponent } from '../donhang-admin.component';
import { GiohangService } from '../../website/giohang/giohang.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { ForminAdminComponent } from '../../../../formin/formin-admin/formin-admin.component';
import { KhuyenmaisiteComponent } from '../../../../khuyenmai/khuyenmaisite/khuyenmaisite.component';
import { ListTrangThaiDonhang, ListHinhthucthanhtoan } from '../../../../shared/shared.utils';
import { TelegramService } from '../../../../shared/telegram.service';
import { TimelineDonhangComponent } from '../../../../shared/timeline-donhang/timeline-donhang.component';
import { DiachiAdminComponent } from '../../../diachi/diachi-admin/diachi-admin.component';
import { UsersService } from '../../../users/auth/users.service';
import { SanphamService } from '../../sanpham/sanpham.service';

@Component({
  selector: 'app-donhang-admin-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    DonhangAdminComponent,
    MatDialogModule,
    ForminAdminComponent,
    TimelineDonhangComponent,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    DiachiAdminComponent,
    KhuyenmaisiteComponent
  ],
  templateUrl: './donhang-admin-chitiet.component.html',
  styleUrls: ['./donhang-admin-chitiet.component.css']
})
export class DonhangAdminChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _DonhangAdminComponent: DonhangAdminComponent = inject(DonhangAdminComponent);
  _GiohangService:GiohangService = inject(GiohangService)
  _SanphamService:SanphamService = inject(SanphamService)
  idSP:any;
  Detail:any;
  Giohangs: any[] = []
  ListTrangThaiDonhang:any=ListTrangThaiDonhang
  ListHinhthucthanhtoan:any=ListHinhthucthanhtoan
  @ViewChild('GhichuDialog') GhichuDialog!: TemplateRef<any>;
  @ViewChild('dialogXemFormin') dialogXemFormin!: TemplateRef<any>;
  @ViewChild('ChonSanphamDialog') ChonSanphamDialog!: TemplateRef<any>;
  _UsersService: UsersService = inject(UsersService)
  _TelegramService: TelegramService = inject(TelegramService)
  Sanphams:any[]=[]
  Sanpham:any={}
  Profile: any = {}
  constructor(
     private dialog:MatDialog,
     private _snackBar: MatSnackBar,
     ) {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    this._UsersService.getProfile()
    this._UsersService.profile$.subscribe((data) => {
      if (data) {
        this.Profile = data
        switch (data.Role) {
          case "nhanvienbanhang":
            this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==1||v.id==2)
            break;
          case "nhanvienkho":
            this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==3)
            break;
          case "nhanvienketoan":
            this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==4)
            break;
          case "admin":
            this.ListTrangThaiDonhang=ListTrangThaiDonhang
            break;
          default:this.ListTrangThaiDonhang=[]
            break;
        }
      }
    })
    if(this.idSP)
    {
     await this._GiohangService.getAdDonhangByid(this.idSP)
      this._GiohangService.addonhang$.subscribe((data)=>{
        if(data)
        {
          console.log(data);
          this.Detail=data
        }
      })
      this._DonhangAdminComponent.drawer.open()
    }
    this._SanphamService.getAllSanpham()
    this._SanphamService.sanphams$.subscribe((data:any)=>{if(data){
      this.Sanphams=data.map((v:any)=>({
      id: v.id,
      id_cat: v.id_cat,
      Title: v.Title,
      Danhmuc: v.Danhmuc,
      Slug: v.Slug,
      Giachon: v.Giachon,
      Giagoc: v.Giagoc,
      Image: v.Image,
      Soluong: v.Soluong,
    }))
  }})
  }
  CloseDrawer()
  {
    this._DonhangAdminComponent.drawer.close()
  }
  GetSubTotal(data: any, field: any, field1: any) {
    return this._GiohangService.getSum(data,field,field1)
  }
  GetSubTotalThucte(data: any, field: any, field1: any) {
    const items = data?.map((v:any)=>(v.Giachon))
    return this._GiohangService.getSumThucte(items,field,field1)
  }
  GetTotalThucte(donhang:any,giohang:any,soluong:any,gia:any,thue:any)
  {
    const result = (this.GetSubTotalThucte(giohang, soluong, gia) + Number(donhang.Vanchuyen.Phivanchuyen||0) - Number(donhang.Giamgia||0) + this.GetSubTotal(giohang, thue, ''))
    return result
  }
  GetTotal(donhang:any,giohang:any,soluong:any,gia:any,thue:any)
  {
    const result = (this.GetSubTotal(giohang, soluong, gia) + Number(donhang.Vanchuyen.Phivanchuyen||0) - Number(donhang.Giamgia||0) + this.GetSubTotal(giohang, thue, ''))
    return result
  }
  // GetTongcong() {
  //   return this.GetTotal(this.Giohangs, 'Soluong', 'Giachon') + this.Phivanchuyen + this.Giamgia + this.GetTotal(this.Giohangs, 'Thue', '')
  // }

  XemFormin(teamplate: TemplateRef<any>): void {
    const Lanin = this.Detail.TimePrint.length+1
    this.Detail.TimePrint.push({Title:'Lần In '+Lanin,time:new Date()})
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  GetStatus(item:any,field:any)
  {
    const result = ListTrangThaiDonhang.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  GetHinhthucthanhtoan(item:any,field:any)
  {
    const result = ListHinhthucthanhtoan.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  openGhichu(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {});
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          this.Detail.Status=5
          this._GiohangService.UpdateDonhang(this.Detail).then((data) => {
            const telegram = `Đơn Hàng : <b>${data.MaDonHang} </b> TT :  <b>${ListTrangThaiDonhang.find((v)=>v.id==data.Status)?.Title||data.Status} </b> - <b>${moment().format("HH:mm:ss DD/MM/YYYY")} </b>`
            this._TelegramService.SendNoti(telegram)
            this._snackBar.open('Cập Nhật Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 1000,
            });
          })
        }
        else {
          this._snackBar.open('Đơn hàng chưa được huỷ do chưa nhập lý do.', '', {
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: 'danger',
            duration: 1000,
          });
        }
      });
  }
  ChangeStatus(item: any, item1: any) {
    if(item1.id==5)
    {
      this.openGhichu(this.GhichuDialog)
    }
    else{
      item.Status=item1.id
      this._GiohangService.UpdateDonhang(item).then((data) => {
      const telegram = `Đơn Hàng : <b>${data.MaDonHang} </b> TT :  <b>${ListTrangThaiDonhang.find((v)=>v.id==data.Status)?.Title||data.Status} </b> - <b>${moment().format("HH:mm:ss DD/MM/YYYY")} </b>`
      this._TelegramService.SendNoti(telegram)
        this._snackBar.open('Cập Nhật Thành Công', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'success',
          duration: 1000,
        });
      })
    }
  }
  UpdateDonhang()
  {
    this._GiohangService.UpdateDonhang(this.Detail).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
  }
  ChangeHinhthucthanhtoan(item: any, item1: any) {
    console.log(item,item1);

      item.Thanhtoan.Hinhthuc=item1.id
      this._GiohangService.UpdateDonhang(item).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'success',
          duration: 1000,
        });
      })
  }
     Tanggiatri(index:any,field:any)
     {
      console.log(this.Detail.Giohangs.Sanpham[index]);

      if(this.Detail.Giohangs.Sanpham[index][field])
      {
        this.Detail.Giohangs.Sanpham[index][field] = Number(this.Detail.Giohangs.Sanpham[index][field])+1
        this._GiohangService.DonHangAdmin(this.Detail)
      }
      else
      {
        this.Detail.Giohangs.Sanpham[index][field] = 1
        this._GiohangService.DonHangAdmin(this.Detail)
      }
     }
     Giamgiatri(index:any,field:any)
     {
      console.log(index,field);

      if(this.Detail.Giohangs.Sanpham[index][field]&&this.Detail.Giohangs.Sanpham[index][field]>1)
      {
        this.Detail.Giohangs.Sanpham[index][field] = Number(this.Detail.Giohangs.Sanpham[index][field])-1
        this._GiohangService.DonHangAdmin(this.Detail)
      }
      else {
        this._snackBar.open('Số Lượng Không Được Âm','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'danger',
          duration: 1000,
        });
      }
     }
     TangTT(index:any,field:any)
     {
      if(this.Detail.Giohangs.Sanpham[index].Giachon[field])
      {
        this.Detail.Giohangs.Sanpham[index].Giachon[field] = Number(this.Detail.Giohangs.Sanpham[index].Giachon[field])+1
        this._GiohangService.DonHangAdmin(this.Detail)
      }
      else
      {
        this.Detail.Giohangs.Sanpham[index].Giachon[field] = 1
        this._GiohangService.DonHangAdmin(this.Detail)
      }

     }
     GiamTT(index:any,field:any)
     {
      console.log(index,field);

      if(this.Detail.Giohangs.Sanpham[index].Giachon[field]&&this.Detail.Giohangs.Sanpham[index].Giachon[field]>1)
      {
        this.Detail.Giohangs.Sanpham[index].Giachon[field] = Number(this.Detail.Giohangs.Sanpham[index].Giachon[field])-1
        this._GiohangService.DonHangAdmin(this.Detail)
      }
      else {
        this._snackBar.open('Số Lượng Không Được Âm','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'danger',
          duration: 1000,
        });
      }
     }
     GetDiachi(value: any) {
      this.Detail.Diachis = value
      const Diachi = value.find((v: any) => v.Active == true)
      this.Detail.Khachhang.Diachi = `${Diachi.Diachi ? Diachi.Diachi + ', ' : ''}${Diachi.Phuong ? Diachi.Phuong + ', ' : ''}${Diachi.Quan ? Diachi.Quan + ', ' : ''}${Diachi.Tinh || ''}`;
    }
    AddSanpham()
    {
      const dialogRef = this.dialog.open(this.ChonSanphamDialog);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          console.log(this.Sanpham);

          this.Detail.Giohangs.Sanpham.push(this.Sanpham)
          this._snackBar.open('Thêm Thành Công','',{
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass:'success',
            duration: 2000,
          });
        }
      });
    }
    Chonsanpham(item:any)
    {
      this.Sanpham.Giachon = item
      this.Sanpham.Giachon.SLTT = Number(item.khoiluong)
      this.Sanpham.Soluong =  1
    }
    RemoveSanpham(item:any)
    {
      this.Detail.Giohangs.Sanpham = this.Detail.Giohangs.Sanpham.filter((v:any)=>v.id!==item.id)
    }
}

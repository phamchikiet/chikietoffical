import { Component, ElementRef, EventEmitter, inject, OnInit, Output, QueryList, Renderer2, TemplateRef, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuanlyduanService } from '../quanlyduan.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { FirebaseimageService } from '../../../firebaseimage/firebaseimage.service';
import { NotifierService } from 'angular-notifier';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../../users/users.service';
import { filter, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { QuanlyduanComponent } from '../quanlyduan.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    EditorModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    QuanlyduanComponent,
    MatDialogModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent implements OnInit {

APITINYMCE= environment.APITINYMCE;
configTiny: EditorComponent['init'] = {
  // selector: '.dfree-header',
  // content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
  content_style: '.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
  menubar: false,
  language: 'vi',
  // inline: true,
  toolbar: 'image link bold italic underline alignleft aligncenter alignright alignjustify code',
  plugins: [
     'autoresize','quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
    'searchreplace','visualblocks','code','fullscreen',
    'insertdatetime','media','table','code','help'
     ],
  quickbars_insert_toolbar: false,
 // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
  branding: false,
  image_advtab: false,
  autoresize_bottom_margin: 5,
  autoresize_min_height: 50,
  max_height: 700,
  statusbar:false,
  deprecation_warnings: false,
  default_link_target: '_blank',
  block_unsupported_drop: true,
  entity_encoding: 'raw',
  setup: (editor) => {
    editor.on('init', (e) => {
    });
    editor.on('change', function(e){
    })
    editor.on('nodechange', function(e){
    })
  },
  images_upload_handler: async (blobInfo: any) => {
    const file = blobInfo.blob();
    console.log(file);
    const Filename = new Date().getTime() + "_" + file.name;
    try {
      // Convert Blob to File
      const fileToUpload = new File([file], Filename, { type: file.type });
      const res = await this._FirebaseimageService.uploadImage(fileToUpload, `chikietv1/${Filename}`);
      if (res && res.url) {
        return res.url;
      } else {
        throw new Error('Upload failed: No URL returned');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};

  SearchParams: any = {
    pageSize:9999,
    pageNumber:0,
    isDelete:false
  };
  Detail:any={Mota:''}
  profile:any;
  _QuanlyduansService: QuanlyduanService = inject(QuanlyduanService);
  _FirebaseimageService: FirebaseimageService = inject(FirebaseimageService);
  route: ActivatedRoute = inject(ActivatedRoute);
  notifier: NotifierService = inject(NotifierService);
  usersService: UsersService = inject(UsersService);
  _quanlyduanComponent: QuanlyduanComponent = inject(QuanlyduanComponent);
  dialog: MatDialog = inject(MatDialog);
  SelectImage:any;
  _router: Router = inject(Router);
  @ViewChildren('myElement') elements!: QueryList<ElementRef>;
  constructor(
    private renderer: Renderer2,
  ) { }
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this._quanlyduanComponent.drawer.open();
        await this._QuanlyduansService.getQuanlyduansByid(id);
        this._QuanlyduansService.quanlyduan$.subscribe((data) => {
          this.Detail = data;
        });
      }
    });

    this.profile = await this.usersService.getProfile();
  }
  CloseDetail()
  {
    this._QuanlyduansService.updateisHaveQuanlyduan(false)
    this._router.navigate(['../../'], { relativeTo: this.route });
    this._quanlyduanComponent.drawer.close()
  }
  UpdateDetail()
  {
   this._QuanlyduansService.UpdateQuanlyduans(this.Detail)
  }
  PushnewContent()
  {
    this.Detail.Content.push({id:this.Detail.Content.length+1, content: "a"});
    console.log(this.Detail.Content);
  }

  async attachment(event: any) {
    const file = event.target.files[0];
    const path = `chikietv1/attachment/${file.name}`
    console.log(file);
    this._FirebaseimageService.uploadImage(file,path).then((data) => {
      if(data)
      {
        this.Detail.attachments.push({name:file.name,type:file.type,url:data.url})
        this._QuanlyduansService.UpdateQuanlyduans(this.Detail).then(() =>{
          this.notifier.notify('success','Thêm Thành Công')
        })
      }
    })
  }
  OnChange(event:any)
  {
    console.log(event);

  }
  ViewImage(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'true') {
    //     this.SelectItem.isDelete = true
    //     this._QuanlyduansService.DeleteQuanlyduans(this.SelectItem).then(() => this.ngOnInit())
    //   }
    // });
  }
  DownloadImage()
  {
    if (this.SelectImage && this.SelectImage.url) {
      const link = document.createElement('a');
      link.href = this.SelectImage.url;
      link.download = this.SelectImage.name || 'download';
      link.rel = 'noopener noreferrer'; // Security best practice for opening links
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100); // Remove the link after a short delay
    } else {
      console.error('No image selected or URL not available');
      // Optionally, you could show a user-friendly error message here
    }
  }
}


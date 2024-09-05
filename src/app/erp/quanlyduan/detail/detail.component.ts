import { Component, ElementRef, EventEmitter, inject, OnInit, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
    QuanlyduanComponent
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
  max_height: 300,
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
  images_upload_handler: (blobInfo: any) => {
    const file = blobInfo.blob();
    console.log(file);

    const promise = new Promise<string>((resolve, reject) => {
      this._FirebaseimageService.uploadImage(file,`chikietv1/${file.name}`).then((res) => {
        if (res) {
          resolve(res.url);
        }
      });
    });
    return promise;
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
  @ViewChildren('myElement') elements!: QueryList<ElementRef>;
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) { }
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      await this._QuanlyduansService.getQuanlyduansByid(id).then(() => {
        this._QuanlyduansService.quanlyduan$.subscribe((data) => {
          this.Detail = data
          console.log(this.Detail);
          this._quanlyduanComponent.treeControl.expandAll();
        })
      })
    }
    this.profile = await this.usersService.getProfile();
  }
  CloseDetail()
  {
    this._QuanlyduansService.updateisHaveQuanlyduan(false)
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
}


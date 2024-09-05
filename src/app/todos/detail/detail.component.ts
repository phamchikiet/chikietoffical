import { Component, ElementRef, EventEmitter, inject, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment';
import { FirebaseimageService } from '../../firebaseimage/firebaseimage.service';
import { NotifierService } from 'angular-notifier';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
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
    MatTooltipModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent {

APITINYMCE= environment.APITINYMCE;
configTiny: EditorComponent['init'] = {
  // selector: '.dfree-header',
  content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
  menubar: false,
  inline: true,
  toolbar: 'image link bold italic underline alignleft aligncenter alignright alignjustify',
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
  // file_picker_callback: (callback, value, meta:any) => {
  //   // Provide file and text for the link dialog
  //   if (meta.filetype == 'file') {
  //     callback('mypage.html', { text: 'My text' });
  //   }

  //   // Provide image and alt text for the image dialog
  //   if (meta.filetype == 'image') {
  //     callback('myimage.jpg', { alt: 'My alt text' });
  //   }

  //   // Provide alternative source and posted for the media dialog
  //   if (meta.filetype == 'media') {
  //     callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
  //   }
  // }
};

  SearchParams: any = {
    pageSize:9999,
    pageNumber:0,
    isDelete:false
  };
  Detail:any={Mota:''}
  _TodosService: TodosService = inject(TodosService);
  _FirebaseimageService: FirebaseimageService = inject(FirebaseimageService);
  route: ActivatedRoute = inject(ActivatedRoute);
  notifier: NotifierService = inject(NotifierService);

  @ViewChildren('myElement') elements!: QueryList<ElementRef>;
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) { }
  async ngOnInit(){
    this.spinner.show();
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));

      this._TodosService.getTodosByid(params.get('id'))
      this._TodosService.todos$.subscribe((data)=>
        {
          if(data){
            this.Detail = data
            this.spinner.hide();
          }
        })
    });
  }
  CloseDetail()
  {
    this._TodosService.updateisHaveTodo(false)
  }
  UpdateDetail()
  {
   this._TodosService.UpdateTodos(this.Detail)
  }
  PushnewContent()
  {
    this.Detail.Content.push({id:this.Detail.Content.length+1, content: "a"});
    console.log(this.Detail.Content);
  }
  onContentChange(event:any,index:any)
  {
    const target = event.target as HTMLDivElement;
    const newContent = target.innerText;
    const hasLineBreak = newContent.includes('\n');
    const regex = /<div><br><\/div>/;
    const value = (event.target as HTMLInputElement).innerHTML;
    this.Detail.Content[index].content = value.replace(regex, "");
    if (hasLineBreak) {
      this.Detail.Content.push({id:this.Detail.Content.length+1, content: "a"});

      if (this.elements) {
        console.log(this.elements.last);
        this.elements.last.nativeElement.focus();
        this.elements.forEach(element => {
          console.log(element);
          console.log(element.nativeElement.textContent);  // Access element content
          element.nativeElement.style.color = 'red';  // Modify element styles
        });
      }
    }
    console.log(this.Detail.Content);

  }


  AddContent(type:any)
  {
    switch (type) {
      case 'text':  this.Detail.Content.push({id:this.Detail.Content.length+1, type:type,Noidung:''})
        break;
      default:
        break;
    }
  }

  async attachment(event: any) {
    const file = event.target.files[0];
    const path = `chikietv1/attachment/${file.name}`
    console.log(file);
    this._FirebaseimageService.uploadImage(file,path).then((data) => {
      if(data)
      {
        this.Detail.attachments.push({name:file.name,type:file.type,url:data.url})
        this._TodosService.UpdateTodos(this.Detail).then(() =>{
          this.notifier.notify('success','Thêm Thành Công')
        })
      }
    })
  }

}


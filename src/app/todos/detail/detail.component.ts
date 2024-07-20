import { Component, ElementRef, EventEmitter, inject, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassEditor from '@ckeditor/ckeditor5-build-classic';
import { MatInputModule } from '@angular/material/input';
import { UploadAdapter } from './SimpleUploadAdapter';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    CKEditorModule,
    MatInputModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent {
  editor = ClassEditor;
  public config = {
    simpleUpload: {
      uploadUrl: 'http://example.com',
  },
    toolbar: ['bold', 'italic', 'link', 'uploadImage']
  };
  onReady(eventData:any) {
    console.log('eventData',eventData);
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader:any) {
      console.log('loader',loader);
      const abc =new UploadAdapter(loader);
      console.log('abc',abc);

      return new UploadAdapter(loader);
    };
  }
  SearchParams: any = {
    pageSize:9999,
    pageNumber:0,
    isDelete:false
  };
  Detail:any={Content:[{
    id: 1,
    content: "a"
  }]}
  _TodosService: TodosService = inject(TodosService);
  route: ActivatedRoute = inject(ActivatedRoute);
  @ViewChildren('myElement') elements!: QueryList<ElementRef>;
  constructor(private renderer: Renderer2) {}
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this._TodosService.getTodosByid(params.get('id'))
      this._TodosService.todos$.subscribe((data)=>
        {
          if(data){this.Detail = data}
          console.log(data);
        })
    });
  }
  CloseDetail()
  {
    this._TodosService.updateisHaveTodo(false)
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
}

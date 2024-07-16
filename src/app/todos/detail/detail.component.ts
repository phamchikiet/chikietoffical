import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  _TodosService: TodosService = inject(TodosService);
  async ngOnInit(): Promise<void> {
    this._TodosService.todos$.subscribe((data)=>
    {
      console.log(data);

    })
  }
}

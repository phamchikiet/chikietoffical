import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fechikiet';
  counter = 0;
  @HostListener('scroll')
  handleKeyDown(event: KeyboardEvent) {
    console.log("adasdsa");
    
    this.counter++;
    console.log(event);
    
  }
  resetCounter() {
    this.counter = 0;
  }
}

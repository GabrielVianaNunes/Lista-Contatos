import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // ✅ RouterModule adicionado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], // ✅ RouterModule incluído nos imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lista-contatos';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-haircut',
  standalone: true,
  imports: [CardModule, RouterOutlet],
  templateUrl: './haircut.component.html',
  styleUrl: './haircut.component.scss',
})
export class HaircutComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-barber',
  standalone: true,
  imports: [CardModule, RouterOutlet],
  templateUrl: './barber.component.html',
  styleUrl: './barber.component.scss',
})
export class BarberComponent {}

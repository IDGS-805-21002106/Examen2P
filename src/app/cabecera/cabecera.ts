import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], 
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css']
})
export class Cabecera { 
}
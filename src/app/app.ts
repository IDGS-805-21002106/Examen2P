import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { Cabecera } from './cabecera/cabecera';
import { Footer } from './footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      
    CommonModule,
    HttpClientModule,   
    FormsModule,        
    Cabecera,           
    Footer,             
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  constructor(public router: Router) { } 

  ngOnInit(): void {
    
  }

  
}
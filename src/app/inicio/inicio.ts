import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductosService } from '../services/productos'; 
import { IProducto } from '../interfaces/producto'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  productosDestacados: IProducto[] = []; 

  constructor(private _productosService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductosDestacados();
  }

  obtenerProductosDestacados(): void {
    this._productosService.getListaProductos().subscribe({
      next: (data) => {
        this.productosDestacados = data.slice(0, 3);
      },
      error: (e) => {
        console.error('Error al obtener productos destacados:', e);
      }
    });
  }
}
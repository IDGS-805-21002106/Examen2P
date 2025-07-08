import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, startWith, distinctUntilChanged } from 'rxjs/operators';

import { IProducto } from '../interfaces/producto';
import { Buscador } from '../buscador/buscador';
import { ProductosService } from '../services/productos';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    Buscador
  ],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css']
})
export class ListadoProductos implements OnInit {
  allProducts: IProducto[] = [];
  filteredProducts: IProducto[] | null = [];

  searchTerm: string = '';
  private searchTermSubject = new BehaviorSubject<string>('');
  selectedCategory: string = 'all';
  private selectedCategorySubject = new BehaviorSubject<string>('all');

  categories: string[] = ['all'];

  constructor(private _productosService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerTodosLosProductos();
    this.setupFiltering();
  }

  obtenerTodosLosProductos(): void {
    this._productosService.getListaProductos().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.extractUniqueCategories();

        this.searchTermSubject.next(this.searchTerm);
        this.selectedCategorySubject.next(this.selectedCategory);
      },
      error: (e) => {
        console.error('Error al obtener todos los productos para la galería:', e);
      }
    });
  }

  
  private extractUniqueCategories(): void {
    const uniqueCategories = new Set<string>();
    const desiredCategories = ['novela', 'fantasía', 'ciencia ficción', 'historia']; 

    this.allProducts.forEach(product => {
      if (product.categoria) {
        const lowerCaseCategory = product.categoria.toLowerCase();
        
        if (desiredCategories.includes(lowerCaseCategory)) {
          uniqueCategories.add(product.categoria); 
        }
      }
    });
    this.categories = ['all', ...Array.from(uniqueCategories).sort()];

  
  }


  private setupFiltering(): void {
    combineLatest([
      this.searchTermSubject.asObservable().pipe(startWith(this.searchTerm)),
      this.selectedCategorySubject.asObservable().pipe(startWith(this.selectedCategory))
    ]).pipe(
      map(([searchTerm, selectedCategory]) => {
        let tempFiltered = this.allProducts.filter(product =>
          product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) || false
        );

        if (selectedCategory !== 'all') {
          tempFiltered = tempFiltered.filter(product =>
            product.categoria?.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
        return tempFiltered;
      })
    ).subscribe(filteredData => {
      this.filteredProducts = filteredData;
    });
  }

  onSearchFilterChange(event: { searchTerm: string, category: string }): void {
    this.searchTerm = event.searchTerm;
    this.selectedCategory = event.category;
    this.searchTermSubject.next(this.searchTerm);
    this.selectedCategorySubject.next(this.selectedCategory);
  }

  
}
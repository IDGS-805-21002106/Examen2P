
import { Component, OnInit } from '@angular/core';


import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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


  categories: string[] = ['all', 'Novela', 'Fantasía', 'Ciencia Ficción', 'Historia'];

  constructor(private _productosService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerTodosLosProductos();
    this.setupFiltering();
  }

  obtenerTodosLosProductos(): void {
    this._productosService.getListaProductos().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.searchTermSubject.next(this.searchTerm);
        this.selectedCategorySubject.next(this.selectedCategory);
      },
      error: (e) => {
        console.error('Error al obtener todos los productos para la galería:', e);
      }
    });
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
            this.matchProductToCategory(product.nombre, product.descripcion, selectedCategory)
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


  private matchProductToCategory(productName: string | undefined, productDescription: string | undefined, category: string): boolean {
    if (!productName && !productDescription) return false;

    const lowerCaseName = productName ? productName.toLowerCase() : '';
    const lowerCaseDescription = productDescription ? productDescription.toLowerCase() : '';


    switch (category.toLowerCase()) {
      case 'novela':
        return lowerCaseDescription.includes('novela') || lowerCaseName.includes('novela') ||
               lowerCaseDescription.includes('thriller') || lowerCaseName.includes('thriller') ||
               lowerCaseDescription.includes('romance') || lowerCaseName.includes('romance');
      case 'fantasía':
        return lowerCaseDescription.includes('fantasía') || lowerCaseName.includes('fantasía') ||
               lowerCaseDescription.includes('magia') || lowerCaseName.includes('magia') ||
               lowerCaseDescription.includes('dragones') || lowerCaseName.includes('dragones') ||
               lowerCaseDescription.includes('elfos') || lowerCaseName.includes('elfos');
      case 'ciencia ficción':
        return lowerCaseDescription.includes('ciencia ficción') || lowerCaseName.includes('ciencia ficción') ||
               lowerCaseDescription.includes('futuro') || lowerCaseName.includes('futuro') ||
               lowerCaseDescription.includes('robot') || lowerCaseName.includes('robot') ||
               lowerCaseDescription.includes('espacio') || lowerCaseName.includes('espacio');
      case 'historia':
        return lowerCaseDescription.includes('historia') || lowerCaseName.includes('historia') ||
               lowerCaseDescription.includes('biografía') || lowerCaseName.includes('biografía') ||
               lowerCaseDescription.includes('guerra') || lowerCaseName.includes('guerra') ||
               lowerCaseDescription.includes('antiguo') || lowerCaseName.includes('antiguo');
      default:
        return true; 
    }
  }
}
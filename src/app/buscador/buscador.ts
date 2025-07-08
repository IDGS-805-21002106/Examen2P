// src/app/buscador/buscador.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrls: ['./buscador.css']
})
export class Buscador implements OnInit { // Implementa OnInit si no lo haces ya
  @Input() categories: string[] = [];
  @Input() initialSearchTerm: string = '';
  @Input() initialSelectedCategory: string = 'all';

  @Output() searchFilterChange = new EventEmitter<{ searchTerm: string, category: string }>();

  searchTerm: string = '';
  selectedCategory: string = 'all';

  // ngOnInit es importante para que los valores iniciales de los @Input se asignen
  // a las propiedades internas searchTerm y selectedCategory cuando el componente se inicializa.
  ngOnInit(): void {
    this.searchTerm = this.initialSearchTerm;
    this.selectedCategory = this.initialSelectedCategory;
  }

  onSearch(): void {
    this.searchFilterChange.emit({ searchTerm: this.searchTerm, category: this.selectedCategory });
  }

  onCategoryChange(): void {
    // Cuando la categoría cambia (al seleccionar un radio), emitimos el evento.
    this.searchFilterChange.emit({ searchTerm: this.searchTerm, category: this.selectedCategory });
  }
}
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrls: ['./buscador.css']
})
export class Buscador implements OnInit { 
  @Input() categories: string[] = [];
  @Input() initialSearchTerm: string = '';
  @Input() initialSelectedCategory: string = 'all';

  @Output() searchFilterChange = new EventEmitter<{ searchTerm: string, category: string }>();

  searchTerm: string = '';
  selectedCategory: string = 'all';

  ngOnInit(): void {
    this.searchTerm = this.initialSearchTerm;
    this.selectedCategory = this.initialSelectedCategory;
  }

  onSearch(): void {
    this.searchFilterChange.emit({ searchTerm: this.searchTerm, category: this.selectedCategory });
  }

  onCategoryChange(): void {
    this.searchFilterChange.emit({ searchTerm: this.searchTerm, category: this.selectedCategory });
  }
}
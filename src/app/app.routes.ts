
import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { ListadoProductos } from './listado-productos/listado-productos';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'productos/:category', component: ListadoProductos }, 
  { path: 'productos', component: ListadoProductos },
  { path: '**', redirectTo: '' }
];
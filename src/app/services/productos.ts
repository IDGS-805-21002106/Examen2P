import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private myAppUrl: string; 
  private myApiUrl: string; 

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = 'Productos/'; 
  }

  getListaProductos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.myAppUrl}${this.myApiUrl}ListaProductos`); 
  }

  addProducto(producto: IProducto): Observable<IProducto> {
    return this.http.post<IProducto>(`${this.myAppUrl}${this.myApiUrl}AgregarProducto`, producto);
  }

  updateProducto(producto: IProducto): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}ModificarProducto/${producto.idProducto}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}EliminarProducto/${id}`);
  }
}
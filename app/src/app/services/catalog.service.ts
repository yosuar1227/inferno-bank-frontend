import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ServicePlan } from '../model/service.plan';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly apiUrl = 'https://8x85nt1d34.execute-api.us-east-2.amazonaws.com/dev/catalog';

  constructor(private http: HttpClient) { }

  getCatalogData(): Observable<ServicePlan[]> {
    return this.http.get<{ msj: string; data: any[] }>(this.apiUrl).pipe(
      map((response) =>
        response.data.map(
          (item): ServicePlan => ({
            ID: item['\uFEFFID'] || item['ID'],
            categoria: item['Categoría'],
            proveedor: item['Proveedor'],
            servicio: item['Servicio'],
            plan: item['Plan'],
            precioMensual: item['Precio Mensual'],
            detalles: item['Velocidad/Detalles'],
            estado: item['Estado'],
          })
        )
      ),
      catchError((err: HttpErrorResponse) => {
        console.error('Error fetching data:', err);
        return throwError(() => new Error('No se pudieron cargar los datos.'));
      })
    );
  }
}

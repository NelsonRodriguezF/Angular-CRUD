//Importaciones
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Coctel } from '../models/producto';

//Este inyectable permite que sea usado el servicio en todos los componentes. Debe inportarse
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl: string = environment.endpoint;   //esta variable la uso como url de entorno en caso de despliegue

  query: string = "";
  palabras = this.query.split(" ");

  private apiUrl: string = `${this.baseUrl}/cocteles`;  //Para el catalogo de cocteles

  constructor(
    private http: HttpClient,     //Para poder trabajar con los metodos HTTP del crud
  ) { }

  buscarCoctel( query: string ): Observable<any> {

    query = query[0].toUpperCase().trim() + query.substring(1);

    const url = `${this.apiUrl}?name=${query}`;
    console.log(url)

    return this.http.get(url);
  }

  //Funcion para el metodo get
  getCoctails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cocteles`);
  }

  //Funcion para el metodo get con parametro
  getCoctelById(id: number): Observable<Coctel> {
    return this.http.get<Coctel>(`${this.baseUrl}/cocteles/${id}`)
  }

  //Funcion para el metodo get
  buscar(termino: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/cocteles?q=${termino}`)
  }

  //Funcion para el metodo post
  add(coctel: Coctel): Observable<Coctel>{
    return this.http.post<Coctel>(`${this.baseUrl}/cocteles/`, coctel)
  }

  //Funcion para el metodo put
  edit(coctel: Coctel): Observable<Coctel> {
    return this.http.put<Coctel>(`${this.baseUrl}/add/${coctel.id}`, coctel)
  }

  //Funcion para el metodo delete
  delete(id: string): Observable<Coctel> {
    return this.http.delete<Coctel>(`${this.baseUrl}/cocteles/${id}`)
  }
}

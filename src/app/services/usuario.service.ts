import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private URL = 'https://reqres.in/api';

  getUsuarios(): Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${this.URL}/users`)
    .pipe(
      map( (resp : any) => {
        return resp.data;
      })
    );
  }
}

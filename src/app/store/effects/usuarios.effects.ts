import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as accionesUsuario from '../actions';
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

  constructor(
    private acciones$: Actions,
    private usuariosService: UsuarioService
  ){}

  cargarUsuarios$ = createEffect(() =>{
    return this.acciones$.pipe(
      ofType(accionesUsuario.cargarUsuarios),
      //Este operador de rxjs sirve para disparar efectos secundarios mientras se ejecuta otro
      //Para visualizar lo que va sucediendo o hacer operaciones internas dentro del flujo principal
      tap((respuesta) => console.log('Efecto carga usuarios: ', respuesta)),
      //El mergeMap es un operador que permite disparar un nuevo observable y permite mezclarlo a su vez
      //Con el observable anterior
      mergeMap(() => this.usuariosService.getUsuarios()
        .pipe(
          //Los Taps NO son obligatorios
          tap((respuesta) => console.log('GetUsuarios del effect: ', respuesta)),
          //El operador map literalmente mapea el resultado del proceso que ejecuta el efecto
          //En este caso, el consumo de un endpoint
          map(usuarios => accionesUsuario.cargarUsuariosExitosamente({ usuarios })),
          //Este operador catchError permite el manejo de excepciones o errores en flujos asíncronos o observables
          //A su vez, hay que tener en cuenta que este operador no retorna un observable, por lo que es necesario
          //Utilizar el método "of"
          //El método of permite convertir a una variable de cualquier tipo en una variable de tipo observable
          catchError((error) => of(accionesUsuario.cargarUsuariosError({ error })))
        )
      )
    )
  });
}


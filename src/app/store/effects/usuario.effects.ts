import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as accionesUsuario from '../actions';
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {

  constructor(
    private acciones$: Actions,
    private usuariosService: UsuarioService
  ){}

  cargarUsuario$ = createEffect(() =>{
    return this.acciones$.pipe(
      ofType(accionesUsuario.cargarUsuario),
      //De esta forma se traen los argumentos de la acción que está escuchando el efecto
      mergeMap((accion) => this.usuariosService.getUsuarioPorId(accion.id)
        .pipe(
          map(usuario => accionesUsuario.cargarUsuarioExitosamente({ usuario })),
          catchError((error) => of(accionesUsuario.cargarUsuarioError({ error })))
        )
      )
    )
  });
}

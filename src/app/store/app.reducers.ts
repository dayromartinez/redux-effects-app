import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '../store/reducers';
import { Usuario } from '../models/usuario.model';

export interface Appstate {
  usuarios: reducers.UsuariosState;
  usuario: reducers.UsuarioState;
}

export const appReducers: ActionReducerMap<Appstate> = {
  usuarios: reducers.usuariosReducer,
  usuario: reducers.usuarioReducer
}

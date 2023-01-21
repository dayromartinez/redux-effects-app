import { Action, createReducer, on } from "@ngrx/store";
import * as usuariosActions from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuariosState {
  usuarios: Usuario[];
  loading: boolean;
  error: any;
}

export const estadoInicialUsuarios: UsuariosState = {
  usuarios: [],
  loading: false,
  error: null
}

const _usuariosReducer = createReducer(
  estadoInicialUsuarios,
  on(usuariosActions.cargarUsuarios, estado => ({ ...estado, loading: true })),

  on(usuariosActions.cargarUsuariosExitosamente, (estado, { usuarios }) => ({
    ...estado,
    loading: false,
    usuarios: [...usuarios]
  })),

  on(usuariosActions.cargarUsuariosError, (estado, { error }) => ({
    ...estado,
    loading: false,
    usuarios: [],
    error: {
      url: error.url,
      nombre: error.name,
      mensaje: error.message
    }
  })),
);

export function usuariosReducer(estado: UsuariosState | undefined, accion: Action) {
  return _usuariosReducer(estado, accion);
}

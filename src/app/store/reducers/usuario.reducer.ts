import { Action, createReducer, on } from "@ngrx/store";
import * as usuariosActions from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
  id: string;
  usuario?: Usuario;
  loading: boolean;
  error: any;
}

export const estadoInicialUsuario: UsuarioState = {
  id: '',
  usuario: undefined,
  loading: false,
  error: null
}

const _usuarioReducer = createReducer(
  estadoInicialUsuario,
  on(usuariosActions.cargarUsuario, (estado, { id }) => ({ ...estado, loading: true, id })),

  on(usuariosActions.cargarUsuarioExitosamente, (estado, { usuario }) => ({
    ...estado,
    loading: false,
    usuario: { ...usuario }
  })),

  on(usuariosActions.cargarUsuarioError, (estado, { error }) => ({
    ...estado,
    loading: false,
    usuario: undefined,
    error: {
      url: error.url,
      nombre: error.name,
      mensaje: error.message
    }
  })),
);

export function usuarioReducer(estado: UsuarioState | undefined, accion: Action) {
  return _usuarioReducer(estado, accion);
}

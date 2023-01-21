import { createAction, props } from "@ngrx/store";
import { Usuario } from '../../models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar usuarios');

export const cargarUsuariosExitosamente = createAction('[Usuarios] Carga de usuarios exitosa', props<{usuarios: Usuario[]}>());

export const cargarUsuariosError = createAction('[Usuarios] Cargar usuarios errónea', props<{error: any}>());

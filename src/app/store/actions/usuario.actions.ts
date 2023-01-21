import { createAction, props } from "@ngrx/store";
import { Usuario } from '../../models/usuario.model';

export const cargarUsuario = createAction('[Usuario] Cargar usuario', props<{id: string}>());

export const cargarUsuarioExitosamente = createAction('[Usuario] Carga de usuario exitosa', props<{usuario: Usuario}>());

export const cargarUsuarioError = createAction('[Usuario] Cargar de usuario errónea', props<{error: any}>());

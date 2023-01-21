import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appstate } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as accionesUsuario from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario?: Usuario;
  loading: boolean = false;
  error: any = {};

  constructor(private router: ActivatedRoute, private store: Store<Appstate>) { }

  ngOnInit(): void {

    this.router.params.subscribe(({ id }) => {
      this.store.select('usuario').subscribe(({ usuario, loading, error}) => {
        this.usuario = usuario;
        this.loading = loading;
        this.error = error;
      })
      this.store.dispatch( accionesUsuario.cargarUsuario({ id }))

    });
  }

}

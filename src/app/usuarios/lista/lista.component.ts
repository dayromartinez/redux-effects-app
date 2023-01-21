import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Appstate } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as acciones from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  constructor(private store: Store<Appstate>) { }

  ngOnInit(): void {

    //Escucha activa de los cambios en el estado del reducer de usuarios
    this.store.select('usuarios').subscribe(({ usuarios, loading, error }) => {
      this.usuarios = usuarios;
      this.loading = loading;
      this.error = error;
    });

    //Consumo del endopoint a través de effects
    this.store.dispatch(acciones.cargarUsuarios());

    //Consumo del endpoint a través de servicios
    // this.usuarioService.getUsuarios()
    // .subscribe({
    //   next: (usuarios: Usuario[]) => {
    //     console.log('DATOS USUARIOS: ', usuarios);
    //     this.usuarios = usuarios;
    //   },
    //   error: (err) => {
    //     console.log('ERROR: ', err);
    //   }
    // });


  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
    .subscribe({
      next: (usuarios: Usuario[]) => {
        console.log('DATOS USUARIOS: ', usuarios);
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.log('ERROR: ', err);
      }
    });
  }

}

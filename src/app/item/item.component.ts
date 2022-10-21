//Importaciones
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  //inicializamos variables para poderlas trabajar en las funciones. Se hace antes del constructor
  coctel!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  //Permite cargar los datos antes de cargar el componente, hace parte del ciclo de vida de un componente
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe( switchMap(({ id }) => this.dataService.getCoctelById(id))
      ).subscribe(coctel => this.coctel = coctel);
  }

  //Funcion que permite elimnar un coctel por el id selecionado enviado por el servicio
  eliminar() {
    this.dataService.delete(this.coctel.id)
      .subscribe(resp => {
      })
  }

}

//Importaciones
import { Component, OnInit } from '@angular/core';
import data from '../../assets/db.json';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Coctel } from '../models/producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //inicializamos variables para poderlas trabajar en las funciones. Se hace antes del constructor
  db = data;
  query: string = "";
  hayError: boolean = false;
  items: any;
  heroes: any;
  coctel = new Coctel;
  
  constructor(
    public dataService: DataService,          //servicio creado para realizar el llamado del CRUD
    private activatedRoute: ActivatedRoute,   //Me dice la ruta actual
  ) { }

  //Permite cargar los datos antes de cargar el componente, hace parte del ciclo de vida de un componente
  //llamamos el getCoctails del servicio
  ngOnInit(): void {
    this.dataService.getCoctails()
      .subscribe(data => {
        this.items = data
        console.log(this.items);
      })
  }

  //Funcion que permite llamar el buscarCoctel del servicio
  buscar() {
    this.hayError = false;
    console.log(this.query);

    this.dataService.buscarCoctel(this.query)
      .subscribe((resp) => {
        console.log(resp);
      }, (err) => {
        this.hayError = true;
      });
  }

  buscando() {
    this.dataService.buscar(this.query)
      .subscribe(resultados => this.heroes = resultados);
  }

  //Funcion que permite llamar el getCotelById del servicio
  openCoctail(){
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.dataService.getCoctelById(id))
      ).subscribe(coctel => this.coctel = coctel);
  }

  //Funcion que permite llamar el edit del servicio
  editar(){
    this.activatedRoute.params
      .pipe(switchMap(( id ) => this.dataService.edit(this.coctel))
      )
      .subscribe(coctel => console.log(coctel));
  }
}

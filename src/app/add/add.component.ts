//Importaciones
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import data from '../../assets/db.json';
import { Coctel } from '../models/producto';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {

  // Inicializar el formulario con el formGroup
  form!: FormGroup
  db = data;

  coctel = new Coctel;

  // En el constructor inyectamos e inicializamos las propiedades que vamos a usar en el componente
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService,    //servicio creado para realizar el llamado del CRUD
  ) { }

  //Permite cargar los datos antes de cargar el componente, hace parte del ciclo de vida de un componente
  //Validar el formulario y sus propiedades con el Validator
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price:['', Validators.required],
      category: ['', Validators.required],
      ingredients: ['', Validators.required],
      image: ['../assets/images-coctails/', Validators.required],
    });
    this.coctel.image = '../assets/images-coctails/' + '';
  }

  //Funcion creada para enviar el Formulario
  guardar() {
    console.log('Form ->', this.form.value);
    //Condionamos si es valido el formulario para luego establecerle los valores del formulario
    if (this.form.valid) {
      this.coctel.name = this.form.get('name')!.value;
      this.coctel.price = this.form.get('price')!.value;
      this.coctel.category = this.form.get('category')!.value;
      this.coctel.ingredients = this.form.get('ingredients')!.value;
      this.coctel.image = this.form.get('image')!.value;
      this.dataService.add(this.coctel)
        .subscribe(heroe => { 
          this.router.navigate(['/home']) //Al terminar me redirije al home
        })
    }  
  }
}

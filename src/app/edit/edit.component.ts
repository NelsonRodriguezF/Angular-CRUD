//Importaciones
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coctel } from '../models/producto';
import { DataService } from '../services/data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  form!: FormGroup;     //Inicializar el formulario radioactivo
  coctel = new Coctel;  //Inicializar el coctel con la propiedades de la clase Coctel

  constructor(
    private fb: FormBuilder,    //Poder construir un formulario radioactivo
    private router: Router,     //Permite navegar entre rutas
    private activatedRoute: ActivatedRoute,   //Me dice la ruta actual
    public dataService: DataService,    //servicio creado para realizar el llamado del CRUD
  ) { }

  //Permite cargar los datos antes de cargar el componente, hace parte del ciclo de vida de un componente
  //Validar el formulario y sus propiedades con el Validator
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: ['', Validators.required],
      image: ['../assets/images-coctails/', Validators.required],
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.dataService.getCoctelById(id))
      ).subscribe(coctel => this.coctel = coctel);
  }

  //Funcion que permite guardar los datos de los campos del formulario
  guardar() {
    console.log('Form ->', this.form.value);
    //Condionamos si es valido el formulario para luego establecerle los valores del formulario
    if (this.form.valid) {
      this.coctel.name = this.form.get('name')!.value;
      this.coctel.price = this.form.get('price')!.value;
      this.coctel.category = this.form.get('category')!.value;
      this.coctel.ingredients = this.form.get('ingredients')!.value;
      this.coctel.image = this.form.get('image')!.value;
      this.dataService.edit(this.coctel)
        .subscribe(heroe => {
          this.router.navigate(['/home'])
        })
    }
  }
}

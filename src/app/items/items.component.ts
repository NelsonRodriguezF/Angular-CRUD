import { Component, OnInit } from '@angular/core';
import data from '../../assets/db.json';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  db = data;      //Traemos la data para podela mostrar en el html del componente

  constructor() { }

  ngOnInit(): void {
  }

}

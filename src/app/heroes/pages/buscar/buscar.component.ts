import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado?: Heroe;

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  optionSeleccionada(event: MatAutocompleteSelectedEvent) {
    // console.log(event.option.value);
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    } // no hay valor

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService
      .getHeroeById(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }

  constructor(private heroesService: HeroesService) {}
}

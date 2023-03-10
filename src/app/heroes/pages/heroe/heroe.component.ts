import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      @media (min-width: 768px) {
        .heroe {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        img {
          border-radius: 5px;
        }
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(({ id }) => {
  //     this.heroesService
  //       .getHeroeById(id)
  //       .subscribe((heroe) => (this.heroe = heroe));
  //   });
  // }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}

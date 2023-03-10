import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .grid-agregar {
        display: grid;
        gap: 20px;
      }

      @media (min-width: 768px) {
        .grid-agregar {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;
    if (this.heroe.id) {
      // Actualizar
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => this.mostrarSnackBar('Registro Actualizado'));
    } else {
      // Agregar
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        console.log(heroe);
        // this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro Creado');
      });
    }

    // Ya sea creando o actualizando lo llevo al listado.
    this.router.navigate(['/heroes/listado']);
  }

  eliminarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.eliminarHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes/listado']);
        });
      }
    });
  }

  mostrarSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }
}

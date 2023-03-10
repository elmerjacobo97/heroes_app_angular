import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this.authService.auth.id) {
    //   return true; // si tiene un ID, dejalo pasar
    // }
    // console.log('Bloqueado por el AuthGuard - canActivate');
    // return false; // no puede entrar a la ruta heroes a menos que esté "autenticado"

    return this.authService.validarAutenticacion().pipe(
      tap((estaAutenticado) => {
        // si no está autenticado(false), sacamos al login
        if (!estaAutenticado) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }

  // ! Solo restringe que se pueda cargar el módulo
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('canLoad', false);
    // console.log(route);
    // console.log(segments);

    return this.authService.validarAutenticacion().pipe(
      tap((estaAutenticado) => {
        // si no está autenticado(false), sacamos al login
        if (!estaAutenticado) {
          this.router.navigate(['/auth/login']);
        }
      })
    );

    // if (this.authService.auth.id) {
    //   return true; // si tiene un ID, dejalo pasar
    // }
    // console.log('Bloqueado por el AuthGuard - canLoad');
    // return false; // no puede entrar a la ruta heroes a menos que esté "autenticado"
  }
}

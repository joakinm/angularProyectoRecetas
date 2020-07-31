import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from './auth.service';
import { map, take } from 'rxjs/operators';



@Injectable({providedIn:'root'})
export class authGuard implements CanActivate{
    constructor(private authServ: authService,private router : Router){};
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.authServ.user.pipe(
            take(1),
            map(user=>{
                const auth = !!user; 
                if (auth){
                    return true;
                }
                return this.router.createUrlTree(['/login']);
            }));
    }
}
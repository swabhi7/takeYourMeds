import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    isAuthenticated: any;

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean>|Promise<boolean>{
        console.log(this.isAuthenticated);
        this.isAuthenticated = this.authService.getAuthStatusNormalVar();
        console.log(this.isAuthenticated);
        if(this.isAuthenticated == false){
            this.router.navigate(['/login']);
        }
        return this.isAuthenticated;
    }
}
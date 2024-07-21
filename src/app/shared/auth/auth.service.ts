import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, public http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public login(email?: string | null | undefined, password?: string | null | undefined) {
    // localStorage.setItem('authenticated', 'true');
    // this.router.navigate([routes.adminDashboard]);
    const URL = environment.URL_SERVICIOS+"auth/login";
    return this.http.post(URL, {email,password}).pipe(
        map( (auth) => {
            console.log(auth);
          const result =  this.saveLocalStorage(auth);
          return result; 
        } ), catchError( (error) => {
            console.log(error);
            return of(undefined);
        } )
    )
  }

  saveLocalStorage(auth:any){
    if(auth && auth.access_token){
        localStorage.setItem('token', auth.access_token);
        localStorage.setItem('user',JSON.stringify(auth.user));
        localStorage.setItem('authenticated', 'true');
        return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    this.router.navigate([routes.login])
  }
}

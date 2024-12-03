import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { Observable, catchError, lastValueFrom, map, of, throwError } from 'rxjs';
import { Usuario } from 'src/interfaces/Usuario';
import { AuthStatus } from 'src/interfaces/auth-status';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = enviroment.apiURL;
  private http = inject(HttpClient);

  private _currentUser = signal<Usuario | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(correo: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiURL}/api/auth/login`, { correo, password })
      .pipe(
        map(({ usuario, token }) => this.setAuthentication(usuario, token)),
        catchError((err) => throwError(() => err.error.mesage))
      );
  }

  private setAuthentication(user: Usuario, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  isLoggedIn() {}

  checkAuthStatus(): Observable<boolean>{
    const token = localStorage.getItem('token');
    const url = `${this.apiURL}/api/auth/check-token`;
    if (!token) {
      this.logout();
      return of(false);
    }
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
    .pipe(
      map( ({ usuario, token }) => this.setAuthentication( usuario, token )),
      catchError((err) => {
        this._authStatus.set( AuthStatus.notAuthenticated );
        return of(false);
      })
    );
  
  }
}

interface AuthResponse{
  done:boolean;
  token: string;
  usuario: Usuario;
}

interface CheckTokenResponse {
  usuario: Usuario;
  token: string;
}
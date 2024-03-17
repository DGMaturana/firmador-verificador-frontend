import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from 'src/interfaces/auth-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private authService = inject( AuthService );
  private router = inject ( Router );


  // public finishedAuthCheck = computed<boolean>( () => {
  //   console.log(this.authService.authStatus() )
  //   if ( this.authService.authStatus() === AuthStatus.checking ){
  //     return false
  //   }
  //   return true;
  // })


  // public authStatusChangedEffect = effect(() => {

  //   console.log({authStatus: this.authService.authStatus() })
  //   switch( this.authService.authStatus() ) {

  //     case AuthStatus.checking:
  //       return;

  //     case AuthStatus.authenticated:
  //       // this.router.navigateByUrl('/generar-certificados');
  //       this.router.navigateByUrl('/dashboard');
  //       return;

  //     case AuthStatus.notAuthenticated:
  //       this.router.navigateByUrl('/login');
  //       return;

  //   }




  // });

  title = 'firmador-verificador';
}

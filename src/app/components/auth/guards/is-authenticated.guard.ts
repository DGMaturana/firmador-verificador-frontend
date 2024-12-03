import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthStatus } from 'src/interfaces/auth-status';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }
  if ( authService.authStatus() === AuthStatus.checking ){
    return true;
  }
  router.navigateByUrl('/login');
  return false;
};

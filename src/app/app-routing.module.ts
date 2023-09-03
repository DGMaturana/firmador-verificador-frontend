import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmarRegistrosComponent } from './pages/firmar-registros/firmar-registros.component';
import { FirmarComponent } from './pages/firmar/firmar.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginPageComponent } from './pages/auth/login/login.component';
import { isAuthenticatedGuard } from './components/auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'firmar-registros',
    component: FirmarComponent,
    canActivate: [ isAuthenticatedGuard]
  },
  {
    path: 'verificar',
    component: VerificarComponent,
  },
  {
    path: '',
    redirectTo: 'verificar',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

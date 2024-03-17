import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmarRegistrosComponent } from './pages/firmar-registros/firmar-registros.component';
import { FirmarComponent } from './pages/firmar/firmar.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginPageComponent } from './pages/auth/login/login.component';
import { isAuthenticatedGuard } from './components/auth/guards/is-authenticated.guard';
import { GenerarCertificadosComponent  } from './pages/generar-certificados/generar-certificados.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AdminLayoutComponent } from './components/shared/admin-layout/admin-layout.component';

const routes: Routes = [
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
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'firmar-registros',
        component: FirmarComponent,
        canActivate: [ isAuthenticatedGuard ]
      },
      {
        path: 'generar-certificados',
        component: GenerarCertificadosComponent,
        canActivate: [ isAuthenticatedGuard ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]
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

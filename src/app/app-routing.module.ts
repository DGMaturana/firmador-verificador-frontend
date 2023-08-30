import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmarRegistrosComponent } from './pages/firmar-registros/firmar-registros.component';
import { FirmarComponent } from './pages/firmar/firmar.component';
import { VerificarComponent } from './components/pages/verificar/verificar.component';

const routes: Routes = [{
  path: 'firmar-registros',
  component: FirmarComponent
},{
  path:'verificar',
  component: VerificarComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmarRegistrosComponent } from './pages/firmar-registros/firmar-registros.component';
import { FirmarComponent } from './pages/firmar/firmar.component';

const routes: Routes = [{
  path: 'firmar-registros',
  component: FirmarComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

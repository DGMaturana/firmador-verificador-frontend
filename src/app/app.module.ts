import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirmarRegistrosComponent } from './pages/firmar-registros/firmar-registros.component';
import { FirmarRegistrosFormComponent } from './components/registros/firmar-registros-form/firmar-registros-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ExcelUploadComponent } from './components/excel-upload/excel-upload.component';
import { FirmarComponent } from './pages/firmar/firmar.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { DescargarCertificadosComponent } from './components/descargar-certificados/descargar-certificados.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { VerificarRegistrosComponent } from './components/registros/verificar-registros/verificar-registros.component';
import { VerRegistroComponent } from './components/registros/ver-registro/ver-registro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/shared/header/header.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginPageComponent } from './pages/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DescargarCertificadosComponent,
    ExcelUploadComponent,
    FirmarComponent,
    FirmarRegistrosComponent,
    FirmarRegistrosFormComponent,
    RegistrosComponent,
    VerificarComponent,
    VerificarRegistrosComponent,
    VerRegistroComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
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
import { GenerarCertificadosComponent } from './pages/generar-certificados/generar-certificados.component';
import { GenerarCertificadosFormComponent } from './components/generar-certificados-form/generar-certificados-form.component';
import { BlobErrorHttpInterceptorService } from './services/blob-error-http-interceptor.service';
import { ListarCertificadosComponent } from './components/generacion-de-certificados/listar-certificados/listar-certificados.component';
import { VerCertificadoComponent } from './components/certificados/ver-certificado/ver-certificado.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { AdminLayoutComponent } from './components/shared/admin-layout/admin-layout.component';
import { GenerarInspeccionVehiculosComponent } from './pages/generar-inspeccion-vehiculos/generar-inspeccion-vehiculos.component';

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
    LoginPageComponent,
    GenerarCertificadosComponent,
    GenerarCertificadosFormComponent,
    ListarCertificadosComponent,
    VerCertificadoComponent,
    LoadingComponent,
    SidebarComponent,
    DashboardComponent,
    LayoutComponent,
    AdminLayoutComponent,
    GenerarInspeccionVehiculosComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BlobErrorHttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

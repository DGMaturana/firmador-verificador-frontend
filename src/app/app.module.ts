import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirmarRegistrosComponent } from './pages/firmar-registros/firmar-registros.component';
import { FirmarRegistrosFormComponent } from './components/firmar-registros-form/firmar-registros-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ExcelUploadComponent } from './components/excel-upload/excel-upload.component';
import { FirmarComponent } from './pages/firmar/firmar.component';
import { RegistrosComponent } from './components/registros/registros.component';

@NgModule({
  declarations: [
    AppComponent,
    FirmarRegistrosComponent,
    FirmarRegistrosFormComponent,
    ExcelUploadComponent,
    FirmarComponent,
    RegistrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

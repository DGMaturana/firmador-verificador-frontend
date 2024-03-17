import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario?: FormGroup;
  loading: boolean = false;
  private router = inject( Router )
  private authService = inject(AuthService)

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.formulario = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

   login(){
    this.loading = true;
    const { correo, password } = this.formulario?.value;
    try {
      this.authService.login(correo, password).subscribe(
        {
          next: () => this.router.navigateByUrl('/firmar-registros'),
          error: (message) => {
            Swal.fire('Error', message, 'error' )
            this.loading = false;
          }
    })
      
    } catch (error) {
      this.loading = false;
      Swal.fire('Atención', String(error), 'warning')
    }
  }

}

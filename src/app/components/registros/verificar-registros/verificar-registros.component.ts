import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrosService } from 'src/app/services/registros.service';
import Swal from 'sweetalert2';
import { VerRegistroComponent } from '../ver-registro/ver-registro.component';
@Component({
  selector: 'app-verificar-registros',
  templateUrl: './verificar-registros.component.html',
  styleUrls: ['./verificar-registros.component.css'],
})
export class VerificarRegistrosComponent implements OnInit {
  form?: FormGroup;
  codigo?: string;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registrosService: RegistrosService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (!params['codigo']) return;
      this.codigo = params['codigo'];
    });

    this.form = this.fb.group({
      codigo: [this.codigo || '', Validators.required],
    });
  }

  async verificar() {
    try {
      this.loading = true;
      const codigo = this.form?.get('codigo')?.value;
      if (!codigo) throw 'Por favor ingrese código de registro.';
      const respuesta = await this.registrosService.verificarRegistro(codigo);
      if (!respuesta?.done) throw 'Código no válido.';
      const { registro } = respuesta;
      const modal = this.modalService.open(VerRegistroComponent, {
        size: 'lg',
        animation: true,
      });
      modal.componentInstance.registro = registro;

      this.loading = false;
    } catch (error: any) {
      Swal.fire({ title: 'Atención', text: error, icon: 'warning', confirmButtonColor: '#0d6efd', showCloseButton: true});
      this.loading = false;
    }
  }
}

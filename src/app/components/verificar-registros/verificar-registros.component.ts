import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-verificar-registros',
  templateUrl: './verificar-registros.component.html',
  styleUrls: ['./verificar-registros.component.css']
})
export class VerificarRegistrosComponent implements OnInit {

  form?: FormGroup;
  codigo?: string;
  loading: boolean = false;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute) {
  
  }

  ngOnInit(){
    this.route.queryParams.subscribe(
      params => {
        if(!params["codigo"]) return;
        this.codigo = params["codigo"];
      }
    )

    this.form = this.fb.group({
      codigo: [this.codigo || '', Validators.required]
    });
  }


  verificar(){
    this.loading = true;
    setTimeout(()=> {this.loading = false
      console.log(this.form?.get('codigo')?.value);
    
    }, 700);
  }
}

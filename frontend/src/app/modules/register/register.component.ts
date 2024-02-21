import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage = '';
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
        this.errorMessage = 'La contraseña y la confirmación de contraseña no coinciden.';
        return;
      }
      this.authService.register(this.registerForm.value).subscribe(
        (data) => {
          this.toastr.success('¡Creado Correctamente!', 'OK');
          this.router.navigate(['login']);
        },
        (error) => {
          if (error) {
            this.errorMessage = "El correo electrónico ya está registrado.";
          } else {
            this.errorMessage = "Se produjo un error al procesar la solicitud.";
          }
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}

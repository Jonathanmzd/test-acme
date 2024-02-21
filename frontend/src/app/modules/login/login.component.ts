import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/vehiculos']);
          } else {
            this.errorMessage = data.message;
          }
        },
        (error) => {
            this.errorMessage = 'Error: No se pudo iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}

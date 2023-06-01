import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.http.get('http://localhost:3000/signupusers').subscribe(
        (res: any) => {
          // console.log(res);
          let user = res.find(
            (u: any) =>
              u.email == this.loginForm.value.email &&
              u.password == this.loginForm.value.password
          );
          if (user) {
            this.loginForm.reset();
            localStorage.setItem('token', 'token');
            this.router.navigate(['dashboard']);
          } else {
            alert('User not found');
          }
        },
        (err) => console.log(err)
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataRegister } from '../../interfaces/data-register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorRegister } from '../../interfaces/error-register';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { DataUserRegister } from '../../interfaces/data-user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  isLoading: boolean = false;

  public registerForm = this.formBuilder.group({
    name      : ['Josue', [Validators.required, Validators.minLength(2)]],
    lastname  : ['Gomez', [Validators.required, Validators.minLength(2)]],
    email     : ['jsegomez06@gmail.com', [Validators.required, Validators.email]],
    password  : ['Gnome$9900', [Validators.required, Validators.minLength(8)]],
    password2 : ['Gnome$9900', [Validators.required, Validators.minLength(8)]],
  });

  validateFields(field: string){
    return this.registerForm.get(field)?.invalid &&
           this.registerForm.get(field)?.touched;
  }

  confirmPassword(){
    const { password, password2 } = this.registerForm.value;
    return password != password2;
  }

  createUser(){
    if(this.registerForm.invalid){
      return this.registerForm.markAllAsTouched();
    }

    if(this.confirmPassword()){
      return;
    }

    this.isLoading = true;
    const data: DataRegister = this.registerForm.value;
    this.authService.register(data).subscribe(
      (response: any) => {
        const register: DataUserRegister = response;
        this.isLoading = false;
        if(register.user){
          this.router.navigate(['login']);
          localStorage.clear();
          this.showAlert();
        }else{
          const error: ErrorRegister = response;
          let messages: string = '';

          error.errors.forEach(
            err => {
              messages += `<li>${err.msg}</li>`
            }
          );

          this.throwMessages(messages);
        }
      }
    );
  }


  throwMessages(body: string){
    Swal.fire({
      title: 'Por favor revisar:',
      icon: 'error',
      html:
        '<ul>' +  body  + '</ul>',
      showCloseButton: true,
    })
  }

  showAlert(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro completado',
      text: 'puede iniciar sesión',
      showConfirmButton: true,
      timer: 4000
    })
  }



}

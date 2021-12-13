import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { DataLogin } from '../../interfaces/data-login';
import { AuthService } from '../../services/auth.service';
import { DataUser } from '../../interfaces/data-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataLocalStorage();
  }

  dataUserLocalStorage!: DataLogin;

  public formLogin = this.formBuilder.group({
    email     : ['', [Validators.required, Validators.email]],
    password  : ['', [Validators.required, Validators.minLength(8)]],
    remind    : [false, []]
  });

  validateFields(field: string){
    return this.formLogin.get(field)?.invalid &&
           this.formLogin.get(field)?.touched;
  }

  getDataLocalStorage(){
    this.dataUserLocalStorage = JSON.parse(localStorage.getItem('dataUser')!);

    if(this.dataUserLocalStorage){
      this.formLogin.setValue(this.dataUserLocalStorage);
    }
  }

  getTokenLogin() {
    if (this.formLogin.invalid) {
      return this.formLogin.markAllAsTouched();
    }

    const data: DataLogin = this.formLogin.value;

    this.authService.login(data).subscribe(
      (response) => {
        if(response.user){
          this.router.navigate(['/spaces']);
          this.saveDataLocalStorage(data, response);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }else{
          const res: any = response;
          this.throwMessages('error', res.message);
        }
      }
    );
  }

  saveDataLocalStorage(user: DataLogin, data: DataUser) {
    if (user.remind) {
      localStorage.setItem('dataUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('dataUser');
    }

    localStorage.setItem('dataUserToken', JSON.stringify(data));
  }

  throwMessages(state: SweetAlertIcon, message: string ){
    Swal.fire({
      position: 'center',
      icon: state,
      title: message,
      showConfirmButton: false,
      timer: 2500
    })
  }
}

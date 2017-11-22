import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AuthService } from '../../../_services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginFrm:FormGroup;
  error:string = '';
  loginModel:any = {};

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private frmBuilder:FormBuilder,
    private auth: AuthService  
  ) { 
      this.loginFrm = frmBuilder.group({
        'Email_Address': [null,Validators.required],
        'User_Password':[null,Validators.required],
      }) 
      this.loginFrm.valueChanges.subscribe(data => this.error = '');
    }

  ngOnInit() {

  }

  login(){
    this.auth.login(this.loginModel)
    .subscribe((response)=>this.router.navigate(['/home']),
      (error)=>this.error=error.msg);
  }

}


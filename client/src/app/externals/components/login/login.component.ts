import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { JNAuthenHelperSerivce } from '../../../share/services/authen-helper.service';

@Component({
  selector: 'login',
  template: `
    <div class="login-panel">
      <div class="jn-form inline">
        <label class="jn-form-label">登录名</label>
        <input type="text" class="jn-form-control" [(ngModel)]="credential.userName" />
      </div>
      <div class="jn-form inline">
        <label class="jn-form-label">密码</label>
        <input type="text" class="jn-form-control" [(ngModel)]="credential.password" />
      </div>
      <div class="jn-form">
        <button class="jn-btn warning" (click)="login()">登录</button>
      </div>
    </div>
  `,
  styles: [
    `
      .login-panel{
        width: 600px;
        margin: 50px auto;
        padding: 30px;
        border: solid 1px #ccc;
        border-radius: 10px;
      }
    `
  ]
})
export class LoginComponent{
  credential = {
    userName: 'beehive_admin',
    password: '1qaz2wsx'
  };

  constructor(
    private auth: JNAuthenHelperSerivce,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login() {
    let navigationExtras: NavigationExtras = {
      preserveQueryParams: true,
      preserveFragment: true
    };
    
    this.auth.login(this.credential)
      .then(() => {
        this.route.params.subscribe(params => {
          this.router.navigate([params['lan'], 'flow']);
        });
      });
  }
}
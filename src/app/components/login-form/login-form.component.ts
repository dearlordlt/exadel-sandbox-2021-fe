import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  username = '';
  password = '';
  isValidName = true;
  isValidPassword = true;
  isBtnEnabled = false;

  constructor() {}

  ngOnInit(): void {}

  onType(event: any) {
    if (event.target.id === 'input--username') {
      this.username = event.target.value;
      this.isValidName = this.username.match(/@exadel.com$/) ? true : false;
    }

    if (event.target.id === 'input--password') {
      this.password = event.target.value;
      this.isValidPassword = this.password.length > 5 ? true : false;
    }
    this.isBtnEnabled = this.isValidName && this.isValidPassword;
    console.log(this.isBtnEnabled);
  }

  onSubmit() {
    console.log(this.username);
    console.log(this.password);
  }
}

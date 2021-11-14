import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {}
  logout(){
    this.authenticationService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { USER } from '../../../../mock-user-info';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  fullName = `${USER.firstName} ${USER.lastName}`;
  userAvatar = USER.avatar;
  constructor() {}

  ngOnInit(): void {}
}

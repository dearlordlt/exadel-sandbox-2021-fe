import { Component, OnInit } from '@angular/core';
import { USER } from '../../../../mock-user-info';

@Component({
  selector: 'user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
})
export class UserDropdownMenuComponent implements OnInit {
  menuItems = USER.hasAccessTo;

  constructor() {}

  ngOnInit(): void {}
}

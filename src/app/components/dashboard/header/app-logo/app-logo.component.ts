import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss'],
})
export class AppLogoComponent implements OnInit {
  logoSource = 'https://bm.ge/uploads/news/5fca2f33d03c0.png';
  constructor() {}

  ngOnInit(): void {}
}

import {Component} from '@angular/core';

@Component({
  selector: 'app-logo',
  styleUrl: 'logo.scss',
  templateUrl: './logo.html',
  host: {
    'aria-hidden': 'true',
  },
})
export class AppLogo {}
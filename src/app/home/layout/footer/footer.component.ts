import { Component } from '@angular/core';
import { APP_INFO } from '../../../app-info';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly info = APP_INFO;
  public year: number = new Date().getFullYear();
}

import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BattnsComponent} from "../../companents/battns/battns.component";
import {FooterComponent} from "../../companents/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    BattnsComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

import {Component, inject} from '@angular/core';
import {ProductResponse} from "../../interfaces/product-response";
import {DecimalPipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  router = inject(Router);
  productservice = inject(ProductService);

  products : ProductResponse[] = [];
  demaxod : ProductResponse[] = [];
  aksesuar : ProductResponse[] = [];
  vintelatsiya : ProductResponse[] = [];
  gumbazlar : ProductResponse[] = [];
  profnastil : ProductResponse[] = [];

  constructor() {
    this.productservice.product({}).subscribe((data) =>{
      this.products = (data)
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].type == 'dimaxod') {
          this.demaxod.push(this.products[i]);
        }
        if (this.products[i].type == 'aksesuar') {
          this.aksesuar.push(this.products[i]);
        }
        if (this.products[i].type == 'vintelatsiya') {
          this.vintelatsiya.push(this.products[i]);
        }
        if (this.products[i].type == 'gumbazlar') {
          this.gumbazlar.push(this.products[i]);
        }
        if (this.products[i].type == 'profnastil') {
          this.profnastil.push(this.products[i]);
        }
      }
    });
  }
}

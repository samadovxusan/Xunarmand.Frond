import {Component, inject} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../interfaces/product-response";
import {FooterComponent} from "../../companents/footer/footer.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-turbalar',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    RouterOutlet,
    FooterComponent,
    NgIf
  ],
  templateUrl: './turbalar.component.html',
  styleUrl: './turbalar.component.scss'
})
export class TurbalarComponent {
  router = inject(Router);
  productservice = inject(ProductService);

  products : ProductResponse[] = [];
  turuba : ProductResponse[] = [];
  private decodeToken: any;
  private roles: any;
  private user: any;

  ngOnInit() {
    const userData = localStorage.getItem('token'); // Local storjdan foydalanuvchi ma'lumotlarini olish
    if (userData) {
      this.decodeToken = jwtDecode(userData); // Tokenni dekod qiling
      this.roles = this.decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const userRole = this.decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const username = this.decodeToken['UserName']; // 'name' yoki 'username' maydoni
      const email = this.decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; // ID maydoni
      const phone = this.decodeToken['Number'];

      this.user = { username, email, phone ,userRole};
      console.log(this.user)
    }
  }

  isAdmin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.userRole === 'Admin';
  }
  deleteProduct(productId: string): void {
    if (confirm('Bu mahsulotni o\'chirmoqchimisiz?')) {
      this.productservice.deleteProduct(productId).subscribe(response => {
        alert('Mahsulot o\'chirildi');
      });
    }
  }
  

  constructor() {
    this.productservice.product({}).subscribe((data) =>{
      this.products = (data)
      for (let i = 0; i < this.products.length; i++) {
        console.log(data)
        if (this.products[i].productName == 'TURUBA') {
          this.turuba.push(this.products[i]);
        }
      }
    });
  }
  openNewWindow(id: string){
    this.productservice.productID(id).subscribe((data) =>{
      this.router.navigate(['details/'+ data.id]);
      return data;
    });
  }
}

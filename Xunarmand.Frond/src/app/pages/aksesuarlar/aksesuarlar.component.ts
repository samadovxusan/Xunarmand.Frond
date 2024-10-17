import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CardsComponent} from "../cards/cards.component";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../interfaces/product-response";
import {FooterComponent} from "../../companents/footer/footer.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-aksesuarlar',
  standalone: true,
  imports: [
    RouterOutlet,
    CardsComponent,
    DecimalPipe,
    NgForOf,
    FooterComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './aksesuarlar.component.html',
  styleUrl: './aksesuarlar.component.scss'
})
export class AksesuarlarComponent {
  router = inject(Router);
  productservice = inject(ProductService);

  products : ProductResponse[] = [];
  aksesuar : ProductResponse[] = [];
  newid : string = "";
  private decodeToken: any;
  private roles: any;
  user: any = null;
  constructor() {
    this.productservice.product({}).subscribe((data) =>{
      this.products = (data)
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].productName == 'AKSESSUAR') {
          this.aksesuar.push(this.products[i]);
        }
      }
    });
  }

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

  openNewWindow(id: string){
    this.productservice.productID(id).subscribe((data) =>{
      this.router.navigate(['details/'+ data.id]);
      return data;
    });
  }
}

import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CardsComponent} from "../cards/cards.component";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../interfaces/product-response";
import {FooterComponent} from "../../companents/footer/footer.component";
import {jwtDecode} from "jwt-decode";
import {MatDialog} from "@angular/material/dialog";
import {UserInfoModalComponent} from "../../companents/user-info-modal/user-info-modal.component";
import {AddProductComponent} from "../../companents/add-product/add-product.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-profnastillar',
  standalone: true,
  imports: [
    RouterOutlet,
    CardsComponent,
    DecimalPipe,
    NgForOf,
    FooterComponent,
    NgIf,
    MatIcon,
    RouterLink,
    MatIconButton,
    MatToolbar
  ],
  templateUrl: './profnastillar.component.html',
  styleUrl: './profnastillar.component.scss'
})
export class ProfnastillarComponent {


  menuOpen = false;
  isOpen = false;
  private selectedLanguage: string;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  showUserInfo() {
    // Agar foydalanuvchi mavjud bo'lsa, malumotlarni ko'rsatadi
    if (this.user) {
      console.log('Foydalanuvchi ma\'lumotlari mavjud');
      this.dialog.open(UserInfoModalComponent, {
        data: this.user, // Foydalanuvchi ma'lumotlarini modalga o'tkazish
      });
    } else {
      console.log('Foydalanuvchi ma\'lumotlari mavjud emas');
      this.router.navigate(['/register']);
    }
  }
  logout() {
    localStorage.removeItem('token');
  }


  openAddProductDialog() {
    this.dialog.open(AddProductComponent, {
      width: '400px', // Modal oynaning kengligi
    });
  }
  selectedLanguageName: string = 'Uz';


  toggleDropdown() {
    this.isOpen = !this.isOpen; // Dropdownni ochish/yopish
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.selectedLanguageName = lang === 'uz' ? 'Uz' : lang === 'en' ? 'En' : 'Ru';
    this.isOpen = false; // Til o'zgartirilgandan so'ng dropdownni yopish
  }





  router = inject(Router);
  productservice = inject(ProductService);

  products : ProductResponse[] = [];
  profnastil : ProductResponse[] = [];
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


  constructor(private dialog: MatDialog) {
    this.productservice.product({}).subscribe((data) =>{
      this.products = (data)
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].productName == 'PROFNASTIL') {
          this.profnastil.push(this.products[i]);
        }
      }
    });
    this.selectedLanguage = 'uz';
  }
  openNewWindow(id: string) {
    this.productservice.productID(id).subscribe((data) => {
      this.router.navigate(['details/' + data.id]);
      return data;
    });
  }
}

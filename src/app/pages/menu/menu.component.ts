import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../../companents/navbar/navbar.component";
import {MatChipsModule} from '@angular/material/chips';
import {BattnsComponent} from "../../companents/battns/battns.component";
import {FooterComponent} from "../../companents/footer/footer.component";
import {MatDialog} from "@angular/material/dialog";
import {jwtDecode} from "jwt-decode";
import {UserInfoModalComponent} from "../../companents/user-info-modal/user-info-modal.component";
import {AddProductComponent} from "../../companents/add-product/add-product.component";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatChipsModule,
    BattnsComponent,
    FooterComponent,
    MatIcon,
    MatToolbar,
    RouterLink,
    NgIf,
    MatIconButton
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',


})
export class MenuComponent {
  menuOpen = false;
  isOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



  user: any = null;
  decodeToken : any | null;
  roles : string = '';
  router = inject(Router);
  constructor(private dialog: MatDialog) {
    this.selectedLanguage = 'uz'; // Dastlabki til

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

      this.user = { username, email, phone ,userRole,};
    }
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
  isAdmin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.userRole === 'Admin';
  }
  openAddProductDialog() {
    this.dialog.open(AddProductComponent, {
      width: '400px', // Modal oynaning kengligi
    });
  }
  selectedLanguage: any;
  selectedLanguageName: string = 'Uz';


  toggleDropdown() {
    this.isOpen = !this.isOpen; // Dropdownni ochish/yopish
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.selectedLanguageName = lang === 'uz' ? 'Uz' : lang === 'en' ? 'En' : 'Ru';
    this.isOpen = false; // Til o'zgartirilgandan so'ng dropdownni yopish
  }

}

import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import { MatDialog } from '@angular/material/dialog';

import {UserInfoModalComponent} from "../user-info-modal/user-info-modal.component";
import {MatMenu} from "@angular/material/menu";
import { CommonModule } from '@angular/common';
import {AddProductComponent} from "../add-product/add-product.component";  // Buni qo'shing!

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenu,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

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

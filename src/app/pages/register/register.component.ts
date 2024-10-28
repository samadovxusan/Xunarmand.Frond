import {Component, inject, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {AuthService} from "../../../services/auth.service";
import {jwtDecode} from "jwt-decode";
import {FooterComponent} from "../../companents/footer/footer.component";
import {UserInfoModalComponent} from "../../companents/user-info-modal/user-info-modal.component";
import {AddProductComponent} from "../../companents/add-product/add-product.component";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,
    RouterLink,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule, RouterOutlet, FooterComponent, NgIf, MatIconButton, MatToolbar,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.html'
})
export class RegisterComponent implements  OnInit{
  authservice = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form !: FormGroup;
  fb = inject(FormBuilder);

  decodeToken : any | null;
  token  = 'token'
  roles : string = '';
  true : boolean = true;

  response : boolean = false;
  user : any = null;



  register() {
    this.authservice.register(this.form.value).subscribe({
      next: (response) => {
        if (response) {  // Fix this.true to true
          this.router.navigate(['/login']);
        }
      }
    });
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/),Validators.maxLength(9)]], // 10 ta raqamdan iborat telefon raqami
    });
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
  menuOpen = false;
  isOpen = false;
  selectedLanguage: string | undefined;

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

constructor(private dialog: MatDialog) {
  this.selectedLanguage = 'uz'; // Dastlabki til
}
  openAddProductDialog() {
    this.dialog.open(AddProductComponent, {
      width: '400px', // Modal oynaning kengligi
    });
  }
  selectedLanguageName: string = 'Uz';

  isAdmin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.userRole === 'Admin';
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen; // Dropdownni ochish/yopish
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.selectedLanguageName = lang === 'uz' ? 'Uz' : lang === 'en' ? 'En' : 'Ru';
    this.isOpen = false; // Til o'zgartirilgandan so'ng dropdownni yopish
  }


}
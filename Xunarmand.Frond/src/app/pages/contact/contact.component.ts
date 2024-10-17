import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../companents/footer/footer.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {jwtDecode} from "jwt-decode";
import {UserInfoModalComponent} from "../../companents/user-info-modal/user-info-modal.component";
import {AddProductComponent} from "../../companents/add-product/add-product.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    MatIcon,
    MatIconButton,
    MatToolbar,
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  menuOpen = false;
  isOpen = false;
  contactForm: FormGroup;
   authService = inject(AuthService);
   str : string = '';




  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



  user: any = null;
  decodeToken : any | null;
  roles : string = '';
  router = inject(Router);
  constructor(private dialog: MatDialog,private http: HttpClient) {
    this.selectedLanguage = 'uz'; // Dastlabki til
    this.contactForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')
      ]),
      message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });}

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.str = formData.fullName + ' ' + formData.phoneNumber + '  ' + '--->' + ' ' + formData.message;

      this.authService.sendmessage(this.str).subscribe(
        (response) => {
          console.log('Message sent successfully', response);
          this.contactForm.reset();
        },
        (error) => {
          console.error('Error sending message', error);
        }
      );
    }
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

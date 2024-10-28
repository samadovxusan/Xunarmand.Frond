import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../interfaces/product-response";
import {FooterComponent} from "../../companents/footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {AksesuarlarComponent} from "../aksesuarlar/aksesuarlar.component";
import {routes} from "../../app.routes";
import {AuthService} from "../../../services/auth.service";
import {jwtDecode} from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SendmessageRespons} from "../../interfaces/sendmessage-respons";
import {Sendmessage} from "../../interfaces/sendmessage";
import { Observable } from 'rxjs';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {UserInfoModalComponent} from "../../companents/user-info-modal/user-info-modal.component";
import {AddProductComponent} from "../../companents/add-product/add-product.component";

@Component({
  selector: 'app-newproduct',
  standalone: true,
  imports: [
    FooterComponent,
    NgForOf,
    RouterLink,
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatToolbar,
    NgIf
  ],
  templateUrl: './newproduct.component.html',
  styleUrl: './newproduct.component.scss'
})
export class NewproductComponent implements OnInit {
  private selectedLanguage: string;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute ,private dialog: MatDialog) {
    this.selectedLanguage = 'uz';
  }

  aksesuar : ProductResponse[] = []
  authService = inject(AuthService)
  productid : string | null = "";
  router = inject(Router);
  productservice = inject(ProductService)
  // aksesuarlar = inject(AksesuarlarComponent)


  decodeToken : any | null;
  user: any = null;
  token  = 'token'
  roles : string = '';
  str : string = '';

  menuOpen = false;
  isOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



  onBuyNow() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.decodeToken = jwtDecode(storedToken); // Tokenni dekod qiling
      this.roles = this.decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const username = this.decodeToken['UserName']; // 'name' yoki 'username' maydoni
      const id = this.decodeToken['Id']; // ID maydoni
      const phone = this.decodeToken['Number'];

      this.str = username + ' ' + ' ' + phone + '  ' + '--->' + ' ' + this.aksesuar[0].productName +' ' + 'Qiziqish bildirdi';
      this.authService.sendmessage(this.str)
      .subscribe(
        (response: any) => {
          console.log('Xabar yuborildi:', response);
          });



      // Chiroyli xabar ko'rsatish
      this.snackBar.open('Sizga tez orada aloqaga chiqishadi!', 'Yopish', {
        duration: 3000, // 3 soniya davomida ko'rsatish
        verticalPosition: 'top', // O'ngdan yuqoriga
        horizontalPosition: 'end', // O'ng tarafda
        panelClass: ['custom-snackbar'] // Yangi CSS sinfi
      });

      this.router.navigate(['/menu']);
    } else {
      // Token topilmasa
      this.snackBar.open('Ro\'yxatdan o\'ting!', 'Yopish', {
        duration: 3000, // 3 soniya davomida ko'rsatish
        verticalPosition: 'top',
        horizontalPosition: 'end', // O'ng tarafda
        panelClass: ['custom-snackbar'] // Yangi CSS sinfi
      });

      this.router.navigate(['/register']);
    }
  }

  ngOnInit(): void {
    // URL dan ID ni olish
    this.route.params.subscribe(params => {this.productid = params['id'];
    this.productservice.productID(this.productid).subscribe((data) =>{
      this.aksesuar.push(data)
    })
    });
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

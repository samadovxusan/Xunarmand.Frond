import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../interfaces/product-response";
import {FooterComponent} from "../../companents/footer/footer.component";
import {NgForOf} from "@angular/common";
import {AksesuarlarComponent} from "../aksesuarlar/aksesuarlar.component";
import {routes} from "../../app.routes";
import {AuthService} from "../../../services/auth.service";
import {jwtDecode} from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SendmessageRespons} from "../../interfaces/sendmessage-respons";
import {Sendmessage} from "../../interfaces/sendmessage";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newproduct',
  standalone: true,
  imports: [
    FooterComponent,
    NgForOf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './newproduct.component.html',
  styleUrl: './newproduct.component.scss'
})
export class NewproductComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute) {}

  aksesuar : ProductResponse[] = []
  authService = inject(AuthService)
  productid : string | null = "";
  router = inject(Router);
  productservice = inject(ProductService)
  // aksesuarlar = inject(AksesuarlarComponent)


  decodeToken : any | null;
  token  = 'token'
  roles : string = '';
  str : string = '';


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
}

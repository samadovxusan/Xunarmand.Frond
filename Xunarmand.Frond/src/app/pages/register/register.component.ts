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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,
    RouterLink,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule, RouterOutlet, FooterComponent,],
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
  }

}

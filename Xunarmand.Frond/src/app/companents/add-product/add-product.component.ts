import {Component, inject, Type} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {CreateProduct} from "../../interfaces/CreateProduct";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInput,
    MatButton,
    MatFormFieldModule

  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm: FormGroup;
  router = inject(Router);
  authService = inject(AuthService);
  productTypes = Type;
  selectedFile: File | null = null;
  CreateProduct: CreateProduct = {
    productName: '',
    productType: 0,
    description: '',
    price: 0,
    imageUrl: this.selectedFile,
    imageUrlPath: '',
  };


  constructor(private fb: FormBuilder) {
    // Forma yaratilmoqda
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productType: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // faqat raqamlarni qabul qiladi
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [''] ,// Fayl yuklash uchun form-kontrol
      imageUrlPath: ['']
    });
  }

  // Fayl tanlanganda chaqiriladigan funksiya
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Formani submit qilish
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('productType', this.productForm.get('productType')?.value.toString());
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value.toString());
      formData.append('imageUrlPath', this.productForm.get('imageUrlPath')?.value);

      if (this.selectedFile) {
        formData.append('imageUrl', this.selectedFile);
      }
      this.CreateProduct = {
        productName: this.productForm.get('productName')?.value,
        productType: Number(this.productForm.get('productType')?.value),
        description: this.productForm.get('description')?.value,
        price: Number(this.productForm.get('price')?.value),
        imageUrl: this.selectedFile,
        imageUrlPath: this.productForm.get('imageUrlPath')?.value,
      };

        console.log('Yuborilayotgan ma\'lumotlar:', this.productForm.value);  // Konsolda ko'rish
    console.log('Yuborilayotgan ma\'lumotlar:', this.CreateProduct);  // Konsolda ko'rish

        this.authService.addproduct(this.CreateProduct).subscribe({
          next: (response) => {
            console.log('Muvaffaqiyatli:', response);
          },
          error: (errorResponse) => {
            console.error('Xato:', errorResponse);
            if (errorResponse.error && errorResponse.error.errors) {
              console.log('Validatsiya xatolari:', errorResponse.error.errors);  // API'dan kelgan xatolarni ko'rsatish
            }
          }
        });

  }

}

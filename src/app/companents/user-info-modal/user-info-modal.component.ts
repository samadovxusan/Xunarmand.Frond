import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-user-info-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.scss'
})
export class UserInfoModalComponent {
  isVisible = true; // Modalni ko'rsatish uchun o'zgaruvchi

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserInfoModalComponent>
  ) {}

  close() {
    this.isVisible = false; // Modalni yopish
    setTimeout(() => this.dialogRef.close(), 300); // 300msdan keyin dialogni yopish
  }
  logout() {
    localStorage.removeItem('token');
    setTimeout(() => this.dialogRef.close(), 300);
  }
}

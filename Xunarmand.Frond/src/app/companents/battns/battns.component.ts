import {Component, signal} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {NgIf} from "@angular/common";

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-battns',
  standalone: true,
  imports: [MatChipsModule, CdkDropList, MatIcon, MatIconButton, RouterLink, RouterOutlet, FooterComponent, NgIf],
  templateUrl: './battns.component.html',
  styleUrl: './battns.component.scss'
})

export class BattnsComponent {

  readonly vegetables = signal<Vegetable[]>([
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},



  ]);
  drop(event: CdkDragDrop<Vegetable[]>) {
    this.vegetables.update(vegetables => {
      moveItemInArray(vegetables, event.previousIndex, event.currentIndex);
      return [...vegetables];
    });
  }
  constructor() {
    this.selectedLanguage = 'uz';
  }
  selectedLanguage: any;
  selectedLanguageName: string = 'Uz';
  isOpen = false;

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.selectedLanguageName = lang === 'uz' ? 'Uz' : lang === 'en' ? 'En' : 'Ru';
    this.isOpen = false; // Til o'zgartirilgandan so'ng dropdownni yopish
  }

}

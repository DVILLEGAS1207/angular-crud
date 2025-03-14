import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-bestsellingwidget',
  imports: [ButtonModule, MenuModule],
  templateUrl: './bestsellingwidget.component.html',
  styleUrl: './bestsellingwidget.component.css',
})
export class BestsellingwidgetComponent {
  menu = null;

  items = [
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' },
  ];
}

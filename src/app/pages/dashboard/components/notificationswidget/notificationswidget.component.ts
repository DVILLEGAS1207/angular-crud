import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-notificationswidget',
  imports: [ButtonModule, MenuModule],
  templateUrl: './notificationswidget.component.html',
  styleUrl: './notificationswidget.component.css',
})
export class NotificationswidgetComponent {
  items = [
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' },
  ];
}

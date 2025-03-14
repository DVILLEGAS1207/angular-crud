import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../../services/layout.service';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-topbar',
  imports: [
    RouterModule,
    CommonModule,
    ConfiguratorComponent,
    StyleClassModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}

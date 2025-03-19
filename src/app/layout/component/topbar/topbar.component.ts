import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../../services/layout.service';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../../services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  imports: [
    RouterModule,
    CommonModule,
    ConfiguratorComponent,
    StyleClassModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  items!: MenuItem[];

  userOptions: any[] = [{ label: 'Cerrar sesión', icon: 'pi pi-sign-out' }];

  selectedOption: any;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
  onOptionChange(event: any): void {
    if (event.value.label === 'Cerrar sesión') {
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

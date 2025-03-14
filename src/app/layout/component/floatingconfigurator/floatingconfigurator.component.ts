import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floatingconfigurator',
  imports: [
    CommonModule,
    ButtonModule,
    StyleClassModule,
    ConfiguratorComponent,
  ],
  templateUrl: './floatingconfigurator.component.html',
  styleUrl: './floatingconfigurator.component.css',
})
export class FloatingconfiguratorComponent {
  LayoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}

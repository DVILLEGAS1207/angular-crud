import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatingconfiguratorComponent } from '../../layout/component/floatingconfigurator/floatingconfigurator.component';

@Component({
  selector: 'app-notfound',
  imports: [RouterModule, FloatingconfiguratorComponent, ButtonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent {}

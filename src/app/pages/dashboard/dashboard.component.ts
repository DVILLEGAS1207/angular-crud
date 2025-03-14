import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatswidgetComponent } from './components/statswidget/statswidget.component';
import { RecentsaleswidgetComponent } from './components/recentsaleswidget/recentsaleswidget.component';
import { BestsellingwidgetComponent } from './components/bestsellingwidget/bestsellingwidget.component';
import { RevenuestreamwidgetComponent } from './components/revenuestreamwidget/revenuestreamwidget.component';
import { NotificationswidgetComponent } from './components/notificationswidget/notificationswidget.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule,
    StatswidgetComponent,
    RecentsaleswidgetComponent,
    BestsellingwidgetComponent,
    RevenuestreamwidgetComponent,
    NotificationswidgetComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}

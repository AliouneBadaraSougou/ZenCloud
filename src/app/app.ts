import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmationGlobaleComponent } from './components/confirmation-globale/confirmation-globale.component';
import { SaisieGlobaleComponent } from './components/saisie-globale/saisie-globale.component';
import { ChargementGlobalComponent } from './components/chargement-global/chargement-global.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, ConfirmationGlobaleComponent, SaisieGlobaleComponent, ChargementGlobalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('gestionnaire-fichiers');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Le service de thème s'initialise automatiquement
  }
}

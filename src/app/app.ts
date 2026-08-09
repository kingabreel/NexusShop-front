import { Component, signal, effect, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { filter } from 'rxjs';
import { MatIcon } from "@angular/material/icon";
import { Chat } from "./components/chat/chat";
import { ThemeStore } from "./shared/store/theme.store";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatIcon, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NexusShop-fe');
  private themeStore = inject(ThemeStore);
  private router = inject(Router);

  showHeader = true;
  chatbotOpen = false;

  constructor() {
    effect(() => {
      const isDark = this.themeStore.isDarkMode();
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });

    this.themeStore.initTheme();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;
        this.showHeader = currentRoute !== '/auth';
      });
  }

  ngOnInit() {
  }

  openChat(): void {
    this.chatbotOpen = true;
  }

  closeChat(): void {
    this.chatbotOpen = false;
  }
}

import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { filter } from 'rxjs';
import { MatIcon } from "@angular/material/icon";
import { Chat } from "./components/chat/chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatIcon, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NexusShop-fe');

  showHeader = true;
  chatbotOpen = false;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        const currentRoute = this.router.url;

        this.showHeader = currentRoute !== '/auth';
      });
  }

  openChat(): void {
    this.chatbotOpen = true;
  }

  closeChat(): void {
    this.chatbotOpen = false;
  }
}
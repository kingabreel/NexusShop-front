import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../shared/interface/user';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../shared/service/auth-service';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: User = {
    id: -1,
    username: '',
    email: '',
    cellphone: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  };

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (resp) => {
        const user = resp.data as any as User;
        this.user = user;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load user profile:', error);
      }
    });
  }

}

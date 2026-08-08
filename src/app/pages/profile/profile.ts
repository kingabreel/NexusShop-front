import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../shared/interface/user';
import { Store } from '../../shared/interface/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/service/auth-service';
import { StoreService } from '../../shared/service/store-service';
import { ProductCard } from '../../components/cards/product-card/product-card';
import { StoreFormDialog } from '../../shared/components/store-form-dialog/store-form-dialog';

@Component({
    selector: 'app-profile',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        ProductCard
    ],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class Profile implements OnInit {
    user: User = {
        id: -1,
        username: '',
        email: '',
    };

    store: Store | null = null;
    loadingStore = false;

    constructor(
        private authService: AuthService,
        private storeService: StoreService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.authService.me().subscribe({
            next: (resp) => {
                this.user = resp.data as any as User;

                if (this.user.store) {
                    this.store = this.user.store;
                } else {
                    this.loadStore();
                }

                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to load user profile:', error);
            }
        });
    }

    loadStore(): void {
        this.loadingStore = true;
        this.storeService.getMyStore().subscribe({
            next: (resp) => {
                this.store = resp.data as any as Store;
                this.loadingStore = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to load store:', error);
                this.loadingStore = false;
                this.cdr.detectChanges();
            }
        });
    }

    openCreateStoreDialog(): void {
        const dialogRef = this.dialog.open(StoreFormDialog, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.createStore(result);
            }
        });
    }

    createStore(data: any): void {
        this.loadingStore = true;
        this.storeService.create(data).subscribe({
            next: (store: Store) => {
                this.store = store;
                this.loadingStore = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to create store:', error);
                this.loadingStore = false;
                this.cdr.detectChanges();
            }
        });
    }
}

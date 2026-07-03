import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/service/product-service';
import { Product } from '../../shared/interface/product';
import { RatingService } from '../../shared/service/rating-service';
import { Rating as RatingDto } from '../../shared/interface/rating';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rating',
  imports: [MatIconModule, FormsModule],
  templateUrl: './rating.html',
  styleUrl: './rating.css',
})
export class Rating implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private ratingService: RatingService,
    private snackBar: MatSnackBar,
  ) {}

  stars = [1, 2, 3, 4, 5];
  rating = 0;
  ratingLabels = ['', 'Péssimo', 'Ruim', 'Regular', 'Bom', 'Muito bom'];
  isAnonymous = false;
  product: Product | undefined;
  imageBase64?: string;
  comment?: string;

  setRating(value: number, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const width = target.offsetWidth;
    const clickX = event.offsetX; 

    const isHalf = clickX < width / 2; 
    const newValue = isHalf ? value - 0.5 : value;

    if (this.rating === newValue) {
      this.rating = 0;
    } else {
      this.rating = newValue;
    }
  }

  getStarType(star: number): 'full' | 'half' | 'empty' {
    if (this.rating >= star) {
      return 'full';
    } else if (this.rating >= star - 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  }

  get ratingLabel() {
    return this.ratingLabels[Math.ceil(this.rating)];
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imageBase64 = reader.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getById(productId).subscribe({
        next: (response) => {
          this.product = (response as any).data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('erro:', err);
        },
      });
    }
  }

  submitReview() {
    const novoRating: RatingDto = {
      productId: this.product!.id,
      rating: this.rating,
      comment: this.comment,
      anonymous: this.isAnonymous,
      imageBase64: this.imageBase64,
    };

    this.ratingService.create(novoRating).subscribe({
      next: (response) => {
        this.snackBar.open('Review submitted successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.snackBar.open('Error sending review. Please try again', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}

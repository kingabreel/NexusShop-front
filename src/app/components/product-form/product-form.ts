import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../shared/service/product-service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent {

  form: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      originalPrice: [0, Validators.required],
      rating: [0],
      imgUrl: ['', Validators.required],
      tags: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const product = {
      ...this.form.value,
      tags: this.form.value.tags
        ?.split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag)
    };

    this.productService.create(product).subscribe({
      next: () => {
        this.loading = false;
        this.form.reset();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
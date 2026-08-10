import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-store-form-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    templateUrl: './store-form-dialog.html',
    styleUrl: './store-form-dialog.css'
})
export class StoreFormDialog {
    form: FormGroup;
    categories = [
        { value: 'ELETRONICOS', label: 'Eletrônicos' },
        { value: 'ROUPAS', label: 'Roupas' },
        { value: 'ALIMENTOS', label: 'Alimentos' },
        { value: 'MOVEIS', label: 'Móveis' },
        { value: 'ACESSORIOS', label: 'Acessórios' },
        { value: 'ELETRODOMESTICOS', label: 'Eletrodomésticos' }
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<StoreFormDialog>
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            tags: [[], Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.dialogRef.close(this.form.value);
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}

import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../core/services/payment.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-payment-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './payment-form.html',
  styleUrls: ['./payment-form.scss'],
})
export class PaymentForm {

  form: FormGroup;
  paymentId?: number;
  isEdit = false;
  currencies = ['USD', 'EUR', 'INR', 'GBP'];

  constructor(
    private fb: FormBuilder,
    private service: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      currency: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.paymentId = +id;
      debugger
      this.service.getById(this.paymentId).subscribe(payment => {
        this.form.patchValue({
          amount: payment.amount,
          currency: payment.currency
        });
      });
    }
  }



  save() {
    if (this.form.invalid) return;

    if (this.isEdit && this.paymentId) {
      this.service.update(this.paymentId, this.form.value).subscribe(() => {
        this.snackBar.open('Payment updated successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/']);
      });
    } else {
      const payload = {
        ...this.form.value,
        clientRequestId: crypto.randomUUID()
      };

      this.service.create(payload).subscribe(() => {
        this.snackBar.open('Payment added successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/']);
      });
    }
  }

  deletePayment() {
    if (!this.paymentId) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this payment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "false") {
        this.service.delete(this.paymentId!).subscribe(() => {
          this.snackBar.open('Payment deleted successfully', 'Close', {
            duration: 3000
          });

          this.router.navigate(['/']); // back to list
        });
      }
    });
  }


  onCancel() {
    this.router.navigate(['/']);
  }

}

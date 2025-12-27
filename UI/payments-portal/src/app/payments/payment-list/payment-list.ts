import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Payment } from '../../core/models/payment.model';
import { PaymentService } from '../../core/services/payment.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';


@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './payment-list.html',
  styleUrls: ['./payment-list.scss']
})
export class PaymentListComponent implements OnInit {

  displayedColumns: string[] = [
    'reference',
    'amount',
    'currency',
    'createdAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<Payment>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: PaymentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.service.getAll().subscribe(data => {
      this.dataSource.data = data;

      // paginator + sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // custom filter (search across columns)
      this.dataSource.filterPredicate = (data: Payment, filter: string) => {
        const value = filter.trim().toLowerCase();
        return (
          data.reference.toLowerCase().includes(value) ||
          data.currency.toLowerCase().includes(value) ||
          data.amount.toString().includes(value)
        );
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this payment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!="false") {
        this.service.delete(id).subscribe(() => {
          this.dataSource.data =
            this.dataSource.data.filter(p => p.id !== id);

          this.snackBar.open('Payment deleted', 'Close', {
            duration: 3000
          });
        });
      }
    });
  }
}

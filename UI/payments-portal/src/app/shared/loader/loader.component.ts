import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoaderService } from "../../core/services/loader.service";

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    template: `
  <div *ngIf="loader.loading$ | async" class="overlay">
    <div class="backdrop"></div>
    <mat-spinner></mat-spinner>
  </div>
  `,
    styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      pointer-events: none;
    }
    .overlay .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.12);
      pointer-events: auto;
    }
    mat-spinner {
      z-index: 2001;
      pointer-events: auto;
    }
    `]
})
export class LoaderComponent {
    constructor(public loader: LoaderService) { }
}

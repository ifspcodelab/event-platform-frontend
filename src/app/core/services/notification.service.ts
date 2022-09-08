import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 5000 })
  }

  error(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 5000 })
  }

  successTop(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' })
  }

  errorTop(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' })
  }
}

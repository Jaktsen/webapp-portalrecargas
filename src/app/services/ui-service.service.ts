import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private dialog: MatDialog) { }

  openPopup(data) {
    this.dialog.open(DialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '296px',
      disableClose: true,
      data,
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });
   }
}

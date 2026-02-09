import { PopupService } from './../../services/popup.service';
import { MethodsService } from './../../services/methods.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum ButtonBehavior {
  Reload = 1,
  ResetCategories = 2,
  SimplyClose = 3,
  SimplyCloseAndResetProducts = 4
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  enabled = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private ms: MethodsService,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit() {
    if (this.passedData.buttonMessage == null) {
      (document.getElementsByClassName('mat-dialog-container')[0] as HTMLElement).style.padding = '16px 28px 24px';
    }
  }

  closeDialog() {
    this.enabled = false;
    switch (this.passedData.mainButtonBehavior) {
      case ButtonBehavior.SimplyClose:
        console.log('i will simply close');
        this.dialogRef.close();
        break;
      case ButtonBehavior.SimplyCloseAndResetProducts:
        console.log('i will simply close and resett');
        this.dialogRef.close();
        this.popupService.changeState(true)
        break;
      case ButtonBehavior.ResetCategories:
        console.log('i will reset categories');
        this.popupService.changeMessage('go_back');
        this.dialogRef.close();
        break;
      case ButtonBehavior.Reload:
        console.log('i will reload');
        this.ms.reloadPortal();
        break;
      default:
        break;
    }
  }
}

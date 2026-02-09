import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-pop',
  templateUrl: './snack-bar-pop.component.html',
  styleUrls: ['./snack-bar-pop.component.scss']
})
export class SnackBarPopComponent implements OnInit {

  constructor(
    public sbRef: MatSnackBarRef<SnackBarPopComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit() {}
}

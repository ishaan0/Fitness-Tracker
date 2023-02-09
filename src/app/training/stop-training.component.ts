import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CurrentTrainingComponent } from "./current-training/current-training.component";

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <div mat-dialog-content>
              <p>You already got {{data.progress}}%</p>
            </div>
            <div mat-dialog-actions>
              <button mat-button (click)="onClose(true)">Yes</button>
              <button mat-button (click)="onClose(false)">No</button>
            </div>`,

})
export class StopTraining{
  constructor(public dialogRef: MatDialogRef<StopTraining>,
    @Inject(MAT_DIALOG_DATA) public data: CurrentTrainingComponent){}

  onClose(value: boolean){
    this.dialogRef.close(value) ;
  }
}

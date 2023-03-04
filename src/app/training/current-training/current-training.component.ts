import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTraining } from '../stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();

  progress: number = 0;
  timer!: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step =
      (this.trainingService.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      } else this.progress += 1;
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StopTraining, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancleExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}

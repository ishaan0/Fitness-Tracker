import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  excercises: Exercise[] = [];
  exercisesSubscription: Subscription;
  isLoading: boolean;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.exercisesSubscription =
      this.trainingService.exercisesChanged.subscribe((exercises) => {
        this.excercises = exercises;
        this.isLoading = false;
      });
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }
}

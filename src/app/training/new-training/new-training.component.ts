import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore'


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  excercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    // private db: AngularFirestore
  ) {}

  ngOnInit(): void {

    // this.excercises = this.trainingService.getAvailableExercise() ;
    // this.excercises = this.db.collection('availableExercises').valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}

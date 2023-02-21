import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercise: Exercise[] = [];

  private runningExercise: Exercise;

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...Object(doc.payload.doc.data()),
            };
          });
        })
      )
      .subscribe((resp) => {
        this.availableExercise = resp;
        this.exercisesChanged.next([...this.availableExercise]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(
      (ex) => ex.id == selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancleExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .pipe(map(exercises => {
        return exercises.map((exercise) => {
          return {
            ...Object(exercise),
            date: Object(exercise).date.toDate()
          }
        })
      }))
      .subscribe((exercises: Exercise[]) => this.finishedExercisesChanged.next(exercises));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}

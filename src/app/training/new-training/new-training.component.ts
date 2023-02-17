import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {


  excercises: Exercise[] ;


  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailableExercise() ;
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise) ;
  }

}

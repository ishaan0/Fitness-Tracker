import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>() ;

  excercises = [
    {value: 'lunges', viewValue: 'Lunges'},
    {value: 'pushups', viewValue: 'Pushups'},
    {value: 'squats', viewValue: 'Squats'},
    {value: 'burpees', viewValue: 'Burpees'},
  ]


  constructor() { }

  ngOnInit(): void {
  }

  onStartTraining(){
    this.trainingStart.emit() ;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass']
})
export class StartComponent implements OnInit {
  public testText = 'this is a test text';
  // @Output() testTextChange = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    console.log(`confirmed ${this.testText}`);
    this.router.navigate(['question'])
  }
}

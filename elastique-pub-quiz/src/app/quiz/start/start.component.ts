import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass']
})
export class StartComponent implements OnInit {
  characterName?: string;
  characterForm!: FormGroup;

  get name() {
    return this.characterForm!.get('name');
  }

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.characterName = this.gameService.getPlayerName();
    this.characterForm = new FormGroup({
      name: new FormControl(this.characterName, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit(event: Event): void {
    if (this.characterForm.valid) {
      this.gameService.setPlayerName(this.name?.value);
      this.gameService.startGame();
      this.router.navigate(['question']);
    } else {
      console.warn('tried to submit while form was not valid');
    }
  }
}

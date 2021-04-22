import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  totalVotes = 0;
  @Output() voteChanged = new EventEmitter<string>();

  
  constructor() {}

  ngOnInit(): void {}

  upVote() {
    this.totalVotes++;
    this.voteChanged.emit(this.totalVotes.toString());
  }

  downVote() {
    this.totalVotes--;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteComponent } from './vote.component';

fdescribe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1 ', () => {
    component.upVote();
    expect(component.totalVotes).toBe(1);
  });

  it('should raise voteChanged event when upvoted', () => {
    let totalVotes = '';
    component.voteChanged.subscribe((tv: string) => (totalVotes = tv));

    component.upVote();
    // ok expect(totalVotes).not.toBeNull();
    expect(totalVotes).toBe('1');
  });
});

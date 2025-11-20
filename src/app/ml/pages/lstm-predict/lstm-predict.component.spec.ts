import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstmPredict } from './lstm-predict';

describe('LstmPredict', () => {
  let component: LstmPredict;
  let fixture: ComponentFixture<LstmPredict>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LstmPredict]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LstmPredict);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

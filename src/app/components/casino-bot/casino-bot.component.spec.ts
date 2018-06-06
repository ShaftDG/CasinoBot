import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoBotComponent } from './casino-bot.component';

describe('CasinoBotComponent', () => {
  let component: CasinoBotComponent;
  let fixture: ComponentFixture<CasinoBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasinoBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

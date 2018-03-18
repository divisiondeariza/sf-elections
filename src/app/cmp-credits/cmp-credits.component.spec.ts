import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpCreditsComponent } from './cmp-credits.component';

describe('CmpCreditsComponent', () => {
  let component: CmpCreditsComponent;
  let fixture: ComponentFixture<CmpCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

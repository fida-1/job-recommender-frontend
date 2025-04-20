import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHomeComponent } from './full-home.component';

describe('FullHomeComponent', () => {
  let component: FullHomeComponent;
  let fixture: ComponentFixture<FullHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

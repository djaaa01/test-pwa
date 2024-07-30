import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitorComponent } from './capacitor.component';

describe('CapacitorComponent', () => {
  let component: CapacitorComponent;
  let fixture: ComponentFixture<CapacitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

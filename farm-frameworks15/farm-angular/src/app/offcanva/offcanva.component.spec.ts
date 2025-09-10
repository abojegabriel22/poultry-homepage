import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvaComponent } from './offcanva.component';

describe('OffcanvaComponent', () => {
  let component: OffcanvaComponent;
  let fixture: ComponentFixture<OffcanvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

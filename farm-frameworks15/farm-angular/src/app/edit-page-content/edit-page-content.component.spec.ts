import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageContentComponent } from './edit-page-content.component';

describe('EditPageContentComponent', () => {
  let component: EditPageContentComponent;
  let fixture: ComponentFixture<EditPageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPageContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

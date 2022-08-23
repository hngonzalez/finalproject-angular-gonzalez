import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentCoursesModalComponent } from './view-student-courses-modal.component';

describe('ViewStudentCoursesModalComponent', () => {
  let component: ViewStudentCoursesModalComponent;
  let fixture: ComponentFixture<ViewStudentCoursesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentCoursesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentCoursesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

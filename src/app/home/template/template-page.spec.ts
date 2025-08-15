import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePage } from './template-page';

describe('TemplateComponent', () => {
  let component: TemplatePage;
  let fixture: ComponentFixture<TemplatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

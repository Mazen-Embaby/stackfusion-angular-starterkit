import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCardPage } from './template-card.component';

describe('TemplateCardPage', () => {
  let component: TemplateCardPage;
  let fixture: ComponentFixture<TemplateCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateCardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

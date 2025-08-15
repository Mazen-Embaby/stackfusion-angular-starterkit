import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBPage } from './dashboard-b-page';

describe('DashboardBPage', () => {
  let component: DashboardBPage;
  let fixture: ComponentFixture<DashboardBPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

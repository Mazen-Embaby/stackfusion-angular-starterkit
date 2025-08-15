import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAPage } from './sign-in-a-page';

describe('SignInAPage', () => {
  let component: SignInAPage;
  let fixture: ComponentFixture<SignInAPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInAPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

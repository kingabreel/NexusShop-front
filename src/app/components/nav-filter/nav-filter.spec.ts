import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFilter } from './nav-filter';

describe('NavFilter', () => {
  let component: NavFilter;
  let fixture: ComponentFixture<NavFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

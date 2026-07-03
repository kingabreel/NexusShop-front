import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSeasonSale } from './banner-season-sale';

describe('BannerSeasonSale', () => {
  let component: BannerSeasonSale;
  let fixture: ComponentFixture<BannerSeasonSale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSeasonSale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSeasonSale);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

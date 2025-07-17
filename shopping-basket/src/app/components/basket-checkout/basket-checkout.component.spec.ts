import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketCheckoutComponent } from './basket-checkout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('BasketCheckoutComponent', () => {
  let component: BasketCheckoutComponent;
  let fixture: ComponentFixture<BasketCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketCheckoutComponent, HttpClientTestingModule],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
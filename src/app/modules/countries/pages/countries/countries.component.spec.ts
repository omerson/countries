import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CountriesComponent } from './countries.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CountriesComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'countries'`, () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('countries');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('countries app is running!');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliarMascotaComponent } from './afiliar-mascota.component';

describe('AfiliarMascotaComponent', () => {
  let component: AfiliarMascotaComponent;
  let fixture: ComponentFixture<AfiliarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliarMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiliarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

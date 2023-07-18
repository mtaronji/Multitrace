import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitraceComponent } from './Multitrace.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipGrid, MatChipInput, MatChipsModule } from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIcon, MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TickerService } from '../services/tickerservice';




describe('TickerFormComponent', () => {
  let component: MultitraceComponent;
  let fixture: ComponentFixture<MultitraceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultitraceComponent,
        MatFormField,
        MatLabel,
        MatAutocomplete,
        MatChipGrid,
        MatChipInput,
        MatAutocomplete,
        MatIcon,
        MatFormField
      ],
      imports:[
        ReactiveFormsModule, 
        FormsModule, 
        MatChipsModule, 
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(MultitraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});



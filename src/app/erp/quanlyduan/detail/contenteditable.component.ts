import { Component, ElementRef, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'app-contenteditable',
  template: `
    <div (blur)="onBlur($event)" contenteditable [innerText]="value">
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContenteditableComponent),
      multi: true
    }
  ]
})
export class ContenteditableComponent implements ControlValueAccessor, Validator {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur(event: any) {
    this.value = event.target.innerText;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  validate(control: any): { [key: string]: any } | null {
    // Optional: Add your custom validation logic here
    return null;
  }
}

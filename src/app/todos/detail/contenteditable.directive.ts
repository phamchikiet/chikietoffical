import { Directive, ElementRef, HostBinding, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Directive({
  selector: '[contenteditable]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ContenteditableDirective), multi: true }]
})
export class ContenteditableDirective implements ControlValueAccessor {
  @HostBinding('attr.contenteditable') contenteditable = true;
  @Input() innerValue: string = ''; // Optional initial value

  @Output() valueChange = new EventEmitter<string>();

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef) {}

  writeValue(value: string): void {
    this.innerValue = value ?? ''; // Set default value if empty
    this.el.nativeElement.textContent = this.innerValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const newValue = (event.target as HTMLDivElement).textContent || '';
    this.innerValue = newValue;
    this.valueChange.emit(newValue);
    this.onChange(newValue);
  }

  onBlur() {
    this.onTouched();
  }
}

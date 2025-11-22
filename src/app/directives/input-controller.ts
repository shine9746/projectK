import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputController]',
  standalone: false
})
export class InputController {
 @Input() inputType: string = ""
  onChange = (value: any) => { };
  onTouched = () => { };
  constructor(private elementRef: ElementRef<HTMLInputElement>) { }

  writeValue(value: any): void {
    let inputValue = "";
    if (this.inputType === "textOnly") {
      inputValue = this.textOnly(value);
    }
    else if(this.inputType === "numberOnly") {
      inputValue = this.numberOnly(value);
    }
    else{
      inputValue = value;
    }
    this.elementRef.nativeElement.value = inputValue;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    let inputValue = "";
    if (this.inputType === "textOnly") {
      inputValue = this.textOnly(value);
    }
    else if(this.inputType === "numberOnly") {
      inputValue = this.numberOnly(value);
    }
    else{
      inputValue = value;
    }
    this.elementRef.nativeElement.value = inputValue;
    this.onChange(inputValue);
  }

  textOnly(value: any) {
    let textOnly = value.toString().trimLeft()?.length ? value.replace(/[^A-Za-z ]/g, "") : "";
    textOnly = textOnly.charAt(0).toUpperCase() + textOnly.slice(1);
    return textOnly;
  }

  numberOnly(value: any) {
    const numberOnly = value.replace(/[^0-9]/g, "") ?? null;
    this.elementRef.nativeElement.value = numberOnly;
    return numberOnly;
  }

  @HostListener('blur')
  handleBlur() {
    this.onTouched();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../form.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  @ViewChild('form') form!: NgForm;
  formData: any;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.getFormData().subscribe((data) => {
      this.formData = data;
      let extraFields = { label: 'Professional Details', fields: data.fields };
      this.formData.formFields.push(extraFields);
      console.log(this.formData);
    });
  }

  onSubmit(formData: any): void {
    console.log(formData);
  }

  isNameInvalid(fieldName: string, fields: any): boolean {
    const namePattern = new RegExp(fields.validations.pattern);
    return (
      this.form &&
      this.form.controls[fieldName] &&
      this.form.controls[fieldName].value &&
      !namePattern.test(this.form.controls[fieldName].value)
    );
  }

  resetForm(): void {
    if (this.form) {
      this.form.resetForm();
    }
  }
}

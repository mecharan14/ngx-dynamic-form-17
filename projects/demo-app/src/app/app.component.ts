import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormConfig, FormFieldConfig, SupportedValidatorKeys } from '../../../ngx-dynamic-form-17/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formConfig: FormConfig = { fields: [] };
  selectedField: FormFieldConfig | null = null;
  form: FormGroup = new FormGroup({});
  fieldEditorForm: FormGroup;

  supportedFieldTypes = [
    'text', 'password', 'email', 'number', 'date', 'time', 'checkbox', 'radio',
    'file', 'tel', 'url', 'range', 'color', 'textarea', 'select'
  ];

  constructor(private fb: FormBuilder) {
    this.fieldEditorForm = this.fb.group({
      type: ['text'],
      name: ['', [Validators.required, Validators.minLength(1)]],
      label: ['', [Validators.required, Validators.minLength(1)]],
      position: [0],
      placeholder: [''],
      value: [''],
      options: this.fb.array([]),
      validators: this.fb.group({
        required: [false],
        minLength: [null],
        maxLength: [null],
        min: [null],
        max: [null],
        pattern: [''],
        email: [false],
        fileSize: [null],
        fileType: [''],
        url: [false]
      })
    });
  }

  get optionsArray() {
    return this.fieldEditorForm.get('options') as FormArray;
  }

  addOption() {
    this.optionsArray.push(this.fb.group({ key: [''], value: [''] }));
  }

  removeOption(index: number) {
    this.optionsArray.removeAt(index);
  }

  addField() {
    // Mark all fields as touched to show validation errors
    this.fieldEditorForm.markAllAsTouched();
    
    // Check if form is valid
    if (this.fieldEditorForm.invalid) {
      return;
    }

    // Check if field name already exists
    const fieldName = this.fieldEditorForm.get('name')?.value?.trim();
    if (this.formConfig.fields.some(field => field.name === fieldName)) {
      alert('Field name already exists. Please choose a different name.');
      return;
    }

    // Filter out null/empty validators
    const formValue = this.fieldEditorForm.value;
    const filteredValidators: any = {};
    
    Object.keys(formValue.validators).forEach(key => {
      const value = formValue.validators[key];
      if (value !== null && value !== undefined && value !== '' && value !== false) {
        filteredValidators[key] = value;
      }
    });

    const newField: FormFieldConfig = {
      type: formValue.type,
      name: fieldName,
      label: formValue.label?.trim(),
      placeholder: formValue.placeholder?.trim() || undefined,
      value: formValue.value || undefined,
      position: this.formConfig.fields.length,
      validators: Object.keys(filteredValidators).length > 0 ? filteredValidators : undefined,
      options: formValue.options && formValue.options.length > 0 ? formValue.options : undefined
    };

    this.formConfig.fields.push(newField);
    this.updatePositions();
    this.updateFormConfig();
    this.fieldEditorForm.reset({ 
      type: 'text', 
      validators: { 
        required: false, 
        minLength: null, 
        maxLength: null, 
        min: null, 
        max: null, 
        pattern: '', 
        email: false, 
        fileSize: null, 
        fileType: '', 
        url: false 
      } 
    });
    this.optionsArray.clear();
  }

  selectField(field: FormFieldConfig) {
    this.selectedField = field;
    this.fieldEditorForm.patchValue(field);
    this.optionsArray.clear();
    if (field.options) {
      field.options.forEach(option => {
        this.optionsArray.push(this.fb.group(option));
      });
    }
  }

  updateField() {
    if (this.selectedField) {
      // Mark all fields as touched to show validation errors
      this.fieldEditorForm.markAllAsTouched();
      
      // Check if form is valid
      if (this.fieldEditorForm.invalid) {
        return;
      }

      // Check if field name already exists (excluding current field)
      const fieldName = this.fieldEditorForm.get('name')?.value?.trim();
      if (this.formConfig.fields.some(field => field.name === fieldName && field.name !== this.selectedField!.name)) {
        alert('Field name already exists. Please choose a different name.');
        return;
      }

      // Filter out null/empty validators
      const formValue = this.fieldEditorForm.value;
      const filteredValidators: any = {};
      
      Object.keys(formValue.validators).forEach(key => {
        const value = formValue.validators[key];
        if (value !== null && value !== undefined && value !== '' && value !== false) {
          filteredValidators[key] = value;
        }
      });

      const updatedField: FormFieldConfig = {
        type: formValue.type,
        name: fieldName,
        label: formValue.label?.trim(),
        placeholder: formValue.placeholder?.trim() || undefined,
        value: formValue.value || undefined,
        position: this.selectedField.position,
        validators: Object.keys(filteredValidators).length > 0 ? filteredValidators : undefined,
        options: formValue.options && formValue.options.length > 0 ? formValue.options : undefined
      };

      const index = this.formConfig.fields.findIndex(f => f.name === this.selectedField!.name);
      if (index > -1) {
        this.formConfig.fields[index] = updatedField;
        this.updateFormConfig();
      }
    }
  }

  deleteField(field: FormFieldConfig) {
    this.formConfig.fields = this.formConfig.fields.filter(f => f.name !== field.name);
    this.updatePositions();
    this.updateFormConfig();
    if (this.selectedField && this.selectedField.name === field.name) {
        this.selectedField = null;
        this.fieldEditorForm.reset({ 
      type: 'text', 
      validators: { 
        required: false, 
        minLength: null, 
        maxLength: null, 
        min: null, 
        max: null, 
        pattern: '', 
        email: false, 
        fileSize: null, 
        fileType: '', 
        url: false 
      } 
    });
        this.optionsArray.clear();
    }
  }

  updateFormConfig() {
    // This is a trick to trigger change detection for the ngx-dynamic-form component
    this.formConfig = { ...this.formConfig };
  }

  copyJson() {
    navigator.clipboard.writeText(JSON.stringify(this.formConfig, null, 2));
    alert('JSON copied to clipboard');
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
  }

  onFieldDrop(event: CdkDragDrop<FormFieldConfig[]>) {
    moveItemInArray(this.formConfig.fields, event.previousIndex, event.currentIndex);
    this.updatePositions();
    this.updateFormConfig();
  }

  updatePositions() {
    this.formConfig.fields.forEach((field, index) => {
      field.position = index;
    });
  }
}
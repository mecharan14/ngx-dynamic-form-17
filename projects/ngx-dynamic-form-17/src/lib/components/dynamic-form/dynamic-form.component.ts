import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import { FormConfig, FormFieldConfig } from '../../interfaces/form-config';

@Component({
    selector: 'ngx-dynamic-form',
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnChanges {
    @Input() config!: FormConfig;
    @Input() form: FormGroup = new FormGroup({});
    sortedFields: FormFieldConfig[] = [];
    subFormFields: Record<string, FormFieldConfig[]> = {};

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        // Sort fields by position
        this.initializeForm();

        // Detect changes in config input and reinitialize form
        // Use ngOnChanges lifecycle hook
    }

    ngOnChanges() {
        if (this.config) {
            this.initializeForm();
        }
    }

    initializeForm() {
        this.sortedFields = [...this.config.fields].sort(
            (a, b) => a.position - b.position
        );
        const formGroupConfig: { [key: string]: any } = {};
        this.sortedFields.forEach((field) => {
            const validators = this.mapValidators(field.validators);
            formGroupConfig[field.name] = [field.value || '', validators];
        });
        this.form = this.fb.group(formGroupConfig);
    }

    updateSubFormFields(
        parentName: string,
        value: string,
        subFormMap: Record<string, FormFieldConfig[]>
    ) {
        // Remove previous subform controls
        Object.keys(subFormMap).forEach((key) => {
            subFormMap[key].forEach((subField) => {
                if (this.form.contains(subField.name)) {
                    this.form.removeControl(subField.name);
                }
            });
        });
        // Add new subform controls for selected value
        if (subFormMap[value]) {
            this.subFormFields[parentName] = [...subFormMap[value]].sort(
                (a, b) => a.position - b.position
            );
            subFormMap[value].forEach((subField) => {
                const validators = this.mapValidators(subField.validators);
                this.form.addControl(
                    subField.name,
                    this.fb.control(subField.value || '', validators)
                );
            });
        } else {
            this.subFormFields[parentName] = [];
        }
    }

    mapValidators(validatorsObj?: { [key: string]: any }): ValidatorFn[] {
        const validatorFns: ValidatorFn[] = [];
        if (!validatorsObj) return validatorFns;
        for (const key of Object.keys(validatorsObj)) {
            switch (key) {
                case 'required':
                    if (validatorsObj[key])
                        validatorFns.push(Validators.required);
                    break;
                case 'requiredTrue':
                    if (validatorsObj[key])
                        validatorFns.push(Validators.requiredTrue);
                    break;
                case 'minLength':
                    validatorFns.push(Validators.minLength(validatorsObj[key]));
                    break;
                case 'maxLength':
                    validatorFns.push(Validators.maxLength(validatorsObj[key]));
                    break;
                case 'min':
                    validatorFns.push(Validators.min(validatorsObj[key]));
                    break;
                case 'max':
                    validatorFns.push(Validators.max(validatorsObj[key]));
                    break;
                case 'pattern':
                    validatorFns.push(Validators.pattern(validatorsObj[key]));
                    break;
                case 'email':
                    if (validatorsObj[key]) validatorFns.push(Validators.email);
                    break;
                case 'url':
                    if (validatorsObj[key]) {
                        const urlPattern = /^https?:\/\/.+/;
                        validatorFns.push(Validators.pattern(urlPattern));
                    }
                    break;
                case 'fileSize':
                    if (validatorsObj[key]) {
                        validatorFns.push(this.fileSizeValidator(validatorsObj[key]));
                    }
                    break;
                case 'fileType':
                    if (validatorsObj[key]) {
                        validatorFns.push(this.fileTypeValidator(validatorsObj[key]));
                    }
                    break;
                case 'nullValidator':
                    if (validatorsObj[key])
                        validatorFns.push(Validators.nullValidator);
                    break;
            }
        }
        return validatorFns;
    }

    fileSizeValidator(maxSizeInMB: number): ValidatorFn {
        return (control) => {
            if (!control.value || !control.value.files || control.value.files.length === 0) {
                return null;
            }
            const file = control.value.files[0];
            const fileSizeInMB = file.size / (1024 * 1024);
            return fileSizeInMB > maxSizeInMB ? { fileSize: { maxSize: maxSizeInMB, actualSize: fileSizeInMB } } : null;
        };
    }

    fileTypeValidator(allowedTypes: string): ValidatorFn {
        return (control) => {
            if (!control.value || !control.value.files || control.value.files.length === 0) {
                return null;
            }
            const file = control.value.files[0];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            const allowedExtensions = allowedTypes.split(',').map(type => type.trim().toLowerCase());
            return allowedExtensions.includes(fileExtension) ? null : { fileType: { allowedTypes, actualType: fileExtension } };
        };
    }

}

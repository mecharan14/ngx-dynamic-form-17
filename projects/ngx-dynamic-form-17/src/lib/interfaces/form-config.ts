export type SupportedValidatorKeys =
    | 'required'
    | 'requiredTrue'
    | 'minLength'
    | 'maxLength'
    | 'min'
    | 'max'
    | 'pattern'
    | 'email'
    | 'url'
    | 'fileSize'
    | 'fileType'
    | 'nullValidator';

export type SupportedValidators = Partial<Record<SupportedValidatorKeys, any>>;

export interface FormFieldConfig {
    type: string;
    name: string;
    label?: string;
    validators?: SupportedValidators;
    options?: { key: string; value: any }[];
    placeholder?: string;
    value?: any;
    position: number;
    conditionalSubForm?: Record<string, FormFieldConfig[]>;
}

export interface FormConfig {
    fields: FormFieldConfig[];
}

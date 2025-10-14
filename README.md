# ngx-dynamic-form-17

[![npm version](https://badge.fury.io/js/ngx-dynamic-form-17.svg)](https://badge.fury.io/js/ngx-dynamic-form-17)
[![Build Status](https://travis-ci.org/your-username/ngx-dynamic-form-workspace.svg?branch=main)](https://travis-ci.org/your-username/ngx-dynamic-form-workspace)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An Angular library for creating dynamic forms from a configuration object. This library is designed to be easy to use and flexible, allowing you to build complex forms with minimal effort.

## Features

-   **Dynamic Form Generation**: Create forms on the fly from a simple JSON-like configuration object.
-   **Wide Range of Input Types**: Supports `text`, `password`, `email`, `number`, `date`, `time`, `checkbox`, `radio`, `file`, `tel`, `url`, `range`, `color`, `textarea`, and `select`.
-   **Built-in Validation**: Leverage standard Angular validators to ensure data integrity.
-   **Conditional Sub-forms**: Show or hide parts of a form based on user input.
-   **Easy Integration**: Simple to integrate into any Angular 17+ project.

## Installation

To install the library, run the following command:

```bash
npm install ngx-dynamic-form-17
```

## Usage

1.  **Import the `NgxDynamicFormModule`**:

    In your `app.module.ts` (or standalone component), import the `NgxDynamicFormModule`:

    ```typescript
    import { NgxDynamicFormModule } from 'ngx-dynamic-form-17';

    @NgModule({
        imports: [
            // ...
            NgxDynamicFormModule,
        ],
        // ...
    })
    export class AppModule {}
    ```

2.  **Define your form configuration**:

    In your component, create a `FormConfig` object:

    ```typescript
    import { FormConfig } from 'ngx-dynamic-form-17';

    export class AppComponent {
        formConfig: FormConfig = {
            fields: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    position: 1,
                    validators: {
                        required: true,
                        minLength: 3,
                    },
                },
                {
                    type: 'email',
                    name: 'email',
                    label: 'Email',
                    position: 2,
                    validators: {
                        required: true,
                        email: true,
                    },
                },
                {
                    type: 'select',
                    name: 'country',
                    label: 'Country',
                    position: 3,
                    options: [
                        { key: 'us', value: 'United States' },
                        { key: 'ca', value: 'Canada' },
                    ],
                    validators: {
                        required: true,
                    },
                },
            ],
        };
    }
    ```

3.  **Use the component in your template**:

    ```html
    <ngx-dynamic-form [config]="formConfig" (formSubmit)="onFormSubmit($event)"></ngx-dynamic-form>
    ```

4.  **Handle the form submission**:

    ```typescript
    export class AppComponent {
        // ... (formConfig from above)

        onFormSubmit(formValue: any) {
            console.log('Form Submitted!', formValue);
        }
    }
    ```

## API

### `FormConfig`

The main configuration object for the form.

| Property | Type                | Description                  |
| :------- | :------------------ | :--------------------------- |
| `fields` | `FormFieldConfig[]` | An array of field configurations. |

### `FormFieldConfig`

The configuration for a single field in the form.

| Property             | Type                               | Description                                                                                             |
| :------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `type`               | `string`                           | The type of the input field. See supported types above.                                                 |
| `name`               | `string`                           | The name of the form control.                                                                           |
| `label`              | `string` (optional)                | The label for the form field.                                                                           |
| `validators`         | `SupportedValidators` (optional)   | An object of validators to apply to the form control.                                                   |
| `options`            | `{ key: string; value: any }[]` (optional) | An array of options for `select` and `radio` fields.                                                    |
| `placeholder`        | `string` (optional)                | The placeholder text for the input field.                                                               |
| `value`              | `any` (optional)                   | The initial value of the form control.                                                                  |
| `position`           | `number`                           | The position of the field in the form. Fields are sorted by this value.                                 |
| `conditionalSubForm` | `Record<string, FormFieldConfig[]>` (optional) | A map of conditional sub-forms. The key is the value of the parent field that triggers the sub-form. |

### `SupportedValidators`

An object where the keys are the names of the validators and the values are the validator arguments.

Supported validator keys: `required`, `requiredTrue`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `email`, `nullValidator`.

### Component I/O

-   **`@Input() config: FormConfig`**: The configuration object for the form.
-   **`@Output() formSubmit: EventEmitter<any>`**: Emits the form value when the form is submitted and valid.

## Development

This is a monorepo that contains the `ngx-dynamic-form-17` library and a demo application.

### Setup

1.  Clone the repository: `git clone https://github.com/mecharan14/ngx-dynamic-form-workspace.git`
2.  Install dependencies: `npm install`

### Build the Library

Run the following command to build the library:

```bash
ng build ngx-dynamic-form-17
```

### Run the Demo App

Run the following command to serve the demo application:

```bash
ng serve demo-app
```

The demo app will be available at `http://localhost:4200/`.

### Run Tests

Run the following command to run the library's unit tests:

```bash
ng test ngx-dynamic-form-17
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
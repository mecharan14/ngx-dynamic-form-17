# ngx-dynamic-form-17

![npm](https://img.shields.io/npm/v/ngx-dynamic-form-17.svg)
![npm](https://img.shields.io/npm/dm/ngx-dynamic-form-17.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



A powerful Angular library for creating dynamic forms with drag-and-drop reordering, comprehensive validation, and support for all HTML input types. Perfect for building form builders, dynamic surveys, and configurable data collection interfaces.

## ✨ Features

- **🎯 Dynamic Form Generation**: Create forms on the fly from a simple JSON configuration
- **🖱️ Drag & Drop Reordering**: Intuitive drag-and-drop interface for field reordering
- **📝 Comprehensive Input Support**: All HTML input types including text, email, file, range, color, and more
- **✅ Advanced Validation**: Built-in validators with custom validation support
- **📱 Responsive Design**: Mobile-friendly forms that work on all devices
- **🎨 Customizable Styling**: Easy to customize with CSS or integrate with your design system
- **🔧 TypeScript Support**: Full type safety and IntelliSense support
- **⚡ Performance Optimized**: Lightweight and fast rendering

## 🚀 Live Demo

[View Live Demo](https://mecharan14.github.io/ngx-dynamic-form-17/) - Try the interactive form builder!

## 📦 Installation

```bash
npm install ngx-dynamic-form-17
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install @angular/common@^17.3.0 @angular/core@^17.3.0 @angular/cdk@^17.3.0
```

## 🎯 Quick Start

### 1. Import the Module

```typescript
import { NgxDynamicFormModule } from 'ngx-dynamic-form-17';

@NgModule({
  imports: [
    NgxDynamicFormModule,
    // ... other imports
  ],
})
export class AppModule {}
```

### 2. Create Form Configuration

```typescript
import { FormConfig } from 'ngx-dynamic-form-17';

export class AppComponent {
  formConfig: FormConfig = {
    fields: [
      {
        type: 'text',
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter your first name',
        position: 1,
        validators: {
          required: true,
          minLength: 2
        }
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email Address',
        position: 2,
        validators: {
          required: true,
          email: true
        }
      },
      {
        type: 'select',
        name: 'country',
        label: 'Country',
        position: 3,
        options: [
          { key: 'us', value: 'United States' },
          { key: 'ca', value: 'Canada' },
          { key: 'uk', value: 'United Kingdom' }
        ],
        validators: {
          required: true
        }
      }
    ]
  };

  onFormSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
  }
}
```

### 3. Use in Template

```html
<ngx-dynamic-form 
  [config]="formConfig" 
  (formSubmit)="onFormSubmit($event)">
</ngx-dynamic-form>
```

## 📚 Supported Input Types

| Type | Description | Validation Support |
|------|-------------|-------------------|
| `text` | Single-line text input | minLength, maxLength, pattern |
| `password` | Password input | minLength, maxLength, pattern |
| `email` | Email input | email validation |
| `number` | Number input | min, max |
| `tel` | Telephone input | pattern |
| `url` | URL input | url validation |
| `date` | Date picker | min, max |
| `time` | Time picker | min, max |
| `file` | File upload | fileSize, fileType |
| `range` | Range slider | min, max |
| `color` | Color picker | - |
| `checkbox` | Checkbox | required |
| `radio` | Radio buttons | required |
| `select` | Dropdown select | required |
| `textarea` | Multi-line text | minLength, maxLength |

## 🔧 Advanced Features

### Drag & Drop Reordering

The library includes built-in drag-and-drop functionality for reordering form fields:

```typescript
// Fields are automatically sorted by position
// Use drag handles to reorder in the UI
```

### File Upload Validation

```typescript
{
  type: 'file',
  name: 'document',
  label: 'Upload Document',
  validators: {
    required: true,
    fileSize: 5, // Max 5MB
    fileType: '.pdf,.doc,.docx' // Allowed file types
  }
}
```

### Custom Validation Patterns

```typescript
{
  type: 'text',
  name: 'phone',
  label: 'Phone Number',
  validators: {
    required: true,
    pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' // Custom regex
  }
}
```

### Conditional Sub-forms

```typescript
{
  type: 'select',
  name: 'userType',
  label: 'User Type',
  options: [
    { key: 'individual', value: 'Individual' },
    { key: 'business', value: 'Business' }
  ],
  conditionalSubForm: {
    'business': [
      {
        type: 'text',
        name: 'companyName',
        label: 'Company Name',
        position: 1,
        validators: { required: true }
      }
    ]
  }
}
```

## 🎨 Styling

The library uses CSS classes that you can easily customize:

```css
/* Main form container */
.dynamic-form {
  /* Your styles */
}

/* Form fields */
.dynamic-form-field {
  /* Your styles */
}

/* Input elements */
.dynamic-form-input {
  /* Your styles */
}

/* Validation errors */
.dynamic-form-error {
  /* Your styles */
}
```

## 📖 API Reference

### FormConfig

| Property | Type | Description |
|----------|------|-------------|
| `fields` | `FormFieldConfig[]` | Array of field configurations |

### FormFieldConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | ✅ | Input type (text, email, etc.) |
| `name` | `string` | ✅ | Form control name |
| `label` | `string` | ✅ | Field label |
| `position` | `number` | ✅ | Sort order |
| `placeholder` | `string` | ❌ | Placeholder text |
| `value` | `any` | ❌ | Initial value |
| `validators` | `SupportedValidators` | ❌ | Validation rules |
| `options` | `Option[]` | ❌ | Options for select/radio |
| `conditionalSubForm` | `Record<string, FormFieldConfig[]>` | ❌ | Conditional sub-forms |

### SupportedValidators

| Validator | Type | Description |
|-----------|------|-------------|
| `required` | `boolean` | Field is required |
| `minLength` | `number` | Minimum character length |
| `maxLength` | `number` | Maximum character length |
| `min` | `number` | Minimum value (numbers) |
| `max` | `number` | Maximum value (numbers) |
| `pattern` | `string` | Regex pattern |
| `email` | `boolean` | Email format validation |
| `url` | `boolean` | URL format validation |
| `fileSize` | `number` | Max file size in MB |
| `fileType` | `string` | Allowed file extensions |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Angular CDK for drag-and-drop functionality
- All contributors and users of this library

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/mecharan14/ngx-dynamic-form-17/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/mecharan14/ngx-dynamic-form-17/wiki)
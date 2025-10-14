import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@NgModule({
    declarations: [DynamicFormComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [DynamicFormComponent],
})
export class NgxDynamicFormModule {}

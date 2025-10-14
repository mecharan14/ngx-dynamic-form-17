import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { NgxDynamicFormModule } from '../../../ngx-dynamic-form-17/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, NgxDynamicFormModule, FormsModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

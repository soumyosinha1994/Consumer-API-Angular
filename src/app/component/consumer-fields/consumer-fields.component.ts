import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpServiceService } from '../../http-service.service';

@Component({
  selector: 'app-consumer-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './consumer-fields.component.html',
})
export class ConsumerFieldsComponent {
  response: any;
  simpleFields: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    contentId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private consumerService: HttpServiceService
  ) {}

  getFields() {
    if (this.form.invalid) return;

    this.consumerService
      .getConsumerFields(this.form.value.contentId!)
      .subscribe((res) => {
        this.response = res;
        this.simpleFields = res?.result?.simpleFields ?? [];

        if (this.simpleFields.length > 0) {
          this.displayedColumns = Object.keys(this.simpleFields[0]);
        }
      });
  }
}

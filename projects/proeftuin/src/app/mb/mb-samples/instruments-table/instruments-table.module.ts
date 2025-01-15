import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'; // not needed?
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

import { SnackBarModule } from 'projects/mb/src/lib/snack-bar/snack-bar.module';

import { InstrumentsTableComponent } from './instruments-table.component';
import { Table1Component } from './table1/table1.component';
import { Table12Component } from './table12/table12.component';
import { ListService } from './table12/list.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,
        SnackBarModule,
        InstrumentsTableComponent,
        Table1Component,
        Table12Component,
    ],
    providers: [ListService]
})
export class InstrumentsTableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { AssetManagementModule } from './asset-management/asset-management.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NotesRoutingModule,
    AssetManagementModule,
    NotesComponent
],
    providers: []
})
export class NotesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


// import { SnackBarModule } from 'projects/mb/src/lib/snack-bar/snack-bar.module';
// import { SvgViewerModule } from 'projects/mb/src/lib/svg-viewer/svg-viewer.module';
import { ChartsModule } from 'projects/mb/src/lib/charts/charts.module';

// import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { AssetManagementModule } from './asset-management/asset-management.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    //  SnackBarModule,
    // SvgViewerModule,
    ChartsModule,
    // NotesRoutingModule,
    AssetManagementModule,
    NotesComponent
],
    providers: []
})
export class NotesModule { }

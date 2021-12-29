import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SnackBarService } from './snack-bar.service';

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [],
  declarations: [],
  providers: [SnackBarService]
})
export class SnackBarModule { }

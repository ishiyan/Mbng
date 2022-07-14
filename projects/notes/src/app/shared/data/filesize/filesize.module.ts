import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FilesizePipe } from './filesize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FilesizePipe],
  declarations: [FilesizePipe]
})
export class FilesizeModule { }

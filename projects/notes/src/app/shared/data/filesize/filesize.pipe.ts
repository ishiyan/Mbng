import { Pipe, PipeTransform } from '@angular/core';

const kbBytes = 1024;
const mbBytes = kbBytes * 1024;
const gbBytes = mbBytes * 1024;

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(bytes: number) {
    if (bytes >= gbBytes) {
      return (bytes / gbBytes).toFixed(2) + '\u00a0gB';
    }
    else if (bytes >= mbBytes) {
      return (bytes / mbBytes).toFixed(1) + '\u00a0mB';
    }
    else if (bytes >= kbBytes) {
      return (bytes / kbBytes).toFixed(0) + '\u00a0kB';
    }

    return bytes.toFixed(0) + '\u00a0bytes';
  }
}

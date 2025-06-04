import { LineConfiguration } from 'mb';
import { TemporalEntity } from 'mb';
import { TimeGranularity } from 'mb';

import { primaryColor } from '../../theme-colors';
import { Series } from '../series.interface';
import { signal } from '@angular/core';

const empty = '';

export abstract class SeriesLoad {
  protected abstract entity: string;
  protected abstract addSeries(s: Series): void;
  protected abstract determineGranularity(data: TemporalEntity[]): TimeGranularity;
  protected abstract minParts: number;
  protected abstract parseEntity(time: Date, splitted: string[]): TemporalEntity | string;

  protected readonly configMultiline: LineConfiguration = {
    fillColor: undefined, strokeColor: primaryColor, strokeWidth: 1
  };

  protected filePath = empty;
  protected fileType = empty;
  protected fileBytes = 0;
  protected progressVisible = false;
  protected progressPercentage = 0;
  protected errorText = empty;
  protected data = signal<TemporalEntity[]>([]);
  protected granularity = TimeGranularity.Aperiodic;
  protected mnemonic = empty;
  protected description = empty;

  protected add(): void {
    const d = this.data();
    const s: Series = {
      mnemonic: this.mnemonic,
      description: this.description,
      timeGranularity: this.granularity,
      timeStart:d[0].time,
      timeEnd: d[d.length - 1].time,
      data: d
    };
    this.clear();
    this.addSeries(s);
  }

  protected clear(): void {
    this.filePath = empty;
    this.fileType = empty;
    this.fileBytes = 0;
    this.progressVisible = false;
    this.progressPercentage = 0;
    this.errorText = empty;
    this.data.set([]);
    this.granularity = TimeGranularity.Aperiodic;
    this.mnemonic = empty;
    this.description = empty;
  }

  protected selectedFile(files: FileList): void {
    if (files.length > 0) {
      const file = files[0];
      this.filePath = file.webkitRelativePath || file.name;
      this.fileType = file.type;
      this.fileBytes = file.size;

      this.readFileContent(file)
        .then(content => {
          this.parseContent(content)
            .then(data => {
              this.granularity = this.determineGranularity(data);
              this.mnemonic = 'temp';
              this.description = this.filePath;
              this.data.set(data);
            }).catch(error => this.errorText = empty + error)
            .finally(() => this.progressVisible = false);
        }).catch(error => {
          this.progressVisible = false;
          this.errorText = empty + error;
        });
    } else {
      this.clear();
    }
  }

  private readFileContent(file: File): Promise<string> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadstart = () => {
        this.progressPercentage = 0;
        this.progressVisible = true;
      };
      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        this.progressPercentage = event.loaded / event.total * 100;
      };
      reader.onload = () => {
        this.progressPercentage = 100;
      };
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const content = event?.target?.result as string ?? empty;
        resolve(content);
      };
      reader.onerror = (error: ProgressEvent<FileReader>) => {
        reject(error);
      };

      reader.readAsText(file, 'utf8');
    });
  }

  private parseContent(content: string): Promise<TemporalEntity[]> {
    return new Promise((resolve, reject) => {
      const data: TemporalEntity[] = [];
      const lines = content.split('\n');
      const len = lines.length;

      if (len < 2) {
        reject('cannot split content into lines using delimiter \'\\n\'');
      }

      let timePrevious = new Date(0);

      for (let i = 0; i < len; i++) {
        const line = lines[i];
        if (line.length < 2) {
          continue;
        }

        const splitted = line.split(';');
        if (splitted.length < this.minParts) {
          reject(
            `expected at least ${this.minParts} parts delimited by ';', got ${splitted.length} parts: line ${i + 1} '${line}'`);
        }

        const date = splitted[0];
        let time!: Date;
        if (date.length === 8) { // yyyymmdd
          const y = +date.substring(0, 4);
          const m = +date.substring(4, 6) - 1;
          const d = +date.substring(6, 8);
          time = new Date(y, m, d);
          if (time.getDate() !== d || time.getMonth() !== m || time.getFullYear() !== y) {
            reject(`invaid yyyymmdd date '${date}': line ${i + 1} '${line}'`);
          }
        } else if (date.length === 10) { // yyyy-mm-dd or yyyy/mm/dd
          const y = +date.substring(0, 4);
          const m = +date.substring(5, 7) - 1;
          const d = +date.substring(8, 10);
          time = new Date(y, m, d);
          if (time.getDate() !== d || time.getMonth() !== m || time.getFullYear() !== y) {
            reject(`invaid yyyy/mm/dd date '${date}': line ${i + 1} '${line}'`);
          }
        } else {
          time = new Date(date);
          if (time.toString().startsWith('Invalid')) {
            reject(`unknown date '${date}': line ${i + 1} '${line}'`);
          }
        }

        if (time < timePrevious) {
          reject(`time '${date}' is less than previous time '${timePrevious}': line ${i + 1} '${line}'`);
        }

        timePrevious = time;

        const ret = this.parseEntity(time, splitted);
        if (typeof(ret) === 'string') {
          reject(`${ret}: line ${i + 1} '${line}'`);
        }

        data.push(ret as TemporalEntity);
      }

      resolve(data);
    });
  }
}

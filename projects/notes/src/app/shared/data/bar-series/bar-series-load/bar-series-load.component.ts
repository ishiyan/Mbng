import { Component } from '@angular/core';
import { SparklineConfiguration } from 'mb';

import { Bar } from 'projects/mb/src/lib/data/entities/bar';
import { TimeGranularity } from 'projects/mb/src/lib/trading/time/time-granularity.enum';

import { BarSeries } from '../bar-series.interface';
import { BarSeriesService } from '../bar-series.service';
import { determineTimeGranularity } from '../determine-time-granularity';

// Since we use hardcoded palette, here is the hadcoded primary color:
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=009688
const primaryColor = '#009688';
const empty = '';

@Component({
  selector: 'app-bar-series-load',
  templateUrl: './bar-series-load.component.html',
  styleUrls: ['./bar-series-load.component.scss']
})
export class BarSeriesLoadComponent {
  protected readonly configMultiline: SparklineConfiguration = {
    fillColor: undefined, strokeColor: primaryColor, strokeWidth: 1
  };

  protected filePath = empty;
  protected fileType = empty;
  protected fileBytes = 0;
  protected progressVisible = false;
  protected progressPercentage = 0;
  protected errorText = empty;
  protected barData: Bar[] = [];
  protected granularity = TimeGranularity.Day1;
  protected mnemonic = empty;
  protected description = empty;

  constructor(private barSeriesService: BarSeriesService) {
  }

  protected add(): void {
    const r: BarSeries = {
      mnemonic: this.mnemonic,
      description: this.description,
      timeGranularity: this.granularity,
      timeStart: this.barData[0].time,
      timeEnd: this.barData[this.barData.length - 1].time,
      data: this.barData
    };
    this.clear();
    this.barSeriesService.add(r);
  }

  protected clear(): void {
    this.filePath = empty;
    this.fileType = empty;
    this.fileBytes = 0;
    this.progressVisible = false;
    this.progressPercentage = 0;
    this.errorText = empty;
    this.barData = [];
    this.granularity = TimeGranularity.Day1;
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
              this.granularity = determineTimeGranularity(data[0].time, data[1].time);
              this.mnemonic = 'temp';
              this.description = this.filePath;
              this.barData = data;
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
        if (reader.removeAllListeners != null) {
          reader.removeAllListeners();
        }

        resolve(content);
      };
      reader.onerror = (error: ProgressEvent<FileReader>) => {
        reject(error);
      };

      reader.readAsText(file, 'utf8');
    });
  }

  private parseContent(content: string): Promise<Bar[]> {
    return new Promise((resolve, reject) => {
      const data: Bar[] = [];
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
        if (splitted.length < 5) {
          reject(`expected at least 5 parts delimited by ';', got ${splitted.length} parts: line ${i + 1} '${line}'`);
        }

        const date = splitted[0];
        let time!: Date;
        if (date.length === 8) { // yyyymmdd.
          const y = +date.substring(0, 4);
          const m = +date.substring(4, 2) + 1;
          const d = +date.substring(6, 2);
          time = new Date(y, m, d);
          if (time.getDate() !== d || time.getMonth() !== m || time.getFullYear() !== y) {
            reject(`invaid yyyymmdd date '${date}': line ${i + 1} '${line}'`);
          }
        } else if (date.length === 10) { // yyyy-mm-dd or yyyy/mm/dd
          const y = +date.substring(0, 4);
          const m = +date.substring(5, 2) + 1;
          const d = +date.substring(8, 2);
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

        const bar = new Bar();
        bar.time = time;

        bar.open = +splitted[1];
        if (isNaN(bar.open)) {
          reject(`invalid open '${splitted[1]}': line ${i + 1} '${line}'`);
        }

        bar.high = +splitted[2];
        if (isNaN(bar.high)) {
          reject(`invalid high '${splitted[2]}': line ${i + 1} '${line}'`);
        }

        bar.low = +splitted[3];
        if (isNaN(bar.low)) {
          reject(`invalid low '${splitted[3]}': line ${i + 1} '${line}'`);
        }

        bar.close = +splitted[4];
        if (isNaN(bar.close)) {
          reject(`invalid close '${splitted[4]}': line ${i + 1} '${line}'`);
        }

        if (splitted.length > 5) {
          bar.volume = +splitted[5];
          if (isNaN(bar.volume)) {
            reject(`invalid volume '${splitted[5]}': line ${i + 1} '${line}'`);
          }
        } else {
          bar.volume = 0;
        }

        if (bar.high < bar.low || bar.high < bar.open || bar.high < bar.close) {
          reject(`high is not the highest value: line ${i + 1} '${line}'`);
        }

        if (bar.low > bar.high || bar.low > bar.open || bar.low > bar.close) {
          reject(`low is not the lowest value: line ${i + 1} '${line}'`);
        }

        data.push(bar);
      }

      resolve(data);
    });
  }
}

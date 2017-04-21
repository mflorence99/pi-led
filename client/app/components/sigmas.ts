import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';

import * as sigmasReducer from '../reducers/sigmas';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { deepCopy } from '@mflo999/pi-lib/utils';

interface SigmasData {
  chartType: string;
  dataTable: any[][];
  options: {};
}

const initialSigmasData: SigmasData = {
  chartType: 'LineChart',
  dataTable: [],
  options: {
    chartArea: {
      height: '80%',
      width: '80%'
    },
    curveType: 'function',
    fontSize: 10,
    hAxis: {
      format: 'hh:mm a'
    },
    height: 240,
    legend: {
      position: 'none'
    },
    vAxis: {
      maxValue: 1,
      minValue: 0
    },
    width: 800
  }
};

@Pipe({ name: 'toSigmasData' })
export class SigmasDataPipe implements PipeTransform {

  buffer = [];
  interval = 0;
  ts = 0;

  transform(state: Observable<sigmasReducer.State>,
            span = 1) {
    const window = span * 60000;
    return state
      .filter((sigmas: sigmasReducer.State) => sigmas.sigmas.length > 0)
      .do((sigmas: sigmasReducer.State) => {
        if (this.ts > 0) {
          const interval = sigmas.sigmas[0][2] - this.ts;
          this.interval = this.interval? ((this.interval + interval) / 2) : interval;
        }
        this.ts = sigmas.sigmas[0][2];
      })
      .skip(5)
      .filter(() => this.interval > 0)
      .do((sigmas: sigmasReducer.State) => {
        if (this.buffer.length === 0) {
          for (let i = window; i >= 0; i -= Math.floor(this.interval)) {
            const dummy = sigmas.sigmas.reduce((acc, sigma) => {
              acc.push(0);
              return acc;
            }, [<any>new Date(Date.now() - i)]);
            this.buffer.push(dummy);
          }
        }
      })
      .do((sigmas: sigmasReducer.State) => {
        const row = sigmas.sigmas.reduce((acc, sigma) => {
          acc.push(sigma[1]);
          return acc;
        }, [<any>new Date(sigmas.sigmas[0][2])]);
        this.buffer.push(row);
      })
      .do(() => {
        if (this.buffer[0][0].getTime() <= (Date.now() - window))
          this.buffer = this.buffer.slice(1);
      })
      .map((sigmas: sigmasReducer.State) => {
        const sigmasData: SigmasData = deepCopy(initialSigmasData);
        const hdr = sigmas.sigmas.reduce((acc, sigma) => {
          acc.push(sigma[0]);
          return acc;
        }, ['Timestamp']);
        sigmasData.dataTable = [hdr, ...this.buffer];
        return sigmasData;
      });
  }

}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-sigmas',
  templateUrl: 'sigmas.html',
  styleUrls: ['sigmas.less']
})

export class SigmasComponent {
  @Input('sigmas-data') sigmasData: SigmasData = initialSigmasData;

}

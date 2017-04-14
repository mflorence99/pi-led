import * as sigmasReducer from '../reducers/sigmas';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';

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
      width: '100%'
    },
    curveType: 'function',
    height: 240,
    legend: {
      position: 'none'
    },
    width: 800
  }
};

const WINDOW = 60000;

@Pipe({ name: 'toSigmasData' })
export class SigmasDataPipe implements PipeTransform {
  buffer = [];

  transform(state: Observable<sigmasReducer.State>) {
    return state.map((sigmas: sigmasReducer.State) => {
      // buffer up a minute's worth
      if (sigmas.sigmas.length > 0) {
        // prime the buffer
        if (this.buffer.length === 0) {
          for (let i = WINDOW; i -= 1000; i >= 0) {
            const dummy: any[] = [new Date(Date.now() - i)];
            sigmas.sigmas.forEach(sigma => dummy.push(0));
            this.buffer.push(dummy);
          }
        }
        const row = [];
        // use the first timestamp
        row.push(new Date(sigmas.sigmas[0][2]));
        sigmas.sigmas.forEach(sigma => row.push(sigma[1]));
        this.buffer.push(row);
        // roll out stale data
        if (this.buffer[0][0].getTime() <= (Date.now() - WINDOW))
          this.buffer = this.buffer.slice(1);
      }
      // now turn into chart
      const sigmasData: SigmasData = JSON.parse(JSON.stringify(initialSigmasData));
      const hdr = ['Timestamp'];
      sigmas.sigmas.forEach(sigma => hdr.push(sigma[0]));
      sigmasData.dataTable = [hdr, ...this.buffer];
      return sigmasData;
    });
  }

}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-sigmas',
  templateUrl: './sigmas.html',
  styleUrls: ['./sigmas.less']
})

export class SigmasComponent {
  @Input('sigmas-data') sigmasData: SigmasData = initialSigmasData;

}

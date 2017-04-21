import * as settingsReducer from '../reducers/settings';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { deepCopy } from 'pi-lib/utils';

interface ChartData {
  chartType: string;
  dataTable: any[][];
  options: {};
}

const initialChartData: ChartData = {
  chartType: 'BarChart',
  dataTable: [],
  options: {
    animation: {
      duration: 400,
      startup: true
    },
    chartArea: {
      height: '80%',
      width: '80%'
    },
    fontSize: 10,
    hAxis: {
      maxValue: 1,
      minValue: 0
    },
    height: 180,
    legend: {
      position: 'none'
    },
    width: 320
  }
};

@Pipe({ name: 'toChartData' })
export class ChartDataPipe implements PipeTransform {

  transform(state: Observable<settingsReducer.State>) {
    return state
      .filter((settings: settingsReducer.State) => settings.settings.length > 0)
      .map((settings: settingsReducer.State) => {
        const chartData: ChartData = deepCopy(initialChartData);
        chartData.dataTable = settings.settings.reduce((acc, setting) => {
          const style = `fill-color: ${setting[0]}; fill-opacity: 0.5`;
          acc.push([setting[0], setting[1]? 1 : 0, style]);
          return acc;
        }, [<any>['Pin', 'State', {role: 'style'}]]);
        return chartData;
      });
  }

}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-chart',
  templateUrl: 'chart.html',
  styleUrls: ['chart.less']
})

export class ChartComponent {
  @Input('chart-data') chartData: ChartData = initialChartData;

}

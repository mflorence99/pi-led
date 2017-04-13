import * as settingsReducer from '../reducers/settings';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';

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
      width: '100%'
    },
    height: 180,
    legend: {
      position: 'none'
    },
    hAxis: {
      maxValue: 1,
      minValue: 0
    },
    vAxis: {
      textPosition: 'none'
    },
    width: 240
  }
};

@Pipe({ name: 'toChartData' })
export class ChartDataPipe implements PipeTransform {
  transform(state: Observable<settingsReducer.State>) {
    return state.map((settings: settingsReducer.State) => {
      const chartData: ChartData = JSON.parse(JSON.stringify(initialChartData));
      chartData.dataTable.push(['Pin', 'State', {role: 'style'}]);
      settings.settings.forEach(setting => {
        const style = `fill-color: ${setting[0]}; fill-opacity: 0.5`;
        chartData.dataTable.push([setting[0], setting[1]? 1 : 0, style]);
      });
      return chartData;
    });
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-chart',
  templateUrl: './chart.html',
  styleUrls: ['./chart.less']
})

export class ChartComponent {
  @Input('chart-data') chartData: ChartData = initialChartData;

}

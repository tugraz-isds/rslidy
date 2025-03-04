import {BarChart, layouterCompute, scaleLinear} from './respvis.js';
import { compensations, sites, years } from './data.js';
import * as d3 from './d3-7.6.0/d3.js';
export function renderGroupedBarChart(selector) {
    const element = document.querySelector(selector);

    console.log('Element:', element); // Should not log null

    const axisBreakPointsWidth = {
        values: [10, 30, 50],
        unit: 'rem'
    };
    const barChartArgs = {
        series: {
            type: 'grouped',
            x: { values: sites },
            y: { values: compensations},
            categories: {
                values: years,
                title: 'Years'
            },
            markerTooltipGenerator: ((e, d) => {
                var _a;
                return `Site: ${d.xValue}<br/>
                Total Remuneration: $${d3.format(',')(d.yValue)}<br/>
                Year: ${(_a = d.categoryFormatted) !== null && _a !== void 0 ? _a : ''}<br/>`;
            }),
            flipped: {
                dependentOn: 'width',
                mapping: { 0: true, 2: false }
            },
            zoom: {
                in: 20,
                out: 1
            },
            labels: {
                values: compensations.map(comp => d3.format('.2s')(comp)),
                offset: 6, positionStrategy: 'dynamic'
            }
        },
        breakpoints: {
            width: {
                values: [20, 45, 50],
                unit: 'rem'
            }
        },
        legend: {
            title: 'Year'
        },
        x: {
            title: 'Country',
            breakpoints: {
                width: axisBreakPointsWidth,
            },
        },
        y: {
            title: 'Total Remuneration',
            subTitle: '[EU]',
            breakpoints: {
                width: axisBreakPointsWidth
            },
            tickOrientationFlipped: {
                scope: 'self',
                dependentOn: 'width',
                breakpointValues: { 0: 90, 2: 0 }
            },
            configureAxis: {
                dependentOn: 'width',
                scope: 'chart',
                mapping: { 0: (axis) => axis.tickFormat(d3.format('.2s')), 3: (axis) => axis.tickFormat() }
            },
        }
    };
    const chartWindow = d3.select(selector).append('div');
    const renderer = new BarChart(chartWindow, barChartArgs);
    renderer.buildChart();
    const itemHover = () => {
        layouterCompute(renderer.layouterS);
        renderer.render();
    };
    chartWindow.selectAll('.legend-item')
      .on('mouseenter', itemHover)
      .on('mouseleave', itemHover);
}
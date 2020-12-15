import React, {Component, Fragment} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

class High extends Component {
    render() {
        const series2 = this.props.data;
        const idx = this.props.idx;
        const options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: "평균 점수!"
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title:{text:'점수'},
                categories:idx
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.y}</b>",
                    }
                }
            },
            series: [{ name: "점수", data: series2 }]

        }
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Fragment>
        );
    }
}
export default High;
import React, {Component, Fragment} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

class High extends Component {
    render() {
        const series2 = this.props.data;
        const idx = this.props.idx;
        const title = this.props.title;
        const realdata = idx.map((v, i) => [v, series2[i]]);
        /*
        for(let i=0;i<series2.length;i++)
        {
            realdata.push(new Object(idx[i],series2[i]));
        }*/
        const options = {
            chart: {
                type: 'pie'
            },
            title: {
                text: title
            },
            credits: {
                enabled: false
            },
            xAxis: {
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
                        format: "{point.name}<b>{point.y}</b>",
                    }
                }
            },
            series: [{ name: "사람수", data: realdata }]

        }
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Fragment>
        );
    }
}
export default High;
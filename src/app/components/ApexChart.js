import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ data }) => {
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    series: [
      {
        data: data.map((item) => ({
          x: new Date(item.t),
          y: [item.o, item.h, item.l, item.c],
        })),
      },
    ],
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={options.series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};
export default ApexChart;

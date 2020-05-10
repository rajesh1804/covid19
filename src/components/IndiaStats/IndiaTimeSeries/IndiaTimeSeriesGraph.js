import React from 'react';
import '../../../App.css'
import { Line, defaults } from 'react-chartjs-2';

defaults.global.maintainAspectRatio = false;

function IndiaTimeSeriesGraph({indiaTimeSeriesData}) {
  const data = {
      labels: indiaTimeSeriesData.map(data => {
        return data["lastUpdatedAtApify"].split('T')[0];
      }),
      datasets: [
        {
          label: 'TotalCases',
          data: indiaTimeSeriesData.map(data => {
            return data["totalCases"];
          }),
          borderWidth: 1,
          fill: false,          // Don't fill area under the line
          borderColor: 'blue'  // Line color
        },
        {
          label: 'Recovered',
          data: indiaTimeSeriesData.map(data => {
            return data["recovered"];
          }),
          borderWidth: 1,
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        },
        {
          label: 'Deaths',
          data: indiaTimeSeriesData.map(data => {
            return data["deaths"];
          }),
          borderWidth: 1,
          fill: false,          // Don't fill area under the line
          borderColor: 'red'  // Line color
        },
        {
          label: 'ActiveCases',
          data: indiaTimeSeriesData.map(data => {
            return data["activeCases"];
          }),
          borderWidth: 1,
          fill: false,          // Don't fill area under the line
          borderColor: 'orange'  // Line color
        }
      ]
    }

  // const labels = ["activeCases", "recovered", "deaths", "totalCases", "lastUpdatedAtApify"];
  return (
    <div>
      <br />
      <article className="canvas-container">
        <Line
          data={data}
          options={{
            title:{
              display:true,
              //text:'Covid-19 India TimeSeries Graph',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </article>
      <br />
    </div>
  );
}

export default IndiaTimeSeriesGraph;

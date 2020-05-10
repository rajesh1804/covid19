import React from 'react';
import { HorizontalBar, defaults } from 'react-chartjs-2';

defaults.global.maintainAspectRatio = false;

function HighestActiveState({highestActiveStateData}) {
  const data = {
      labels: highestActiveStateData.map(data => {
        return data.region;
      }),
      datasets: [
        {
          label: 'No. of Active cases',
          backgroundColor: ['#FF0000', "#6495ED", "#CD853F", '#32CD32', "#FF8C00"],
          borderColor: '#FFE4E1',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: highestActiveStateData.map(data => {
            return data.active;
          })
        }
      ]
    };

  const options = {
    scales: {
        yAxes: [{
            ticks: {
                fontColor: 'white'
            },
        }],
      xAxes: [{
            ticks: {
                fontColor: 'white'
            },
        }]
    }
  };

  return(
    <div>
    <HorizontalBar
      data={data}
      options={options}
      height={350}
    />
    </div>
  );
}

export default HighestActiveState;

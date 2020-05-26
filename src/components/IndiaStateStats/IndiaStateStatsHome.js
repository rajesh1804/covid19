import React, {useEffect, useState} from 'react';
import axios from 'axios';
import HighestConfirmedState from './HighestConfirmedState/HighestConfirmedState';
import HighestDeadToInfectedPercentageState from './HighestDeadToInfectedPercentage/HighestDeadToInfectedPercentageState';
import HighestActiveState from './HighestActiveState/HighestActiveState';
import HighestRecoveryPercentageState from './HighestRecoveryPercentageState/HighestRecoveryPercentageState';
import Card from 'react-bootstrap/Card';
import CircleLoader from "react-spinners/CircleLoader";
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

function IndiaStateStatsHome() {
  const [, setStateData] = useState([]);
  const [highestConfirmedState, setHighestConfirmedState] = useState([]);
  const [highestActiveState, setHighestActiveState] = useState([]);
  const [highestRecoveryPercentageState, setHighestRecoveryPercentageState] = useState([]);
  const [highestDeadToInfectedState, setHighestDeadToInfectedState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastShow, setToastShow] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [alertShow, setAlertShow] = useState(true);

  useEffect(() => {
    axios.get('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true')
    .then(res => {
      setStateData(addActiveDeadRecovery(res.data.regionData));
      setHighestConfirmedState(getHighestConfirmedState(res.data.regionData));
      setHighestActiveState(getHighestActiveState(res.data.regionData));
      setHighestDeadToInfectedState(getHighestDeadToInfectedState(res.data.regionData));
      setHighestRecoveryPercentageState(getHighestRecoveryPercentageState(res.data.regionData));
      setLastUpdated(res.data.lastUpdatedAtApify);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
  });

  var averageRecoveredCases = 0;

  const addActiveDeadRecovery = (stateData) => {
    var active = [];
    stateData.map(data => {
      data.active = parseInt(data.totalInfected) - parseInt(data.recovered);
      data.recoveryPercentage = parseFloat(data.recovered) / parseFloat(data.totalInfected) * 100 ;
      data.deadToInfected = parseFloat(data.deceased) / parseFloat(data.totalInfected) * 100;
      averageRecoveredCases = averageRecoveredCases + parseInt(data.recovered);
      active.push(data);
      return null;
    });
    averageRecoveredCases = parseFloat(averageRecoveredCases / stateData.length);
    return active;
  }

  const getHighestConfirmedState = (stateData) => {
    var highestConfirmed = [];
    var highestConfirmedState = [];
    stateData.map(data => {
      if (data.region !== 'Total#') {
        highestConfirmed.push(parseInt(data.totalInfected));
      }
      return null;
    });
    highestConfirmed = highestConfirmed.sort(function(a, b){return b - a}).slice(0,5);
    highestConfirmed.map(data => {
      stateData.map(sdata => {
        if (data === parseInt(sdata.totalInfected)) {
          highestConfirmedState.push(sdata);
        }
        return null;
      });
      return null;
    });
    return highestConfirmedState;
  };

  const getHighestDeadToInfectedState = (stateData) => {
    var highestDeadToInfected = [];
    var highestDeadToInfectedState = [];
    stateData.map(data => {
      if (data.region !== 'Total#') {
        highestDeadToInfected.push(parseFloat(data.deadToInfected));
      }
      return null;
    });
    highestDeadToInfected = highestDeadToInfected.sort(function(a, b){return b - a}).slice(0,5);
    highestDeadToInfected.map(data => {
      stateData.map(sdata => {
        if (data === parseFloat(sdata.deadToInfected)) {
          highestDeadToInfectedState.push(sdata);
        }
        return null;
      });
      return null;
    });
    return highestDeadToInfectedState;
  };

  const getHighestActiveState = (stateData) => {
    var highestActive = [];
    var highestActiveState = [];
    stateData.map(data => {
      if (data.region !== 'Total#') {
        highestActive.push(parseInt(data.active));
      }
      return null;
    });
    highestActive = highestActive.sort(function(a, b){return b - a}).slice(0,5);
    highestActive.map(data => {
      stateData.map(sdata => {
        if (data === parseInt(sdata.active)) {
          highestActiveState.push(sdata);
        }
        return null;
      });
      return null;
    });
    return highestActiveState;
  };

  const getHighestRecoveryPercentageState = (stateData) => {
    // console.log(averageRecoveredCases);
    var highestRecovery = [];
    var highestRecoveryState = [];
    var highestRecoveryState2 = [];
    stateData.map(data => {
      if (data.region !== 'Total#') {
        if (parseFloat(data.recovered) > averageRecoveredCases) {
          highestRecoveryState.push(data);
        }
      }
      return null;
    });
    highestRecoveryState.map(data => {
      highestRecovery.push(parseFloat((data.recoveryPercentage)));
      return null;
    });
    highestRecovery = highestRecovery.sort(function(a, b){return b - a}).slice(0,5);
    highestRecovery.map(data => {
      stateData.map(sdata => {
        if (data === parseFloat(sdata.recoveryPercentage)) {
          highestRecoveryState2.push(sdata);
        }
        return null;
      });
      return null;
    });
    return highestRecoveryState2;
  };

  if(loading) {
    return (
      <div style={{backgroundColor: 'white', height:'auto', width:'auto'}}>
      <br /><br /><br /><br />
      <div style={{display:'flex', justifyContent:'center'}}>
        <CircleLoader
              size={50}
              color={'teal'}
              loading={loading}
        />
      </div>
      <br /><br /><br /><br />
      </div>
    );
  }

  return (
    <div>
    <br />
    {
      alertShow
        ? <Alert variant={'warning'} onClose={() => setAlertShow(false)} dismissible>
          Graphs are better optimized for Laptops & PCs.
        </Alert> : null
    }
    {toastShow
      ? <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '100px'
        }}
      >
        <Toast
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClose={() => setToastShow(false)} show={toastShow} delay={1000} autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Last Updated at</strong>
          </Toast.Header>
          <Toast.Body>{lastUpdated}</Toast.Body>
        </Toast>
      </div> : null
    }
    <p align="right" style={{margin: '20px'}}>
    <OverlayTrigger
      placement={'left'}
      overlay={
        <Tooltip id={`tooltip-left`}>
          Hover over <strong>BARS</strong> in the graph to see corresponding counts.
        </Tooltip>
      }
    >
      <Button variant="outline-info" size="sm">
        <span role="img" aria-label="info">ℹ️</span>
      </Button>
    </OverlayTrigger>
    </p>
    <Card
      className='text-center'
      style={{margin: '10px', width: 'auto'}}
      border="primary"
      bg='dark'
      text='light'
    >
      <Card.Body>
      <Card.Title>States with Highest confirmed cases</Card.Title>
      <HighestConfirmedState highestConfirmedStateData={highestConfirmedState} />
      </Card.Body>
    </Card>
    <Card
      className='text-center'
      style={{margin: '10px', width: 'auto'}}
      border="danger"
      bg='dark'
      text='light'
    >
      <Card.Body>
      <Card.Title>States with Highest Dead to Infected Percentage</Card.Title>
      <HighestDeadToInfectedPercentageState highestDeadToInfectedStateData={highestDeadToInfectedState} />
      </Card.Body>
    </Card>
    <Card
      className='text-center'
      style={{margin: '10px', width: 'auto'}}
      border="warning"
      bg='dark'
      text='light'
    >
      <Card.Body>
      <Card.Title>States with Highest active cases</Card.Title>
      <HighestActiveState highestActiveStateData={highestActiveState} />
      </Card.Body>
    </Card>
    <Card
      className='text-center'
      style={{margin: '10px', width: 'auto'}}
      border="success"
      bg='dark'
      text='light'
    >
      <Card.Body>
      <Card.Title>States with Highest Recovery Percentage</Card.Title>
      <HighestRecoveryPercentageState highestRecoveryPercentageStateData={highestRecoveryPercentageState} />
      </Card.Body>
      <Card.Footer>
        <small><strong>*States only above national</strong> <i>averageRecoveredCases</i> <strong>considered.</strong></small>
      </Card.Footer>
    </Card>
    </div>
  );
}

export default IndiaStateStatsHome;

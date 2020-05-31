import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import LoadingBar from '../LoadingBar/LoadingBar';
import IndiaTimeSeriesGraph from './IndiaTimeSeries/IndiaTimeSeriesGraph';
import IndiaStatewiseMap from './IndiaStatewise/IndiaStatewiseMap';
import StatewiseTable from './IndiaStatewise/StatewiseTable/StatewiseTable';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

function IndiaStatsHome() {
  const [, setAllRoutes] = useState([]);
  const [indiaTimeSeriesData, setIndiaTimeSeriesData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastShow, setToastShow] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [alertShow, setAlertShow] = useState(true);

  useEffect(() => {
    axios
    .all([
      axios.get('https://api.covid19api.com/'),
      axios.get('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true'),
      axios.get('https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1')
    ])
    .then(resArr => {
      setAllRoutes(resArr[0].data);
      setApiData(resArr[1].data.regionData);
      setData(resArr[1].data.regionData);
      setIndiaTimeSeriesData(resArr[2].data);
      setLastUpdated(resArr[1].data.lastUpdatedAtApify);
      setLoading(false);
      //console.log(res.data);
      //console.log('***************');
      //console.log(Object.keys(res.data));
      //console.log('***************');
      //console.log(Object.keys(res.data).map(key => {
        //return Object.keys(res.data[key]).map(key1 => {
          //return key1;
        //});
      //}));
      //console.log('***************');
      //console.log(Object.keys(res.data).map(key => {
        //return res.data[key];
      //}));
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  if(loading) {
    return (
      <LoadingBar loading={loading} />
    );
  }

  return (
    <div style={{width: '98%'}}>
    < br />
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
          onClose={() => setToastShow(false)} show={toastShow} delay={5000} autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Last Updated at</strong>
          </Toast.Header>
          <Toast.Body>{lastUpdated}</Toast.Body>
        </Toast>
      </div> : null
    }
      <CardDeck>
      <Card
        className='text-center'
        border="info"
        bg='dark'
        text='light'
      >
        <Card.Body>
        <Card.Title>
          Time Series Graph India
          <p align="right">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Tooltip id={`tooltip-left`}>
                Hover over <strong>LINES</strong> in the graph to see corresponding counts.
              </Tooltip>
            }
          >
            <Button variant="outline-info" size="sm">
              <span role="img" aria-label="info">ℹ️</span>
            </Button>
          </OverlayTrigger>
          </p>
        </Card.Title>
        <IndiaTimeSeriesGraph indiaTimeSeriesData={indiaTimeSeriesData} />
        </Card.Body>
      </Card>
      <Card
        className='text-center'
        border="info"
        bg='dark'
        text='light'
      >
        <Card.Body>
        <Card.Title>
          Heat Map (Confirmed cases)
          <p align="right">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Tooltip id={`tooltip-left`}>
                Hover over <strong>STATES</strong> in the map to see corresponding counts.
              </Tooltip>
            }
          >
            <Button variant="outline-info" size="sm">
              <span role="img" aria-label="info">ℹ️</span>
            </Button>
          </OverlayTrigger>
          </p>
        </Card.Title>
        <IndiaStatewiseMap apiData={apiData}/>
        </Card.Body>
      </Card>
      </CardDeck>
      <br />
      <CardDeck>
      <Card
        className='text-center'
        border="info"
        bg='dark'
        text='light'
      >
        <Card.Body>
        <Card.Title>
          Statewise Count
          <p align="right">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Tooltip id={`tooltip-left`}>
                Click on any of the <strong>Column Names</strong> to sort.<br />
                Use <strong>ARROWS</strong> at the bottom to navigate to different page.<br />
                Use <strong>DROPDOWN</strong> at the bottom to changes number of rows displayed per page.<br />
                Use <strong>SEARCH BAR</strong> to filter by State.
              </Tooltip>
            }
          >
            <Button variant="outline-info" size="sm">
              <span role="img" aria-label="info">ℹ️</span>
            </Button>
          </OverlayTrigger>
          </p>
        </Card.Title>
        <StatewiseTable data={data} />
        </Card.Body>
      </Card>
      </CardDeck>
    </div>
  );
}

export default IndiaStatsHome;

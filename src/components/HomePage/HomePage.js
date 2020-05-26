import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircleLoader from "react-spinners/CircleLoader";
import CountryStats from './CountryStats/CountryStats';
import WorldSummary from './WorldStatSummary/WorldSummary';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

function HomePage() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastShow, setToastShow] = useState(true);
  const [alertShow, setAlertShow] = useState(true);

  useEffect(() => {
    axios
    .all([
      axios.get('https://corona.lmao.ninja/v2/all'),
      axios.get('https://corona.lmao.ninja/v2/countries')
    ])
    .then(resArr => {
      // console.log(resArr[1].data);
      setLatest(resArr[0].data);
      setResults(resArr[1].data);
      setLoading(false);
      // setGlobalDate(res.data);
      // setIndiaData(res.data.Countries[100]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

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

  const lastUpdated = new Date(parseInt(latest.updated)).toString();

  return (
    <div>
    <br />
    {
      alertShow
        ? <div><Alert variant={'warning'} onClose={() => setAlertShow(false)} dismissible>
          Use navigation menu on top for <strong>India only Stats</strong>.
        </Alert>
        <Alert variant={'info'} onClose={() => setAlertShow(false)} dismissible>
          Hover / Click on <Button variant="outline-info" size="sm">
            <span role="img" aria-label="info">ℹ️</span>
          </Button> (present on right corners) wherever available to know more about each component!
        </Alert></div> : null
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
    <Card
      className='text-center'
      style={{margin: '10px', width: 'auto'}}
      border="info"
      bg='dark'
      text='light'
    >
      <Card.Body>
      <Card.Title><h2>Covid-19 Stats</h2></Card.Title>
      <WorldSummary latest={latest} />
      </Card.Body>
    </Card>
    <br />
    <Card
      className='text-center'
      style={{margin: '10px', width: 'auto'}}
      border="info"
      bg='dark'
      text='light'
    >
      <Card.Body>
      <Card.Title>
        Countrywise Stats
        <p align="right">
        <OverlayTrigger
          placement={'left'}
          overlay={
            <Tooltip id={`tooltip-left`}>
              Click on any of the <strong>Column Name</strong> to sort.<br />
              Use <strong>ARROWS</strong> at the bottom to navigate to different page.<br />
              Use <strong>DROPDOWN</strong> at the bottom to changes number of rows displayed per page.<br />
              Use <strong>SEARCH BAR</strong> to filter by Country.
            </Tooltip>
          }
        >
          <Button variant="outline-info" size="sm">
            <span role="img" aria-label="info">ℹ️</span>
          </Button>
        </OverlayTrigger>
        </p>
      </Card.Title>
      <CountryStats results={results} />
      </Card.Body>
    </Card>
    </div>
  );
}

export default HomePage;

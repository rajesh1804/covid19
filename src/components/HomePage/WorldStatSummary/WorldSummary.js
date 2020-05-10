import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import ReactTooltip from "react-tooltip";

function WorldSummary({latest}) {
  const lastUpdated = new Date(parseInt(latest.updated)).toString();

  return (
    <div>
    <h5
      data-tip={'Data last updated: ' + lastUpdated}
      style={{textAlign:'center'}}
    >
      World Summary
    </h5>
    <ReactTooltip />
    <br />

    <CardDeck>
      <Card
        bg={'primary'}
        text={'white'}
        className='text-center'
        style={{margin: '10px'}}
      >
        <Card.Body>
          <Card.Title>Total Cases</Card.Title>
          <Card.Text style={{fontSize: '30px'}}>
            {latest.cases}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
      <Card
        bg={'success'}
        text={'white'}
        className='text-center'
        style={{margin: '10px'}}
      >
        <Card.Body>
          <Card.Title>Recovered</Card.Title>
          <Card.Text style={{fontSize: '30px'}}>
            {latest.recovered}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
      <Card
        bg={'danger'}
        text={'white'}
        className='text-center'
        style={{margin: '10px'}}
      >
        <Card.Body>
          <Card.Title>Dead</Card.Title>
          <Card.Text style={{fontSize: '30px'}}>
            {latest.deaths}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
    </CardDeck>
    </div>
  );
}

export default WorldSummary;

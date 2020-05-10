import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import { SocialIcon } from 'react-social-icons';
import image from './image.jpg';

function About() {
  return (
    <div style={{backgroundColor: 'white', height:'100%', width:'auto'}}>
    <Card>
      <Card.Header><strong>About</strong></Card.Header>
      <Card.Body>
      <CardDeck>
      <Card>
        <Card.Header>Project Details:</Card.Header>
        <Card.Text>
          &emsp; The source code of this website is available in the following Github Repository --> <SocialIcon url="https://github.com/rajesh1804/covid19" /> <br />
          &emsp; If the repository is forked or codes are used, mentioned the Repository in your references.
        </Card.Text>
        <Card.Header>Data Sources:</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><Card.Link href="https://corona.lmao.ninja/"> The NovelCOVID API </Card.Link></ListGroup.Item>
          <ListGroup.Item><Card.Link href="https://api.apify.com/"> APIFY COVID-19 APIs </Card.Link></ListGroup.Item>
        </ListGroup>
      </Card>

      <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {' '}
                This website is developed by Rajesh. &emsp;
                <img src={image} alt="Developer Image" height="auto" width="120" />
              {' '}
            </p>
            <footer className="blockquote-footer">
              View LinkedIn profile --> <SocialIcon url="http://www.linkedin.com/in/rajeshm99" />
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
      </CardDeck>
      <br />
      <Card.Footer className="text-muted">
        <span role="img" aria-label="disclaimer">⚠️</span>Disclaimer:
        <br />
        <small>
            All the content provided on this website is for informational purposes only and taken from publically available sources.
            This owner of this website makes no representation as to the accuracy or completeness of any information on this site.
            The owner will not be liable for any errors or omissions in this information nor for the availability of this information.
        </small>
      </Card.Footer>
      <br />
      <small><p align='right'>Website version: 1.0.3</p></small>
      </Card.Body>
    </Card>
    </div>
  );
}

export default About;

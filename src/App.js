import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage/HomePage';
import About from './components/About/About';
import {Navigation} from './Navigation';
import IndiaStatsHome from './components/IndiaStats/IndiaStatsHome';
import IndiaStateStatsHome from './components/IndiaStateStats/IndiaStateStatsHome';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from 'rc-footer';

function App() {
  return (
    <div style={{backgroundColor: 'black', height:'auto', width:'auto'}}>
      <Router>
        <Navigation touchControls={'Touch Controls'}/><br /><br /><br />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/about' component={About} />
          <Route path='/indiaStats' component={IndiaStatsHome} />
          <Route path='/indiaStateStats' component={IndiaStateStatsHome} />
        </Switch>
      </Router>
      <div style={{textAlign: 'center', color: 'white'}}>
      <Footer
        bottom="Made with ❤️ by Rajesh. &copy;"
      />
      </div>
    </div>
  );
}

export default App;

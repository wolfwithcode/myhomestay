import React, { Component } from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house'
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';
import AppPresentation from './app-presentation';
class App extends Component {

  state = {}

  componentDidMount(){
    this.fetchHouses();
  }

  fetchHouses = () => {
      fetch('/houses.json')
      .then(rsp => rsp.json())
      .then(allHouses => {
        this.allHouses = allHouses;
        this.determineFeatureHouse();
        this.determineUniqueCountries();
      })
    }

  determineFeatureHouse = () => {
    if(this.allHouses){
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
          ? Array.from(new Set(this.allHouses.map(h => h.country)))
          : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null});
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState( { activeHouse : house });
  }

  render(){
    return (
      <AppPresentation country={this.state.country}
        filteredHouses = {this.state.filteredHouses}
        featuredHouse = {this.featuredHouse}
        countries = {this.countries}
        filterHouses={this.filterHouses}
        activeHouse={this.state.activeHouse}
        setActiveHouse={this.setActiveHouse}
      />
    )
  }
}

export default App;

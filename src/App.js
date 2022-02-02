import React, { Component } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Gallery from "./Components/Gallery/Gallery";
import SearchBar from "./Components/SearchBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      currentQuery: "",
      searchedQuery: "",
      searchQueryLength: 1,
      page: 1,
      selectedImage: {
        description: "",
        src: "",
        username: "",
        page: "",
      },
    };
  }
  ROOT = `https://api.unsplash.com/`;
  KEY = "?client_id=LV9af1yIzthV5HhO-K-tDVV3A7mAdGNZ-nVxRYLti_0";
  PERPAGE = `&per_page=8`;  

  loadMore = () => {
    this.setState(
      (prevState) => {
        return { page: prevState.page + 1 };
      },
      () => {
        axios
          .get(
            `${this.ROOT}search/photos${this.KEY}&query=${this.state.searchedQuery}${this.PERPAGE}&page=${this.state.page}`
          )
          .then((res) => {
            let results = res.data.results;
            console.log(results.length);
            this.setState((prevState) => {
              return {
                gallery: [...prevState.gallery, ...results],
                searchQueryLength: this.state.gallery.length,
              };
            });
          })
          .catch((error) => console.log(error));
      }
    );
  };

  handleChange = (e) => {
    this.setState({
      currentQuery: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return { searchedQuery: prevState.currentQuery };
    });
    axios
      .get(
        `${this.ROOT}search/photos${this.KEY}&query=${this.state.currentQuery}${this.PERPAGE}`
      )
      .then((res) => {
        let results = res.data.results;
        this.setState({
          gallery: [...results],
          currentQuery: "",
          searchQueryLength: results.length,
        });        
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <SearchBar          
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          currentQuery={this.state.currentQuery}
        />
        <div className="container">
          {this.state.searchedQuery && (
            <div className="row">
              <div className="col-md-12">
                <h3>Random</h3>
                <p>{this.state.searchQueryLength} Images have been found</p>
              </div>
            </div>
          )}
          <Gallery
            gallery={this.state.gallery}
            loadMore={this.loadMore}
            selectedImage={this.state.selectedImage}
            searchedQuery={this.state.searchedQuery}
          />
        </div>
      </div>
    );
  }
}

export default App;

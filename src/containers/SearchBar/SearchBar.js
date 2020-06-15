import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../hoc/Modal/Modal'
import SearchResult from '../../components/Navigation/SearchResult/SearchResult'


class SearchBar extends Component {
  state = {
    query: "",
    data: ["bacon", "meat", "bac", "cheese"],
    filteredData: [],
    searchBarClicked:false
  };

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.toLowerCase().includes(query.toLowerCase());
      });
      console.log(filteredData)
      return {
        query,
        filteredData
      };
    });
  };

  getData = () => {
        const { query } = this.state;
        const filteredData = this.state.data.filter(element => {
          return element.toLowerCase().includes(query.toLowerCase())
        });

        this.setState({
          filteredData
        });
  };

  searchBarClickedHandler = () => {
      this.setState({searchBarClicked:true})
  }
  searchBarCanceledHandler = () => {
      this.setState({searchBarClicked:false})
  }

  componentDidMount() {
    this.getData();
    console.log(this.state.data)
    console.log(this.state.filteredData)
  }

  render() {
      console.log(this.state.searchBarClicked)
    return (
      <Auxiliary>
        <div>
            <form>
            <input
                placeholder="Search for..."
                value={this.state.query}
                onChange={this.handleInputChange}
                onClick={this.searchBarClickedHandler}
                key={Math.random}
            />
            </form>
            {/* <div>{this.state.filteredData.map(i => <p>{i}</p>)}</div> */}
            
        </div>
        <Modal clicked={this.state.searchBarClicked} canceled={this.searchBarCanceledHandler}>
            <SearchResult searchData={this.state.filteredData} />
        </Modal>
      </Auxiliary>
    );
  }
}

export default SearchBar
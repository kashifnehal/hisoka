import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../hoc/Modal/Modal'
import SearchResult from '../../components/Navigation/SearchResult/SearchResult'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


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
    //   console.log(filteredData)
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
      // console.log('clicked')
      this.setState({searchBarClicked:true})
  }
  searchBarCanceledHandler = () => {
      this.setState({searchBarClicked:false})
  }

  componentDidMount() {
    this.getData();
    // console.log(this.state.data)
    // console.log(this.state.filteredData)
  }

  render() {
      // console.log(this.state.searchBarClicked)
    return (
      <Auxiliary>
        <div>
            <form>
            <InputGroup className="rounded">
              {/* <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend> */}
              <FormControl
                placeholder="Search.."
                value={this.state.query}
                onChange={this.handleInputChange}
                onClick={this.searchBarClickedHandler}
                key={Math.random}
                // aria-label="Username"
                // aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <input
                placeholder="Search for..."
                value={this.state.query}
                onChange={this.handleInputChange}
                onClick={this.searchBarClickedHandler}
                key={Math.random}
            /> */}
            <Modal clicked={this.state.searchBarClicked} canceled={this.searchBarCanceledHandler}>
                <SearchResult searchData={this.state.filteredData} />
            </Modal>
            </form>
            {/* <div>{this.state.filteredData.map(i => <p>{i}</p>)}</div> */}
            
        </div>
        
      </Auxiliary>
    );
  }
}

export default SearchBar
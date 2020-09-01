import React from "react";
import "./App.css"
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            robots: [],
            searchField: ""
        }
    }

    componentDidMount () {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => this.setState({ robots: data }))
    }

    onSearchChange = (event) => {
        const searchValue = event.target.value
        this.setState(() => ({ searchField: searchValue }))

    }

    render () {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
        });
        return !robots.length ? 
            <h1 className="tc">Loading</h1> :
           (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                        </ErrorBoundary>    
                </Scroll>
            </div>
        );
    };
}

export default App;
import React from 'react';
import axios from 'axios';
class Cookie extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hits: null };
        this.onSearch = this.onSearch.bind(this);
        this.onSetResult = this.onSetResult.bind(this);
    }

    onSearch(e)  {
        e.preventDefault();
        var me = this;
        const { value } = this.input;

        if (value === '') {
            return;
        }
        const cachedHits = localStorage.getItem(value);
        debugger
        if (cachedHits !== null) {
            this.setState({ hits: JSON.parse(cachedHits) });
            return;
        }


        axios.get('https://hn.algolia.com/api/v1/search?query=' + value)
            .then(function(response)  {
                me.onSetResult(response, value)
            });
    }

    onSetResult(result, key) {
        debugger
        localStorage.setItem(key, JSON.stringify(result.data.hits));
        this.setState({ hits: result.data.hits });
        console.log(this)
    }

    render() {
        return (
            <div>
                <h1>Search Hacker News with Local Storage</h1>
                <p>
                    There shouldn't be a second network request,
                    when you search for something twice.
        </p>

                <form type="submit" onSubmit={this.onSearch}>
                    <input type="text" ref={node => this.input = node} />
                    <button type="button">Search</button>
                </form>

                {
                    this.state.hits &&
                    this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
                }
            </div>
        );
    }
}

export default Cookie;
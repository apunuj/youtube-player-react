import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAfmxT6VQnRQjYVL9vHTaVPRQWK5mizNPU';


//create a component
class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
         };

         this.videoSearch('surfboards');

    }

    videoSearch(term) {

        YTSearch({ key : API_KEY, term : term }, videos => {

            this.setState ({
                videos,
                selectedVideo: videos[0]
            });

            console.log(this.state);

        });

    }

    render() {

        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => {this.setState({selectedVideo})}}
                    videos={this.state.videos} />
            </div>
        );

    }

}

//render the component
ReactDOM.render(<App />, document.querySelector('.container'));

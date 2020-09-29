import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: exampleVideoData,
      video: exampleVideoData[0]
    };
    //console.log('this.props: ', this.props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit = _.debounce(this.onSubmit, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      this.onSubmit('cats');
    }, 1000);
  }

  onSubmit(query) {
    const options = {
      query: query,
      max: 5,
      key: YOUTUBE_API_KEY
    };
    this.props.searchYouTube(options, (videos) => {
      this.setState({
        videos: videos,
        video: videos[0]
      });
    });
  }

  handleClick(video) {
    this.setState({
      video: video
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onSubmit={this.onSubmit.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} handleClick={this.handleClick.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

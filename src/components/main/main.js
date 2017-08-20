import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import 'moment-timezone';
import _ from 'lodash';

import { POST_OBJECTS } from '../../constants';
import { postObjShape } from '../../propShapes';


class Main extends Component {
  state = {
    selectedPostName: POST_OBJECTS[0].name,
    selectedLevel: 0,
  }

  setSelectedLevel = level => {
    this.setState({selectedLevel: level});
  }

  render() {
    const { selectedPostName, selectedLevel } = this.state;
    const selectedPost = _.find(POST_OBJECTS, {name: selectedPostName});
    const numLevels = selectedPost.content.length;
    return (
      <div className="main">
        <Post postObj={selectedPost}
              level={selectedLevel} />
        <LevelSelector numLevels={numLevels}
                       selectedLevel={selectedLevel}
                       setSelectedLevelFunc={this.setSelectedLevel} />
      </div>
    );
  }
}


export default Main;


class Post extends Component {
  render() {
    const { postObj, level } = this.props;
    const { title, author, content, timePosted } = postObj;
    const text = content[level];
    return (
      <div className="post-container">
        <h1 className="post-title">
          <Markdown source={title} />
        </h1>
        <div className="post-metadata">
          <div> by {author} </div>
          <div>
            <Moment date={timePosted}
                    format="MMM D, YYYY" />
          </div>
        </div>
        <Markdown source={text} />
      </div>
    )
  }
}

Post.propTypes = {
  postObj: postObjShape.isRequired,
  level: PropTypes.number.isRequired,
}


class LevelSelector extends Component {
  render() {
    const { numLevels, setSelectedLevelFunc } = this.props;
    const levelOptions = _.map(_.range(numLevels), level => {
      const selectLevel = () => setSelectedLevelFunc(level);
      return (
        <button onClick={selectLevel}>
          {level}
        </button>
      )
    });
    return (
      <div>
        {levelOptions}
      </div>
    )
  }
}

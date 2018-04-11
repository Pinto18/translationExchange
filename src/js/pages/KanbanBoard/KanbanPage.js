import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import KanbanBoard from './components/KanbanBoard';
import {getChunks, getTakes, getComments,
  patchTake, saveComment, getUserHash,
  removeUser, getChapters} from '../../actions';
import UtilityPanel from '../../components/UtilityPanel';
import styled from 'styled-components';
import 'css/takes.css';
import img from '../../../assets/images/obs-en-01-01.jpg';



class KanbanPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {getComments, getChunks, takes} = this.props;
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    if (takes.length < 1) {
      getChunks(query.chapterId);               //get data if the user refresh the page
      getComments(query.chapterId, 'chapter_id');

    }

  }


  shouldComponentUpdate(nextProps) {

    if (nextProps.location != this.props.location) {
      return true;
    }

    if (nextProps) {
      return true;
    }
  }


  render() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);

    console.log(this.props, 'KANBAN PAGE PROPS');
    return (
      <KanbanPageContainer>
        <NavBar chapterNum={query.chapterNum} kanbanPage={true} {...this.props} />

        {
          this.props.loading?
            <Loading height="auto" />

            :

            <KanbanContainer>

              <KanbanBoard {...this.props} />

              <UtilityPanel chapterNum={query.chapterNum} {...this.props} />

            </KanbanContainer>

        }

        <SourceAudio />
      </KanbanPageContainer>
    );
  }

}

const KanbanPageContainer = styled.div`
overflow-x: hidden;
overflow-y: auto;
width: 100%;
box-sizing: border-box;
`;

const KanbanContainer = styled.div`
 display: flex;
 height: 90vh ;
 width: 100vw;
 flex-direction: row;
 background: url(${img});
 background-repeat: no-repeat;
 background-size: cover;
 overflow-x: hidden;
 overflow-y: auto;
 box-sizing: border-box;
`;
//
// const KanbanBoard = styled.div`
//   flex: 1;
//   background: url(${img})  ;
//   height: inherit;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;


const SourceAudio = styled.div`
  position: fixed;
  bottom: 0;
  height: 10vh;
  background: #2D2D2D;
  width: 100vw;
  z-index: 99;
`;

const mapDispatchToProps = dispatch => {

  return bindActionCreators({getChunks, getTakes, getComments, patchTake, saveComment, getUserHash, removeUser, getChapters}, dispatch);

};

const mapStateToProps = state => {
  const {takes, chunks, chunkNum, activeChunkId, loading} = state.kanbanPage;
  const {chapterComments, chunkComments, uploadingComments} = state.comments;
  const {loggedInUser} = state.user;
  const { displayText } = state.geolocation;



  return {takes, chunks, loggedInUser, chunkNum, chapterComments, chunkComments,
    displayText, activeChunkId, uploadingComments, loading};

  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(KanbanPage);

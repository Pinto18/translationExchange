import React, {Component} from 'react';
import styled from 'styled-components';
import Player from './Player';
import RecordCommentsModal from './RecordCommentsModal';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state={ displayModal: false };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
      this.setState({displayModal:false})
  }


  render() {
    const {comments, text, id, type, saveComment, loadingComments} = this.props;


    return (
      <Container>
        <TextContainer>
          <TextHeader> {text} </TextHeader>
          <SvgContainer>
            <SvgLine />
          </SvgContainer>
        </TextContainer>
        <AudioContainer>
          {comments? comments.length > 0 ? <div> {comments.map(((cm, index)=> <Player id={index} comments={cm} />  ))}</div> : <NoComments>No comments Available</NoComments> : <NoComments>No comments Available</NoComments>  }
        </AudioContainer>
        <ButtonContainer>
          <RecordButton onClick={()=>{this.setState({displayModal: true})}}>
            <i class="fas fa-microphone"></i>
          </RecordButton>
          <RecordCommentsModal
              loadingComments={loadingComments}
              closeModal={()=>this.closeModal()}
              saveComment={saveComment}
              id={id}
              type={type}
              display={this.state.displayModal} />
        </ButtonContainer>
      </Container>
    );
  }
}
const Container = styled.div`
  padding-top: 1vw;
`;

const SvgContainer = styled.div`
  width:60%;
`;

const RecordButton = styled.button`
  background-color: #E74C3C;
  border: none;
  height: 3vw;
  width: 3vw;
  border-radius: 80%;
  color: white;
  outline: none;
  border-color: transparent;
  cursor: pointer;
  font-size: 1vw;

`;
const SvgLine = ()=>{ return ( <svg height="5">
  <line x1=".5vw" y1="0" x2="8vw" y2="0" style={{stroke: 'rgb(255,255,255)', strokewidth: 2}} />
</svg>)};

const TextHeader = styled.p`
  color: #fff;
  padding-left: .5vw;
  font-size: 1vw;

`;

const NoComments = styled.p`
  color: #969595;
  text-align: center;
  padding-top: 1vw;
  font-style: italic;

`;

const TextContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;

`;

const AudioContainer = styled.div`

`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5vw;

`;



export default Comments;

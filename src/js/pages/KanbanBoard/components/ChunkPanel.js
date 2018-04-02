import React, { Component } from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../components/PlayerTracker';


class ChunkPanel extends Component {


render() {
    const {selectedChunk,takeLocation} = this.props; //selectedChunk is the chunk number selected in the navbar, by default is 1

    return (
      <Container>
        {this.props.chunks.map(chk =>{
          return (
            <ChunksContainer selected= {selectedChunk == chk.startv} >
              <label>Chunk {chk.startv} </label>
              {takeLocation!= null && selectedChunk != chk.startv ?
                <PlayerTracker url={takeLocation} />
                :
                <CurrentLabel selected= {selectedChunk == chk.startv}>{selectedChunk == chk.startv ? 'Current' : 'Unavailable'} </CurrentLabel>
              }

            </ChunksContainer>);
        })}
      </Container>
    );
  }
}

const Container = styled.div`
  padding-top: .5vw;
`;
const ChunksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${props=> props.selected ? 'white': '#969595' } ;
  border-bottom: solid 1px #969595;
  padding-top: 1vw;
  padding-bottom: 1vw;
  font-size: 1vw;
`;

const CurrentLabel= styled.label`
  font-style:${props=> props.selected ? ' ' : 'italic'};
`;



export default ChunkPanel;
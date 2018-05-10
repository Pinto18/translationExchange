import React from 'react';
import styled from 'styled-components';
import DragSource from './DragTarget';
import jdenticon from 'jdenticon';
export default class TakeCardTopIcon extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {owner_icon_hash} = this.props;
    jdenticon.update(`#user${owner_icon_hash}`,owner_icon_hash? owner_icon_hash: 'null user');
  }

  render() {
    const {owner_icon_hash} = this.props;

    return  (
      <TopBar>

        <DragSource {...this.props} />

        <CardInfo>
          <h3 style={{alignSelf: 'center'}}> {this.props.txt.take} {this.props.take_num} </h3>
          <p style={{color: 'lightgray', fontStyle: 'italic', fontWeight: '100', marginTop: '-0.8vw'}}> 03/13/17 </p>
        </CardInfo>

        <Icon  id={`user${owner_icon_hash}`} data-jdenticon-hash={owner_icon_hash? owner_icon_hash: 'null user'} />
      </TopBar>

    );
  }

}

const TopBar = styled.div`
  //height: 15%;
  display: flex;
  flex-direction: row;
  //align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

`;


const CardInfo = styled.div`
  margin-top: 0.8vw;
  text-align: center;
`;

const Icon = styled.svg`
  height: 2vw;
  width: 2w;
  margin-top: 0.6vw;
  cursor: pointer;
  `;

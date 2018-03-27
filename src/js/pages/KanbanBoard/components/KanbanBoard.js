import React from 'react';
import styled from 'styled-components';
import img from '../../../../assets/images/obs-en-01-01.jpg';
import KanbanColumn from './KanbanColumn';


export default class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props, 'PROPS FOR KANBAN BOARD');

  }


  render() {
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let publishedColumn = [];

    this.props.takes.forEach((take) => {
      console.log(take.rating);
      console.log(take.published);
      switch (take.rating) {
        case 0:
          column1.push(take);
          break;

        case 1:
          column1.push(take);
          break;

        case 2:
          column2.push(take);
          break;

        case 3:
          if (take.published == true) {
            publishedColumn.push(take);
          }

          else {
            column3.push(take);
          }
          break;

        default:
          column1.push(take);
          break;
      }
    });

    return (
      <Container>

        <KanbanColumn listId ={1} icon= {1} array = {column1} />
        <KanbanColumn listId ={2} icon= {2} array = {column2} />
        <KanbanColumn listId ={3} icon= {3} array = {column3} />
        <KanbanColumn listId ={4} icon= {4} array = {publishedColumn} />


      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  background: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
 `;

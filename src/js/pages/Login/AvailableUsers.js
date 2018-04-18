import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import Loading from '../../components/Loading';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {fetchUsers, identiconLogin} from '../../actions';
import img from '../../../assets/images/background-pattern.png';
class AvailableUsers extends React.Component {


  componentWillMount() {
    const {history, fetchUsers} = this.props;
    fetchUsers(history);
  }

  render() {

    const {users} = this.props;

    return (
      <Container className="pageBackground">

        <h2 style={{marginBottom: '5vw'}}> Available Users </h2>

        {
          this.props.loading?

            <Loading height = "90vh" />

            :

            <Grid columns={16} >

              <Grid.Column width ={3}>
                <NewUserCard {...this.props} />
              </Grid.Column >

              {
                users.length>0? users.map((user,index)  => {
                  return (
                    user.is_social? '' :
                      <Grid.Column width={3}>
                        <UserCard  key={user} id={index} user={user} {...this.props} />
                      </Grid.Column>
                  );}) :   ''

              }
            </Grid>

        }

      </Container>



    );

  }

}

const Container = styled.div`
  padding: 5vw;
  text-align: center;
  color: white;

`;

Container.displayName = 'Container';

const mapStateToProps = state => {
  const { users, loading } = state.user;
  return {users, loading};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  fetchUsers, identiconLogin }, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps )(AvailableUsers);

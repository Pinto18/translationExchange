import React from 'react';
import WelcomeComponent from './components/WelcomeComponent.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onLoginSuccess, fetchUsers, createSocialUser, updateLanguage} from '../../actions';
import img from '../../../assets/images/background-pattern.png';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Languages from '../../../languages/textToDisplay.json';


class Welcome extends React.Component {

  componentWillMount() {
    const language = window.navigator.userLanguage || window.navigator.language;
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.props.updateLanguage(storedLanguage);
    }

  }

  onSelect({key}) {
    const language =key;
    this.props.updateLanguage(language);
    localStorage.setItem('language', language);

  }


  render() {
    const menu = (
      <Menu onSelect={ ky=> this.onSelect(ky)}>
        {Object.keys(Languages).map(lng => <MenuItem style={{cursor:'pointer', color:'#fff', backgroundColor:'#000' }} key={lng}> {lng} </MenuItem> )}
      </Menu>
    );

    return (
      <LoginPage className="pageBackground">
        <LanguageContainer>
          <Dropdown
            trigger={['click']}
            overlay={menu}
            animation="slide-up"
          >
            <Language>{this.props.txt.languages} <i class="material-icons">language</i></Language>
          </Dropdown>
        </LanguageContainer>

        <WelcomeComponent {...this.props} />
      </LoginPage>
    );
  }

}

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

`;

const Language = styled.p`
  color:white;
  cursor:pointer;
`;

const LanguageContainer = styled.div`
  width:100%;
  display:flex;
  justify-content: flex-end;
  margin-bottom: 2vw;

`;


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  onLoginSuccess, fetchUsers, createSocialUser, updateLanguage }, dispatch);
};

const mapStateToProps = state => {
  const { socialLogin } = state.user;
  const {txt} = state.geolocation;
  return {socialLogin, txt};
};

export default connect(mapStateToProps, mapDispatchToProps) (Welcome);

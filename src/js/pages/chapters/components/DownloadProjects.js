import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react'
import 'css/chapters.css'
const options = [
    { key: 'zip', icon: 'file archive outline', text: 'Zip', value: 'zip' },
    { key: 'tr', icon: 'file archive outline', text: 'Tr', value: 'tr' }
]
class DownloadProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            option: 'zip'
        };
        this.onDownloadProject = this.onDownloadProject.bind(this)
    }

    onDownloadProject() {
        this.setState({ loading: true });
        this.props.onDownloadProject(this.state.option);
    }
    getOption(event, data) {
        this.setState({
            option: data.value
        });
    }

    render() {
        return (
            <Button.Group color='teal'>
                <Button onClick={this.onDownloadProject}>Download</Button>
                <Dropdown options={options} floating button className='icon' onChange={this.getOption.bind(this)} />
            </Button.Group>

        );
    }
}



export default DownloadProjects;

import React, {Component} from 'react';
import { ReactMic } from 'react-mic';
import SparkMD5 from 'spark-md5';
import jdenticon from 'jdenticon';
import Waveform from './Waveform';
import TimeLine from './timeLine.png';
import RecordButton from './RecordButton';
import BottomButtons from './BottomButtons';


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
    };
    this.onStop = this.onStop.bind(this);
    this.redo = this.redo.bind(this);
    this.save = this.save.bind(this);
  }


  startRecording = () => {
    this.setState({
      recording: true,
    });
    setTimeout(()=>{this.stopRecording(); }, 3000);
  }

  stopRecording() {
    this.setState({
      recording: false,
    });
  }

  onStop(recordedBlob) {
    const a = new FileReader();
    a.readAsArrayBuffer(recordedBlob.blob);

    let generatedHash ='';
    a.onloadend =  () => {
      generatedHash= SparkMD5.ArrayBuffer.hash(a.result);
      this.setState({recordedBlob, generatedHash, audio: true});
      jdenticon.update('svg', generatedHash);
    };
  }

  audioWave() {
    const { recordedBlob, audio } = this.state;

    if (audio) {
      return (
        <div style = {styles.recordContainer}>
          <Waveform audioFile={recordedBlob.blob} />
        </div>
      );

    }
    return (
      <div style={styles.recordContainer}>
        <div style={styles.recordPreview}>
          <ReactMic
            record={this.state.recording}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#009CFF"
            backgroundColor="transparent"
          />
        </div>
      </div>
    );
  }

  redo() {
    this.setState({
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
    });
  }

  save() {               // saves to database
    const {recordedBlob, generatedHash} = this.state;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const jsonblob = reader.result
        this.props.createUser(jsonblob, generatedHash, this.done()); // action to create user in db
      },
      false
    );
    reader.readAsDataURL(recordedBlob.blob);

  }

  done() {
    this.props.history.push('/projects');
  }

bottomSection() {
    const {recording, generatedHash} = this.state;
    let header ='What is your name?';
    let bottomText = 'Record';
    let textStyle = styles.textRecord;

    let handler = <RecordButton startRecording={this.startRecording}  />

    if (recording) {
      bottomText= 'Recording'
    }

    if (this.state.audio) {
      header='is this OK?';

      bottomText=
      handler = <svg id="canvas" width="20%" height="20%" data-jdenticon-value={generatedHash} />
    }

    return (
      <div style={styles.centerContainer}>
        <h1>{header}</h1>
        <p style={styles.textPrivacy}>If you are concerned for your privacy or safety, please use a nickname or pseudonym.</p>
        {handler}
        {this.state.audio ? <BottomButtons done={this.save}  redo={this.redo} /> : <p style={textStyle}>{bottomText}</p>}
      </div>

    );
  }


  render() {


    return (
      <div style={styles.container}>
        {this.audioWave()}
        {this.bottomSection()}

      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',

  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '20%',
  },
  textPrivacy: {
    textAlign: 'center',
    width: '80%',
    fontWeight: 600,
  },
  recordContainer: {
    width: '100%',
    height: '35%',
    minWidth: 469,
    backgroundImage: `url(${ TimeLine })`,
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#2D2D2D',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  recordPreview: {
    marginTop: '3%',
    width: '100%',
  },
  playButton: {
    height: '80px',
    width: '80px',
    borderRadius: '50px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    marginTop: '10px',
    outline: 'none',
  },
  textRecord: {
    fontSize: '1vw',
    textDecoration: 'underline',
    lineHeight: 1.8,
    fontWeight: 900,
    color: '#E74C3C',
  },
  WaveformContainer: {
    width: '100%',
    paddingTop: '14%',

  }


};

export default CreateUser;

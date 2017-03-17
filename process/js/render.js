var $ = jQuery = require('jquery');
var _ = require('lodash');
var bootstrap = require('bootstrap');

var fs = eRequire('fs'),
    xml2js = eRequire('xml2js');

var electron = eRequire('electron');
var ipc = electron.ipcRenderer;

var React = require('react');
var ReactDOM = require('react-dom');
var LoginSubcomponent = require('./LoginSubcomponent');
var JobSpecification = require('./JobSpecification');
var TotalProgress = require('./TotalProgress');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      emailUsername: '',
      password: '',
      metadataFilepath: 'this is the filename and path for the metadata XML file',
      jobFilepath: 'this is the filename and path for the jobspecs XML file',
      currentByteCount: 0,
      totalByteCount: 0,
      currentFileInfo: {
        filename: 'currentFileInfo filename',
        size: 'currentFileInfo size'
      }
    }//return
  }, //getInitialState

  showAbout:function() {
    ipc.sendSync('openInfoWindow');
  }, //showAbout

  deleteMessage: function(item) {
    var allApts = this.state.myAppointments;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts
    }); //setState
  }, //deleteMessage

  mainHandleLogin: function(loginCredentials) {
  var subuserName = loginCredentials.userName;
  var subpassword = loginCredentials.password;
  console.log(subuserName);
  console.log(subpassword);
  /*this.setState( {
    emailUsername : subuserName,
    password: subpassword
  }); //setState */
  this.setState( {
    emailUsername : subuserName,
    password : subpassword
    }); //setState
  }, //mainHandleLogin

  onSelectMetaDataFile: function () {
    console.log('called onSelectMetaDataFile');
    this.setState({
      metadataFilepath: 'metadataFilepath changed in onSelectMetaDataFile',
    });
  },

  onSelectJobSpecsFile: function () {
    console.log('called onSelectJobSpecsFile');
    this.setState({
      jobFilepath: 'jobFilepath changed in onSelectJobSpecsFile',
    });
  },

  onHandleSend: function(sendFileSpecs) {
      console.log('called onHandleSend');
      console.log('metaDataFile= ' + sendFileSpecs.metaDataFile);
      console.log('jobFilepath= ' + sendFileSpecs.jobFilepath);
  }, //onHandleSend

  computeTotalProgress: function() {
    return this.state.currentByteCount/this.state.totalByteCount*100;
  }, //computeTotalProgress

  render: function() {
    //var filteredApts = [];
    //var myAppointments = this.state.myAppointments;
    /*
    var parseString = xml2js.parseString;
    var xml = "<root>Hello xml2js!</root>";
    parseString(xml, function (err, result) {
        console.dir(result);
    });
    var parser = new xml2js.Parser();
    fs.readFile(xmlDataLocation, function(err, data) {
        parser.parseString(data, function (err, result) {
            console.dir(result);
            console.log('Done');
        });
    });
    */

    return(
        <div className="interface">
        <LoginSubcomponent
            subHandleLogin = {this.mainHandleLogin}
            subUsername = {this.state.emailUsername}
            subPassword = {this.state.password}
          />
          <JobSpecification
          metadataFilepath = {this.state.metadataFilepath}
          jobFilepath = {this.state.jobFilepath}
          currentFileInfo = {this.state.currentFileInfo}
          onselectMetaDataFile = {this.onSelectMetaDataFile}
          onselectJobSpecsFile = {this.onSelectJobSpecsFile}
          handleSend = {this.onHandleSend}
          />

        </div>
    );
  } //render
  /*
  <JobSpecification
  metadataFilepath = {this.state.metadataFilepath}
  jobFilepath = {this.state.jobFilepath}
  currentFileInfo = {this.state.currentFileInfo}
  onselectMetaDataFile = {this.onSelectMetaDataFile}
  onselectJobSpecsFile = {this.onSelectJobSpecsFile}
  handleSend = {this.onHandleSend}
  />
  <TotalProgress
  currentByteCount = {this.state.currentByteCount}
  totalByteCount = {this.state.totalByteCount}
  totalProgress = {this.computeTotalProgress}
  />
  */
});//MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('ubsUploads')
); //render

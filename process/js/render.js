var $ = jQuery = require('jquery');
var _ = require('lodash');
var bootstrap = require('bootstrap');

var fs = eRequire('fs'),
    xml2js = eRequire('xml2js');

var electron = eRequire('electron');
var ipc = electron.ipcRenderer;
var app = eRequire('electron').remote;
var dialog = app.dialog;

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
      metadataFilepath: 'Choose folder location of files to upload',
      jobFilepath: 'Choose the jobspecs XML file',
      currentByteCount: 0,
      totalByteCount: 0,
      currentFileInfo: {
        filename: 'currentFileInfo filename',
        size: 'currentFileInfo size'
      },
      readyToEnableSendButton : false
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
    var path = dialog.showOpenDialog(
      { title:"Select a folder", properties: ["openDirectory"] }
    );
    if(path === undefined){
        console.log("No destination folder selected");
        return;
    }else{
          console.log(path);
          this.setState({
            metadataFilepath: path[0]
          });
      }
  },

  onSelectJobSpecsFile: function () {
    console.log('called onSelectJobSpecsFile');
    var fileNames = dialog.showOpenDialog();
    if(fileNames === undefined){
        console.log("No file selected");
        return;
    }else{
        console.log(fileNames);
        this.setState({
          jobFilepath: fileNames[0]
        });
      }
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

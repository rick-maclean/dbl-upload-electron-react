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
      metadataFilepath: '',
      metadataFilepathSelected: false,
      jobFilepath: '',
      jobFilepathSelected: false,
      currentByteCount: 0,
      totalByteCount: 0
    }//return
  }, //getInitialState
/*
currentFileInfo: {
  filename: 'currentFileInfo filename',
  size: 'currentFileInfo size'
},
*/

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
        this.setState({ metadataFilepathSelected: false });
        this.setState({  metadataFilepath: '' });
    }else{
          //console.log('going to set the path and boolean' + path);
          this.setState({ metadataFilepathSelected: true });
          this.setState({  metadataFilepath: path[0] });
      }
      //console.log ('metadataFilepathSelected is set to: ' + this.state.metadataFilepathSelected);
      console.log('end of onSelectMetaDataFile');
  },

  onSelectJobSpecsFile: function () {
    console.log('called onSelectJobSpecsFile');
    var fileNames = dialog.showOpenDialog();
    if(fileNames === undefined){
        console.log("No file selected");
        this.setState({ jobFilepathSelected: false });
        this.setState({ jobFilepath: '' });
        return;
    }else{
        //console.log('going to set the filename and boolean' + fileNames);
        this.setState({ jobFilepathSelected: true });
        this.setState({ jobFilepath: fileNames[0] });
      }
      //console.log ('jobFilepathSelected is set to: ' + this.state.jobFilepathSelected.value);
      console.log('end of onSelectJobSpecsFile');
  },
    onHandleSend: function(sendFileSpecs) {
      console.log('called onHandleSend');
      console.log('metaDataFolder= ' + sendFileSpecs.metaDataFile);
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

    if(this.state.jobFilepathSelected  &&  this.state.metadataFilepathSelected) {
      $('#sendButton').removeAttr("disabled");
    } else {
      $('#sendButton').attr("disabled", "true");
    }

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
          onselectMetaDataFile = {this.onSelectMetaDataFile}
          onselectJobSpecsFile = {this.onSelectJobSpecsFile}
          handleSend = {this.onHandleSend}
          />
        </div>
    );
  } //render
  /*
enableSendButton = {this.state.enableSendButton}


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

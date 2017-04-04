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

function persistData(storage_key, jsonData) {
  console.log('inside persitComponent() and storage_key is ' + storage_key + ', and jsonData is, ' + jsonData);
    const appStorage = eRequire('electron-json-storage');
    //Write
    appStorage.set(storage_key, jsonData, function (error) {
        if (error) throw error;
    });
}

function restorePersistedData(jsonStoragekey) {
  console.log('inside restorePersistedData() and storage_key is ' + jsonStoragekey);
  const storage = eRequire('electron-json-storage');
  //Read
  storage.get(jsonStoragekey, function (error, retrievedData) {
      if (error) throw error;

      console.log('the data restored from persistance is = ' + retrievedData );
      console.log(retrievedData);
      });
  //storage.get(jsonStoragekey, function (error, retrievedData) {
  //    if (error) throw error;
  //console.log('the data restored from persistance is = ' + retrievedData);
}

var jsonData =   '{   "petName": "Buffy"  }';
var jsonToObjData = JSON.parse(jsonData);

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      emailUsername: '',
      password: '',
      metaDataFolder: 'metaDataFolder',
      metaDataFolderSelected: false,
      jobFilepath: 'jobFilepath',
      jobFilepathSelected: false,
      currentByteCount: 0,
      totalByteCount: 0,
      userKey: '',
      errorMessage: '',
      electronJsonStoredValue: '',
      persistedData: jsonToObjData
    }//return
  }, //getInitialState
/*
currentFileInfo: {
  filename: 'currentFileInfo filename',
  size: 'currentFileInfo size'
},
*/

componentDidMount: function() {
  const storage = eRequire('electron-json-storage');
  storage.getAll(function(error, data) {
    if (error) throw error;

    console.log('inside onestorePersistedAllData');
    console.log('data.loginPersistKey is =>' +data.loginPersistKey);
    console.log('data.metaDataPersistKey is =>' +data.metaDataPersistKey);
    console.log('data.jobFilePersistKey is =>' +data.jobFilePersistKey);
    // console.log('ALL the data restored from electron-json-storage  is : ' + data);
    jQuery('#inputEmail').val(data.loginPersistKey);
    jQuery('#metaDataFolderId').text(data.metaDataPersistKey);
    jQuery('#jobFilePathId').text(data.jobFilePersistKey);
  });
  }, //componentDidMount

  showAbout:function() {
    ipc.sendSync('openInfoWindow');
  }, //showAbout

  mainHandleLogin: function(loginCredentials) {
      var subuserName = loginCredentials.userName;
      var subpassword = loginCredentials.password;
      console.log('subuserName is = ' + subuserName);
      console.log('subpassword is = '  + subpassword);
      /*this.setState( {
        emailUsername : subuserName,
        password: subpassword
      }); //setState */
      this.setState( {
        emailUsername : subuserName,
        password : subpassword
        }); //setState
      persistComponent('loginPersistKey', subuserName);

     /*================================= LOGIN CODE ====================================================
     let params = $.param({ 'email': this.state.emailUsername, 'password': this.state.password });
     let url = "https://app.thedigitalbiblelibrary.org/api/user_token?" + params;

    // $.get() requires "Allow-Control-Allow-Origin: *" Chrome extension when
    // running in localhost Chrome browser to avoid cross domain errors
         $.get({
             url: url,
             success: function (result) {
               this.setState( {
                 userKey : result,
                 errorMessage : ''
                 }); //setState
             }
         }).fail(function (response) {
           let errorMsg = 'error.message' +  `${response.statusText} (Code ${response.status}) ${response.responseText}`;
           this.setState( {
             errorMessage : errorMsg
             }); //setState
         });
         =================================================================================================*/
  }, //mainHandleLogin

  onSelectMetaDataFile: function () {
    console.log('called onSelectMetaDataFile');
    var path = dialog.showOpenDialog(
      { title:"Select a folder", properties: ["openDirectory"] }
    );
    if(path === undefined){
        console.log("No destination folder selected");
        this.setState({ metaDataFolderSelected: false });
        this.setState({  metaDataFolder: '' });
    }else{
          //console.log('going to set the path and boolean' + path);
          this.setState({ metaDataFolderSelected: true });
          this.setState({  metaDataFolder: path[0] });
      }
      persistComponent('metaDataPersistKey', path[0] );
      console.log('end of onSelectMetaDataFile');
  }, //onSelectMetaDataFile

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
      persistComponent('jobFilePersistKey', fileNames[0] );
      console.log('end of onSelectJobSpecsFile');
  }, //onSelectJobSpecsFile

    onHandleSend: function(sendFileSpecs) {
      console.log('called onHandleSend');
      console.log('metaDataFolder= ' + sendFileSpecs.metaDataFolder);
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

    if(this.state.jobFilepathSelected  &&  this.state.metaDataFolderSelected) {
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
          metaDataFolder = {this.state.metaDataFolder}
          jobFilepath = {this.state.jobFilepath}
          onselectMetaDataFile = {this.onSelectMetaDataFile}
          onselectJobSpecsFile = {this.onSelectJobSpecsFile}
          handleSend = {this.onHandleSend}
          />
        </div>
    );
  } //render
});//MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('ubsUploads')
); //render

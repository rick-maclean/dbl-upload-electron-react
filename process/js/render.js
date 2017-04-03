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


function persistComponent(storage_key, jsonData) {
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

function restorePersistedAllData() {
  const storage = eRequire('electron-json-storage');

  storage.getAll(function(error, data) {
    if (error) throw error;

    console.log('inside restorePersistedAllData');
    console.log('data.loginPersistKey is =>' +data.loginPersistKey);
    console.log('data.metaDataPersistKey is =>' +data.metaDataPersistKey);
    console.log('data.jobFilePersistKey is =>' +data.jobFilePersistKey);


    //console.log('ALL the data restored from electron-json-storage  is : ' + data);
    jQuery('#inputEmail').val(data.loginPersistKey);
//    jQuery('#metadataFilepathId').text();
//    jQuery('#jobFilePathId').text();


    console.log(data);
    console.log('data.loginPersistKey is =>' +data.loginPersistKey);
    var objData = JSON.stringify(data);
    console.log(objData);
  });
}

function restoreDataThenObserve(jsonStoragekey, ractiveComponent, componentDataKey) {
    const storage = require('electron-json-storage');
    //Read
    storage.get(jsonStoragekey, function (error, retrievedData) {
        if (error) throw error;
        ractiveComponent.set(componentDataKey, retrievedData);

        let observeKeypath = componentDataKey + '.*';  //save all fields under componentDataKey
        //Note: only start observe after data has been retrieved from storage. Otherwise the two operation will collide.
        ractiveComponent.observe(observeKeypath, function (newValue, oldValue, keypath) {
            persistComponent(jsonStoragekey, this.get(componentDataKey));
        });
    });
}

var jsonData =   '{   "petName": "Buffy"  }';
var jsonToObjData = JSON.parse(jsonData);

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      emailUsername: '',
      password: '',
      metadataFilepath: 'metadataFilepath',
      metadataFilepathSelected: false,
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

    console.log('ALL the data restored from electron-json-storage  is : ' + data);
    jQuery('#inputEmail').val(data.loginPersistKey);
    let metadt = jQuery('#metadataFilepathId').text();
    let metaPathdt = jQuery('#jobFilePathId').text();
    console.log('metadt =>' + metadt);
    console.log('metaPathdt =>' + metaPathdt);

jQuery('#metadataFilepathId').text(data.metaDataPersistKey);
jQuery('#jobFilePathId').text(data.jobFilePersistKey);

    //console.log(data);

  });
  }, //componentDidMount

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

    //let jsonDt1 = JSON.parse('{"emailUsername" : "' + subuserName + '"} ');
    //console.log('jsonDt1 is =' + JSON.stringify(jsonDt1) );
    //persistComponent('loginPersistKey', jsonDt1 );
    persistComponent('loginPersistKey', subuserName);
    //restorePersistedAllData();
    //restorePersistedData('loginPersistKey');

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
        this.setState({ metadataFilepathSelected: false });
        this.setState({  metadataFilepath: '' });
    }else{
          //console.log('going to set the path and boolean' + path);
          this.setState({ metadataFilepathSelected: true });
          this.setState({  metadataFilepath: path[0] });
      }
      //console.log ('metadataFilepathSelected is set to: ' + this.state.metadataFilepathSelected);
      console.log('end of onSelectMetaDataFile');

      persistComponent('metaDataPersistKey', path[0] );
      //restorePersistedData('metaDataPersistKey');
      //restorePersistedAllData();
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

      persistComponent('jobFilePersistKey', fileNames[0] );
      //restorePersistedData('jobFilePersistKey');
      //restorePersistedAllData();


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

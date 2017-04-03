var React = require('react');

var JobSpecification = React.createClass({

  selectMetaDataFile: function() {
    this.props.onselectMetaDataFile();
  },
  selectJobSpecsFile: function() {
    this.props.onselectJobSpecsFile();
  },

  localHandleSend: function (e) {
    e.preventDefault();
    var tempSendFileSpecs = {
      metaDataFile: this.props.metadataFilepath,
      jobFilepath : this.props.jobFilepath
    } //tempSendFileSpecs
    this.props.handleSend(tempSendFileSpecs);  //pass tempItem to this prop in main
  }, //localHandleSend

   render: function() {
    return(
      <div className="panel panel-primary">
        <div className="panel-heading apt-addheading">Job</div>
        <div className="panel-body">
            <form className="form" onSubmit={this.localHandleSend}>
                 <h3>Job</h3>
                 <div className="form-group">
                     <label>Metadata File</label>
                     <div className="form-text" id="metadataFilepathId" >{this.props.metadataFilepath}</div>
                     <div className="col-sm-offset-3 col-sm-9">
                       <div className="pull-right">
                         <button type="button" className="btn btn-primary"  onClick={this.selectMetaDataFile}>Select metadata.xml</button>&nbsp;
                       </div>
                     </div>
                 </div>
                 <div className="form-group">
                     <label>Job Spec</label>
                     <div className="form-text" id="jobFilePathId" >{this.props.jobFilepath}</div>
                     <div className="col-sm-offset-3 col-sm-9">
                       <div className="pull-right">
                         <button type="button" className="btn btn-primary"  onClick={this.selectJobSpecsFile}>Select job specification</button>&nbsp;
                       </div>
                     </div>
                 </div>
                 <div className="form-group">
                   <div className="col-sm-offset-2 col-sm-10">
                     <button type="submit" id="sendButton" className="btn btn-primary pull-left" disabled>Send</button>
                   </div>
                 </div>
             </form>
         </div>
       </div>
    ) // return
  } // render
}); // JobSpecification

module.exports = JobSpecification;

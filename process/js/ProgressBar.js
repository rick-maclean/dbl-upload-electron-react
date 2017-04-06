var React    = require('react');

var ProgressElement = React.createClass({
  render: function() {

    return (
      <div className="panel panel-primary">
        <div className="container">
          <h4>Total Progress</h4>
          <div className="progress clearfix">
            <div className="progress">
              <div className="progress-bar" role="progressbar"
                  aria-valuenow={this.props.percentComplete}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{width: this.props.percentComplete + '%'}}>
                <span className="sr-only">{this.props.percentComplete}% Complete</span>
              </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
});

module.exports = ProgressElement;

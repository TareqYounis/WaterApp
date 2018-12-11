import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import  AddObjection  from './../../Components/Complaint/AddObjection';
import { GetOrganizations, Objection } from './../../store/actions/index';

class ObjectionService extends React.Component {
    constructor (props){
        super (props);
        this.handleUserObjection = this.handleUserObjection.bind(this);
    }

    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }
    
    handleUserObjection ( objectionData ) {
        this.props.onUserObjection(objectionData);
    }

    render () {
        return (
            <View>
                <AddObjection organizations={this.props.data} objection= {this.handleUserObjection} objectionResults = {this.props.objectionResults}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      data : state.enquiry.data,
      objectionResults : state.enquiry.objectionResults,
      error: state.enquiry.error
    }
};
  

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onUserObjection: ( objectionData ) => dispatch(Objection(objectionData))
    }
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ObjectionService);
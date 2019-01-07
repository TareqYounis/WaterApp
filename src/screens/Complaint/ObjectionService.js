import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

    componentWillReceiveProps(props){
        console.log(props.objectionResults, props.objectionFailResults)
    }

    render () {
        return (
            <View style={styles.container}>
                <AddObjection organizations={this.props.data} objection= {this.handleUserObjection} objectionResults = {this.props.objectionResults} objFail ={this.props.objectionFailResults}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
})

const mapStateToProps = state => {
    return {
      data : state.enquiry.data,
      objectionResults : state.enquiry.objectionResults,
      objectionFailResults: state.enquiry.objectionFailResults
    }
};
  

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onUserObjection: ( objectionData ) => dispatch(Objection(objectionData))
    }
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ObjectionService);
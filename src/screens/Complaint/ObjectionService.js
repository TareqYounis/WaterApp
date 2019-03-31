import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  AddObjection  from './../../Components/Complaint/AddObjection';
import { GetOrganizations, Objection, ResetState } from './../../store/actions/index';

class ObjectionService extends React.Component {
    constructor (props){
        super (props);       
    }

    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }
    
    handleUserObjection = ( objectionData ) => {
        // rest old data in store before continue, and then make a request
        this.props.onResetState();
        this.props.onUserObjection(objectionData);
    }
        
    // reset all data to avoid duplicants
    componentWillUnmount(){
        this.props.onResetState();
    }

    render () {
        return (
            <View style={styles.container}>
                <AddObjection objection= {this.handleUserObjection} {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
})

const mapStateToProps = state => {
    return {
        lang: state.enquiry.lang,
        data : state.enquiry.data,
        objectionResults : state.enquiry.objectionResults,
        objectionFailResults: state.enquiry.objectionFailResults
    }
};
  

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onUserObjection: ( objectionData ) => dispatch(Objection(objectionData)),
        onResetState: () => dispatch(ResetState())
    }
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ObjectionService);
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BlockCounter from '../../Components/Complaint/BlockCounter';
import { connect } from 'react-redux';
import { GetOrganizations, ReturnBlockCounter } from '../../store/actions/index';

class ReturnCounter extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onGetOrganizations();
    }

    render(){
        return (
            <View style={styles.container}>
                <BlockCounter  {...this.props}/>
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
      returnCounter : state.enquiry.returnCounter,
      failReturnCounter : state.enquiry.failReturnCounter
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onReturnBlockCounter: (userData) => dispatch(ReturnBlockCounter(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ReturnCounter);
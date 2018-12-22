import React from 'react';
import { View } from 'react-native';
import BlockCounter from '../../Components/Complaint/BlockCounter';
import { connect } from 'react-redux';
import { GetOrganizations, ReturnBlockCounter } from '../../store/actions/index';

class ReturnCounter extends React.Component {
    constructor(props){
        super(props);
        this.handleReturnCounter = this.handleReturnCounter.bind(this);
    }

    componentWillMount(){
        this.props.onGetOrganizations();
    }

    handleReturnCounter(data) {
        this.props.onReturnBlockCounter(data);
    }

    render(){
        return (
            <View>
                <BlockCounter organizations= {this.props.data} returnBlockCounter={this.handleReturnCounter} blockResutls={this.props.returnCounter}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      data : state.enquiry.data,
      returnCounter : state.enquiry.returnCounter
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onReturnBlockCounter: (userData) => dispatch(ReturnBlockCounter(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ReturnCounter);
import React from 'react';
import {View, Text} from 'react-native';
import AddUser from '../../Components/Auth/AddUser';
import {RegisterUser} from '../../store/actions/index';
import {connect} from 'react-redux';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.handleAddingUser = this.handleAddingUser.bind(this);
    }

    handleAddingUser(userData){
        this.props.onAddingUser(userData)
    }

    render() {
        return (
            <View>
               <AddUser onAddingUser={this.handleAddingUser}/>
               <Text>{this.props.data}</Text>
               <Text>{this.props.error}</Text>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
      names: state.names.names,
      data : state.enquiry.data,
      waterRole : state.enquiry.waterRole,
      user_id : state.names.user_id,
      error : state.names.error 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddingUser: (userData) => dispatch(RegisterUser(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(SignUp);
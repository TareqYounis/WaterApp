import React,{Component} from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import AddComplaint from './../../Components/Complaint/AddComplaint';
import { GetComplaintTypes } from './../../store/actions/index';

class Complaint extends Component{
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
    }

    //show sidemenu when menu button is clicked.
    navigationButtonPressed({ buttonId }) {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              },
            },
        });        
    }

    //load all complaint types before rendering.
    componentWillMount(){
        this.props.onGetComplaintTypes();
    }

    handleComplaint(complaintData){
        alert('Awaiting for ArabiaCell reply to submit');
        //this.props.onUserComplaint(complaintData);
    }

    render(){
        return (
            <View>
                <AddComplaint complaintType={this.props.complaintType} complaint={this.handleComplaint}/>
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    return {
      names: state.enquiry.names,
      data : state.enquiry.data,
      complaintType : state.enquiry.complaintType 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onUserComplaint: (complaintData) => dispatch(UserComplaint(complaintData)),
        onGetComplaintTypes : () => dispatch(GetComplaintTypes())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Complaint);
import React,{Component} from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import AddComplaint from './../../Components/Complaint/AddComplaint';
import { GetComplaintTypes, Complain, ResetState } from './../../store/actions/index';

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

    // reset all data to avoid duplicants
    componentWillUnmount(){
        this.props.onResetState();
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <AddComplaint {...this.props}/>
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.enquiry.lang,
        user_id: state.enquiry.user_id,
        data : state.enquiry.data,
        error: state.enquiry.error,
        complaintType : state.enquiry.complaintType,
        complaintFailMsg : state.enquiry.complaintFailMsg,
        complaint : state.enquiry.complaint 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onUserComplaint: (complaintData) => dispatch(Complain(complaintData)),
        onGetComplaintTypes : () => dispatch(GetComplaintTypes()),
        onResetState: () => dispatch(ResetState())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Complaint);
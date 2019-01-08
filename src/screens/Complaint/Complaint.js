import React,{Component} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import AddComplaint from './../../Components/Complaint/AddComplaint';
import { GetComplaintTypes, Complain } from './../../store/actions/index';

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

    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                    <AddComplaint {...this.props}/>
                </View>
            </ScrollView>
            
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
      complaintType : state.enquiry.complaintType,
      complaintFailMsg : state.enquiry.complaintFailMsg,
      complaint : state.enquiry.complaint 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onUserComplaint: (complaintData) => dispatch(Complain(complaintData)),
        onGetComplaintTypes : () => dispatch(GetComplaintTypes())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Complaint);
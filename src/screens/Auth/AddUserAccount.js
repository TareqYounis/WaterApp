import React from 'react';
import { View, Modal, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { UserAddAccount, GetOrganizations } from './../../store/actions/index';
import AddAccount from './../../Components/Auth/AddAccount';

class AddUserAccount extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            modalVisible: false
        }
    }
    //load all water companies for display before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }
    
    componentWillReceiveProps(props){
        if(props.messageAddAccount){
            this.setState({ 
                modalVisible: true
            })
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <AddAccount {...this.props}/>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>            
                        <TouchableOpacity onPress={()=> {this.setState({ modalVisible : false }); Navigation.pop(props.componentId) }}>
                            <ImageBackground source={require('./../../assets/images/pop_up.png')} style={{width: 250, height: 158}} >
                                <View style={styles.modalCotent}>
                                    <Image source={require('./../../assets/images/right_icon.png')} style={{marginBottom: 20}} />
                                    <Text style={styles.modelText}>{data[this.props.lang]['successAddAccount']}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </Modal>                 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    modalCotent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelText:{
        flex: 0.5,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.Hacen
    }
})


const mapStateToProps = state => {
    return {
        lang: state.enquiry.lang,
        data : state.enquiry.data,
        user_id : state.names.user_id,
        messageAddAccount : state.names.messageAddAccount,
        messageFailAddAccount : state.names.messageFailAddAccount
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddingUserAccount: (accountData) => dispatch(UserAddAccount(accountData)),
        onGetOrganizations: () => dispatch(GetOrganizations())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(AddUserAccount);
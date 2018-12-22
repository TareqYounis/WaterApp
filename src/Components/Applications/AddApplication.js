import React from 'react';
import { View, TextInput, StyleSheet, Text, Button, DatePicker, Picker, Platform, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { GetOrganizations, GetSubscriptionType, GetVillagesGIS, GetBlooksGIS, GetSectorsGIS, GetParcelsGIS } from '../../store/actions/index';

class AddApplication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id: 0,
            sut_types: 1,
            app_date: 0,
            subs_category: 0,
            subs_id_number: 0,
            subs_name : '',
            mobile: '',
            address : '',
            vil_id: '825',
            blk_id: 0,
            sec_id : 0,
            par_id: 0,
            WCS_CUSTOMER_ID_PATH : '',
            WCS_CADASTRAL_PLAN_PATH: '',
            WCS_LOCATION_PLAN_PATH: '',
            WCS_OCCUPANCIES_PERMIT_PATH: '',
            WCS_REGISTERY_DOC_PATH: '',
            home_phone_number: '',
            street_name : '',
            bulding_no : ''
        }
        this.showBlocks = this.showBlocks.bind(this);
        this.showSectors = this.showSectors.bind(this);
        console.log('this is the props',this.props)
    }

    showBlocks(){
       if(this.state.vil_id !== 0){
        this.props.onGetBlocksID(this.state.vil_id);
        console.log('i tstgs',this.props.organization)
        while (this.props.blooksGIS.length !== 0){
            return <Picker
                        selectedValue={this.state.blk_id}
                        style={{ height: 50, width: 200, borderWidth: 2 }}
                        onValueChange={( blk_id ) => this.setState({ blk_id })}>
                        {this.props.blooksGIS.map((item, index) => {
                            return (<Picker.Item label={item.BLK_NAME_A} value={item.BLK_ID} key={index}/>) 
                        })}
                    </Picker>
        }
        }else{
           return null;
       }
    }

    showSectors(){
        <Picker
            selectedValue={this.state.sec_id}
            style={{ height: 50, width: 200, borderWidth: 2 }}
            onValueChange={( sec_id ) => this.setState({ sec_id })}>
            {this.props.sectorsGIS.map((item, index) => {
                return (<Picker.Item label={item.SEC_NAME_A} value={item.SEC_ID} key={index}/>) 
            })}
        </Picker>
    }

    showPracles(){
        <Picker
            selectedValue={this.state.par_id}
            style={{ height: 50, width: 200, borderWidth: 2 }}
            onValueChange={( par_id ) => this.setState({ par_id })}>
            {this.props.parclesGIS.map((item, index) => {
                return (<Picker.Item label={item.PAR_ID} value={item.PAR_PUT_ID} key={index}/>) 
            })}
        </Picker>
    }
    
    render (){
        return (
            <View style={styles.container}>
                {/* <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your ID number"
                    onChangeText={( subs_id_number ) => this.setState({ subs_id_number })}
                />
                    
                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your Full name"
                    onChangeText={( subs_name ) => this.setState({ subs_name })}
                />

                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your phone number"
                    onChangeText={( mobile ) => this.setState({ mobile })}
                />

                 <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="Optional, enter your home phone number"
                    onChangeText={( home_phone_number ) => this.setState({ home_phone_number })}
                /> */}
             
                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your address detailes"
                    onChangeText={( address ) => this.setState({ address })}
                />
                
                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="Optional, enter your street name"
                    onChangeText={( street_name ) => this.setState({ street_name })}
                />

                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="Optional, enter your building number"
                    onChangeText={( bulding_no ) => this.setState({ bulding_no })}
                />
   
                 <Picker
                    selectedValue={this.state.subs_category}
                    style={{ height: 50, width: 200, borderWidth: 2 }}
                    onValueChange={( subs_category ) => this.setState({ subs_category })}>
                    {this.props.organization.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker>

                {/* <Picker
                    selectedValue={this.state.vil_id}
                    style={{ height: 50, width: 200, borderWidth: 2 }}
                    onValueChange= {( vil_id ) => { this.setState({ vil_id }); this.showBlocks()}}>                   
                    {this.props.villageId.map((item, index) => {
                        return (<Picker.Item label={item.VIL_NAME_A} value={item.VIL_ID} key={index}/>) 
                    })}
                </Picker> */}
                {this.showBlocks()}
                <TouchableOpacity onPress={this.handleImagePick} style={styles.Item}>
                    <Ionicon 
                        name={Platform.OS === "android" ? "md-images" : "ios-images"} 
                        size={30} style={styles.ItemIcon}
                    />
                    <Text>Pick an image </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    },
    Item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    ItemIcon: {
        marginRight: 10
    } 
});

const mapStateToProps = state => {
    return {
        data : state.enquiry.data,
        subscriptionType: state.enquiry.subscriptionType,
        villagesGIS: state.enquiry.villagesGIS,
        blooksGIS: state.enquiry.blooksGIS,
        sectorsGIS : state.enquiry.sectorsGIS,
        parclesGIS : state.enquiry.parclesGIS,
    }
};
  

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onGetSubsType: (companyId) => dispatch(GetSubscriptionType(companyId)),
        onGetVillagesID: () => dispatch(GetVillagesGIS()),
        onGetSectorsID: (blookId) => dispatch(GetSectorsGIS(blookId)),
        onGetParclesID: (sectoreId) => dispatch(GetParcelsGIS(sectoreId)),
        onGetBlocksID: (villageId) => dispatch(GetBlooksGIS(villageId))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(AddApplication);
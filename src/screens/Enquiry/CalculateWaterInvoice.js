import React,{Component} from 'react';
import {View, StyleSheet} from 'react-native';
import { connect } from  'react-redux';
import CalculateWater from '../../Components/Enquiry/CalculateWater';
import { GetOrganizations, GetUsageType, invoiceCalculation, ResetState } from './../../store/actions/index';

class CalculateWaterInvoice extends Component{
    constructor(props){
        super(props);
    }    
   
    //load all water companies and usage types before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
        this.props.onGetUsageType();
    }

    // reset all data to avoid duplicants
    componentWillUnmount(){
        this.props.onResetState();
    }

    render(){
        return (
            <View style={styles.container}>
                <CalculateWater {...this.props}/>
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
        invoice_value : state.names.invoice_value,
        usage_type: state.names.usage_type,
        invoiceFailMsg : state.names.invoiceFailMsg
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onCalculatingInvoice : (invoiceData) => dispatch(invoiceCalculation(invoiceData)),
        onGetOrganizations : () => dispatch(GetOrganizations()),
        onGetUsageType : () => dispatch(GetUsageType()),
        onResetState: () => dispatch(ResetState())
    };
};
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(CalculateWaterInvoice);
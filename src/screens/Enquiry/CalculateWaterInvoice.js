import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from  'react-redux';
import CalculateWater from '../../Components/Enquiry/CalculateWater';
import { GetOrganizations, GetUsageType, invoiceCalculation } from './../../store/actions/index';

class CalculateWaterInvoice extends Component{
    constructor(props){
        super(props);
        this.handleInvoice = this.handleInvoice.bind(this);
    }    
   
    //load all water companies and usage types before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
        this.props.onGetUsageType();
    }

    handleInvoice(invoiceData) {
        this.props.onCalculatingInvoice(invoiceData)
    }

    render(){
        return (
            <View>
                <CalculateWater organizations={this.props.data} usageTypes={this.props.usage_type} onCalculatingInvoice={this.handleInvoice}/>
                <Text>{this.props.invoice_value}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      data : state.enquiry.data,
      user_id : state.names.user_id,
      invoice_value : state.names.invoice_value,
      usage_type: state.names.usage_type,
      error : state.names.error
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onCalculatingInvoice : (invoiceData) => dispatch(invoiceCalculation(invoiceData)),
        onGetOrganizations : () => dispatch(GetOrganizations()),
        onGetUsageType : () => dispatch(GetUsageType())
    };
};
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(CalculateWaterInvoice);
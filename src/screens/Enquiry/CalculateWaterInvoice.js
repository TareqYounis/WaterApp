import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from  'react-redux';
import { invoiceCalculation } from '../../store/actions/index';
import CalculateWater from '../../Components/Enquiry/CalculateWater';
import { GetOrganizations } from './../../store/actions/index';

class CalculateWaterInvoice extends Component{
    constructor(props){
        super(props);
        this.handleInvoice = this.handleInvoice.bind(this);
    }    
   
    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }

    handleInvoice(invoiceData) {
        this.props.onCalculatingInvoice(invoiceData)
    }

    render(){
        return (
            <View>
                <Text>This is calculate water bill page</Text>
                <CalculateWater organizations={this.props.data} onCalculatingInvoice={this.handleInvoice}/>
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
      error : state.names.error
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onCalculatingInvoice : (invoiceData) => dispatch(invoiceCalculation(invoiceData)),
        onGetOrganizations : () => dispatch(GetOrganizations())
    };
};
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(CalculateWaterInvoice);
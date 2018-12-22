import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AddApplication from '../../Components/Applications/AddApplication';
import { GetOrganizations, GetSubscriptionType, GetVillagesGIS, GetBlooksGIS, GetSectorsGIS, GetParcelsGIS } from '../../store/actions/index';

class ApplyApplication extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.onGetOrganizations();
        this.props.onGetSubsType(),
        this.props.onGetVillagesID();
        this.props.onGetBlocksID();
        this.props.onGetParclesID();
        this.props.onGetSectorsID();
    }

    render(){
        const componentProps = {
            organization: this.props.data,
            subscType: this.props.subscriptionType,
            villageId: this.props.villagesGIS,
            blockId: this.props.blooksGIS,
            sectorId: this.props.sectorsGIS,
            parcelsId: this.props.parclesGIS
        }
        return(
            <View>
                <AddApplication  {...componentProps}/>
            </View>
        )
    }
}

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
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ApplyApplication);
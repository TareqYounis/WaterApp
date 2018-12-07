import { FetchFailure, FetchSuccessSubscriptionType, FetchSuccessVillagesGIS, FetchSucessBlooksGIS, FetchSuccessSectorsGIS, FetchSuccessParclesGIS} from './actions';
import { sha256 } from 'react-native-sha256';


//List of subscription type lookups (GET)
export const GetSubscriptionType = ( companyId ) => {
    return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/subscription_type?company_id=' + companyId ,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {           
                dispatch(FetchSuccessSubscriptionType(responseJson));
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

//List Villages GIS (GET)
export const GetVillagesGIS = ( companyId ) => {
    return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/villages' ,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {           
                dispatch(FetchSuccessVillagesGIS(responseJson.data));
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

//List blooks GIS(GET):
export const GetBlooksGIS = ( villageId ) => {
    return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/blooks?vil_id=' + villageId ,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {           
                dispatch(FetchSucessBlooksGIS(responseJson.data));
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

//List sectors GIS(GET):
export const GetSectorsGIS = ( blookId ) => {
    return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/sectors?blk_id=' + blookId,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {           
                dispatch(FetchSuccessSectorsGIS(responseJson.data));
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

//List parcels GIS(GET):
export const GetParcelsGIS = ( sectoreId ) => {
    return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/parcels?sec_id={}' + sectoreId,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {           
                dispatch(FetchSuccessParclesGIS(responseJson.data));
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

// 1.List organization lookups
// 2.List of subscription type lookups
// 3. List Villages GIS
// 4. List Blooks GIS
// 5. List Sectors GIS
// 6. List Parcels GIS

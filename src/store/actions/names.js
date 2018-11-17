// Actions are payloads of information that send data from your application to your store
import {Add_Name, Delete_Name, Select_Name, Deselect_Name, Fetch_Failure, Fetch_Sucess} from './actionTypes';
import { sha256 } from 'react-native-sha256';
//import crypto from 'crypto';
// import hash from 'hash';

// Thunk: handles the case where we dont return an object in a action creator, instead a function
const requestDetails = () => {
    var ts = Math.round(new Date().getTime()/1000);
    var hashFinal;
    sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
        var ts = Math.round(new Date().getTime()/1000);
        console.log("this is hash", hash);
        return 'ts=' + ts + ',response=' + hash;
    })
    .catch((error)=> {
             console.log(error)
             console.error(error);
      })
    //var hashFinal = hash.sha256().update(1493896628 + ':' + 'sK8DkvuyKGeb19b437g4Cv33GXV49c9Q' + ':' + 'miyahunaAdmin!@#123').digest('hex');
    //var hashFinal = crypto.createHash('sha256').update( ts + ':' + 'sK8DkvuyKGeb19b437g4Cv33GXV49c9Q' + ':' + 'miyahunaAdmin!@#123' ).digest('hex');
    var authHeader = 'ts=' + ts + ',response=' + hashFinal;
    return authHeader;
}
console.log('Im in the naames.js')
//asynchrounous calls are being handled in actions
export const AddName = (name,key) => {
    //can now run any code syn or asy, and call dispatch when we are done
    // return dispatch => {
    //     // var test = fetch('https://miyahunaportal.arabiacell.biz/api/info/orginizations',{
    //     //     headers: {
    //     //         Authorization:'ts=1540974577,response=D15397C7FA63142B7AD610EFD766809008B769F1D5FED880E8B1045AD13554B6'
    //     //     }
    //     // })
    //     // .then((response) => response.json())
    //     // .then((responseJSON)=> {
    //     //     console.log("this is response",responseJSON)
    //     // })
    //     // .catch((error)=> {
    //     //     console.error(error);
    //     // });
    //     // return test
    //     var ts = Math.round(new Date().getTime()/1000);
    //     var fetchResults;
    //     sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
    //         //console.log("this is hash", ts, hash);
    //         hashValue= 'ts=' + ts + ',response=' + hash;
    //         fetch('https://miyahunaportal.arabiacell.biz/api/info/orginizations',{
    //           headers: {
    //             Authorization: 'ts=' + ts + ',response=' + hash
    //           }
    //        })
    //         .then((response) => response.json())
    //         .then((responseJson) => {      
    //           console.log(responseJson)
    //           dispatch(FetchSuccess(responseJson));
    //         })
    //         .catch((error)=> {
    //           dispatch(FetchFailure(error));
    //         })
    //     })
    //     .catch((error)=> {
    //             console.log(error)
    //             dispatch(FetchFailure(error));
    //     })
        
    //     // return fetch('https://miyahunaportal.arabiacell.biz/api/info/orginizations',{
    //     //       headers: {
    //     //         Authorization: hashValue
    //     //       }
    //     //    })
    //     //     .then((response) => response.json())
    //     //     .then((responseJson) => {      
    //     //       console.log("hello its me trying:", responseJson)
    //     //     })
    //     //     .catch((error)=> {
    //     //       console.log("there is error :",error)
    //     //     })
    // }
    return {
        type: Add_Name,
        name : name
    }
};
export const DeleteName = () => {
    return {
        type: Delete_Name
    }
};

export const SelectName = (key) => {
    return {
        type: Select_Name,
        nameKey: key
    }
}

export const DeselectName = () => {
    return {
        type: Deselect_Name
    }
}

export const FetchSuccess = data => {
    return {
        type: Fetch_Sucess,
        payload: { data }
    }
};

export const FetchFailure = error => {
    return {
        type: Fetch_Failure,
        payload: { error }
    }
}
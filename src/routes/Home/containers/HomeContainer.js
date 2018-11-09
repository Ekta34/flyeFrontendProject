import { connect } from 'react-redux'
import Home from '../components/HomeView';
import {updateSelectedCity,setBankData,setDebouncedText} from './HomeModule'

const getMemoizedData = _.memoize(
    ({data,searchText})=>{
        return getBankData({data,searchText});},
    ({selectedCity,searchText,isLoading})=> JSON.stringify({selectedCity,searchText,isLoading})
);

const mapDispatchToProps = {
    updateSelectedCity,
    setBankData,
    setDebouncedText
}

const mapStateToProps = (state,ownProps) => ({
            selectedCity:state.home.selectedCity,
            bankData:getMemoizedData({data:state.home.bankData[state.home.selectedCity],
                                        searchText:state.home.debouncedText,
                                        selectedCity:state.home.selectedCity,
                                        isLoading:getLoadingStatus(state.home.selectedCity,state.home.bankData)}),
            debouncedText:state.home.debouncedText,
            isLoading:getLoadingStatus(state.home.selectedCity,state.home.bankData)
});


const getLoadingStatus = (selectedCity,bankData) => {
    if(selectedCity in bankData){
        return false;
    }else{
        return true;
    }
}

const getBankData = ({data,searchText}) => {  
    let searchKeys = ["ifsc", "bank_name" , "branch" , "city" , "district" , "state" , "address"]
    let output = [];
    _.forEach(data, item => {
      let matchedBoolean = false;
      _.forEach(searchKeys, key => {
        if (item[key].toLowerCase().search(searchText.toLowerCase()) != -1) {
          matchedBoolean = true;
          return false;
        }
      });
      if (matchedBoolean) {
        output.push(item);
      }
    });
    return output;
}

export default connect( mapStateToProps,mapDispatchToProps)(Home);
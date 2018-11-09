import React from 'react'
import './HomeView.scss'
import SelectDropdown from '../../../components/UIelements/SelectDropdown/SelectDropdown';
import {Table} from 'antd'
import 'antd/dist/antd.css';
import InputTextField from '../../../components/UIelements/InputTextField/InputTextField';
import _ from 'lodash';

const allCities = [
  { value: 'AHMEDABAD', label: 'AHMEDABAD' },
  { value: 'MUMBAI', label: 'MUMBAI' },
  { value: 'PUNE', label: 'PUNE' },
  { value: 'BANGALORE', label: 'BANGALORE' },
  { value: 'CHENNAI', label: 'CHENNAI' },
]

const columns = [
  {
    title: 'IFSC',
    dataIndex: 'ifsc',
    key: 'ifsc',
    width:'10%'
  }, 
  {
    title: 'Bank Id',
    dataIndex: 'bank_id',
    key: 'bank_id',
    width:'5%'
  }, 
  {
    title: 'Bank Name',
    dataIndex: 'bank_name',
    key: 'bank_name',
    width:'20%'
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    key: 'branch',
    width:'10%'
  }, 
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    width:'10%'
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width:'10%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width:'35%'
  }
];

class HomeView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchText:"",
      currentPage:1
    }
  }

  onChange = (page) => {
    this.setState({
      currentPage: page,
    });
  }

  componentWillMount = () => {
    this.updateCity({"selectedCity":this.props.selectedCity});
    this.handleSearchDebounced = _.debounce(this.setDebouncedText, 300);
  }

  setDebouncedText = () => {
    this.props.setDebouncedText(this.state.searchText);
    this.onChange(1);
  }

  updateCity = (param) => {
      this.onChange(1);
      this.props.updateSelectedCity(param.selectedCity);
  }

  updateSearchText = (text) => {   
      this.setState({searchText:text.searchText});
      this.handleSearchDebounced(text.searchText);
  }

  render(){        
    return(
      <div className="homeContainer">
          <div className="header">
              <div className="selectCity">
                  <SelectDropdown label="Select City"
                              name="selectedCity"                          
                              value={this.props.selectedCity}
                              options={allCities}
                              onChange={this.updateCity}  />
              </div>
              <div className="searchContainer">
                  <InputTextField 
                              name="searchText"
                              placeholder="Search here"
                              value={this.state.serachText}
                              onChange={this.updateSearchText}  />
              </div>
          </div>
          

          <div className="tableContainer">
            
                <Table dataSource={this.props.bankData} columns={columns} 
                    bordered 
                    loading={this.props.isLoading}
                    size="small" 
                    rowKey="ifsc"
                    pagination={{current:this.state.currentPage,onChange:this.onChange,pageSize:10}} 
                    scroll={{}}
                />
            
            
          </div>
      </div>
    )
  }
}

export default HomeView

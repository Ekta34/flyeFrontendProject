import React from 'react'
import './SelectDropdown.scss'
import _ from 'lodash'

class SelectDropdown extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {error:""}
    }

    handleChange = (e) => {
        let params = {};
        params[this.props.name] = e.target.value;
        this.props.onChange(params);
    }

    render(){
        
        return(
            <div className="selectContainer">
                <div className="selectLabel">{this.props.label}</div>
                    <select value={this.props.value} onChange={(e)=>this.handleChange(e)} 
                            disabled={this.props.disabled} >
                        <option disabled={true} defaultChecked={true}>select value</option>
                        {
                            _.map(this.props.options , (option , index) => {
                                return (
                                    <option className="optionSelectDropdown" key={index} value={option.value}>{option.label}</option>
                                )
                            })
                        }
                    </select>
                <div className="error">{this.state.error}</div>
            </div>
        )
    }
}

export default SelectDropdown
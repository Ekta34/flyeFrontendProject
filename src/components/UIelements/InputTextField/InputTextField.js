import React from 'react';
import './InputTextField.scss';
import {FaSearch} from "react-icons/fa"

class InputTextField extends React.Component {

    constructor(props){
        super(props);
        this.state = {error:""}
      }

    onChange = (e) => {
        let param = {};
        param[e.target.name] = e.target.value;
        this.props.onChange(param);
    }

    isValid = () => {
        if(this.props.value==null){
            this.setState({error:this.props.error});
            return true;
        }else{
            return false;
        }
    } 

    render(){
        return(
            <div className="inputTextFieldContainer">
                <FaSearch />
                <input type="text" name={this.props.name} value={this.props.value} placeholder={this.props.placeholder}
                                   onChange={(e)=>this.onChange(e)} className="inputField" />
            </div>
        );
    }
}

export default InputTextField;
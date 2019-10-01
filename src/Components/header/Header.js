import React, {Component} from 'react';
import '../header/Header.css';
import '../header/Marauder.png'


export default class Header extends Component {

    render(){
        return (<div className='Header'>
            <img className="Logo" src={require("../header/Marauder.png")} alt=''/>
        </div>);
    }

}
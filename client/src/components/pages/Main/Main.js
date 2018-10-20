import React, { Component } from 'react';
import styles from './Main.scss';
import { connect } from 'react-redux';

import { addDropbox, logout } from '../../../actions/userActions'

class Main extends Component{
    render(){
        return(
            <div className={styles.Main}>

                <div className="sidebar col">
                    <div className="logo">
                        CLOUD FILE
                    </div>
                    <div className="name">
                        {this.props.info.name || localStorage.getItem('name')}
                    </div>
                    <div onClick={this.props.addDropbox}>
                        Add Dropbox
                    </div>
                    <div className="logout" onClick={this.props.logout}>
                        Logout
                    </div>
                </div>

                <div className="body col">

                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        info: state.user.info
    }
}

const actions = { addDropbox, logout }

export default connect(mapStateToProps, actions)(Main)
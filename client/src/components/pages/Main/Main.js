import React, { Component } from 'react';
import styles from './Main.scss';
import { connect } from 'react-redux';

import { addDropbox, logout } from '../../../actions/userActions'
import { fileIcon } from '../../../util/data';

import AddService from './AddService/AddService';
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
import AddPaymentMethod from '../../stripe/AddPaymentMethod/AddPaymentMethod';
import AddPayoutMethod from '../../stripe/AddPayoutMethod/AddPayoutMethod';

class Main extends Component{
    render(){

        let owned = this.props.owned.map(file => {
            return(
                <div key={file.name+file.lastModified} className={"file col " + file.service}>
                    <div className={"preview " + file.service}>
                        <i className={`fas fa-file-${fileIcon[file.name.split('.')[1]]}`} />
                    </div>
                    <div className="info">
                        <div>{file.name}</div>
                    </div>
                </div>
            )
        })

        let shared = this.props.shared.map(file => {
            return(
                <div key={file.name+file.lastModified} className={"file col " + file.service}>
                    <div className={"preview " + file.service}>
                        <i className={`fas fa-file-${fileIcon[file.name.split('.')[1]]}`} />
                    </div>
                    <div className="info">
                        <div>{file.name}</div>
                    </div>
                </div>
            )
        })

        this.props.unsorted.forEach(item => {
            let div = (
                <div key={item.name+item.lastModified} className={"file col " + item.service}>
                    <div className={"preview " + item.service}>
                        <i className={`fas fa-file-${fileIcon[item.name.split('.')[1]]}`} />
                    </div>
                    <div className="info">
                        <div>{item.name}</div>
                    </div>
                </div>
            )
            if(item.shared){
                shared.push( div )
            } else {
                owned.push( div )
            }
        })

        return(
            <div className={styles.Main}>

                <div className="sidebar col">

                    <div className="logo">
                        CLOUD FILE
                    </div>

                    <div className="name">
                        {this.props.info.name || localStorage.getItem('name')}
                    </div>

                    <ModalContainer
                        content={
                            <AddService/>
                        }
                    >
                        <div className="action add-service">
                            Add Service
                            <i className="fas fa-plus"></i>
                        </div>
                    </ModalContainer>

                    <ModalContainer
                        content={
                            <AddPaymentMethod/>
                        }
                    >
                        <div className="action add-payment">
                            Add Payment Method
                            <i className="fas fa-plus"></i>
                        </div>
                    </ModalContainer>

                    <ModalContainer
                        content={
                            <AddPayoutMethod/>
                        }
                    >
                        <div className="action add-payout">
                            Add Payout Method
                            <i className="fas fa-plus"></i>
                        </div>
                    </ModalContainer>

                    <div className="list-item logout" onClick={this.props.logout}>
                        Logout
                    </div>

                </div>

                <div className="body col">
                        <div className="scroll-wrapper col">
                            <div className="header">My files</div>
                            <div className="file-wrapper">
                                {owned}
                            </div>
                            <div className="header">Shared with me</div>
                            <div className="file-wrapper">
                                {shared}
                            </div>
                        </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        info: state.user.info,
        owned: state.files.owned,
        shared: state.files.shared,
        unsorted: state.files.unsorted
    }
}

const actions = { addDropbox, logout }

export default connect(mapStateToProps, actions)(Main)
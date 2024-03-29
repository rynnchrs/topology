import React, { Component, Fragment } from 'react';
import { Toast } from 'primereact/toast';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Toasts extends Component {
    constructor() {
        super();
        this.state = {
            toast: React.createRef(null),
        };
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error, message} = this.props
        if (error !== prevProps.errors) {
            this.state.toast.current.show({ severity: 'error', summary: 'Invalid Details', detail: 'Username or Password is incorrect.', life: 5000 });
        }
        if (message !== prevProps.message) {
            if (message.okayLogin === "okay") {
                this.state.toast.current.show({ severity: 'success', summary: 'Login Successful', detail: 'Logging you in...', life: 5000 });
            }
        }
    }

    render() {
        return <Fragment> <Toast ref={this.state.toast} /> </Fragment>;
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(Toasts);
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
    /*componentDidMount() {
        this.state.toast.current.show({ severity: 'warn', summary: 'EHAHHA', detail: 'dwada', life: 5000 });
    }*/

    componentDidUpdate(prevProps) {
        const {error} = this.props
        if (error !== prevProps.errors) {
            //console.log("error not prevs")
            //console.log(error.msg)
            this.state.toast.current.show({ severity: 'error', summary: 'Invalid Details', detail: 'Username or Password is incorrect.', life: 5000 });
        }
    }

    static propTypes = {
        error: PropTypes.object.isRequired
    };

    render() {
        return <Fragment> <Toast ref={this.state.toast} /> </Fragment>;
    }
}

const mapStateToProps = (state) => ({
    error: state.errors
});

export default connect(mapStateToProps)(Toasts);
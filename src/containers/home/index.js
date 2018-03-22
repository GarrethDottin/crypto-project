import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { ClipLoader } from 'halogenium';

import {
  fetchOrderDetails,
} from '../../modules/order';

import './home.css';

const initialState = {
  order: {
    id: '',
  }
};

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { name, value } = e.currentTarget;
    const { order } = this.state;
    order[name] = value;
    this.setState({ order });
  };

  handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ isLoading: true });
    const { fetchOrderDetails } = this.props;
    fetchOrderDetails(this.state.order)
    .then(() => {
      this.setState({ isLoading: false });
    })
    .catch(e => console.log(e));
  };

  render() {
    const { order, isLoading } = this.state;
    const { orderDetails } = this.props;
    return (
      <div className="order-wrapper">
        <div className="form-wrapper">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="id" sm={2}>Order Id</Label>
              <Col sm={10}>
                <Input type="text" name="id" id="id" placeholder="Order Id" value={order.id}
                       onChange={this.handleChange} required/>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button type="submit">Search</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <div className="details-wrapper">
          {isLoading && !orderDetails ? <div className="order-loader">
            <ClipLoader color="#868e96" size="30px" margin="4px" />
          </div> : ''}
          {orderDetails ? <div className="order-details">
            <Table striped bordered size="sm">
              <thead>
              <tr>
                <th>Order Id</th>
                <th>Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">{orderDetails.id}</th>
                <td>{orderDetails.amount}</td>
              </tr>
              </tbody>
            </Table>
          </div> : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ orderDetails: state.order && state.order.orderDetails });

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrderDetails,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

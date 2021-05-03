import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

import Spinner from "./Spinner";
import { AppBar, Typography } from '@material-ui/core'
import '../App.css'
import { Button } from '@material-ui/core';

 const CLIENT = {
   sandbox:
     "ASDQvR1LRCqMYFtRpu6m59RxBqj5LlZjVfnWUSGG7TDfgsJmUX28eO3TyBe6fgD5-aysHVHV__Pd6GXK",
   production:
     "ASDQvR1LRCqMYFtRpu6m59RxBqj5LlZjVfnWUSGG7TDfgsJmUX28eO3TyBe6fgD5-aysHVHV__Pd6GXK"
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      payerID: "",
      orderID: "",

    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    console.log('component did mount props print: ', this.props)

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"Radio Edit",
          amount: {
            currency_code: "USD",
            value: this.props.numOfEdits >= 5 ? 100 : 20 * this.props.numOfEdits
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      
      this.setState({ showButtons: false, paid: true, payerID: data.payerID, orderID: data.orderID });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && <Spinner />}

        {showButtons && (
            <div className="outer-wrap">
            <div className="xxx">
              <AppBar className="appBar" position="static" color="inherit">
                <Typography variant="h3" align="center">
                  Please select your payment method:
                </Typography>
              </AppBar>
              <h2 style={{ borderColor: "5px solid black" }}> </h2>
            
              
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
            </div>
          </div>
            
         

          
        )}

        {paid && (
            <div className="outer-wrap">
            <div className="xxx">
              <AppBar className="appBar" position="static" color="inherit">
                <Typography variant="h3" align="center">
                  Success!  Congrats on your purchase.
                </Typography>
              </AppBar>
              
              
              <h2> Confirmation details: </h2>
              <h3>
                <b>Order ID: ${this.state.orderID}</b><br/>
                <b>Payer ID: ${this.state.payerID}</b>
              </h3>
             
            </div>
          </div>
            
         
        )}
      </div>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
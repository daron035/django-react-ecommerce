import axios from "axios";
import React, { useState } from "react";
import { Container, Button } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

const MyCheckout = () => {
  const [card, setCard] = useState({
    number: "4111111111111111",
    cvc: "322",
    month: "11",
    year: "33",
  });

  const [state, setState] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await window.test(
      card.number,
      card.cvc,
      card.month,
      card.year
    );
    console.log(response);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/checkout/`)
      // .get(`http://85.193.81.247/api/checkout/`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      {state.error && (
        <Message negative>
          <Message.Header>Your payment was unsuccessful</Message.Header>
          <p>{JSON.stringify(state.error)}</p>
        </Message>
      )}
      {state.success && (
        <Message positive>
          <Message.Header>Your payment was successful</Message.Header>
          <p>
            Go to your <b>profile</b> to see the order delivery status.
          </p>
        </Message>
      )}

      <h1>Complete your order</h1>
      <p>Would you like to complete the purchase?</p>
      <form onSubmit={onSubmit}>
        <input
          value={card.number}
          onChange={(e) => setCard({ ...card, number: e.target.value })}
          type="text"
          placeholder="Card number"
          name="name"
          className="w-5/12"
          defaultValue="4111111111111111"
        />
        <input
          value={card.month}
          onChange={(e) => setCard({ ...card, month: e.target.value })}
          type="text"
          placeholder="MM"
          name="name"
          defaultValue="11"
        />
        <input
          value={card.year}
          onChange={(e) => setCard({ ...card, year: e.target.value })}
          type="text"
          placeholder="YY"
          name="name"
          defaultValue="33"
        />
        <input
          value={card.cvc}
          onChange={(e) => setCard({ ...card, cvc: e.target.value })}
          type="text"
          placeholder="CVC"
          name="name"
          defaultValue="233"
        />
        <Button primary>Primary</Button>
      </form>
    </Container>
  );
};

export default MyCheckout;

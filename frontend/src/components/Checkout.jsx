import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Button,
  Header,
  Table,
  Label,
  Icon,
  Checkbox,
  Form,
} from "semantic-ui-react";
import { Message, Item, Divider } from "semantic-ui-react";
import Alert from "react-bootstrap/Alert";
import MyLoader from "../UI/Loader/Loader";
import { addCouponURL } from "../contacts";

const OrderPreview = () => {
  const data = useSelector((state) => state.cart?.shoppingCart);
  const error = useSelector((state) => state.cart?.error);
  const loading = useSelector((state) => state.cart?.loading);
  console.log(data);

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" className="w-11/12">
          <Alert.Heading>There was an error</Alert.Heading>
          <p>{error} </p>
        </Alert>
      )}
      {loading && <MyLoader />}
      {data && (
        <React.Fragment>
          <Item.Group relaxed>
            {data.order_items.map((order_item, index) => {
              return (
                <Item key={index}>
                  <Item.Image
                    size="tiny"
                    src={`http://127.0.0.1:8000${order_item.item.image}`}
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="a">
                      {order_item.quantity} x {order_item.item.title}
                    </Item.Header>
                    <Item.Extra>
                      <Label>${order_item.final_price}</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>

          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>Order Total: ${data.total}</Item.Header>
                {data.coupon && (
                  <Label color="green">
                    Current coupon: {data.coupon.code} for ${data.coupon.amount}
                  </Label>
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const CouponForm = ({ callbackHandleRefresh }) => {
  const data = useSelector((state) => state.cart?.shoppingCart);
  const error = useSelector((state) => state.cart?.error);
  const loading = useSelector((state) => state.cart?.loading);
  const [state, setState] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const [stateCode, setCode] = useState({ code: "" });

  const handleAddCoupone = (e) => {
    e.preventDefault();
    setState({ loading: true });
    const code = stateCode.code;
    // console.log(code);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    // const body = {  };

    axios
      .post(addCouponURL, { code }, config)
      .then((res) => {
        setState({ loading: false });
        callbackHandleRefresh();
      })
      .catch((err) => {
        setState({ error: err, loading: false });
      });
  };
  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" className="w-11/12">
          <Alert.Heading>There was an error</Alert.Heading>
          <p>{error} </p>
        </Alert>
      )}
      {loading && <MyLoader />}
      <Form onSubmit={handleAddCoupone}>
        <Form.Field>
          <label>Coupon code</label>
          <input
            onChange={(e) => setCode({ code: e.target.value })}
            placeholder="Enter a coupon..."
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </React.Fragment>
  );
};

const CheckoutForm = () => {
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

  const handleRefresh = () => {
    console.log("HAHAHAHAHAH");
    window.location.reload();
  };

  return (
    <Container className="mt-4">
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

      <OrderPreview />
      <Divider />
      <CouponForm callbackHandleRefresh={handleRefresh} />
      <Divider />

      <Header>Would you like to complete the purchase?</Header>
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

export default CheckoutForm;

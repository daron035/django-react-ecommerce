import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import MyLoader from "../UI/Loader/Loader";

function OrderSummary() {
  const data = useSelector((state) => state.cart?.shoppingCart);
  const error = useSelector((state) => state.cart?.error);
  const loading = useSelector((state) => state.cart?.loading);

  const renderVariations = orderItem => {
    let text = '';
    orderItem.item_variations.forEach(iv => {
      text += `${iv.variation.name}: ${iv.value}, `
    })
    return text;
  }

  return (
    <Container>
      <h1>Order Summary</h1>
      {error && (
        <Alert variant="danger" className="w-11/12">
          <Alert.Heading>There was an error</Alert.Heading>
          <p>{error} </p>
        </Alert>
      )}
      {loading && <MyLoader />}
      {data && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Quantity</th>
              <th>Total Item Price</th>
            </tr>
          </thead>
          <tbody>
            {data.order_items.map((order_item, index) => {
              return (
                <tr key={order_item.id}>
                  <td>{index + 1}</td>
                  <td>{order_item.item.title} - {renderVariations(order_item)}</td>
                  <td>${order_item.item.price}</td>
                  <td>{order_item.quantity}</td>
                  <td>${order_item.final_price}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Order Total: ${data.total}</td>
            </tr>
            <Link to="/checkout">
              <Button variant="warning" className="mt-4">
                Checkout
              </Button>
            </Link>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default OrderSummary;

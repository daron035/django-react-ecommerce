import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

function OrderSummary() {
  const data = useSelector((state) => state.cart?.shoppingCart);
  console.log(data);
  return (
    <Container>
      <h1>Order Summary</h1>
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
                  <td>{order_item.item}</td>
                  <td>${order_item.item_obj.price}</td>
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
              <td>{data.total}</td>
            </tr>
            <Button variant="warning" className="mt-4">
              Checkout
            </Button>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default OrderSummary;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

function MyHeader() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const loading = useSelector((state) => state.cart?.loading);
  const cart = useSelector((state) => state.cart?.shoppingCart);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            {isAuthenticated ? (
              <NavDropdown
                title={`${cart !== null ? cart.order_items.length : 0} items`}
                id="basic-nav-dropdown"
              >
                {cart &&
                  cart.order_items.map((order_item) => {
                    return (
                      <NavDropdown.Item href="#action/3.1" key={order_item.id}>
                        {order_item.quantity} x {order_item.item}
                      </NavDropdown.Item>
                    );
                  })}
                {cart && cart.order_items.length < 1 ? (
                  <NavDropdown.Item href="#action/3.1">
                    No items in cart
                  </NavDropdown.Item>
                ) : null}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Checkout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyHeader;

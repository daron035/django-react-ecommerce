import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Container,
  Grid,
  Icon,
  Item,
  Label,
  Header,
} from "semantic-ui-react";
import MyLoader from "../UI/Loader/Loader";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";
import { useParams } from "react-router-dom";
import { productDetailURL } from "../contacts";

const ProductDetail = ({ fetchCart }) => {
  const data = useSelector((state) => state.cart?.shoppingCart);
  let [product, setProduct] = useState();
  let [isLoading, setLoading] = useState();
  let [error, setError] = useState();

  const { productID } = useParams();

  useEffect(() => {
    getProductDetail();
  }, []);

  let getProductDetail = async () => {
    setLoading(true);
    await axios
      .get(productDetailURL(productID))
      // .get(`http://85.193.81.247/api/products/${productID}/`)
      .then((res) => {
        const response = res.data;
        setProduct(response);
        setLoading(false);
      })
      .catch((err) => console.log(err), setLoading(false));
  };

  const handleAddToCart = async (slug) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const body = { slug };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/add-to-cart/`, body, config)
      // .post(`http://85.193.81.247/api/add-to-cart/`, body, config)
      .then((response) => {})
      .catch((err) => console.log(err));
    fetchCart();
  };

  return (
    <Container>
      {error && (
        <Alert variant="danger" className="w-11/12">
          <Alert.Heading>There was an error</Alert.Heading>
          <p>{error} </p>
        </Alert>
      )}
      {isLoading && <MyLoader />}
      {product && (
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Card
                fluid
                image={product.image}
                header={product.title}
                meta={
                  <React.Fragment>
                    {product.category}
                    {product.discount_price && (
                      <Label
                        color={
                          product.label === "primary"
                            ? "blue"
                            : product.label === "secondary"
                            ? "green"
                            : "olive"
                        }
                      >
                        {product.category}
                      </Label>
                    )}
                  </React.Fragment>
                }
                description={product.category}
                extra={
                  <React.Fragment>
                    <Button
                      fluid
                      color="yellow"
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() => handleAddToCart(product.slug)}
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button>
                  </React.Fragment>
                }
              />
            </Grid.Column>
            <Grid.Column>
            <Header as="h2">Try different variations</Header>
              
              {product.variations &&
                product.variations.map((v) => {
                  return (
                    <React.Fragment>
                    
                    <Header as="h2">{v.name}</Header>
                    <Item.Group divided key={v.id}>
                      {v.item_variations.map((iv) => {
                        return (

                          <Item key={iv.id}>
                          {iv.attachment && (
                            <Item.Image
                              size="tiny"
                              src={`http://127.0.0.1:8000${iv.attachment}`}
                            />
                            )}
                            <Item.Content verticalAlign="middle">
                              {iv.value}
                            </Item.Content>
                          </Item>
                        );
                      })}
                    </Item.Group>
                    </React.Fragment>
                  );
                })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
};

export default connect(null, { fetchCart })(ProductDetail);

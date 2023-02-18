import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Icon,
  Item,
  Label,
  Header,
  Form,
  Divider,
  Select,
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
  let [formVisible, setFormVisible] = useState(false);
  let [formData, setFormData] = useState();
  let [error, setError] = useState();

  const { productID } = useParams();

  useEffect(() => {
    getProductDetail();
  }, []);

  const handleToggleForm = () => {
    setFormVisible(!formVisible)
  }

  const handleChange = (e, {name, value}) => {
    setFormData({...formData, [name]: value, })
    console.log(name)
    console.log(value)
  }

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

  const handleFormatData = formData => {
    return Object.keys(formData).map(key => {
      return formData[key];
    })
  }

  const handleAddToCart = async (slug) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const variations = handleFormatData(formData)
    console.log(variations)
    const body = { slug, variations };
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
                      onClick={handleToggleForm}
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button>
                  </React.Fragment>
                }
              />
              {formVisible && (
                <React.Fragment>
                <Divider/>
              <Form>
                {product.variations.map(v =>{
                  const name = v.name.toLowerCase();
                  return (
                    <Form.Field key={v.id}>
                  <Select
                    name={name}
                    onChange={handleChange}
                    options={v.item_variations.map(item => {
                      return {
                        key: item.id,
                        text: item.value,
                        value: item.id
                      }
                    })}
                    placeholder={`Choose a ${name}`}
                    selection
                    // value={formData[name] && (formData[name])}
                    // value={formData[name]}
                  />
                </Form.Field>
                  )
                })}
                
                <Form.Button
                primary
                onClick={() => handleAddToCart(product.slug)}>
                  Submit
                </Form.Button>
              </Form>
              </React.Fragment>
              )}
            </Grid.Column>
            <Grid.Column>
            <Header as="h2">Try different variations</Header>
              
              {product.variations &&
                product.variations.map((v) => {
                  return (
                    <React.Fragment key={v.id}>
                    
                    <Header as="h2">{v.name}</Header>
                    <Item.Group divided>
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

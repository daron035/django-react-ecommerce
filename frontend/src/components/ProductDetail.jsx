import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Button, Container, Icon, Item, Label } from "semantic-ui-react";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Select,
  Divider
} from "semantic-ui-react";
import MyLoader from "../UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";
import { productDetailURL } from "../contacts";
import { Routes, Route, useParams } from 'react-router-dom';

const ProductDetail = ({ fetchCart }) => {
  let [data, setProducts] = useState();
  let [isLoading, setIsLoading] = useState(false);
  // console.log(data)
  // console.log(data.id)
  // const data = item;

  let { productID } = useParams();
  // console.log(productID)

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    setIsLoading(true);
    await axios
      .get(productDetailURL(productID))
      // .get(`http://85.193.81.247/api/products/`)
      .then((response) => {
        const allProducts = response.data;
        // console.log(allProducts)
        setProducts(allProducts);
      })
      .then(setIsLoading(false))
      .catch((err) => console.log(err));
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
    // <Container>
    //   {isLoading ? (
    //     <MyLoader />
    //   ) : (

        // <Item.Group divided>
        //     {/* <Item key={item.id}> */}
        //     <Item key="1">
        //       {/* <Item.Image src={item.image} /> */}

        //       <Item.Content>
        //         {/* <Item.Header as="a">{item.title}</Item.Header> */}
        //         <Item.Meta>
        //           {/* <span className="cinema">{item.category}</span> */}
        //         </Item.Meta>
        //         {/* <Item.Description>{item.description}</Item.Description> */}
        //         <Item.Extra>
        //           <Button
        //             primary
        //             floated="right"
        //             icon
        //             labelPosition="right"
        //             // onClick={() => handleAddToCart(item.slug)}
        //           >
        //             Add to cart
        //             <Icon name="cart plus" />
        //           </Button>
        //           {/* {item.discount_price && (
        //             <Label
        //               color={
        //                 item.label === "primary"
        //                   ? "blue"
        //                   : item.label === "secondary"
        //                   ? "green"
        //                   : "olive"
        //               }
        //             >
        //               {item.category}
        //             </Label>
        //           )} */}
        //         </Item.Extra>
        //       </Item.Content>
        //     </Item>
        // </Item.Group>
    //   )}
    // </Container>
    <Container>
    {isLoading && (
      <h1>LOADING</h1>
    )}
    {data && (
      <Item.Group divided>
            <Item key={data.id}>
            {/* <Item key="1"> */}
              <Item.Image src={data.image} />

              <Item.Content>
                <Item.Header as="a">{data.title}</Item.Header>
                <Item.Meta>
                  <span className="cinema">{data.category}</span>
                </Item.Meta>
                <Item.Description>{data.description}</Item.Description>
                <Item.Extra>
                  <Button
                    primary
                    floated="right"
                    icon
                    labelPosition="right"
                    // onClick={() => handleAddToCart(data.slug)}
                  >
                    Add to cart
                    <Icon name="cart plus" />
                  </Button>
                  {data.discount_price && (
                    <Label
                      color={
                        data.label === "primary"
                          ? "blue"
                          : data.label === "secondary"
                          ? "green"
                          : "olive"
                      }
                    >
                      {data.category}
                    </Label>
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
        </Item.Group>
    )}
    </Container>
  );
};

export default connect(null, { fetchCart })(ProductDetail);

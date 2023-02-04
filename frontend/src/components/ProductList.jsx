import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Icon, Image, Item, Label } from "semantic-ui-react";
// import MLoader from "../UI/Loader/Loader";
import MyLoader from "../UI/Loader/Loader";

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

const ProductList = () => {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    // setIsLoading(true);
    // setTimeout(async () => {
    //   axios
    //     .get(`${process.env.REACT_APP_API_URL}/api/products/`)
    //     .then((response) => {
    //       const allProducts = response.data;
    //       setProducts(allProducts);
    //     })
    //     .catch((err) => console.log(err));
    //   setIsLoading(false);
    // }, 2000);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/`)
      .then((response) => {
        const allProducts = response.data;
        // console.log("HAHAHA");
        console.log(response.data[0]);
        setProducts(allProducts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      {isLoading ? (
        <MyLoader />
      ) : (
        <Item.Group divided>
          {products.map((item) => (
            <Item key={item.id}>
              <Item.Image src={item.image} />

              <Item.Content>
                <Item.Header as="a">{item.title}</Item.Header>
                <Item.Meta>
                  <span className="cinema">{item.category}</span>
                </Item.Meta>
                <Item.Description>{item.description}</Item.Description>
                <Item.Extra>
                  <Button primary floated="right" icon labelPosition="right">
                    Add to cart
                    <Icon name="cart plus" />
                  </Button>
                  {item.discount_price && (
                    <Label
                      color={
                        item.label === "primary"
                          ? "blue"
                          : item.label === "secondary"
                          ? "green"
                          : "olive"
                      }
                    >
                      {item.category}
                    </Label>
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Container>
  );
};

export default ProductList;

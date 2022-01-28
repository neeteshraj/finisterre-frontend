/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Inputs, Layout } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import addProduct from '../../actions/product-actions';
import Modal from '../../components/common/ui/Modal/Modal';
import './Products.css';
import { generatePublicUrl } from '../../config/urlConfig';
import _ from 'lodash';

const pageSize=10;
const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [paginated, setPaginated] = useState("");
  const [currentPage, setCurrentPage]= useState("");
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();



  useEffect(() => {
    setPaginated(product.products.slice(0, pageSize));
  },[]);

  const pagination=(pageNo)=>{
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPosts = _(product.products).slice(startIndex).take(pageSize).value();
    setPaginated(paginatedPosts);
  }

  const pageCount = product.products ? Math.ceil(product.products.length / pageSize) : 0;
  if(pageCount === 1) {
    return null;
  }
  const pages = _.range(1, pageCount + 1);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }

    dispatch(addProduct(form)).then(() => setShow(false));
  };

  
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <>
      <Table style={{ fontSize: 12 }} responsive="sm" className="table-serial">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0
            ? paginated.map((product) => {
              return (
                <tr key={product._id}>
                  <td></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <Button variant="info"
                      onClick={() => showProductDetailsModal(product)}>
                      Info
                    </Button>
                    &nbsp;
                    <Button variant="danger"
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        // dispatch(deleteProductById(payload));
                        alert("deleted nigga");
                      } }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
            : null}
        </tbody>
      </Table>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {
            pages.map((page) => (
              <li className={
                page === currentPage ? "page-item active":"page-item"
              }>
                <p className="page-link"
                  onClick={()=>{
                    pagination(page)
                  }}
                >
                {page}
                </p>
                </li>
            ))
          }
        </ul>
      </nav>
      </>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
      >
        <Inputs
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Inputs
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Inputs
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Inputs
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPictures"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Button variant="outline-primary" onClick={handleShow}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;



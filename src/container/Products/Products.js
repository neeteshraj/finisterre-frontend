import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Inputs, Layout } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';

const Products = () => {
    
    const [name, setName]= useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription]= useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);




    const createCategoryList=(categories,options=[])=>{
        for(let category of categories){
            options.push({
                value: category._id, name: category.name
            })
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    }


    const handleClose = () => {
        // const form = new FormData();

        // form.append('name', name);
        // form.append('quantity', quantity);
        // form.append('price', price);
        // form.append('description', description);
        // form.append('productPictures', productPictures);
        // form.append('category', category);


        // dispatch(addCategory(form));
        
        
        setShow(false);
    }
    const handleShow = () => setShow(true);
    

    const handleProductPictures=(e)=>{
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }
    console.log(productPictures);
    
    return (

        <Layout sidebar>


            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <Button variant="outline-primary" onClick={handleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Inputs
                        label="Product Name"
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
                    onChange={(e)=>setCategoryId(e.target.value)}>
                        <option value="">Select Parent Category</option>
                        {
                            createCategoryList(category.categories).map((option) => {
                                return <option key={option.name} value={option.value}>{option.name}</option>
                            }
                            )}
                    </select>


                {
                    productPictures.length> 0?
                    productPictures.map((pic,index)=><div key={index}>{JSON.stringify(pic)}</div>): null

                }

                    <input type ="file" name ="productPictures" onChange={handleProductPictures}/>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>

    )
}

export default Products

import React from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Inputs, Layout } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {
    getAllCategories,
    addCategory
} from '../../actions/category-actions';



const Category = () => {

    const category = useSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ?
                        (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories;
    }


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

    const handleCategoryImage=(e)=>{ 
        setCategoryImage(e.target.files[0]);
    }

    const handleClose = () => {
        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImages', categoryImage);
        console.log(form.get('name'));
        console.log(form.get('parentId'));
        dispatch(addCategory(form));
        
        // console.log(cat);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    return (

        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Inputs
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <select 
                    className="form-control" 
                    value={parentCategoryId}
                    onChange={(e)=>setParentCategoryId(e.target.value)}>
                        <option value="">Select Parent Category</option>
                        {
                            createCategoryList(category.categories).map((option) => {
                                return <option key={option.name} value={option.value}>{option.name}</option>
                            }
                            )}
                    </select>
                    <input type ="file" name ="categoryImage" onChange={handleCategoryImage}/>
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

export default Category;

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Inputs, Layout } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllCategories, addCategory, updateCategories } from "../../actions/category-actions";
import Modal from "../../components/common/ui/Modal/Modal";
import CheckboxTree from 'react-checkbox-tree';
import { 
    IoIosArrowForward, 
    IoIosArrowDown, 
    IoIosCheckboxOutline, 
    IoIosCheckbox, 
    IoIosSquareOutline

 } from "react-icons/io";
 import {FaFolder,
    FaFolderOpen
} from 'react-icons/fa';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Category = () => {
    const category = useSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImages, setCategoryImage] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                categoryImages: category.categoryImages,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
        console.log(e.target.files);
    };

    const handleClose = () => {
        const form = new FormData();

        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImages", categoryImages);
        dispatch(addCategory(form));

        setCategoryName("");
        setParentCategoryId("");

        // console.log(cat);
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if(type==="checked"){
            const updatedCheckedArray = checkedArray.map((item, _index)=> index === _index ? {...item, [key]: value}: item);
            setCheckedArray(updatedCheckedArray);
        }
        else if(type ==="expanded"){
            const updatedExpandedArray = expandedArray.map((item, _index)=> index === _index ? {...item, [key]: value}: item);
            setExpandedArray(updatedExpandedArray);
        }
    }
    
    const updateCategoriesForm=()=>{

        const form = new FormData();

        expandedArray.forEach((item, index)=>{
            form.append('_id', item.value);
            form.append('name',item.name);
            form.append('parentId', item.parentId ? item.parentId:"");
            form.append('type',item.type);
        })
        checkedArray.forEach((item, index)=>{
            form.append('_id', item.value);
            form.append('name',item.name);
            form.append('parentId', item.parentId ? item.parentId:"");
            form.append('type',item.type);
        });
        dispatch(updateCategories(form))
        .then(result=>{
            if(result){
                dispatch(getAllCategories());
            }
        })

        setUpdateCategoryModal(false);
    }

    const renderUpdateCategoriesModal=()=>{
        return(
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={"Update Categories"}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) => 
                            <Row key={index}>
                                <Col>
                                    <Inputs
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e)=>handleCategoryInput('name', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e)=>handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                    >
                                        <option value="">Select Parent Category</option>
                                        {createCategoryList(category.categories).map((option) => {
                                            return (
                                                <option key={option.name} value={option.value}>
                                                    {option.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                    
                    )
                }
                    <h6>Checked Categories</h6>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) => 
                            <Row key={index}>
                                <Col>
                                    <Inputs
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e)=>handleCategoryInput('name', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e)=>handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                    >
                                        <option value="">Select Parent Category</option>
                                        {createCategoryList(category.categories).map((option) => {
                                            return (
                                                <option key={option.name} value={option.value}>
                                                    {option.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                    
                    )
                }
                {/* 
                <input
                    type="file"
                    name="categoryImages"
                    onChange={handleCategoryImage}
                /> */}
            </Modal>
        )
    }


    const renderAddCategoryModal = ()=>{
        return(
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={"Add new Category"}
            >
                <Inputs
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />

                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                >
                    <option value="">Select Parent Category</option>
                    {createCategoryList(category.categories).map((option) => {
                        return (
                            <option key={option.name} value={option.value}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
                <input
                    type="file"
                    name="categoryImages"
                    onChange={handleCategoryImage}
                />
            </Modal>
        )
    }

    const deleteCategory=()=>{
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const renderDeleteCategoryModal = () => {
        console.log("Delete", checkedArray);
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label:'Cancel',
                        color:'secondary',
                        onClick: ()=>{
                            alert('cancel');
                        }
                    },
                    {
                        label:'Delete',
                        color:'danger',
                        onClick: ()=>{
                            alert('delete');
                        }
                    }
                ]}
            >
                <h5>Expanded</h5>
                


            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Category</h3>
                            <Button variant="outline-primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>{renderCategories(category.categories)}</ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosSquareOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                                expandAll:<IoIosCheckbox />,
                                parentClose:<FaFolder/>,
                                parentOpen:<FaFolderOpen/>,
                                leaf:<FaFolderOpen/>
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={deleteCategory}>Delete</Button>
                        <Button onClick={updateCategory}>Edit</Button>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
            {renderDeleteCategoryModal()}

        </Layout>
    );
};

export default Category;

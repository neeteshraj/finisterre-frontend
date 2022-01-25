import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Inputs, Layout } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCategory } from "../../actions/category-actions";
import Modal from "../../components/common/ui/Modal/Modal";

const Category = () => {
    const category = useSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImages, setCategoryImage] = useState("");
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (
                        <ul>{renderCategories(category.children)}</ul>
                    ) : null}
                </li>
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
        setCategoryImage(e.target.file);
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
                        <ul>{renderCategories(category.categories)}</ul>
                    </Col>
                </Row>
            </Container>

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
        </Layout>
    );
};

export default Category;

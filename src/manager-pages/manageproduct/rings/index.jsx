import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Input, InputNumber, Modal, notification, Upload, Select } from "antd";
import { Link } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";

const { Option } = Select;

function ManageRingPage() {
    const [rings, setRings] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [ringSizes, setRingSizes] = useState([]);
    const [isAddRingVisible, setIsAddRingVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
        fetchMaterialDetails();
        fetchRingSizeDetails();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8090/products/diamond-rings");
            setRings(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            notification.error({
                message: "Error",
                description: "Failed to fetch ring data.",
            });
        }
    };

    const fetchMaterialDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8090/products/material-details");
            setMaterials(response.data);
        } catch (error) {
            console.error("Error fetching material details:", error);
            notification.error({
                message: "Error",
                description: "Failed to fetch material details.",
            });
        }
    };

    const fetchRingSizeDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8090/products/ring-size-details");
            setRingSizes(response.data);
        } catch (error) {
            console.error("Error fetching ring size details:", error);
            notification.error({
                message: "Error",
                description: "Failed to fetch ring size details.",
            });
        }
    };

    const handleAddRings = async (values) => {
        try {
            if (!values.imageRings || !values.imageRings.length) {
                notification.error({
                    message: "Error",
                    description: "Rings image file is required.",
                });
                return;
            }

            if (!values.imageBrand || !values.imageBrand.length) {
                notification.error({
                    message: "Error",
                    description: "Brand image file is required.",
                });
                return;
            }

            const imageData = await fileToBase64(values.imageRings[0].originFileObj);
            const imageBrand = await fileToBase64(values.imageBrand[0].originFileObj);

            const updatedValues = {
                ...values,
                MaterialID: values.MaterialID,
                RingSizeID: values.RingSizeID,
                ImageRings: imageData,
                ImageBrand: imageBrand,
            };

            const response = await axios.post("http://localhost:8090/products/add-diamond-ring", updatedValues);

            if (response.status === 200) {
                fetchData();
                setIsAddRingVisible(false);
                form.resetFields();
                notification.success({
                    message: "Success",
                    description: "Diamond Ring added successfully!",
                });
            } else {
                throw new Error(`Failed with status code ${response.status}`);
            }
        } catch (error) {
            console.error("Error adding diamond ring:", error);

            if (error.response) {
                notification.error({
                    message: "Error",
                    description: error.response.data.message || "Failed to add diamond ring.",
                });
            } else {
                notification.error({
                    message: "Error",
                    description: error.message || "Failed to add diamond ring.",
                });
            }
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const validateNumber = (message) => (rule, value) => {
        if (value <= 1) {
            return Promise.reject(message);
        }
        return Promise.resolve();
    };


    const validateStringLength = (maxLength) => (rule, value) => {
        if (value && value.length > maxLength) {
            return Promise.reject(`Must be ${maxLength} characters or less`);
        }
        return Promise.resolve();
    };

    const columns = [
        {
            title: "Ring Style",
            dataIndex: "RingStyle",
            key: "RingStyle",
        },
        {
            title: "Name Rings",
            dataIndex: "NameRings",
            key: "NameRings",
        },
        {
            title: "Category",
            dataIndex: "Category",
            key: "Category",
        },
        {
            title: "Brand Name",
            dataIndex: "BrandName",
            key: "BrandName",
        },
        {
            title: "Price",
            dataIndex: "Price",
            key: "Price",
        },
        {
            title: "Image Rings",
            dataIndex: "ImageRings",
            key: "ImageRings",
            render: (text, record) => (
                <img src={record.ImageRings} alt="Rings" style={{ width: "100px", height: "auto" }} />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => <Link to={`/rings-detail/${record.DiamondRingsID}`}>View Details</Link>,
        },
    ];

    const uploadButtonStyle = {
        backgroundColor: '#1c1c1c',
        color: '#fff',
        // border: '2px dashed #FAAAFF',
        borderRadius: '10px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        margin: "0 0 0 40px"
    };

    const uploadButtonHoverStyle = {
        backgroundColor: '#fff',
        color: '#1c1c1c',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    };
    const [hovered, setHovered] = React.useState({ imageRings: false, imageBrand: false });


    const addButtonStyle = {
        color: "#fff",
        backgroundColor: "#1c1c1c",
        borderRadius: "10px",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
    };

    const addButtonHoverStyle = {
        backgroundColor: "#fff",
        color: "#1c1c1c",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    };
    const [hoveredSubmit, setHoveredSubmit] = React.useState(false);

    //trôn GAY
    const genderOptions = [
        "Agender",
        "Androgyne",
        "Bigender",
        "Cisgender",
        "Gender Fluid",
        "Gender Nonconforming",
        "Gender Questioning",
        "Gender Variant",
        "Genderqueer",
        "Intersex",
        "Non-binary",
        "Pangender",
        "Polygender",
        "Transgender",
        "Transmasculine",
        "Transfeminine",
        "Two-Spirit",
        "Men",
        "Women",
        "Unisex",
        "Other",
    ];
    return (
        <>
            <h1>Diamond Ring</h1>
            <Button type="primary" onClick={() => setIsAddRingVisible(true)}>
                Add Ring
            </Button>
            <Table dataSource={rings} columns={columns} rowKey="DiamondRingsID" />

            <Modal
                title="Add Ring"
                open={isAddRingVisible}
                onCancel={() => setIsAddRingVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddRings}>
                    <Form.Item
                        name="RingStyle"
                        label="Ring Style"
                        rules={[
                            { required: true, message: "Please input the Ring Style!" },
                            { validator: validateStringLength(50) },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="NameRings"
                        label="Name Rings"
                        rules={[
                            { required: true, message: "Please input the name Rings!" },
                            { validator: validateStringLength(50) },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Category"
                        label="Category"
                        rules={[
                            { required: true, message: "Please input the category!" },
                            { validator: validateStringLength(50) },
                        ]}
                    >
                        <Select>
                            <Option value="Diamond Fashion Rings">Diamond Fashion Rings</Option>
                            <Option value="Women`s Wedding Bands">Women`s Wedding Bands</Option>
                            <Option value="Gemstone Fashion Rings">Gemstone Fashion Rings</Option>
                            <Option value="Rings">Rings</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="BrandName"
                        label="Brand Name"
                        rules={[
                            { required: true, message: "Please input the brand Name!" },
                            { validator: validateStringLength(50) },
                        ]}
                    >
                        <Select>
                            <Option value="Simon G">Simon G</Option>
                            <Option value="Allison Kaufman">Allison Kaufman</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="MaterialID"
                        label="Material"
                        rules={[
                            { required: true, message: "Please select the material!" },
                        ]}
                    >
                        <Select>
                            {materials.map((material) => (
                                <Option key={material.MaterialID} value={material.MaterialID}>
                                    {material.MaterialName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="CenterGemstone"
                        label="Center Gemstone"
                        rules={[
                            { required: true, message: "Please select the center gemstone!" },
                        ]}
                    >
                        <Select>
                            <Option value="NULL">NULL</Option>
                            <Option value="Yellow Diamond">Yellow Diamond</Option>
                            <Option value="Amethyst">Amethyst</Option>
                            <Option value="Ruby">Ruby</Option>
                            <Option value="Emerald">Emerald</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="CenterGemstoneShape"
                        label="Center Gemstone Shape"
                        rules={[
                            { required: true, message: "Please select the center gemstone shape!" },
                        ]}
                    >
                        <Select>
                            <Option value="Round">Round</Option>
                            <Option value="Princess">Princess</Option>
                            <Option value="Cushion">Cushion</Option>
                            <Option value="Emerald">Emerald</Option>
                            <Option value="Oval">Oval</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Width"
                        label="Width"
                        rules={[
                            { required: true, message: "Please input the width!" },
                            { validator: validateNumber("Width must be greater than 0") },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="CenterDiamondDimension"
                        label="Center Diamond Dimension"
                        rules={[
                            { required: true, message: "Please input the center diamond dimension!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Weight"
                        label="Weight"
                        rules={[
                            { required: true, message: "Please input the weight!" },
                            { validator: validateNumber("Weight must be greater than 0") },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="GemstoneWeight"
                        label="Gemstone Weight"
                        rules={[
                            { required: true, message: "Please input the gemstone weight!" },
                            { validator: validateNumber("Gemstone Weight must be greater than 0") },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="CenterDiamondColor"
                        label="Center Diamond Color"
                        rules={[
                            { required: true, message: "Please select the center diamond color!" },
                        ]}
                    >
                        <Select>
                            <Option value="D">D</Option>
                            <Option value="E">E</Option>
                            <Option value="F">F</Option>
                            <Option value="G">G</Option>
                            <Option value="H">H</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="CenterDiamondClarity"
                        label="Center Diamond Clarity"
                        rules={[
                            { required: true, message: "Please select the center diamond clarity!" },
                        ]}
                    >
                        <Select>
                            <Option value="IF">IF</Option>
                            <Option value="VVS1">VVS1</Option>
                            <Option value="VVS2">VVS2</Option>
                            <Option value="VS1">VS1</Option>
                            <Option value="VS2">VS2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="CenterDiamondCaratWeight"
                        label="Center Diamond Carat Weight"
                        rules={[
                            { required: true, message: "Please input the center diamond carat weight!" },
                            { validator: validateNumber("Carat weight must be greater than 0") },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="Gender"
                        label="Gender"
                        rules={[
                            { required: true, message: "Please select the gender!" },
                        ]}
                    >
                        <Select placeholder="Select Gender">
                            {genderOptions.map((gender) => (
                                <Option key={gender} value={gender}>{gender}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Fluorescence"
                        label="Fluorescence"
                        rules={[
                            { required: true, message: "Please select the fluorescence!" },
                        ]}
                    >
                        <Select>
                            <Option value="None">None</Option>
                            <Option value="Faint">Faint</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="Strong">Strong</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Description"
                        label="Description"
                        rules={[
                            { required: true, message: "Please input the description!" },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="Inventory"
                        label="Inventory"
                        rules={[
                            { required: true, message: "Please input the inventory quantity!" },
                            // { validator: validateNumber("Inventory must be 0 or 1") },
                        ]}

                    >
                        {/* <InputNumber style={{ width: "100%" }} /> */}
                        <Select>
                            <Option value="0">0</Option>
                            <Option value="1">1</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="RingSizeID"
                        label="Ring Size"
                        rules={[
                            { required: true, message: "Please select the ring size!" },
                        ]}
                    >
                        <Select>
                            {ringSizes.map((size) => (
                                <Option key={size.RingSizeID} value={size.RingSizeID}>
                                    {size.RingSize}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Price"
                        label="Price"
                        rules={[
                            { required: true, message: "Please input the price!" },
                            { validator: validateNumber("Price must be greater than 0") },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>



                    <Form layout="vertical">
                        <Form.Item
                            name="imageRings"
                            label="Rings Image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[
                                { required: true, message: "Please upload a rings image!" },
                            ]}
                        >
                            <Upload
                                name="imageRings"
                                accept="image/*"
                                listType="picture-card"
                                beforeUpload={() => false}
                            >
                                <div
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    onMouseEnter={() => setHovered({ ...hovered, imageRings: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, imageRings: false })}
                                >
                                    <Button
                                        style={hovered.imageRings ? { ...uploadButtonStyle, ...uploadButtonHoverStyle } : uploadButtonStyle}
                                    >
                                        <AddPhotoAlternateIcon style={{ marginRight: '8px' }} />
                                        Upload Rings Image
                                    </Button>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="imageBrand"
                            label="Brand Image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[
                                { required: true, message: "Please upload a brand image!" },
                            ]}
                        >
                            <Upload
                                name="imageBrand"
                                accept="image/*"
                                listType="picture-card"
                                beforeUpload={() => false}
                            >
                                <div
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    onMouseEnter={() => setHovered({ ...hovered, imageBrand: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, imageBrand: false })}
                                >
                                    <Button
                                        style={hovered.imageBrand ? { ...uploadButtonStyle, ...uploadButtonHoverStyle } : uploadButtonStyle}
                                    >
                                        <AddPhotoAlternateIcon style={{ marginRight: '8px' }} />
                                        Upload Brand Image
                                    </Button>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={hoveredSubmit ? { ...addButtonStyle, ...addButtonHoverStyle } : addButtonStyle}
                            onMouseEnter={() => setHoveredSubmit(true)}
                            onMouseLeave={() => setHoveredSubmit(false)}
                        >
                            Add Ring
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}

export default ManageRingPage;
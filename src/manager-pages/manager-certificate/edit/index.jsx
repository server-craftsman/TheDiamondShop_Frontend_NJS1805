import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Button, Select, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const EditCertificateForm = ({ certificate, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [products, setProducts] = useState({
        diamonds: [],
        bridals: [],
        diamondRings: [],
        diamondTimepieces: []
    });
    const [imageBase64, setImageBase64] = useState('');

    useEffect(() => {
        if (certificate) {
            form.setFieldsValue({
                InspectionDate: certificate.InspectionDate ? moment(certificate.InspectionDate) : null,
                ClarityGrade: certificate.ClarityGrade || '',
                ShapeAndCuttingStyle: certificate.ShapeAndCuttingStyle || '',
                GIAReportNumber: certificate.GIAReportNumber || '',
                Measurements: certificate.Measurements || '',
                CaratWeight: certificate.CaratWeight || '',
                ColorGrade: certificate.ColorGrade || '',
                SymmetryGrade: certificate.SymmetryGrade || '',
                CutGrade: certificate.CutGrade || '',
                PolishGrade: certificate.PolishGrade || '',
                Fluorescence: certificate.Fluorescence || '',
                ImageLogoCertificate: certificate.ImageLogoCertificate || '',
                BridalID: certificate.BridalID || '',
                DiamondTimepiecesID: certificate.DiamondTimepiecesID || '',
                DiamondRingsID: certificate.DiamondRingsID || '',
                DiamondID: certificate.DiamondID || '',
            });
            setImageBase64(certificate.ImageLogoCertificate || '');
        }
    }, [certificate, form]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8090/certificate/fetch-products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch product data.'
                });
            }
        };

        fetchProducts();
    }, []);

    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    // Create a canvas to resize the image
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Set canvas dimensions (resize to 800x800, adjust as needed)
                    canvas.width = 800;
                    canvas.height = 800;

                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Convert canvas to Base64
                    const resizedImage = canvas.toDataURL("image/jpeg"); // Change to 'image/png' if needed

                    setImageBase64(resizedImage); // Set image preview URL
                    resolve(resizedImage);
                };

                img.onerror = (error) => {
                    console.error("Error loading image:", error);
                    reject(error);
                };
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const onFinish = async values => {
        console.log('Form Values:', values);

        try {
            const formattedValues = {
                ...values,
                InspectionDate: values.InspectionDate ? values.InspectionDate.format('YYYY-MM-DD') : null,
                BridalID: values.BridalID || null,
                CaratWeight: values.CaratWeight || null,
                ClarityGrade: values.ClarityGrade || null,
                ColorGrade: values.ColorGrade || null,
                CutGrade: values.CutGrade || null,
                DiamondID: values.DiamondID || null,
                DiamondRingsID: values.DiamondRingsID || null,
                DiamondTimepiecesID: values.DiamondTimepiecesID || null,
                Fluorescence: values.Fluorescence || null,
                GIAReportNumber: values.GIAReportNumber || null,
                ImageLogoCertificate: imageBase64 || null,
                Measurements: values.Measurements || null,
                PolishGrade: values.PolishGrade || null,
                ShapeAndCuttingStyle: values.ShapeAndCuttingStyle || null,
                SymmetryGrade: values.SymmetryGrade || null
            };

            console.log('Formatted Values:', formattedValues);

            const response = await axios.put(`http://localhost:8090/certificate/edit-certificate/${certificate.CertificateID}`, formattedValues);
            console.log('API Response:', response);
            onSave();
        } catch (error) {
            console.error('Failed to update certificate:', error);
            notification.error({
                message: 'Update Failed',
                description: 'Failed to update the certificate. Please try again later.'
            });
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="InspectionDate" label="Inspection Date" rules={[{ required: true, message: 'Inspection Date is required' }]}>
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="ClarityGrade" label="Clarity Grade" rules={[{ required: true, message: 'Clarity Grade is required' }]}>
                <Select placeholder="Select Clarity Grade">
                    <Option value="IF">IF</Option>
                    <Option value="VVS1">VVS1</Option>
                    <Option value="VVS2">VVS2</Option>
                    <Option value="VS1">VS1</Option>
                    <Option value="VS2">VS2</Option>
                    <Option value="SI1">SI1</Option>
                    <Option value="SI2">SI2</Option>
                </Select>
            </Form.Item>
            <Form.Item name="ShapeAndCuttingStyle" label="Shape and Cutting Style" rules={[{ required: true, message: 'Shape and Cutting Style is required' }]}>
                <Select placeholder="Select Shape and Cutting Style">
                    <Option value="Round">Round</Option>
                    <Option value="Princess">Princess</Option>
                    <Option value="Emerald">Emerald</Option>
                    <Option value="Asscher">Asscher</Option>
                    <Option value="Cushion">Cushion</Option>
                    <Option value="Marquise">Marquise</Option>
                    <Option value="Oval">Oval</Option>
                    <Option value="Radiant">Radiant</Option>
                </Select>
            </Form.Item>
            <Form.Item name="GIAReportNumber" label="GIA Report Number" rules={[{ required: true, message: 'GIA Report Number is required' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Measurements" label="Measurements" rules={[{ required: true, message: 'Measurements are required' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="CaratWeight" label="Carat Weight" rules={[{ required: true, message: 'Carat Weight is required' }, { type: 'number', min: 0, message: 'Carat Weight must be a positive number' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="ColorGrade" label="Color Grade" rules={[{ required: true, message: 'Color Grade is required' }]}>
                <Select placeholder="Select Color Grade">
                    <Option value="D">D</Option>
                    <Option value="E">E</Option>
                    <Option value="F">F</Option>
                    <Option value="G">G</Option>
                    <Option value="H">H</Option>
                    <Option value="I">I</Option>
                    <Option value="J">J</Option>
                </Select>
            </Form.Item>
            <Form.Item name="SymmetryGrade" label="Symmetry Grade" rules={[{ required: true, message: 'Symmetry Grade is required' }]}>
                <Select placeholder="Select Symmetry Grade">
                    <Option value="Excellent">Excellent</Option>
                    <Option value="Very Good">Very Good</Option>
                    <Option value="Good">Good</Option>
                    <Option value="Fair">Fair</Option>
                    <Option value="Poor">Poor</Option>
                </Select>
            </Form.Item>
            <Form.Item name="CutGrade" label="Cut Grade" rules={[{ required: true, message: 'Cut Grade is required' }]}>
                <Select placeholder="Select Cut Grade">
                    <Option value="Excellent">Excellent</Option>
                    <Option value="Very Good">Very Good</Option>
                    <Option value="Good">Good</Option>
                    <Option value="Fair">Fair</Option>
                    <Option value="Poor">Poor</Option>
                </Select>
            </Form.Item>
            <Form.Item name="PolishGrade" label="Polish Grade" rules={[{ required: true, message: 'Polish Grade is required' }]}>
                <Select placeholder="Select Polish Grade">
                    <Option value="Excellent">Excellent</Option>
                    <Option value="Very Good">Very Good</Option>
                    <Option value="Good">Good</Option>
                    <Option value="Fair">Fair</Option>
                    <Option value="Poor">Poor</Option>
                </Select>
            </Form.Item>
            <Form.Item name="Fluorescence" label="Fluorescence" rules={[{ required: true, message: 'Fluorescence is required' }]}>
                <Select placeholder="Select Fluorescence">
                    <Option value="None">None</Option>
                    <Option value="Faint">Faint</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Strong">Strong</Option>
                </Select>
            </Form.Item>
            {/* <Form.Item name="ImageLogoCertificate" label="Image Logo Certificate">
                <Upload
                    beforeUpload={() => false} // Prevent automatic upload
                    onChange={handleFileChange}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item> */}

            <Form.Item name="ImageLogoCertificate" label="Image Logo Certificate">
                <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => {
                        handleImageUpload(file);
                        return false; // Prevent automatic upload
                    }}
                >
                    {imageBase64 ? (
                        <img
                            src={imageBase64}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
                        />
                    ) : (
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item name="BridalID" label="Bridal ID">
                <Select placeholder="Select Bridal ID">
                    {products.bridals.map(bridal => (
                        <Option key={bridal.BridalID} value={bridal.BridalID}>{bridal.Name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="DiamondTimepiecesID" label="Diamond Timepieces ID">
                <Select placeholder="Select Diamond Timepieces ID">
                    {products.diamondTimepieces.map(timepiece => (
                        <Option key={timepiece.DiamondTimepiecesID} value={timepiece.DiamondTimepiecesID}>{timepiece.Name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="DiamondRingsID" label="Diamond Rings ID">
                <Select placeholder="Select Diamond Rings ID">
                    {products.diamondRings.map(ring => (
                        <Option key={ring.DiamondRingsID} value={ring.DiamondRingsID}>{ring.Name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="DiamondID" label="Diamond ID">
                <Select placeholder="Select Diamond ID">
                    {products.diamonds.map(diamond => (
                        <Option key={diamond.DiamondID} value={diamond.DiamondID}>{diamond.Name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Certificate
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

EditCertificateForm.propTypes = {
    certificate: PropTypes.shape({
        InspectionDate: PropTypes.string,
        ClarityGrade: PropTypes.string,
        ShapeAndCuttingStyle: PropTypes.string,
        GIAReportNumber: PropTypes.string,
        Measurements: PropTypes.string,
        CaratWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ColorGrade: PropTypes.string,
        SymmetryGrade: PropTypes.string,
        CutGrade: PropTypes.string,
        PolishGrade: PropTypes.string,
        Fluorescence: PropTypes.string,
        ImageLogoCertificate: PropTypes.string,
        BridalID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        DiamondTimepiecesID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        DiamondRingsID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        DiamondID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        CertificateID: PropTypes.number.isRequired
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default EditCertificateForm;

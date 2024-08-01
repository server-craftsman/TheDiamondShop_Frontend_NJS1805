import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const EditCertificateForm = ({ certificate, onSave, onCancel }) => {
    const [form] = Form.useForm();

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
        }
    }, [certificate, form]);

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
                ImageLogoCertificate: values.ImageLogoCertificate || null,
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
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="InspectionDate" label="Inspection Date" rules={[{ required: true }]}>
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="ClarityGrade" label="Clarity Grade" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ShapeAndCuttingStyle" label="Shape and Cutting Style" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="GIAReportNumber" label="GIA Report Number" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Measurements" label="Measurements" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="CaratWeight" label="Carat Weight" rules={[{ required: true }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="ColorGrade" label="Color Grade" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="SymmetryGrade" label="Symmetry Grade" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="CutGrade" label="Cut Grade" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="PolishGrade" label="Polish Grade" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Fluorescence" label="Fluorescence" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ImageLogoCertificate" label="Image Logo Certificate">
                <Input />
            </Form.Item>
            <Form.Item name="BridalID" label="Bridal ID">
                <Input type="number" />
            </Form.Item>
            <Form.Item name="DiamondTimepiecesID" label="Diamond Timepieces ID">
                <Input type="number" />
            </Form.Item>
            <Form.Item name="DiamondRingsID" label="Diamond Rings ID">
                <Input type="number" />
            </Form.Item>
            <Form.Item name="DiamondID" label="Diamond ID">
                <Input type="number" />
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

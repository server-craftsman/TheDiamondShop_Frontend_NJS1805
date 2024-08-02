import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Col, Row, Image, Typography, Descriptions, Spin, Alert, Modal, Button } from 'antd';
import EditCertificateForm from '../edit/index';
import './index.scss';

const { Title } = Typography;

function CertificateDetailPage() {
    const { CertificateID } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchCertificate = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8090/certificate/${CertificateID}`);
            console.log('API Response:', response.data);
            setCertificate(response.data);
        } catch (err) {
            console.error('Error fetching certificate details:', err);
            setError('Error fetching certificate details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificate();
    }, [CertificateID]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        setIsModalVisible(false);
        fetchCertificate();
    };

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message={error} type="error" />;

    const {
        GIAReportNumber,
        InspectionDate,
        ClarityGrade,
        ShapeAndCuttingStyle,
        Measurements,
        CaratWeight,
        ColorGrade,
        SymmetryGrade,
        CutGrade,
        PolishGrade,
        Fluorescence,
        ImageLogoCertificate,
        BridalID,
        DiamondTimepiecesID,
        DiamondRingsID,
        DiamondID,
        DiamondOrigin,
        StockNumber,
        Descriptors,
        DiamondImage,
        BridalStyle,
        Category,
        BridalDescription,
        TimepiecesStyle,
        DialColor,
        TimepiecesDescription,
        ImageTimepieces,
        RingStyle,
        NameRings,
        RingsDescription,
        ImageRings,
        ImageBridal,
    } = certificate || {};

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Certificate Details</Title>
            {certificate && (
                <Card>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Descriptions bordered>
                                <Descriptions.Item label="Certificate ID">{CertificateID || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="GIA Report Number">{GIAReportNumber || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Inspection Date">{InspectionDate ? new Date(InspectionDate).toLocaleDateString() : 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Clarity Grade">{ClarityGrade || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Shape and Cutting Style">{ShapeAndCuttingStyle || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Measurements">{Measurements || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Carat Weight">{CaratWeight || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Color Grade">{ColorGrade || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Symmetry Grade">{SymmetryGrade || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Cut Grade">{CutGrade || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Polish Grade">{PolishGrade || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Fluorescence">{Fluorescence || 'N/A'}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={14} style={{ marginTop: '30px' }}>
                            <Title level={2}>Certificate</Title>
                            {ImageLogoCertificate && (
                                <Image
                                    top={10}
                                    width={722}
                                    height={400}
                                    src={ImageLogoCertificate}
                                    alt="Certificate Image"
                                />
                            )}
                            {DiamondID && (
                                <div style={{ maxWidth: '100%', width: '100%' }}>
                                    <Title level={4}>Diamond Details</Title>
                                    <Descriptions bordered column={1}>
                                        <Descriptions.Item label="Diamond Origin">{DiamondOrigin || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Stock Number">{StockNumber || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Descriptors">{Descriptors || 'N/A'}</Descriptions.Item>
                                        {DiamondImage && (
                                            <Descriptions.Item label="Image">
                                                <Image
                                                    width={200}
                                                    src={DiamondImage}
                                                    alt="Diamond Image"
                                                />
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>
                                </div>
                            )}
                            {BridalID && (
                                <div>
                                    <Title level={4}>Bridal Details</Title>
                                    <Descriptions bordered column={1}>
                                        <Descriptions.Item label="Style">{BridalStyle || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Category">{Category || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{BridalDescription || 'N/A'}</Descriptions.Item>
                                        {ImageBridal && (
                                            <Descriptions.Item label="Image">
                                                <Image
                                                    width={200}
                                                    src={ImageBridal}
                                                    alt="Bridal Image"
                                                />
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>
                                </div>
                            )}
                            {DiamondRingsID && (
                                <div>
                                    <Title level={4}>Diamond Rings Details</Title>
                                    <Descriptions bordered column={1}>
                                        <Descriptions.Item label="Ring Style">{RingStyle || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Name Rings">{NameRings || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{RingsDescription || 'N/A'}</Descriptions.Item>
                                        {ImageRings && (
                                            <Descriptions.Item label="Image">
                                                <Image
                                                    width={200}
                                                    src={ImageRings}
                                                    alt="Diamond Rings Image"
                                                />
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>
                                </div>
                            )}
                            {DiamondTimepiecesID && (
                                <div>
                                    <Title level={4}>Diamond Timepieces Details</Title>
                                    <Descriptions bordered column={1}>
                                        <Descriptions.Item label="Timepieces Style">{TimepiecesStyle || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Dial Color">{DialColor || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{TimepiecesDescription || 'N/A'}</Descriptions.Item>
                                        {ImageTimepieces && (
                                            <Descriptions.Item label="Image">
                                                <Image
                                                    width={200}
                                                    src={ImageTimepieces}
                                                    alt="Diamond Timepieces Image"
                                                />
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card>
            )}
            <Button type="primary" onClick={showModal} style={{ marginTop: '20px', marginRight: '15px' }}>
                Edit Certificate
            </Button>
            <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}><Link to="/manager-certificate" style={{ marginLeft: '10px' }}>
                Back to Certificates
            </Link></Button>
            <Modal
                title="Edit Certificate"
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <EditCertificateForm certificate={certificate} onSave={handleSave} onCancel={handleCancel} />
            </Modal>
        </div>
    );
}

export default CertificateDetailPage;

//Privacy & policy

import React from 'react'
import Layout1 from '../components/Layout/Layout1'
import { Box, Card, IconButton, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
    const navigate = useNavigate();
    const NavigateBack = () => {
        navigate('/contactUs')
    }
    return (
        <>
            <Layout1>
                <Box>
                    <Box sx={{ padding: '10px 0 10px 0', display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '28px', fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', color: '#416D19' }}>Privacy Policy</Typography>
                    </Box>
                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Card sx={{ width: '90vw', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <IconButton onClick={() => NavigateBack()}>
                                    <KeyboardBackspaceIcon sx={{ color: 'black' }} />
                                </IconButton>
                                <p style={{ fontWeight: 'bold', color: '#27460B', paddingTop: '2vh' }} > Back to Contact Us page.</p>
                            </Box>
                            <br />
                            <p><b>Ceylon Green Service Cleaning Service</b> are committed to safeguarding and preserving the privacy of all personal data which may be provided to our company in relation to:</p>
                            <ul style={{ listStyleType: 'disc' }}>
                                <li>the ongoing running of and organisation of our legitimate business activities or services;</li>
                                <li>visits to our websites or mobile applications; or</li>
                                <li>any other interaction with us.</li>
                            </ul>
                            <p>
                                This may include personal data that you provide to us, or that we collect from you.
                                Ceylon Green Service Cleaning Service are processing your personal data to provide cleaning services. The legal basis for processing your personal data is legitimate interests to meet our contractual obligations to customers in relating to providing cleaning and associated services; and to respond to potential customer enquiries.Furthermore to promote the cleaning and associated services offered by Ceylon Green Service Cleaning Service and/or to market the services offered by Ceylon Green Service Cleaning Service to existing customers.
                                Your personal date is passed to our cleaning team in order for them to carry out their contract with Ceylon Green Service Cleaning Service and clean your property.
                                Your personal data is passed to Jobber who manage our CRM system.
                                We will update this Policy from time to time to keep us in line with current EU and UK Legislation, therefore you may wish to re-visit this to view any up to data content.
                            </p>
                            <h3 style={{ fontWeight: 'bold' }}>Terms and Definitions.</h3>
                            <p>
                                We have written our privacy policy in clear and transparent language, as we believe it should be easily understandable. However, there are a number
                                of terms or definitions used throughout this Policy
                                which we feel warrants further explanation below.
                            </p>
                            <p>
                                <b>General Data Protection Regulation (GDPR):</b> the General Data Protection Regulation (GDPR) (Regulation (EU) 2016/679) is a
                                regulation by which the European Parliament, the Council of the European Union and the European Commission intend to strengthen and unify data protection
                                for all individuals within the European Union (EU). It also addresses the export of personal data outside the EU.
                            </p>
                            <p>
                                <b>Data Breach:</b> a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or
                                access to, personal data transmitted, stored or otherwise processed.
                            </p>
                            <p>
                                <b>Data Controller:</b> the entity that determines the purposes, conditions and means of the processing of personal data.
                            </p>
                            <p>
                                <b>Data Processing:</b> the any operation performed on personal data, whether or not by automated means, including collection, recording, organisation,
                                structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available,
                                alignment or combination, restriction, erasure or destruction.
                            </p>
                            <p>
                                <b>Data Protection Authority:</b> national authorities tasked with the protection of data and privacy as well as monitoring and enforcement of the data protection regulations within the Union.
                            </p>
                            <p>
                                <b>Personal Data:</b> any information related to a natural person or ‘Data Subject’, that can be used to directly or indirectly identify the person
                            </p>
                            <h3 style={{ fontWeight: 'bold' }}>Who Are we?</h3>
                            <p>Where this Policy refers to `we`, `us`, `our` it refers to The Ceylon Green Service Cleaning Service. Our business provides domestic and commercial cleaning services.
                                We act as sole Data Controller only in our capacity as an employer and in relation to any data submitted via our website contact form which is separate from,
                                and not in relation to direct instructions received from our existing customers.
                                Our employees have been provided with further information on privacy via our Employee Handbook which is an internal document.
                            </p>
                            <h3 style={{ fontWeight: 'bold' }}>Our Data Protection principle.</h3>
                            <p><b>Principle 1: Lawfulness, Fairness and Transparency</b></p>
                            <p>Personal data shall be processed lawfully, fairly and in a transparent manner in relation to the data subject. This means, Ceylon Green Service Cleaning Service must tell the data subject what processing will occur (transparency), the processing must match the description given to the data subject (fairness), and it must be for one of the purposes specified in the applicable data protection regulation (lawfulness).</p>
                            <p><b>Principle 2: Purpose Limitation</b></p>
                            <p>Personal data shall be collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes. This means Ceylon Green Service Cleaning Service must specify exactly what the personal data collected will be used for and limit the processing of that personal data to only what is necessary to meet the specified purpose.</p>
                            <p><b>Principle 3: Data Minimisation</b></p>
                            <p>ersonal data shall be adequate, relevant and limited to what is necessary in relation to the purposes for which it is processed. This means Ceylon Green Service Cleaning Service must not store any personal data beyond what is strictly required.</p>
                            <p><b>Principle 4: Integrity & Confidentiality</b></p>
                            <p>Personal data shall be processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing, and against accidental loss, destruction or damage. Ceylon Green Service Cleaning Service must use appropriate technical and organisational measures to ensure the integrity and confidentiality of personal data is maintained at all times.</p></Card>
                    </Box>
                </Box>
            </Layout1>
        </>
    )
}

export default PrivacyPolicy
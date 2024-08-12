import React, { useState, useEffect } from 'react';
import './Payment.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import UpiIcon from '@mui/icons-material/Payment'; 
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract title from URL
    const queryParams = new URLSearchParams(location.search);
    const courseTitle = queryParams.get('title') || '';

    useEffect(() => {
        // Check if courseTitle is available
        if (!courseTitle) {
            alert('Course name is missing.');
            return;
        }

        // Fetch course details from the backend
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/course/payment?courseName=${courseTitle}`);
                if (response.status === 200) {
                    setCourseDetails(response.data);
                } else {
                    console.error('Failed to fetch course details:', response.status);
                    alert('Course details could not be retrieved. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
                alert('Course details could not be retrieved. Please try again later.');
            }
        };

        fetchCourseDetails();
    }, [courseTitle]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handlePolicyChange = (e) => {
        setAgreedToPolicy(e.target.checked);
    };

    const handlePaymentClick = () => {
        if (agreedToPolicy) {
            sessionStorage.setItem(courseTitle, 'true'); // Mark the course as paid in session storage
            navigate('/CourseList'); // Redirect back to the CourseList page after payment
        }
    };

    return (
        <div className="payment-container">
            <NavBar />
            <div className="payment-content">
                <div className="payment-methods">
                    <h2>Select Payment Method</h2>
                    <button
                        className={paymentMethod === 'creditCard' ? 'active' : ''}
                        onClick={() => handlePaymentMethodChange('creditCard')}
                    >
                        <CreditCardIcon /> Credit Card
                    </button>
                    <button
                        className={paymentMethod === 'debitCard' ? 'active' : ''}
                        onClick={() => handlePaymentMethodChange('debitCard')}
                    >
                        <PaymentIcon /> Debit Card
                    </button>
                    <button
                        className={paymentMethod === 'netBanking' ? 'active' : ''}
                        onClick={() => handlePaymentMethodChange('netBanking')}
                    >
                        <AccountBalanceIcon /> Net Banking
                    </button>
                    <button
                        className={paymentMethod === 'upi' ? 'active' : ''}
                        onClick={() => handlePaymentMethodChange('upi')}
                    >
                        <UpiIcon /> UPI or QR
                    </button>
                </div>
                <div className="payment-details">
                    {paymentMethod === 'creditCard' && (
                        <div>
                            <h3>Credit Card Details</h3>
                            <form>
                                <div className="form-group">
                                    <label>Card Number:</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input type="text" placeholder="MM/YY" />
                                </div>
                                <div className="form-group">
                                    <label>CVV:</label>
                                    <input type="text" placeholder="123" />
                                </div>
                                <div className="form-group">
                                    <label>Cardholder Name:</label>
                                    <input type="text" placeholder="Name on card" />
                                </div>
                            </form>
                        </div>
                    )}
                    {paymentMethod === 'debitCard' && (
                        <div>
                            <h3>Debit Card Details</h3>
                            <form>
                                <div className="form-group">
                                    <label>Card Number:</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input type="text" placeholder="MM/YY" />
                                </div>
                                <div className="form-group">
                                    <label>CVV:</label>
                                    <input type="text" placeholder="123" />
                                </div>
                                <div className="form-group">
                                    <label>Cardholder Name:</label>
                                    <input type="text" placeholder="Name on card" />
                                </div>
                            </form>
                        </div>
                    )}
                    {paymentMethod === 'netBanking' && (
                        <div>
                            <h3>Net Banking</h3>
                            <form>
                                <div className="form-group">
                                    <label>Bank Name:</label>
                                    <input type="text" placeholder="Bank name" />
                                </div>
                                <div className="form-group">
                                    <label>Account Number:</label>
                                    <input type="text" placeholder="1234567890" />
                                </div>
                                <div className="form-group">
                                    <label>IFSC Code:</label>
                                    <input type="text" placeholder="IFSC0001234" />
                                </div>
                            </form>
                        </div>
                    )}
                    {paymentMethod === 'upi' && (
                        <div>
                            <h3>UPI</h3>
                            <form>
                                <div className="form-group">
                                    <label>UPI ID:</label>
                                    <input type="text" placeholder="example@upi" />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div className="order-summary">
                    <h2>Course Details</h2>
                    {courseDetails ? (
                        <>
                            <p>Course Name: {courseDetails.courseName}</p>
                            <p>Course Amount: ₹ {courseDetails.amount}</p>
                            <p>Tax: ₹ {courseDetails.tax}</p>
                            <h3>Total Amount: ₹ {courseDetails.totalAmount}</h3>
                        </>
                    ) : (
                        <p>Loading course details...</p>
                    )}
                </div>
            </div>
            <footer className="payment-footer">
                <div className="terms">
                    <input
                        type="checkbox"
                        id="policy"
                        checked={agreedToPolicy}
                        onChange={handlePolicyChange}
                    />
                    <label htmlFor="policy">I agree to the terms and conditions</label>
                </div>
                <button onClick={handlePaymentClick} className="payment-button" disabled={!agreedToPolicy}>
                    Make Payment
                </button>
            </footer>
        </div>
    );
};

export default PaymentPage;

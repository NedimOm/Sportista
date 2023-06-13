import React, { useState, useEffect  } from 'react';
import Button from '@material-ui/core/Button';
import "./RegisterForm.css";
import {verify, register} from "../../auth/Auth";
import {connect} from "react-redux";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";

const RenterRegisterForm = React.memo(({register, verify}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [renterName, setRenterName] = useState('');
    const [renterEmail, setRenterEmail] = useState('');
    const [renterPassword, setRenterPassword] = useState('');
    const [renterCity, setRenterCity] = useState('');
    const [renterPhone, setRenterPhone] = useState('');
    const [gotData, setGotData] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [blockButton, setBlockButton] = useState(false);

    if(!gotData)
        axios.get( `${SERVER_URL}/daj_sportove`).then((res) => {
            setGotData(true)
        })

    const handleNextStep = () => {
        if (currentStep === 1 && !renterName) {
            alert('Please enter your name.');
        } else if (currentStep === 1 && !renterEmail) {
            alert('Please enter your email address.');
        } else if (currentStep === 1 && !renterPassword) {
            alert('Please enter your password.');
        } else if (currentStep === 1 && (!/\d/.test(renterPassword) || renterPassword.length < 8)) {
            alert('Please enter a password with at least 8 characters and containing numbers.')
        }else if (currentStep === 2 && !renterCity) {
            alert('Please enter your city.');
        } else if (currentStep === 2 && !renterPhone) {
            alert('Please enter your phone number.')
        }  else {
            setCurrentStep(currentStep+1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleRenterNameChange = (event) => {
        const inputText = event.target.value;
        setRenterName(inputText.charAt(0).toUpperCase() + inputText.slice(1));
    };

    const handleRenterEmailChange = (event) => {
        setRenterEmail(event.target.value);
    };

    const handleRenterPasswordChange = (event) => {
        setRenterPassword(event.target.value);
    };

    const handleRenterCityChange = (event) => {
        const inputText = event.target.value;
        setRenterCity(inputText.charAt(0).toUpperCase() + inputText.slice(1));
    }

    const handleRenterPhoneChange = (event) => {
        setRenterPhone(event.target.value);
    }

    const handleTermsAcceptance = (event) => {
        setTermsAccepted(event.target.checked);
    };

    useEffect(() => {
        if (renterPhone && !isValidPhoneNumber(renterPhone)) {
            setPhoneError('Please enter a valid phone number.');
        } else {
            setPhoneError('');
        }
    }, [renterPhone]);

    const isValidPhoneNumber = (phoneNumber) => {
        const phonePattern = /^[0-9]{9}$/;

        return phonePattern.test(phoneNumber);
    };

    useEffect(() => {
        if (renterEmail && !isValidEmail(renterEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    }, [renterEmail]);

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setBlockButton(true)
        // Perform form submission logic here
        if (!termsAccepted) {
            alert('Please agree to the terms and conditions and privacy policy if you want to proceed.');
            return;
        }
        const DATA = {
            name: renterName,
            city: renterCity,
            phone: renterPhone,
        }
        register(renterEmail, renterPassword, false, false, true, DATA).then(() => {
            setFormSubmitted(true)
        })

    };

    const handleLoginButtonClick = () => {
        window.location.href = '/login';
    };

    const renderCurrentStepForm = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="steps">
                            <div className="step active"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                        </div>

                        <div className="text-center">
                            <h5 className="mt-5 mb-5">Personal info</h5>
                            <input
                                className="custom-input"
                                type="text"
                                id="name"
                                placeholder="Full name"
                                value={renterName}
                                onChange={handleRenterNameChange}
                                required
                            />
                        </div>

                        <div>
                            <input
                                className="custom-input"
                                type="email"
                                id="email"
                                placeholder="E-mail"
                                value={renterEmail}
                                onChange={handleRenterEmailChange}
                                required
                            />
                            {emailError && <div className="error">{emailError}</div>}
                        </div>

                        <div>
                            <input
                                className="custom-input"
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={renterPassword}
                                onChange={handleRenterPasswordChange}
                                required
                            />
                        </div>

                        <Button onClick={handleNextStep} className="nextButton custom-button">
                            Next
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="steps">
                            <div className="step completed"></div>
                            <div className="step active"></div>
                            <div className="step"></div>
                        </div>
                        <div className="text-center">
                            <h5 className="mt-5 mb-5">More personal info</h5>
                            <div>
                                <input
                                    className="custom-input"
                                    type="text"
                                    id="city"
                                    placeholder="City"
                                    value={renterCity}
                                    onChange={handleRenterCityChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    className="custom-input"
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Phone number"
                                    value={renterPhone}
                                    onChange={handleRenterPhoneChange}
                                    required
                                />
                                {phoneError && <div className="error">{phoneError}</div>}
                            </div>
                        </div>
                        <div>
                            <Button className="previousButton custom-button" onClick={handlePrevStep}>
                                Previous
                            </Button>
                            <Button className="nextButton custom-button" onClick={handleNextStep}>
                                Next
                            </Button>
                        </div>
                    </>
                );
            case 3:
                if (formSubmitted) {
                    return (
                        <>
                            <div className="text-center">
                                <h3 className="mb-5">Welcome to Sportista Field Rental!</h3>
                                <h4>Thank you for registering! Please check your email to activate your account.</h4>
                                <h4>After that, you can proceed to login.</h4>
                            </div>
                            <div className="float-end mb-3">
                                <Button onClick={handleLoginButtonClick} className="custom-button nextButton">
                                    Login
                                </Button>
                            </div>
                        </>
                    );
                } else {
                    return (
                        <>
                            <div className="steps">
                                <div className="step completed"></div>
                                <div className="step completed"></div>
                                <div className="step active"></div>
                            </div>
                            <div className="mb-3">
                                <h5 className="mt-5 mb-5">Terms and Conditions</h5>
                                <div>
                                    <p>Welcome to Sportista Field Rental!</p>
                                    <p>
                                        By using our platform, you agree to comply with the following terms and
                                        conditions:
                                    </p>
                                    <p>
                                        1. Use of the Platform
                                        - You are responsible for maintaining the confidentiality of your
                                        account.
                                        - You agree not to use the platform for any illegal or unauthorized
                                        purposes.
                                    </p>
                                    <p>
                                        2. Field Rental
                                        - The platform facilitates the rental of sports fields.
                                        - The availability and booking process may vary and are subject to
                                        specific terms outlined on the platform.
                                        - Any disputes or issues regarding field rental are the responsibility
                                        of the field renter and user.
                                    </p>
                                    <p>
                                        3. Liability
                                        - We are not responsible for any accidents, injuries, or damages that
                                        may occur during field rental.
                                        - Users and renters are advised to establish their own agreements
                                        regarding liability and responsibilities.
                                    </p>
                                    <p>
                                        4. Privacy
                                        - We collect and store user data in accordance with our privacy policy.
                                        - We implement security measures to protect user information, but we
                                        cannot guarantee complete security.
                                    </p>
                                    <p>
                                        5. Disclaimer
                                        - The platform is provided "as is" and we do not make any warranties or
                                        representations.
                                        - We are not responsible for the accuracy or availability of the
                                        platform's content.
                                    </p>
                                    <p>
                                        By using our platform, you agree to these terms and conditions.
                                        If you do not agree, please refrain from using the platform.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <input className="mt-4 mb-4" style={{ marginRight: "1rem" }} type="checkbox" required={true} onChange={handleTermsAcceptance} />
                                <label>I agree to the terms and conditions and privacy policy</label>
                            </div>

                            <div className="form-group">
                                <Button onClick={handleSubmit} className="custom-button nextButton" type="button" style={{ float: 'right' }}>
                                    Register
                                </Button>
                            </div>
                        </>
                    );
                }
            default:
                return null;
        }
    };

    return (
        <div className="container" style={{ alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit} >
            {renderCurrentStepForm()}
        </div>
    );
})

export default connect(null, {register, verify})(RenterRegisterForm);

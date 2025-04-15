import { useState } from 'react';
import type { Meta } from '@storybook/react';

import ModalDialog from '../../components/ModalDialog/ModalDialog.component';

const meta = {
    title: 'Components/ModalDialog',
    component: ModalDialog,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ModalDialog>;

export default meta;

const BasicModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Basic Modal</button>
            <ModalDialog open={open} title="Basic Modal Dialog" onClose={() => setOpen(false)}>
                <div className="contents">
                    <p>This is a basic modal dialog example.</p>
                    <p>Click the close button or outside the modal to close it.</p>
                </div>
            </ModalDialog>
        </div>
    );
};

export const Basic = {
    render: () => <BasicModalExample />,
    name: 'Basic Modal',
    parameters: {
        docs: {
            description: {
                story: 'A basic modal dialog with simple content.',
            },
        },
    },
};

const FormModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Form Modal</button>
            <ModalDialog open={open} title="Contact Form" onClose={() => setOpen(false)}>
                <div className="contents">
                    <p>Please fill out the form below:</p>
                    <input placeholder="Your name" />
                    <input placeholder="Your email" />
                    <textarea placeholder="Your message" rows={5}></textarea>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <button onClick={() => setOpen(false)}>Cancel</button>
                        <button
                            onClick={() => {
                                alert('Form submitted!');
                                setOpen(false);
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </ModalDialog>
        </div>
    );
};

export const WithFormContent = {
    render: () => <FormModalExample />,
    name: 'Form Modal',
    parameters: {
        docs: {
            description: {
                story: 'A modal dialog containing a form with input fields and submit/cancel buttons.',
            },
        },
    },
};

const MultiStepModalExample = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setStep(1), 300);
    };

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Multi-Step Modal</button>
            <ModalDialog open={open} title={`Step ${step} of 3`} onClose={handleClose}>
                <div className="contents" style={{ minWidth: '300px' }}>
                    {step === 1 && (
                        <>
                            <p>This is step 1 of the multi-step modal.</p>
                            <p>Click Next to continue or Close to exit.</p>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <p>This is step 2 of the multi-step modal.</p>
                            <p>You can go back to the previous step or continue.</p>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <p>This is the final step of the multi-step modal.</p>
                            <p>Click Finish to complete the process.</p>
                        </>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: '20px',
                        }}
                    >
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)}>Back</button>
                        ) : (
                            <button onClick={handleClose}>Close</button>
                        )}

                        {step < 3 ? (
                            <button onClick={() => setStep(step + 1)}>Next</button>
                        ) : (
                            <button onClick={handleClose}>Finish</button>
                        )}
                    </div>
                </div>
            </ModalDialog>
        </div>
    );
};

export const ControlledStateExample = {
    render: () => <MultiStepModalExample />,
    name: 'Multi-Step Modal',
    parameters: {
        docs: {
            description: {
                story: 'A modal dialog with multiple steps, demonstrating controlled state management.',
            },
        },
    },
};

const CustomStyledModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Custom Styled Modal</button>
            <ModalDialog open={open} title="Custom Styled Modal" onClose={() => setOpen(false)}>
                <div
                    className="contents"
                    style={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                    }}
                >
                    <h3 style={{ color: '#0066cc', marginTop: 0 }}>Custom Content</h3>
                    <p>This modal demonstrates custom styling applied to the content area.</p>
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '16px',
                        }}
                    >
                        <button
                            style={{
                                backgroundColor: '#0066cc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                            }}
                        >
                            Primary Action
                        </button>
                        <button
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #0066cc',
                                color: '#0066cc',
                                borderRadius: '4px',
                                padding: '8px 16px',
                            }}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ModalDialog>
        </div>
    );
};

export const CustomStyledModal = {
    render: () => <CustomStyledModalExample />,
    name: 'Custom Styled Modal',
    parameters: {
        docs: {
            description: {
                story: 'A modal dialog with custom styled content and buttons.',
            },
        },
    },
};

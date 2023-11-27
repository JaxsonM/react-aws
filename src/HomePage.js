import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

const HomePage = () => {
    return (
        <Authenticator>
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold underline">
                Welcome to the Home Page
            </h1>
            {/* Add more content here */}
        </div>
        </Authenticator>
    );
};

export default HomePage;

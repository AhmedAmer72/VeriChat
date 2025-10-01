
import React from 'react';
import PolicyBuilder from '../components/composite/PolicyBuilder';
import { useChannelStore } from '../store/channelStore';
import AnimatedSection from '../components/composite/AnimatedSection';

const Admin: React.FC = () => {
    // In a real app, you would likely POST this to a server
    const { policies, ...channelStore } = useChannelStore(); 

    const handlePolicyCreate = (policy: any) => {
        // For demo, we just log it. A real implementation would persist it.
        console.log("New policy created:", policy);
        // You could add it to the Zustand store here if you want it to be usable immediately
        // channelStore.setState({ policies: [...policies, policy] });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-white">Policy Builder</h1>
                <p className="mt-4 text-lg text-gray-400">
                    Create credential-based access policies for your channels. Define the rules that users must prove they satisfy to gain entry.
                </p>
            </AnimatedSection>

            <AnimatedSection>
                <PolicyBuilder onPolicyCreate={handlePolicyCreate} />
            </AnimatedSection>
        </div>
    );
};

export default Admin;

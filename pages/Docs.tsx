
import React from 'react';
import AnimatedSection from '../components/composite/AnimatedSection';
import Card from '../components/ui/Card';

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
    <pre className="bg-panel p-4 rounded-lg text-sm text-cyan-200 overflow-x-auto">
        <code>{children.trim()}</code>
    </pre>
);

const loginExample = `
import { airAccount } from './lib/airkit';

// Login and get a Moca ID
const mocaId = await airAccount.login('my-dapp-user');
console.log('Logged in as:', mocaId.id);
`;

const checkPolicyExample = `
import { airVerifier, proof, policy } from './lib/airkit';

// 1. Get user's credentials and the channel's policy
const credentials = await airCredentials.listCredentials(mocaId.id);
const channelPolicy = getChannelPolicy('delegates-chat');

// 2. Check if user can satisfy the policy
const canAccess = policy.evaluatePolicy(channelPolicy, credentials);

if (canAccess) {
    // 3. Generate a proof
    const accessProof = proof.generateProof(mocaId.id, credentials, channelPolicy);

    // 4. Verify the proof
    const isVerified = await airVerifier.verifyAccessProof(accessProof, channelPolicy);
    if(isVerified) {
        // Grant access to the channel
    }
}
`;

const Docs: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-white">Developer Docs</h1>
                <p className="mt-4 text-lg text-gray-400">
                    A brief overview of how to integrate the Moca Connect protocol into your application.
                </p>
            </AnimatedSection>

            <AnimatedSection className="max-w-3xl mx-auto space-y-8">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold font-display text-white mb-4">1. User Authentication</h2>
                    <p className="text-gray-400 mb-4">First, your application needs to authenticate the user to get their Moca ID. This provides the cryptographic identity needed for all subsequent actions.</p>
                    <CodeBlock>{loginExample}</CodeBlock>
                </Card>

                <Card className="p-6">
                    <h2 className="text-2xl font-bold font-display text-white mb-4">2. Gated Access Flow</h2>
                    <p className="text-gray-400 mb-4">To join a gated channel, a user must generate and submit a proof that they satisfy the channel's policy. This is done without revealing their actual credentials.</p>
                    <CodeBlock>{checkPolicyExample}</CodeBlock>
                </Card>

                <Card className="p-6">
                    <h2 className="text-2xl font-bold font-display text-white mb-4">3. Sending Messages</h2>
                    <p className="text-gray-400 mb-4">Once in a channel, messages are sent over a decentralized transport layer. Your app provides the transport implementation (e.g., Waku, XMTP).</p>
                    <CodeBlock>{`
// Using a transport instance
transport.sendMessage({
    channelId: 'channel-1',
    text: 'Hello, encrypted world!'
});

transport.onMessage((message) => {
    console.log('Received message:', message.text);
});
                    `}</CodeBlock>
                </Card>
            </AnimatedSection>
        </div>
    );
};

export default Docs;

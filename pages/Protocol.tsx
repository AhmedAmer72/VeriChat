
import React from 'react';
import AnimatedSection from '../components/composite/AnimatedSection';
import Card from '../components/ui/Card';
import { ArrowRight, Lock, UserCheck, MessageSquare, Key } from 'lucide-react';

const steps = [
  { icon: <Lock />, title: "1. Channel Creation", description: "An admin defines a gate policy, specifying which credentials are required for access." },
  { icon: <UserCheck />, title: "2. Access Request", description: "A user with a Moca ID attempts to join the channel, initiating the verification flow." },
  { icon: <Key />, title: "3. Proof Generation", description: "The user's wallet generates a ZK-style proof locally, confirming they hold the required credentials without revealing them." },
  { icon: <MessageSquare />, title: "4. Verification & Access", description: "The proof is verified. If valid, the user is granted access and can decrypt the channel's messages." },
];

const Protocol: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <AnimatedSection className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-white">The Moca Connect Protocol</h1>
        <p className="mt-4 text-lg text-gray-400">A layered architecture for trusted, private, and decentralized communication.</p>
      </AnimatedSection>

      <AnimatedSection className="mt-20">
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Card className="p-6 w-full md:w-64 text-center z-10">
                  <div className="flex justify-center mb-3 text-secondary">{step.icon}</div>
                  <h3 className="font-bold font-display text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">{step.description}</p>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="text-primary my-4 md:my-0 md:mx-8 h-8 w-8 transform md:-translate-y-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center font-display text-white mb-8">Protocol Layers</h2>
        <div className="space-y-4">
            <Card className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-bold font-display text-primary">Identity & Account Layer</h3>
                <p className="text-gray-400 mt-2">Provides persistent, user-owned Moca IDs and smart account features. This is the foundation of trust and reputation.</p>
            </Card>
            <Card className="p-6 border-l-4 border-secondary">
                <h3 className="text-xl font-bold font-display text-secondary">Credential & Trust Layer</h3>
                <p className="text-gray-400 mt-2">Manages the issuance, storage, and verification of credentials. Enables the generation of ZK-style proofs for privacy-preserving access control.</p>
            </Card>
            <Card className="p-6 border-l-4 border-accent">
                <h3 className="text-xl font-bold font-display text-accent">Transport Layer</h3>
                <p className="text-gray-400 mt-2">A pluggable system for message delivery. Defaults to a local mock, with stubs for decentralized protocols like Waku and XMTP for censorship resistance.</p>
            </Card>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Protocol;

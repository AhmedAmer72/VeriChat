
import React from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas from '../components/composite/HeroCanvas';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/composite/AnimatedSection';
import { ShieldCheck, Lock, Globe, Zap } from 'lucide-react';
import Card from '../components/ui/Card';

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
    title: 'Identity-Centric',
    description: 'Anchor all communications to your human-readable, user-owned Moca ID.',
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: 'Credential-Gated',
    description: 'Create and join private channels using verifiable credentials and ZK-style proofs.',
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: 'Private by Design',
    description: 'All messages are end-to-end encrypted. Prove access rights without revealing sensitive data.',
  },
  {
    icon: <Globe className="h-8 w-8 text-green-400" />,
    title: 'Decentralized Transport',
    description: 'Leverage pluggable P2P transport layers like Waku or XMTP for censorship resistance.',
  },
];

const Landing: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <HeroCanvas />
      
      <div className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white">
            Verifiable conversations <br />
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              without compromise.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
            Prove who you are. Keep what’s private, private. Talk anywhere. Welcome to Moca Connect.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/playground">
              <Button size="lg" variant="primary">Open Playground</Button>
            </Link>
            <Link to="/protocol">
              <Button size="lg" variant="subtle">Explore Protocol</Button>
            </Link>
          </div>
        </section>

        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold font-display text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Landing;

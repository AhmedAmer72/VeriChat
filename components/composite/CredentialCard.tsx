
import React from 'react';
import type { Credential, CredentialSchema } from '../../types';
import Card from '../ui/Card';
import { ShieldCheck } from 'lucide-react';

interface CredentialCardProps {
  credential: Credential;
  schema?: CredentialSchema;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, schema }) => {
  return (
    <Card className="p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-white font-display">{schema?.name || credential.schemaId}</h3>
          <p className="text-sm text-gray-400">Issued by: {credential.issuer}</p>
        </div>
        <ShieldCheck className="text-secondary" />
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <h4 className="text-xs uppercase font-semibold text-gray-500 mb-2">Claims</h4>
        <div className="space-y-1 text-sm">
          {Object.entries(credential.claims).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-400">{key}:</span>
              <span className="font-mono text-white">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CredentialCard;

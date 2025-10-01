
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCredentialStore } from '../store/credentialStore';
import { useChannelStore } from '../store/channelStore';
import { useUiStore } from '../store/uiStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import CredentialCard from '../components/composite/CredentialCard';
import ChannelCard from '../components/composite/ChannelCard';
import ChatPanel from '../components/composite/ChatPanel';
import ProofModal from '../components/composite/ProofModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import Skeleton from '../components/ui/Skeleton';
import AnimatedSection from '../components/composite/AnimatedSection';
import { UserPlus, PlusCircle } from 'lucide-react';
import type { CredentialSchema } from '../types';

const LoginView: React.FC = () => {
    const { login, isLoading } = useAuthStore();
    const [handle, setHandle] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (handle.trim()) {
            login(handle.trim());
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
            <Card className="p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold font-display text-white">Welcome to the Playground</h1>
                <p className="text-gray-400 mt-2 mb-6">Enter a handle to create a mock Moca ID and start.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input 
                        placeholder="e.g., satoshi" 
                        value={handle} 
                        onChange={(e) => setHandle(e.target.value)}
                        icon={<UserPlus className="text-gray-500" />}
                    />
                    <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
                        Create Moca ID
                    </Button>
                </form>
            </Card>
        </div>
    );
};

const IssueCredentialForm: React.FC<{schema: CredentialSchema}> = ({ schema }) => {
    const { mocaId } = useAuthStore();
    const { issueCredential, isLoading } = useCredentialStore();
    const [claims, setClaims] = useState<Record<string, any>>({});

    const handleIssue = () => {
        if (mocaId) {
            issueCredential(mocaId.id, schema.id, claims);
        }
    };
    
    return (
        <Card className="p-4 bg-surface space-y-3">
             <h4 className="font-bold text-secondary">{schema.name}</h4>
             <p className="text-xs text-gray-500">Issued by {schema.issuer}</p>
             {Object.entries(schema.attributes).map(([key, type]) => (
                <Input 
                    key={key}
                    placeholder={`${key} (${type})`}
                    type={type === 'number' ? 'number' : 'text'}
                    onChange={(e) => setClaims({...claims, [key]: type === 'number' ? Number(e.target.value) : e.target.value})}
                />
             ))}
             <Button onClick={handleIssue} isLoading={isLoading} size="sm" variant="subtle" className="w-full">
                 Issue to Self
             </Button>
        </Card>
    )
}

const Playground: React.FC = () => {
  const { isAuthenticated, mocaId } = useAuthStore();
  const { credentials, schemas, fetchCredentials, isLoading: credentialsLoading } = useCredentialStore();
  const { channels, policies, initTransport, setActiveChannelId, activeChannelId } = useChannelStore();
  const openProofModal = useUiStore(state => state.openProofModal);

  useEffect(() => {
    if (isAuthenticated && mocaId) {
      fetchCredentials(mocaId.id);
      initTransport();
    }
  }, [isAuthenticated, mocaId, fetchCredentials, initTransport]);

  if (!isAuthenticated || !mocaId) {
    return <LoginView />;
  }

  const handleJoinChannel = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if (!channel) return;
    
    const isMember = channel.members.includes(mocaId.id);
    if(isMember) {
        setActiveChannelId(channelId);
    } else {
        openProofModal(channelId);
    }
  }

  const issuedSchemaIds = new Set(credentials.map(c => c.schemaId));
  const availableSchemas = schemas.filter(s => !issuedSchemaIds.has(s.id));

  return (
    <>
      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 space-y-6">
                <Tabs defaultValue="channels">
                    <TabsList>
                        <TabsTrigger value="channels">Channels</TabsTrigger>
                        <TabsTrigger value="credentials">My Credentials</TabsTrigger>
                        <TabsTrigger value="issue">Issue</TabsTrigger>
                    </TabsList>
                    <TabsContent value="channels">
                        <div className="space-y-4">
                            {channels.map(channel => (
                                <ChannelCard 
                                    key={channel.id} 
                                    channel={channel}
                                    policy={policies.find(p => p.id === channel.policyId)}
                                    onJoin={handleJoinChannel}
                                    isMember={channel.members.includes(mocaId.id)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="credentials">
                         {credentialsLoading && <Skeleton className="h-24 w-full" />}
                         {credentials.length > 0 ? (
                            <div className="space-y-4">
                                {credentials.map(cred => (
                                    <CredentialCard 
                                        key={cred.id} 
                                        credential={cred}
                                        schema={schemas.find(s => s.id === cred.schemaId)}
                                    />
                                ))}
                            </div>
                         ) : (
                            <p className="text-gray-500 text-center p-4">No credentials issued yet.</p>
                         )}
                    </TabsContent>
                    <TabsContent value="issue">
                        <div className="space-y-4">
                            {availableSchemas.length > 0 ? availableSchemas.map(schema => (
                               <IssueCredentialForm key={schema.id} schema={schema} />
                            )) : <p className="text-gray-500 text-center p-4">All available credentials have been issued.</p>}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <main className="w-full lg:w-2/3">
              <Card className="h-[70vh] flex">
                 <ChatPanel />
              </Card>
            </main>
        </div>
      </AnimatedSection>
      <ProofModal />
    </>
  );
};

export default Playground;


import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { useCredentialStore } from '../../store/credentialStore';
import { useChannelStore } from '../../store/channelStore';
import { evaluatePolicy } from '../../lib/policy';
import { generateProof } from '../../lib/proof';
import * as airVerifier from '../../lib/airkit/verifier';
import { Loader2, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '../ui/Toast';

type Step = 'idle' | 'checking' | 'generating' | 'verifying' | 'success' | 'failure';

const stepMessages = {
  idle: 'Ready to generate proof.',
  checking: 'Checking credentials against policy...',
  generating: 'Generating ZK-style proof...',
  verifying: 'Submitting proof to verifier...',
  success: 'Verification successful! Access granted.',
  failure: 'Verification failed. Credentials do not meet policy requirements.',
};

const ProofModal: React.FC = () => {
  const { isProofModalOpen, closeProofModal, proofModalChannelId } = useUiStore();
  const { mocaId } = useAuthStore();
  const { credentials } = useCredentialStore();
  const { channels, policies, joinChannel } = useChannelStore();
  const { success: successToast, error: errorToast } = useToast();

  const [step, setStep] = useState<Step>('idle');

  const channel = channels.find(c => c.id === proofModalChannelId);
  const policy = policies.find(p => p.id === channel?.policyId);

  const reset = () => {
    setStep('idle');
  };
  
  const handleClose = () => {
      closeProofModal();
      setTimeout(reset, 300); // Reset after animation
  }

  const startVerificationFlow = async () => {
    if (!mocaId || !policy) return;

    setStep('checking');
    await new Promise(res => setTimeout(res, 500));

    const meetsPolicy = evaluatePolicy(policy, credentials);
    if (!meetsPolicy) {
      setStep('failure');
      errorToast("You don't have the required credentials.");
      return;
    }

    setStep('generating');
    await new Promise(res => setTimeout(res, 1000));
    const proof = generateProof(mocaId.id, credentials, policy);

    setStep('verifying');
    const isVerified = await airVerifier.verifyAccessProof(proof, policy);

    if (isVerified) {
      setStep('success');
      successToast(`Successfully joined ${channel?.name}!`);
      if (channel) joinChannel(channel.id);
      setTimeout(handleClose, 1500);
    } else {
      setStep('failure');
      errorToast("Proof could not be verified.");
    }
  };

  useEffect(() => {
      if(isProofModalOpen) {
          reset();
      }
  }, [isProofModalOpen]);

  return (
    <Modal isOpen={isProofModalOpen} onClose={handleClose} title="Channel Access Verification">
      <div className="p-4 text-center space-y-6">
        <p className="text-gray-400">
          You are about to join <span className="font-bold text-white">{channel?.name}</span>.
          This requires a proof that you meet the policy: <span className="font-bold text-secondary">{policy?.name}</span>.
        </p>
        
        <div className="space-y-3 text-left">
            <StepIndicator currentStep={step} stepName="checking" icon={<ShieldCheck size={18}/>}>Check Credentials</StepIndicator>
            <StepIndicator currentStep={step} stepName="generating" icon={<ShieldCheck size={18}/>}>Generate Proof</StepIndicator>
            <StepIndicator currentStep={step} stepName="verifying" icon={<ShieldCheck size={18}/>}>Verify Proof</StepIndicator>
        </div>

        <div className="bg-surface p-3 rounded-lg min-h-[50px] flex items-center justify-center">
            <p className={`font-mono text-sm ${step === 'failure' ? 'text-red-400' : 'text-gray-300'}`}>
                {stepMessages[step]}
            </p>
        </div>
        
        {step === 'idle' && (
            <Button onClick={startVerificationFlow} className="w-full" size="lg">
                Generate Proof & Join
            </Button>
        )}
        {step === 'success' && <div className="text-green-400 flex items-center justify-center space-x-2"><Sparkles/><span>Redirecting...</span><Sparkles/></div>}
      </div>
    </Modal>
  );
};

const StepIndicator: React.FC<{currentStep: Step, stepName: Step, icon: React.ReactNode, children: React.ReactNode}> = ({currentStep, stepName, icon, children}) => {
    const stepOrder: Step[] = ['checking', 'generating', 'verifying', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepName);

    const isCompleted = currentIndex > stepIndex || currentStep === 'success';
    const isActive = currentStep === stepName;

    return (
        <div className={`flex items-center space-x-3 transition-colors ${isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
            {isCompleted ? <CheckCircle size={18} /> : isActive ? <Loader2 size={18} className="animate-spin text-primary"/> : icon}
            <span className={isActive ? 'text-white' : ''}>{children}</span>
        </div>
    )
}

export default ProofModal;

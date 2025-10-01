
import type { Proof, GatePolicy } from '../../types';
import * as proofLib from '../proof';

// MOCK: Simulates a trusted AIR Verifier Service.

export const verifyAccessProof = async (proof: Proof, policy: GatePolicy): Promise<boolean> => {
    // Simulate network delay for verification
    await new Promise(res => setTimeout(res, 1000));
    
    // In a real system, this service would be a trusted third party
    // or a smart contract that verifies the proof cryptographically.
    // For the demo, we just call our local simulation function.
    const isValid = proofLib.verifyProof(proof, policy);

    return isValid;
};

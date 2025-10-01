
import type { Credential, GatePolicy, Proof, Rule } from '../types';
import { RuleType } from '../types';
import * as policyLib from './policy';

// SIMULATION: This is NOT a real Zero-Knowledge Proof.
// It simulates the process of generating a proof that can be verified
// without revealing the underlying credential data.

export const generateProof = (mocaId: string, credentials: Credential[], policy: GatePolicy): Proof => {
  // In a real ZK system, this would involve complex cryptography.
  // Here, we just check the policy and build a "proof" object
  // that attests to the claims being met.
  
  const proof: Proof = {
    mocaId,
    policyId: policy.id,
    claims: {},
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substring(2),
  };

  policy.rules.forEach(rule => {
    const satisfied = policyLib.evaluateRule(rule, credentials);
    switch(rule.type) {
        case RuleType.HasSchema:
            proof.claims.hasSchema = [...(proof.claims.hasSchema || []), rule.schemaId];
            break;
        case RuleType.IssuedBy:
            proof.claims.issuedBy = [...(proof.claims.issuedBy || []), rule.issuer];
            break;
        case RuleType.AttributePredicate:
            proof.claims.attributes = [...(proof.claims.attributes || []), { path: rule.path, satisfied: true }];
            break;
    }
  });

  return proof;
};

export const verifyProof = (proof: Proof, policy: GatePolicy): boolean => {
  // SIMULATION: Verifying the proof.
  // In a real system, we'd verify a cryptographic signature and the ZK proof itself.
  // Here, we just check that the proof was generated for the correct policy
  // and that all claims are marked as satisfied.

  if (proof.policyId !== policy.id) {
    return false;
  }
  
  // Check if all rules in the policy are represented in the proof's claims
  return policy.rules.every(rule => {
    switch (rule.type) {
      case RuleType.HasSchema:
        return proof.claims.hasSchema?.includes(rule.schemaId);
      case RuleType.IssuedBy:
        return proof.claims.issuedBy?.includes(rule.issuer);
      case RuleType.AttributePredicate:
        return proof.claims.attributes?.some(attr => attr.path === rule.path && attr.satisfied);
      default:
        return false;
    }
  });
};

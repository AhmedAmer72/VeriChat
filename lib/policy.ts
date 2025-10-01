
import type { Credential, GatePolicy, Rule } from '../types';
import { RuleType } from '../types';

export const evaluateRule = (rule: Rule, credentials: Credential[]): boolean => {
  switch (rule.type) {
    case RuleType.HasSchema:
      return credentials.some(c => c.schemaId === rule.schemaId);
    
    case RuleType.IssuedBy:
      return credentials.some(c => c.issuer === rule.issuer);

    case RuleType.AttributePredicate:
      return credentials.some(c => {
        // Simple path checker, doesn't handle nested objects
        const claimValue = c.claims[rule.path];
        if (claimValue === undefined || typeof claimValue !== typeof rule.value) {
            return false;
        }

        switch (rule.op) {
          case '==': return claimValue === rule.value;
          case '>=': return claimValue >= rule.value;
          case '<=': return claimValue <= rule.value;
          case '>': return claimValue > rule.value;
          default: return false;
        }
      });

    default:
      return false;
  }
};

export const evaluatePolicy = (policy: GatePolicy, credentials: Credential[]): boolean => {
  if (!policy.rules || policy.rules.length === 0) {
    return true; // No rules means open access
  }
  // All rules must be satisfied (AND logic)
  return policy.rules.every(rule => evaluateRule(rule, credentials));
};

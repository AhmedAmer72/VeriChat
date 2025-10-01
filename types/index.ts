
export interface MocaID {
  id: string; // e.g., 'satoshi.moca'
  displayName: string;
  avatarUrl?: string;
  keyPair: {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
  };
}

export interface CredentialSchema {
  id: string; // e.g., 'dao.delegate'
  name: string;
  attributes: Record<string, 'string' | 'number' | 'boolean'>;
  issuer: string; // e.g., 'ApeDAO'
}

export interface Credential {
  id: string; // UUID
  schemaId: string;
  subjectMocaId: string;
  issuer: string;
  issuedAt: number; // Unix timestamp
  claims: Record<string, unknown>;
  signature: string; // Mock signature
}

export enum RuleType {
  HasSchema = 'has_schema',
  IssuedBy = 'issued_by',
  AttributePredicate = 'attribute_predicate',
}

export interface HasSchemaRule {
  type: RuleType.HasSchema;
  schemaId: string;
}

export interface IssuedByRule {
  type: RuleType.IssuedBy;
  issuer: string;
}

export interface AttributePredicateRule {
  type: RuleType.AttributePredicate;
  path: string;
  op: '>=' | '==' | '<=' | '>';
  value: string | number | boolean;
}

export type Rule = HasSchemaRule | IssuedByRule | AttributePredicateRule;

export interface GatePolicy {
  id: string; // e.g., 'ape-dao-delegates'
  name: string;
  description: string;
  rules: Rule[];
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  policyId: string;
  members: string[]; // Moca IDs
  encryptedConversationKey?: Uint8Array;
}

export interface Message {
  id: string;
  channelId: string;
  senderMocaId: string;
  ciphertext: Uint8Array;
  nonce: Uint8Array;
  timestamp: number;
}

export interface DecryptedMessage extends Omit<Message, 'ciphertext' | 'nonce'> {
  text: string;
}

// Simulated ZK Proof
export interface Proof {
  mocaId: string;
  policyId: string;
  claims: {
    hasSchema?: string[];
    issuedBy?: string[];
    attributes?: { path: string; satisfied: boolean }[];
  };
  timestamp: number;
  nonce: string; // To prevent replay attacks
}

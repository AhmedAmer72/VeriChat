
import type { CredentialSchema, GatePolicy, Channel, Rule } from '../types';
import { RuleType } from '../types';

export const MOCA_ID_SUFFIX = '.moca';

export const CREDENTIAL_SCHEMAS: CredentialSchema[] = [
  { id: 'dao.delegate', name: 'DAO Delegate', attributes: { dao: 'string', delegationPower: 'number' }, issuer: 'ApeDAO' },
  { id: 'dao.voter', name: 'DAO Voter', attributes: { votedOn: 'number' }, issuer: 'ApeDAO' },
  { id: 'protocol.customer.verified', name: 'Verified Customer', attributes: { tier: 'string', since: 'number' }, issuer: 'MocaFi' },
  { id: 'game.legendary.rank', name: 'Legendary Rank', attributes: { rank: 'number', season: 'string' }, issuer: 'Mocaverse' },
];

export const GATE_POLICIES: GatePolicy[] = [
  {
    id: 'delegates-chat',
    name: 'DAO Delegates',
    description: 'Must be a delegate for ApeDAO.',
    rules: [
      { type: RuleType.HasSchema, schemaId: 'dao.delegate' },
      { type: RuleType.IssuedBy, issuer: 'ApeDAO' },
    ]
  },
  {
    id: 'pro-gamers',
    name: 'Pro Gamers',
    description: 'Must have a Legendary Rank of 1 or higher in any season.',
    rules: [
      { type: RuleType.HasSchema, schemaId: 'game.legendary.rank' },
      { type: RuleType.AttributePredicate, path: 'rank', op: '>=', value: 1 },
    ]
  },
  {
    id: 'defi-support',
    name: 'DeFi Priority Support',
    description: 'Must be a verified customer of MocaFi.',
    rules: [
      { type: RuleType.HasSchema, schemaId: 'protocol.customer.verified' },
      { type: RuleType.IssuedBy, issuer: 'MocaFi' },
    ]
  }
];

export const CHANNELS: Channel[] = [
  {
    id: 'channel-1',
    name: '# ape-delegates',
    description: 'Private coordination for ApeDAO delegates.',
    policyId: 'delegates-chat',
    members: [],
  },
  {
    id: 'channel-2',
    name: '# mocaverse-pros',
    description: 'Strategy and scrims for legendary players.',
    policyId: 'pro-gamers',
    members: [],
  },
  {
    id: 'channel-3',
    name: '# mocafi-support',
    description: 'Priority help for verified MocaFi customers.',
    policyId: 'defi-support',
    members: [],
  },
];

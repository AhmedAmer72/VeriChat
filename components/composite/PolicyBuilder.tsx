
import React, { useState } from 'react';
import type { Rule, GatePolicy } from '../../types';
import { RuleType } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '../ui/Toast';

interface PolicyBuilderProps {
  onPolicyCreate: (policy: GatePolicy) => void;
}

const PolicyBuilder: React.FC<PolicyBuilderProps> = ({ onPolicyCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState<Rule[]>([]);
  const { success } = useToast();
  
  const addRule = (type: RuleType) => {
    let newRule: Rule;
    switch(type) {
      case RuleType.HasSchema:
        newRule = { type, schemaId: '' };
        break;
      case RuleType.IssuedBy:
        newRule = { type, issuer: '' };
        break;
      case RuleType.AttributePredicate:
        newRule = { type, path: '', op: '>=', value: '' };
        break;
    }
    setRules([...rules, newRule]);
  };

  const updateRule = <T extends Rule>(index: number, newRule: T) => {
    const newRules = [...rules];
    newRules[index] = newRule;
    setRules(newRules);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleCreatePolicy = () => {
    const policy: GatePolicy = {
      id: `policy-${Date.now()}`,
      name,
      description,
      rules,
    };
    onPolicyCreate(policy);
    success(`Policy "${name}" created!`);
    setName('');
    setDescription('');
    setRules([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-bold font-display text-white">Create Gate Policy</h3>
        <Input placeholder="Policy Name (e.g., DAO Delegates)" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="space-y-4">
            <h4 className="font-semibold">Rules</h4>
            {rules.map((rule, index) => (
                <Card key={index} className="p-3 bg-surface">
                    <div className="flex items-start space-x-2">
                        <div className="flex-grow space-y-2">
                           {rule.type === RuleType.HasSchema && <Input placeholder="Schema ID (e.g. dao.delegate)" value={rule.schemaId} onChange={e => updateRule(index, {...rule, schemaId: e.target.value})}/>}
                           {rule.type === RuleType.IssuedBy && <Input placeholder="Issuer (e.g. ApeDAO)" value={rule.issuer} onChange={e => updateRule(index, {...rule, issuer: e.target.value})}/>}
                           {rule.type === RuleType.AttributePredicate && (
                               <div className="flex gap-2 items-center">
                                   <Input placeholder="Path" value={rule.path} onChange={e => updateRule(index, {...rule, path: e.target.value})} className="w-1/3"/>
                                   <select value={rule.op} onChange={e => updateRule(index, {...rule, op: e.target.value as any})} className="bg-surface border border-white/20 rounded-md py-2 px-2">
                                       <option>{'>='}</option><option>==</option><option>{'<'}='</option><option>{'>'}</option>
                                   </select>
                                   <Input placeholder="Value" value={String(rule.value)} onChange={e => updateRule(index, {...rule, value: e.target.value})} className="w-1/3"/>
                               </div>
                           )}
                        </div>
                        <Button variant="subtle" size="sm" onClick={() => removeRule(index)}><Trash2 size={16}/></Button>
                    </div>
                </Card>
            ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => addRule(RuleType.HasSchema)} variant="subtle" size="sm" leftIcon={<Plus size={16}/>}>Has Schema</Button>
          <Button onClick={() => addRule(RuleType.IssuedBy)} variant="subtle" size="sm" leftIcon={<Plus size={16}/>}>Issued By</Button>
          <Button onClick={() => addRule(RuleType.AttributePredicate)} variant="subtle" size="sm" leftIcon={<Plus size={16}/>}>Attribute</Button>
        </div>

        <Button onClick={handleCreatePolicy} disabled={!name || rules.length === 0}>Create Policy</Button>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-display text-white">Policy JSON Output</h3>
        <pre className="bg-panel p-4 rounded-lg text-sm text-cyan-300 overflow-x-auto h-[400px]">
          {JSON.stringify({ name, description, rules }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default PolicyBuilder;

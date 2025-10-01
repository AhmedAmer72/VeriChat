
import React from 'react';
import type { Channel, GatePolicy } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Lock } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  policy?: GatePolicy;
  onJoin: (channelId: string) => void;
  isMember: boolean;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, policy, onJoin, isMember }) => {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg text-white font-display">{channel.name}</h3>
        <p className="text-sm text-gray-400 mt-1 mb-3">{channel.description}</p>
        {policy && (
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <Lock size={14} className="text-accent" />
            <span>Requires:</span>
            <Badge variant="accent">{policy.name}</Badge>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button
          onClick={() => onJoin(channel.id)}
          className="w-full"
          variant={isMember ? 'subtle' : 'secondary'}
          disabled={isMember}
        >
          {isMember ? 'Joined' : 'Join Channel'}
        </Button>
      </div>
    </Card>
  );
};

export default ChannelCard;

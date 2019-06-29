import { TypeEffectiviness } from '../models/Pokemon';

export default (value: keyof TypeEffectiviness, damageType: 'def' | 'atk' = 'def') => {
  const prefix = damageType === 'def' ? 'takes' : 'deals';
  const suffix = damageType === 'def' ? 'from' : 'to';

  switch (value) {
    case 'quad':
      return `${prefix} 4× damage ${suffix}`;
    case 'double':
      return `${prefix} 2× damage ${suffix}`;
    case 'regular':
      return `${prefix} 1× damage ${suffix}`;
    case 'half':
      return `${prefix} ½× damage ${suffix}`;
    case 'quarter':
      return `${prefix} ¼× damage ${suffix}`;
    default:
        return `${prefix} no damage ${suffix}`;
  }
};

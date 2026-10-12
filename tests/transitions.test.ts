import { describe, expect, it } from 'vitest';
import { assertAttemptTransition } from '../lib/db';

describe('attempt transitions', () => { it('allows claimed to building', () => expect(() => assertAttemptTransition('CLAIMED', 'BUILDING')).not.toThrow()); it('rejects completed to building', () => expect(() => assertAttemptTransition('COMPLETED', 'BUILDING')).toThrow()); });

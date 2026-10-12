import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = Redis.fromEnv();
export const publicRateLimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, '1 m'), analytics: true, prefix: 'problem-coffin:public' });
export const authRateLimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 m'), analytics: true, prefix: 'problem-coffin:auth' });

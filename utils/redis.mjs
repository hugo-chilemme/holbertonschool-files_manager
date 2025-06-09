import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.isConnected = false;

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
            this.isConnected = false;
        });

        this.client.on('connect', () => {
            this.isConnected = true;
        });
    }

    isAlive() {
        return this.isConnected;
    }

    async get(key) {
        try {
            return await this.client.get(key);
        } catch (err) {
            return null;
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.set(key, value, { EX: duration });
        } catch (err) {
            // handle error if needed
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
        } catch (err) {
            // handle error if needed
        }
    }
}

const redisClient = new RedisClient();
export default redisClient;
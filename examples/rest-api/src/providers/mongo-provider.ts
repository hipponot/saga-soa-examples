import { MongoClient } from 'mongodb';
import type { IMongoConnMgr } from '@hipponot/soa-db';

export class MongoProvider implements IMongoConnMgr {
    public readonly instanceName: string;
    private client: MongoClient | null = null;
    private connectionString: string;

    constructor(connectionString: string, instanceName: string = 'ProductionMongoDB') {
        this.connectionString = connectionString;
        this.instanceName = instanceName;
    }

    async connect(): Promise<void> {
        if (this.isConnected()) {
            return;
        }

        try {
            // MongoDB 8.0 optimized connection options
            this.client = new MongoClient(this.connectionString, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4, // Use IPv4, skip trying IPv6
                // MongoDB 8.0 specific options
                compressors: ['snappy', 'zlib', 'zstd'],
                zlibCompressionLevel: 6,
            });

            await this.client.connect();

            // Verify connection with a ping
            await this.client.db('admin').command({ ping: 1 });

            console.log(`✅ Connected to MongoDB: ${this.instanceName}`);
        } catch (error) {
            console.error(`❌ Failed to connect to MongoDB: ${this.instanceName}`, error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            try {
                await this.client.close();
                console.log(`✅ Disconnected from MongoDB: ${this.instanceName}`);
            } catch (error) {
                console.error(`❌ Error disconnecting from MongoDB: ${this.instanceName}`, error);
            } finally {
                this.client = null;
            }
        }
    }

    isConnected(): boolean {
        return !!this.client && !(this.client as any).topology.isDestroyed();
    }

    getClient(): MongoClient {
        if (!this.client) {
            throw new Error(`MongoClient is not connected for instance: ${this.instanceName}`);
        }
        return this.client;
    }

    // Utility method to get database
    getDatabase(dbName?: string): any {
        const client = this.getClient();
        return client.db(dbName);
    }

    // Health check method
    async healthCheck(): Promise<boolean> {
        try {
            if (!this.isConnected()) {
                return false;
            }
            await this.client!.db('admin').command({ ping: 1 });
            return true;
        } catch (error) {
            console.error('MongoDB health check failed:', error);
            return false;
        }
    }
} 
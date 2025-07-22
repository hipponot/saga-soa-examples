import { Get, Controller } from 'routing-controllers';
import type { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { ILogger } from '@hipponot/soa-logger';
import type { IMongoConnMgr } from '@hipponot/soa-db';
import { RestControllerBase } from '@hipponot/soa-core-api/rest-controller';

@Controller('/health')
@injectable()
export class HealthController extends RestControllerBase {
    readonly sectorName = 'health';

    constructor(
        @inject('ILogger') logger: ILogger,
        @inject('IMongoConnMgr') private mongoManager: IMongoConnMgr
    ) {
        super(logger, 'health');
    }

    @Get('/')
    async healthCheck() {
        try {
            const checks = {
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV || 'development',
                checks: {
                    database: await this.checkDatabase(),
                    memory: this.checkMemory(),
                    version: process.version
                }
            };

            const allHealthy = Object.values(checks.checks).every(check =>
                typeof check === 'object' ? check.status === 'ok' : true
            );

            return {
                ...checks,
                status: allHealthy ? 'ok' : 'degraded'
            };
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error(String(error));
            this.logger.error('Health check failed', errorObj);
            return {
                status: 'error',
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    private async checkDatabase() {
        try {
            if (!this.mongoManager.isConnected()) {
                return { status: 'error', message: 'Database not connected' };
            }

            // Try to ping the database
            const client = this.mongoManager.getClient();
            await client.db('admin').command({ ping: 1 });

            return {
                status: 'ok',
                instance: this.mongoManager.instanceName,
                message: 'Database connection healthy'
            };
        } catch (error) {
            return {
                status: 'error',
                message: error instanceof Error ? error.message : 'Database check failed'
            };
        }
    }

    private checkMemory() {
        const memUsage = process.memoryUsage();
        const mbUsage = {
            rss: Math.round(memUsage.rss / 1024 / 1024),
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
            external: Math.round(memUsage.external / 1024 / 1024)
        };

        return {
            status: 'ok',
            usage: mbUsage,
            unit: 'MB'
        };
    }

    async init() {
        // No async setup needed
    }
} 
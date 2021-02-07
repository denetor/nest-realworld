import { parameters } from './parameters';

export const config = {
    app: {
        title: 'Real World Application',
        description: 'Project description',
        version: '1.0.0',
        // this app features
        features: {
            // put here application features configuration
            auditLog: {
                enable: true, // enable/disable logging system
                excludeEntities: ['someentity'], // entities excluded from auditing
                excludeOperations: ['read'] // operations excluded from auditing
            }
        },
        services: {
            // put here external services configuration
        }
    },
    params: parameters
};

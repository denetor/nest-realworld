# RealWorld Application Server

## Description
This is the server side of a real-world application with organizations, users and teams.
Users may use the software singularly or involved in one or more organizations.
Organizations can form one or more teams, involving some users (even the same users).
Access rights can be set to single users, organizations or teams.

## Strategies
### Access control
Each entity service should implement some methods to grant  access rights:
- canRead(req, entityId)    // returns true if request user can read an entity
- canWrite(req, entityId)   // returns true if request user can write an entity (update) 
- canCreate(req)            // returns true if request user can create an entity
- addQueryFilters(q, req, accessType)   // add to query q the filters to get only the request' user's allowed entities
[ ] Done

### AuditLog
#### REST API Audit
Each controller will add AuditLog information after executing the task.
A configuration value will enable/disable on read/write/both operations.
[ ] Done

#### Data access Audit
Each entity service will add AuditLog information after executing the task.
A configuration value will enable/disable on read/write/both operations.
[ ] Done

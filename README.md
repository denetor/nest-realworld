# RealWorld Application Server

## Description
This is the server side of a real-world application with organizations, users and teams.
Users may use the software singularly or involved in one or more organizations.
Organizations can form one or more teams, involving some users (even the same users).
Access rights can be set to single users, organizations or teams.

## TODO
- [x] Authentication API protection
- [x] Controller decorators (ValidationPipe, parameters and response codes)
- [-] Fix all controllers response codes
- [ ] Tests
- [ ] Access control
- [ ] REST API Audit (with configuration)
- [ ] Data access Audit (with configuration)
- [ ] Add email notifications on account creation/pasword recovery/... (with configurable sending service)
- [ ] Add password expiring (with configuration)

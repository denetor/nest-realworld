# RealWorld Application Server

## Description
This is the server side of a real-world application with organizations, users and teams.
Users may use the software singularly or involved in one or more organizations.
Organizations can form one or more teams, involving some users (even the same users).
Access rights can be set to single users, organizations or teams.

## TODO
- [x] Authentication API protection
- [x] Controller decorators (ValidationPipe, parameters and response codes)
- [x] Fix all controllers response codes
- [x] Unit Tests (https://stackoverflow.com/questions/55366037/inject-typeorm-repository-into-nestjs-service-for-mock-data-testing)
- [x] Replace usersService.insert/delete with create/remove
- [ ] E2e tests with dedicated DB and seed
- [x] Access control (basic)
- [ ] REST API Audit (with configuration)
- [ ] Data access Audit (with configuration)
- [ ] Add email notifications on account creation/password recovery/... (with configurable sending service)
- [ ] Add password expiring (with configuration)
- [ ] Project entity, with access control

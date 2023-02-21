## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
*IMPORTANT: Before starting the application, you need to install docker and docker-compose in your workspace

```bash
$ yarn install
```

## Running the app

```bash
# application startup
$ docker-compose up -d

# close and delete application container
$ docker-compose down

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Nest CLI
```bash
# generate module. Ex: nest g mo modules/user
$ nest g mo modules/{variable-name}

# generate controller. Ex: nest g co modules/user --no-spec
$ nest g co modules/{variable-name} --no-spec

# generate service. Ex: nest g s modules/user --no-spec
$ nest g s modules/{variable-name} --no-spec

# create new module, controller and service
$ nest g mo modules/{variable-name} && nest g co modules/{variable-name} --no-spec && nest g s modules/{variable-name} --no-spec
```

## Utils CLI
```bash
# generate entity. Ex: touch src/modules/user/entities/user.entity.ts
$ touch src/modules/{module-name}/entities/{entity-name}.entity.ts

# generate dto. Ex: touch src/modules/user/dto/user.dto.ts
$ touch src/modules/{module-name}/dto/{dto-name}.dto.ts
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

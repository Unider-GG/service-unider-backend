## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[TypeORM](https://typeorm.io/) TypeORM is an ORM

## Installation
*IMPORTANT: Before starting the application, you need to install docker and docker-compose in your workspace

```bash
$ yarn install
```

## Running the app

```bash
# database startup
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

# generate dto. Ex: touch src/modules/user/useCases/changePasswordUseCase.ts
$ touch src/modules/{module-name}/useCases/{dto-name}UseCase.ts
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

## Decorators

- @GetUser(): if an authentication token is sent in the header of the request, we can use this decorator to get the data of the user who is making the request

```typescript
  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }
```

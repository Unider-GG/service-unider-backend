import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from './typeorm.service';

describe('TypeOrmConfigService', () => {
  let service: TypeOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmConfigService],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

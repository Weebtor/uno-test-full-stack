import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { CurrentUser } from '../auth/strategies/jwt.strategy';

describe('StatsController', () => {
  let controller: StatsController;
  let service: StatsService;

  const mockStatsService = {
    getPastResults: jest.fn(),
    getGameResult: jest.fn(),
  };

  const mockUser: CurrentUser = {
    sub: 'user-123',
  } as CurrentUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        {
          provide: StatsService,
          useValue: mockStatsService,
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    service = module.get<StatsService>(StatsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPastResults', () => {
    it('should call statsService.getPastResults with current user', async () => {
      const expectedResult = [{ id: 'game-1' }];
      mockStatsService.getPastResults.mockResolvedValue(expectedResult);

      const result = await controller.getPastResults(mockUser);

      expect(service.getPastResults).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getGameResult', () => {
    it('should call statsService.getGameResult with game id and current user', async () => {
      const gameId = 'game-123';
      const expectedResult = { id: gameId, status: 'finished' };
      mockStatsService.getGameResult.mockResolvedValue(expectedResult);

      const result = await controller.getGameResult(gameId, mockUser);

      expect(service.getGameResult).toHaveBeenCalledWith(gameId, mockUser);
      expect(result).toEqual(expectedResult);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { GameService } from '../game/game.service';
import { CurrentUser } from '../auth/strategies/jwt.strategy';

describe('StatsService', () => {
  let service: StatsService;
  let gameService: GameService;

  const mockGameService = {
    getPastResults: jest.fn(),
    getGameResult: jest.fn(),
  };

  const mockUser: CurrentUser = {
    sub: 'user-123',
  } as CurrentUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: GameService,
          useValue: mockGameService,
        },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
    gameService = module.get<GameService>(GameService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPastResults', () => {
    it('should call gameService.getPastResults with user', async () => {
      const expectedResult = [{ id: 'game-1' }];
      mockGameService.getPastResults.mockResolvedValue(expectedResult);

      const result = await service.getPastResults(mockUser);

      expect(gameService.getPastResults).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getGameResult', () => {
    it('should call gameService.getGameResult with gameId and user', async () => {
      const gameId = 'game-123';
      const expectedResult = { id: gameId, status: 'finished' };
      mockGameService.getGameResult.mockResolvedValue(expectedResult);

      const result = await service.getGameResult(gameId, mockUser);

      expect(gameService.getGameResult).toHaveBeenCalledWith(gameId, mockUser);
      expect(result).toEqual(expectedResult);
    });
  });
});

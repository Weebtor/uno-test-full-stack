import { Injectable } from '@nestjs/common';
import { CurrentUser } from '../auth/strategies/jwt.strategy';
import { GameService } from '../game/game.service';

@Injectable()
export class StatsService {
  constructor(private readonly gamesService: GameService) {}

  async getPastResults(user: CurrentUser) {
    return this.gamesService.getPastResults(user);
  }

  async getGameResult(gameId: string, user: CurrentUser) {
    return this.gamesService.getGameResult(gameId, user);
  }
}

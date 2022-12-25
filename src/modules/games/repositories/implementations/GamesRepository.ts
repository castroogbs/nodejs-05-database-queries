import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = this.repository
    .createQueryBuilder("games")
    .where("games.title ILIKE :title", { title: `%${param}%` })
    .getMany();
    // Complete usando query builder
    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const totalGames = this.repository.query("SELECT count(*) FROM games"); // Complete usando raw query
    return totalGames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = this.repository
    .createQueryBuilder()
    .relation(Game, "users")
    .of(id)
    .loadMany();
    return users;
      // Complete usando query builder
  }
}

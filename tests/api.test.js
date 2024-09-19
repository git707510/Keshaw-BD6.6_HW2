const { app } = require('../index');
const { getAllGames, getGameById } = require('../controllers');

const http = require('http');
const request = require('supertest');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('test apis', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games record', async () => {
    let mockedGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getAllGames.mockReturnValue(mockedGames);

    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(res.body.games).toEqual(mockedGames);
    expect(res.body.games.length).toBe(3);
  });

  it('should return game by id', async () => {
    const mockGame = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };

    getGameById.mockReturnValue(mockGame);

    const game = await request(server).get('/games/details/1');
    expect(game.status).toBe(200);
    expect(game.body.game).toEqual(mockGame);
  });
});

describe('test functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games by mock getAllGames function', async () => {
    const res = getAllGames();
    console.log(res);
    expect(res).toEqual([
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ]);

    expect(res.length).toBe(3);
  });
});

import bcrypt from 'bcrypt';

import { User } from '../../db/models/user.model';
import { CreateUserDTO, GetUserDTO } from '../dtos/user.dto';
import { omitFields, error } from '../utils';
import { IUserOutput, StatusCode, IUserInput } from '../types';
import { Experiment } from '../../db/models/experiment.model';

const SALT = 10;

class UserService {
  async list(): Promise<GetUserDTO[]> {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });

    return users;
  }

  async find(id: number): Promise<GetUserDTO | null> {
    const user = await User.findByPk(id);

    if (!user) throw error('User not found', StatusCode.NOT_FOUND);

    return user;
  }

  async profile(id: number): Promise<GetUserDTO | null> {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Experiment,
          as: 'experiments',
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!user) throw error('User not found', StatusCode.NOT_FOUND);

    return user;
  }

  async create(data: IUserInput): Promise<CreateUserDTO> {
    const password = bcrypt.hashSync(data.password, SALT);

    const user = await User.create({ ...data, password });

    return omitFields((user as any).dataValues, 'password');
  }

  async update(id: number, data: IUserInput): Promise<IUserOutput> {
    const user = await this.find(id);
    const updatedUser = await (user as User).update(data);

    return omitFields((updatedUser as any).dataValues, 'password');
  }

  async remove(id: number): Promise<boolean> {
    const isRemoved = await User.destroy({
      where: { id },
    });

    return Boolean(isRemoved);
  }
}

export default UserService;

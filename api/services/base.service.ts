import { StatusCode } from 'api/types';
import { error } from 'api/utils';
import { ModelDefined } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

class BaseService<T, G> {
  protected __model: ModelDefined<T, G>;

  constructor(model: ModelDefined<T, G>) {
    this.__model = model;
  }

  async list() {
    const data = await this.__model.findAll();

    return data;
  }

  async find(id: number) {
    const data = await this.__model.findByPk(id);

    if (!data) throw error('id not found', StatusCode.NOT_FOUND);

    return data;
  }

  async create(body: MakeNullishOptional<G extends object ? G : any>) {
    const data = await this.__model.create(body);

    return data;
  }

  async update(
    id: number,
    body: MakeNullishOptional<G extends object ? G : any>
  ) {
    const data = await this.find(id);

    const updatedData = await data.update(body);

    return updatedData;
  }

  async remove(id: number) {
    const data = await this.find(id);

    const removedData = await data.destroy();

    return removedData;
  }
}

export default BaseService;

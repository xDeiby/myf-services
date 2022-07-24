import { ISectionInput, ISectionOutput, StatusCode } from '../types';
import { Section } from '../../db/models/section.model';
import { error } from '../utils';

class SectionService {
  // async list(): Promise<ISectionOutput[]> {
  //   const sections = await Section.findAll();

  //   return sections;
  // }

  static async find(id: number): Promise<ISectionOutput> {
    const section = await Section.findByPk(id);

    if (!section) throw error('section not found', StatusCode.NOT_FOUND);

    return section;
  }

  static async create(data: ISectionInput): Promise<ISectionOutput> {
    console.log(data);

    const section = await Section.create(data);

    return section;
  }

  static async update(
    id: number,
    data: ISectionInput
  ): Promise<ISectionOutput> {
    const section = (await this.find(id)) as Section;

    const updatedSection = await section.update(data);

    return updatedSection;
  }

  async remove(id: number): Promise<boolean> {
    const isRemoved = await Section.destroy({
      where: { id },
    });

    return Boolean(isRemoved);
  }
}

export default SectionService;

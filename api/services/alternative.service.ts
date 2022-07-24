import { IAlternative, IAlternativeInput, StatusCode } from '../../api/types';
import { error } from '../../api/utils';
import { Alternative } from '../../db/models/alternative.model';
import QuestionService from './question.service';
import SectionService from './section.service';

class AlternativeService {
  static async find(id: number) {
    const alternative = await Alternative.findByPk(id);

    if (!alternative) throw error("id doesn't exist", StatusCode.NOT_FOUND);

    return alternative;
  }

  static async create(data: IAlternativeInput) {
    await QuestionService.find(data.questionId);

    const alternative = await Alternative.create(data);

    return alternative;
  }

  static async update(id: number, data: Partial<IAlternative>) {
    if (data.questionId) {
      await SectionService.find(data.questionId);
    }

    const alternative = await this.find(id);
    const updatedAlternative = await alternative.update(data);

    return updatedAlternative;
  }
}

export default AlternativeService;

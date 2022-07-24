import { IQuestion, IQuestionInput, StatusCode } from '../../api/types';
import { error } from '../../api/utils';
import { Question } from '../../db/models/question.model';
import SectionService from './section.service';

class QuestionService {
  static async find(id: number) {
    const question = await Question.findByPk(id);

    if (!question) throw error("id doesn't exist", StatusCode.NOT_FOUND);

    return question;
  }

  static async create(data: IQuestionInput) {
    await SectionService.find(data.sectionId);

    console.log(data);

    const question = await Question.create(data);

    return question;
  }

  static async update(id: number, data: Partial<IQuestion>) {
    if (data.sectionId) {
      await SectionService.find(data.sectionId);
    }

    const question = await this.find(id);
    const updatedQuestion = await question.update(data);

    return updatedQuestion;
  }
}

export default QuestionService;

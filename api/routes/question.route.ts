import { validatorSchema } from '../../api/middlewares';
import {
  questionPostSchema,
  questionPutSchema,
} from '../../api/schemas/question.shcema';
import QuestionService from '../../api/services/question.service';
import { StatusCode } from '../../api/types';
import { responses } from '../../api/utils';
import express from 'express';

const questionRouter = express.Router();

questionRouter.post(
  '/',
  validatorSchema(questionPostSchema),
  async (req, res, next) => {
    try {
      const question = await QuestionService.create(req.body);

      responses.success(res, question, StatusCode.CREATED);
    } catch (error) {
      next(error);
    }
  }
);

questionRouter.put(
  '/:id',
  validatorSchema(questionPutSchema),
  async (req, res, next) => {
    try {
      const question = await QuestionService.update(
        Number(req.params.id),
        req.body
      );

      responses.success(res, question);
    } catch (error) {
      next(error);
    }
  }
);

export default questionRouter;

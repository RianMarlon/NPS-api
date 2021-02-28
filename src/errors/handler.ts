import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    const errorMessages: string[] = [];

    error.errors.forEach((err) => {
      errorMessages.push(err);
    });

    return response.status(400).json({
      errorMessages,
    })
  }

  return response.status(500).json({
    errorMessages: ['Erro no servidor!']
  });
};

export default errorHandler;
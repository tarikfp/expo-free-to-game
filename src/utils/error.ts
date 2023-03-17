import { isAxiosError } from "axios";

export const isObjectNotFoundError = (error: any) =>
  isAxiosError(error) && error.response?.status === 404;

export const isServerError = (error: any) =>
  isAxiosError(error) && error.response?.status === 500;

export const errorMessagesByStatus = {
  404: "Game or endpoint not found",
  500: "Something went wrong, server error",
};

export const getErrorMessage = (error: any) => {
  if (isObjectNotFoundError(error)) {
    return errorMessagesByStatus[404];
  }

  if (isServerError(error)) {
    return errorMessagesByStatus[500];
  }

  return "An unknown error occurred";
};

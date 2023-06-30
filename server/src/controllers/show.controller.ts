import asyncHandler from "../middleware/asyncHandler.js";
import showService from "../services/show.services.js";
import { Request, Response } from "express";

export const getAllShows = asyncHandler(async (req: Request, res: Response) => {
  res.send(await showService.getAllShows());
});

export const getShowByID = asyncHandler(async (req: Request, res: Response) => {
  res.send(await showService.getShowByID(req.params.id));
});

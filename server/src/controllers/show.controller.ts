import showService from "../services/show.services.js";
import { Request, Response } from "express";

async function getAllShows(req: Request, res: Response) {
  res.send(await showService.getAllShows());
}

async function getShowByID(req: Request, res: Response) {
  res.send(await showService.getShowByID(req.params.id));
}

export default {
  getAllShows,
  getShowByID,
};

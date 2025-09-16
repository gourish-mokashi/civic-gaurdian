import { Router } from "express";
import { updateIssue, createIssue, getAllIssues, getIssueById, issueStats } from "../controllers/issueController.js";
const issueRouter = Router();

issueRouter.get('/', getAllIssues);
issueRouter.get('/:id', getIssueById);
issueRouter.post('/', createIssue);
issueRouter.put('/:id', updateIssue);
issueRouter.get('/i/stats', issueStats);

export default issueRouter;
import { Router } from "express";
import { updateIssue, createIssue, getAllIssues, getIssueById, issueStats } from "../controllers/issueController";
const issueRouter = Router();

issueRouter.get('/api/issues/'), getAllIssues;
issueRouter.get('/api/issues/:id', getIssueById);
issueRouter.post('/api/issues/', createIssue);
issueRouter.put('/api/issues/:id', updateIssue);
issueRouter.get('/api/issues/stats', issueStats)

export default issueRouter;
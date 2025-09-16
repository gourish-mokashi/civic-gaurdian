import { PrismaClient } from "../../generated/prisma/index.js";
import rpaAutomation from "../lib/rpa_automation.js";

const prisma = new PrismaClient();

export async function getAllIssues(req, res) {
    try {
        const issues = await prisma.issue.findMany();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch issues" });
    }
}

export async function getIssueById(req, res) {
    const { id } = req.params;
    try {
        const issue = await prisma.issue.findUnique({
            where: { id },
        });
        if (issue) {
            res.status(200).json(issue);
        } else {
            res.status(404).json({ error: "Issue not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch issue" });
    }
}

export async function createIssue(req, res) {
    const { title, description, category, status, priority, lat, lon } = req.body;

    // RPA Automation to assign department based on category
    const assignedTo = rpaAutomation(category);
    
    try {
        const newIssue = await prisma.issue.create({
            data: { 
                title,
                description,
                category,
                status,
                assignedTo,
                priority,
                lat,
                lon
            },
        });
        res.status(201).json(newIssue);
    } catch (error) {
        res.status(500).json({ error: "Failed to create issue" });
    }
}

export async function updateIssue(req, res) {
    const { id } = req.params;

    // check if the user is admin

    const { status, priority } = req.body;

    try {
        const updatedIssue = await prisma.issue.update({
            where: { id },
            data: { status, priority },
        });
        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(500).json({ error: "Failed to update issue" });
    }
}

export async function issueStats(req, res) {
    try {
        const newIssues = await prisma.issue.count({
            where: {
                status: 'NEW'
            }
        });

        const inProgressIssues = await prisma.issue.count({
            where: {
                status: 'IN_PROGRESS'
            }
        });

        const resolvedIssues = await prisma.issue.count({
            where: {
                status: 'RESOLVED'
            }
        });

        res.status(200).json({
            newIssues,
            inProgressIssues,
            resolvedIssues
        });

    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch issue stats" });
    }
}
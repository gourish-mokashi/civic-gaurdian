import { PrismaClient } from "../../generated/prisma";

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

    try {
        const newIssue = await prisma.issue.create({
            data: {
                title,
                description,
                category,
                status,
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

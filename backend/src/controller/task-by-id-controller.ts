import type Endpoint from './endpoint.js';
import { prisma } from '../../lib/prisma.js';

const taskByIdEndpoint: Endpoint = {
    async get(req, res) {
        try {
            const userCompany = 1;
            const taskId = Number(req.params.taskId);
            if (!taskId) {
                res.status(400).json({ message: "Task id is required" });
                return;
            }
            const task = await prisma.taskCategory.findFirst({
                where: { id: taskId, companyId: userCompany },
            });
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json(task);
        } catch (e: any) {
            res.status(400).json({ message: e.message || String(e) });
        }
    },
    async post(_req, res) {
        res.status(405).json({ message: "Method not allowed" });
    },
    async put(_req, res) {
        res.status(405).json({ message: "Method not allowed" });
    },
    async delete(_req, res) {
        res.status(405).json({ message: "Method not allowed" });
    },
};

export default taskByIdEndpoint as Endpoint;

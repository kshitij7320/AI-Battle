import { StateGraph,StateSchema,type GraphNode } from "@langchain/langgraph"
import z from "zod"
import { mistralModel,cohereModel,geminiModel } from "./models.ai.js"

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
})
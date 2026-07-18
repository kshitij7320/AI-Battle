import { StateGraph,StateSchema,type GraphNode } from "@langchain/langgraph"
import z from "zod"
import { mistralModel,cohereModel,geminiModel } from "./models.ai.js"
import { MistralAI } from "@langchain/mistralai"

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

const solutionNode: GraphNode<typeof state>= async (state)=>{
    const [mistralResponse, cohereResponse] = await Promise.all([
        mistralModel.invoke(state.problem),
        cohereModel.invoke(state.problem)
    ])
    return {
        solution_1: mistralResponse.text,
        solution_2: cohereResponse.text
    }
}
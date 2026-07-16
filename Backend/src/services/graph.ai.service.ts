import { StateSchema, MessagesValue, ReducedValue , StateGraph, START, END } from "@langchain/langgraph";
import type { Graph, GraphNode } from "@langchain/langgraph";
import { HumanMessage } from "langchain";
import { z } from "zod";



const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""),{
        reducer : (current, next)=>{
            return next
        }
    })
});

const solutionNode: GraphNode<typeof State> = (state: typeof State)=>{
    console.log(state.messages)
    return {
        messages: state.messages[0]
    }
}

const graph = new StateGraph(State)
.addNode("solution", solutionNode)
.addEdge(START ,"solution")
.compile();

export default async function(userMessage:string){
    const result = await graph.invoke({
        messages: [new HumanMessage(userMessage)]
    })
    return result.messages
}
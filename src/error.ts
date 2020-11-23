import { Request, Response } from "node-fetch";

export class ApiError extends Error {
    constructor(public req: Request, public res: Response | undefined, public wrappedError: Error) {
        super(wrappedError.message);
    }
}
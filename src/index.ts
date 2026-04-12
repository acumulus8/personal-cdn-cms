import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response, type Application } from "express";
import { expressMiddleware } from "@as-integrations/express5";
import authRoutes from "@/routes/auth.routes";
import { apolloServer } from "@/graphql/server";
import { verifyToken } from "@/middleware/auth.middleware";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Tim Wilburn Personal Sites CMS & CDN");
});

app.use("/auth", authRoutes);

await apolloServer.start();

app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
        context: async ({ req }) => {
            const token = req.headers.authorization?.split(" ")[1];
            const user = token ? verifyToken(token) : undefined;
            return { user };
        },
    })
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

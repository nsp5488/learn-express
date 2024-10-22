import express, { Response } from "express";
import { UserRequest } from "./types";

const router = express.Router();

router.get("/usernames", (req: UserRequest, res: Response) => {
  let usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

router.get("/username/:name", (req: UserRequest, res: Response) => {
  let searchName = req.params.name;
  let found = req.users?.filter((u) => {
    return u.username.toLowerCase() === searchName.toLowerCase();
  });
  if (found === undefined) {
    res.send({ error: { message: `${searchName} not found`, status: 404 } });
    return;
  }
  res.send(found);
});
export default router;

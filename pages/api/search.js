import { getPost } from "./post"

export default function getSearch (req,res) {
    return getPost(req,res);
}
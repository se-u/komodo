import { fetchIsVoteActive } from "@/app/lib/data";

export async function GET(request: Request) {
  const result = await fetchIsVoteActive("") 
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
 
  return Response.json(result)
}
import type { Email } from "../store/current-email";

export const prerender = false

export async function GET({ request }: { request: Request }): Promise<Response> {
  const email = new URL(request.url).searchParams.get('email')
  const response = await fetch(`https://restmail.net/mail/${email}`)
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json()
    })
    .then((res: Email[]) => {
      return res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })

  return new Response(JSON.stringify(response))
};

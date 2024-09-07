export const prerender = false;

export const GET = async (props: { request: Request }): Promise<Response> => {
  const { request } = props
  const email = new URL(request.url).searchParams.get('email')
  const response = await fetch(`https://restmail.net/mail/${email}`)
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json()
    })
    // .then((res: Email[]) => {
    .then((res: any[]) => {
      return res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })

  return new Response(
    JSON.stringify(response),
    { headers: { 'content-type': 'application/json' } }
  )
};

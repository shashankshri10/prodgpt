export async function GET(){
    return new Response(`API Key here: ${process.env.TAI_API_KEY}`);
}
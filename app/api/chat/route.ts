import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // 🤖 SIMULATED "PASTOR AI" INTELLIGENCE
  // This simulates the RAG process of understand -> retrieve -> answer

  let responseText = "";

  if (lastMessage.includes("service") || lastMessage.includes("time")) {
    responseText = "Our services are held at multiple locations to accommodate everyone. \n\n📍 **Subhash Nagar**:\n- Sunday Morning: 5:45 AM - 8:30 AM\n- Second Worship: 8:30 AM - 10:30 AM\n\n📍 **Bahadurpally**:\n- Sunday Afternoon: 11:00 AM - 2:00 PM\n- 2nd Tuesday: Prayer Meeting";
  } else if (lastMessage.includes("pray") || lastMessage.includes("anxiety") || lastMessage.includes("help") || lastMessage.includes("prarthana")) {
    responseText = "I'm sorry to hear you're going through a tough time. Remember, you are not alone. \n\nScripture says in **Philippians 4:6-7**: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'\n\nI have added a prayer request for you to our pastoral team. Would you like to speak with a pastor directly?";
  } else if (lastMessage.includes("sermon") || lastMessage.includes("watch")) {
    responseText = "We have several sermons available that might encourage you. You can check out our latest series 'The Power of Faith' or 'Walking in Love' in the Sermons section of the website. \n\nWould you like me to find a specific topic for you?";
  } else if (lastMessage.includes("telugu") || /[\u0C00-\u0C7F]/.test(lastMessage)) {
    // Basic Telugu detection
    responseText = "వందనాలు! నేను కింగ్డమ్ ఆఫ్ క్రైస్ట్ మినిస్ట్రీస్ AI సహాయకుడిని. (Greetings! I am the KCM AI Assistant). I can mostly understand English, but I know you are asking in Telugu. How can I help?";
  } else {
    responseText = "Blessings! I am the Kingdom of Christ Ministries AI Assistant. I can help you find service times, sermons, or pray with you. How can I assist you today?";
  }

  // Simulate streaming response for that "AI feel"
  // We break the response into chunks to simulate tokens
  const chunks = responseText.split(/(?=[ ,.\n])/g);

  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of chunks) {
        // Fast streaming for "Old Chatbot" feel
        await new Promise(resolve => setTimeout(resolve, 15));
        controller.enqueue(new TextEncoder().encode(chunk));
      }
      controller.close();
    },
  });

  return new StreamingTextResponse(stream);
}

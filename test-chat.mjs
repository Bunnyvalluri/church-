
async function testChat(message) {
  console.log(`\nTesting message: "${message}"`);
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }]
      })
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(text);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
    console.log(`Response: ${result}`);
  } catch (error) {
    console.error("Failed to connect to server. Ensure npm run dev is running on port 3000.");
    console.error(error.message);
  }
}

async function runTests() {
  await testChat("When is the next service?");
  await testChat("Can you pray for me?");
  await testChat("Where is the church located?");
}

runTests();

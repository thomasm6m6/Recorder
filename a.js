// node a.js < a.txt
import ollama from 'ollama';

async function readStdin() {
    let input = '';
    process.stdin.setEncoding('utf8');

    for await (const chunk of process.stdin) {
        input += chunk;
    }
    return input;
}

async function main() {
    const input = await readStdin();
    const prompt = `Summarize this transcript: ${input}`;

    const response = await ollama.generate({
        model: 'llama3.1',
        prompt: prompt,
        stream: true
    });

    for await (const chunk of response) {
        process.stdout.write(chunk.response);
    }
    console.log('\n');
}

main().catch(console.error);
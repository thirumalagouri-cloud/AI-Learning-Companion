const API_URL = "http://127.0.0.1:8000";


function startLearning() {

    document.body.innerHTML = `
        <div class="container">

            <h1>🎓 AI Learning Dashboard</h1>

            <p>Choose what you want to learn:</p>

            <button onclick="openMaths()">
                📐 Mathematics
            </button>

            <button onclick="openPhysics()">
                ⚡ Physics
            </button>

            <button onclick="openChemistry()">
                🧪 Chemistry
            </button>

            <br><br>

            <button onclick="uploadQuestion()">
                📷 Upload Question
            </button>

        </div>
    `;
}


function openMaths() {

    document.body.innerHTML = `
        <div class="container">

            <h1>📐 Mathematics</h1>

            <p>Ask your Mathematics question:</p>

            <textarea
                id="mathQuestion"
                rows="6"
                placeholder="Example: Solve 2x + 5 = 15">
            </textarea>

            <br>

            <button onclick="askAI('Mathematics', 'mathQuestion', 'mathAnswer')">
                🤖 Ask AI Tutor
            </button>

            <div id="mathAnswer"></div>

            <br>

            <button onclick="startLearning()">
                ⬅️ Back to Dashboard
            </button>

        </div>
    `;
}


function openPhysics() {

    document.body.innerHTML = `
        <div class="container">

            <h1>⚡ Physics</h1>

            <p>Ask your Physics question:</p>

            <textarea
                id="physicsQuestion"
                rows="6"
                placeholder="Example: What is Newton's second law?">
            </textarea>

            <br>

            <button onclick="askAI('Physics', 'physicsQuestion', 'physicsAnswer')">
                🤖 Ask AI Tutor
            </button>

            <div id="physicsAnswer"></div>

            <br>

            <button onclick="startLearning()">
                ⬅️ Back to Dashboard
            </button>

        </div>
    `;
}


function openChemistry() {

    document.body.innerHTML = `
        <div class="container">

            <h1>🧪 Chemistry</h1>

            <p>Ask your Chemistry question:</p>

            <textarea
                id="chemistryQuestion"
                rows="6"
                placeholder="Example: What is the atomic number of oxygen?">
            </textarea>

            <br>

            <button onclick="askAI('Chemistry', 'chemistryQuestion', 'chemistryAnswer')">
                🤖 Ask AI Tutor
            </button>

            <div id="chemistryAnswer"></div>

            <br>

            <button onclick="startLearning()">
                ⬅️ Back to Dashboard
            </button>

        </div>
    `;
}


async function askAI(subject, questionId, answerId) {

    const question =
        document.getElementById(questionId).value.trim();

    const answerBox =
        document.getElementById(answerId);

    if (question === "") {

        alert("Please enter your question.");

        return;
    }

    answerBox.innerHTML = `
        <h2>🤖 AI Tutor</h2>
        <p>Thinking... ⏳</p>
    `;

    try {

        const response = await fetch(`${API_URL}/ask`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                subject: subject,
                question: question
            })

        });


        if (!response.ok) {

            throw new Error("Server error");

        }


        const data = await response.json();


        answerBox.innerHTML = `
            <h2>🤖 AI Tutor</h2>

            <p>
                <strong>${subject}</strong>
            </p>

            <div style="
                background: white;
                padding: 20px;
                margin-top: 15px;
                border-radius: 10px;
                text-align: left;
                white-space: pre-wrap;
            ">
                ${escapeHTML(data.answer)}
            </div>
        `;

    } catch (error) {

        console.error(error);

        answerBox.innerHTML = `
            <h2>⚠️ Connection Error</h2>

            <p>
                The AI server could not be reached.
            </p>

            <p>
                Please make sure the Python backend
                is running in VS Code.
            </p>
        `;
    }
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


function uploadQuestion() {

    document.body.innerHTML = `
        <div class="container">

            <h1>📷 Upload Question</h1>

            <p>
                Upload a photo of a handwritten or printed question.
            </p>

            <input
                type="file"
                id="questionImage"
                accept="image/*">

            <br><br>

            <button onclick="processImage()">
                🔍 Read Question
            </button>

            <div id="uploadResult"></div>

            <br>

            <button onclick="startLearning()">
                ⬅️ Back to Dashboard
            </button>

        </div>
    `;
}


function processImage() {

    const file =
        document.getElementById("questionImage").files[0];

    if (!file) {

        alert("Please choose an image first.");

        return;
    }

    document.getElementById("uploadResult").innerHTML = `
        <h2>✅ Image received!</h2>

        <p>
            Image-based AI reading will be connected
            in the next stage.
        </p>
    `;
}
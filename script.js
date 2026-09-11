let selectedStyle = "corporate";


// ==============================
// TEXTAREA COUNTERS
// ==============================

const input = document.getElementById("inputText");

input.addEventListener("input", function () {

    const text = input.value.trim();

    const words = text === ""
        ? 0
        : text.split(/\s+/).length;

    document.getElementById("wordCount").textContent =
        words + (words === 1 ? " word" : " words");

    document.getElementById("charCount").textContent =
        input.value.length + " / 500";
});


// ==============================
// STYLE SELECTION
// ==============================

function selectStyle(button) {

    document.querySelectorAll(".style-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    selectedStyle = button.dataset.style;
}


// ==============================
// TRANSLATION
// ==============================

function translateText() {

    const text = input.value.trim();

    if (text === "") {

        alert("Please enter a sentence first! 🤖");

        return;
    }

    const originalWords = countWords(text);

    let result = generateNonsense(text, selectedStyle);

    document.getElementById("outputText").textContent = result;

    const nonsenseWords = countWords(result);

    const inflation = Math.max(
        0,
        Math.round(
            ((nonsenseWords - originalWords) /
            originalWords) * 100
        )
    );

    const score = calculateNonsenseScore(
        originalWords,
        nonsenseWords,
        selectedStyle
    );

    document.getElementById("originalWords").textContent =
        originalWords;

    document.getElementById("nonsenseWords").textContent =
        nonsenseWords;

    document.getElementById("wordInflation").textContent =
        inflation + "%";

    document.getElementById("nonsenseScore").textContent =
        score + "%";

    updateVerdict(score, inflation);
}


// ==============================
// WORD COUNT
// ==============================

function countWords(text) {

    if (!text.trim()) {
        return 0;
    }

    return text.trim().split(/\s+/).length;
}


// ==============================
// FAKE AI TRANSLATION
// ==============================

function generateNonsense(text, style) {

    switch (style) {

        case "corporate":

            return `From a strategic operational perspective, the statement "${text}" may be interpreted as an indication of a temporary alignment gap within the current execution framework. Further optimization of the associated workflow may therefore be considered to ensure improved efficiency, communication, and overall organizational outcomes.`;

        case "academic":

            return `Based on a preliminary conceptual analysis of the aforementioned statement, it can be inferred that "${text}" represents a situation requiring further contextual interpretation. From an academic perspective, the phenomenon may be examined through a multidimensional analytical framework in order to establish a comprehensive understanding of the underlying circumstances.`;

        case "government":

            return `With reference to the matter stated above, it is hereby observed that "${text}". Accordingly, the concerned circumstances may be subject to further examination, evaluation, and necessary administrative consideration by the appropriate authority, subject to applicable procedures and contextual requirements.`;

        case "legal":

            return `For the purposes of formal interpretation, and without prejudice to any applicable circumstances, the statement "${text}" shall be understood as representing the relevant situation, condition, or occurrence herein described, subject to such qualifications, interpretations, and contextual considerations as may subsequently become applicable.`;

        case "ai":

            return `After processing the semantic structure and contextual representation of the provided input, the system has determined that "${text}" can be represented as a conceptual information state requiring additional contextual interpretation. The resulting semantic transformation indicates a theoretically enhanced representation of the original linguistic structure.`;

        case "ridiculous":

            return `Following an unnecessarily advanced investigation conducted by absolutely unqualified imaginary experts, the statement "${text}" has been determined to represent a highly significant event of questionable importance. Multiple theoretical possibilities were considered, several unnecessary assumptions were introduced, and approximately zero useful conclusions were produced.`;

        default:

            return text;
    }
}


// ==============================
// NONSENSE SCORE
// ==============================

function calculateNonsenseScore(
    originalWords,
    nonsenseWords,
    style
) {

    let score = 40;

    // More words = more nonsense
    if (nonsenseWords > originalWords * 2) {
        score += 20;
    }

    if (nonsenseWords > originalWords * 3) {
        score += 15;
    }

    // Style bonuses
    if (style === "corporate") score += 10;
    if (style === "academic") score += 12;
    if (style === "government") score += 15;
    if (style === "legal") score += 14;
    if (style === "ai") score += 12;
    if (style === "ridiculous") score += 20;

    return Math.min(score, 100);
}


// ==============================
// VERDICT
// ==============================

function updateVerdict(score, inflation) {

    let message;

    if (score >= 90) {

        message =
            "Outstanding. You have successfully transformed a simple sentence into something nobody asked for. 🤯";

    } else if (score >= 75) {

        message =
            "Excellent nonsense generation. The sentence became significantly more complicated without gaining useful information. 😂";

    } else if (score >= 50) {

        message =
            "Moderate nonsense detected. Additional unnecessary vocabulary may be required.";

    } else {

        message =
            "The sentence is still dangerously understandable. More nonsense is recommended.";
    }

    document.getElementById("verdictText").textContent =
        message;
}


// ==============================
// CLEAR
// ==============================

function clearText() {

    input.value = "";

    document.getElementById("outputText").textContent =
        "Your unnecessarily complicated sentence will appear here...";

    document.getElementById("wordCount").textContent =
        "0 words";

    document.getElementById("charCount").textContent =
        "0 / 500";

    document.getElementById("originalWords").textContent = "0";

    document.getElementById("nonsenseWords").textContent = "0";

    document.getElementById("nonsenseScore").textContent = "0%";

    document.getElementById("wordInflation").textContent = "0%";

    document.getElementById("verdictText").textContent =
        "Enter a sentence and unleash unnecessary vocabulary.";
}


// ==============================
// COPY
// ==============================

function copyOutput() {

    const output =
        document.getElementById("outputText").textContent;

    if (
        output ===
        "Your unnecessarily complicated sentence will appear here..."
    ) {
        return;
    }

    navigator.clipboard.writeText(output);

    const button = document.getElementById("copyBtn");

    button.textContent = "✅ Copied!";

    setTimeout(() => {

        button.textContent = "📋 Copy";

    }, 1500);
}

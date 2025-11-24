import { sha512 } from "./hash";

// Utility: split into clean sentences
function extractSentences(text) {
  return text
    .split(/[\.\n\!\?]/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Utility: Extract potential timestamps/dates
function extractTimes(sentences) {
  // Separate regex patterns for better readability and maintainability
  const timePattern = /\b\d{1,2}:\d{2}(?:am|pm)?\b/gi;
  const datePattern = /\b(?:\d{4}|\d{2})-\d{1,2}-\d{1,2}\b/g;
  
  let found = [];
  sentences.forEach((s, i) => {
    const times = [...s.matchAll(timePattern), ...s.matchAll(datePattern)];
    if (times.length) found.push({ index: i, sentence: s, times });
  });
  return found;
}

// Utility: score limiter
function clampScore(score) {
  return Math.max(0, Math.min(score, 100));
}

export async function runContradictionEngine(text) {
  const sentences = extractSentences(text);
  const contradictions = [];
  let deduction = 0;

  // BRAIN 1 — LINGUISTIC LOGIC (DIRECT CONTRADICTIONS)
  for (let i = 0; i < sentences.length; i++) {
    for (let j = i + 1; j < sentences.length; j++) {
      const A = sentences[i].toLowerCase();
      const B = sentences[j].toLowerCase();
      
      const opposites = [
        ["did not", "did"],
        ["was not", "was"],
        ["never", "always"],
        ["cannot", "can"],
        ["didn't", "did"],
        ["won't", "will"],
        ["is not", "is"]
      ];
      
      for (let [neg, pos] of opposites) {
        if (A.includes(neg) && B.includes(pos)) {
          contradictions.push(
            `Direct contradiction: "${sentences[i]}" VS "${sentences[j]}"`
          );
          deduction += 10;
        }
        if (B.includes(neg) && A.includes(pos)) {
          contradictions.push(
            `Direct contradiction: "${sentences[i]}" VS "${sentences[j]}"`
          );
          deduction += 10;
        }
      }
    }
  }

  // BRAIN 2 — TIMELINE REASONING
  const timeline = extractTimes(sentences);
  if (timeline.length > 1) {
    for (let i = 0; i < timeline.length - 1; i++) {
      const t1 = timeline[i];
      const t2 = timeline[i + 1];
      if (t1.index > t2.index) {
        contradictions.push(
          `Timeline contradiction: "${t1.sentence}" appears before "${t2.sentence}" but contains a later timestamp.`
        );
        deduction += 12;
      }
    }
  }

  // BRAIN 3 — EVIDENCE CORRELATION
  sentences.forEach((s) => {
    if (s.toLowerCase().match(/i have (proof|evidence|documents|files)/) && 
        !text.toLowerCase().includes("attached") && 
        !text.toLowerCase().includes("upload")) {
      contradictions.push(
        `Evidence contradiction: "${s}" claims evidence exists but none is attached or referenced.`
      );
      deduction += 8;
    }
  });

  // BRAIN 4 — BEHAVIORAL SEMANTICS
  const emotionalPos = ["happy", "calm", "fine", "okay"];
  const emotionalNeg = ["afraid", "scared", "angry", "upset"];
  
  sentences.forEach((s1, i) => {
    sentences.forEach((s2, j) => {
      if (i !== j) {
        emotionalPos.forEach((p) => {
          emotionalNeg.forEach((n) => {
            if (s1.toLowerCase().includes(p) && s2.toLowerCase().includes(n)) {
              contradictions.push(
                `Behavioral contradiction: "${s1}" conflicts with "${s2}"`
              );
              deduction += 6;
            }
          });
        });
      }
    });
  });

  // BRAIN 5 — LEGAL IMPOSSIBILITY
  const legalImpossibilities = [
    { phrase: "i arrested him", rule: "Only police can arrest someone." },
    { phrase: "i sentenced him", rule: "Only courts can sentence someone." },
    { phrase: "i pardoned him", rule: "Only heads of state can issue pardons." },
  ];
  
  sentences.forEach((s) => {
    const lower = s.toLowerCase();
    legalImpossibilities.forEach((item) => {
      if (lower.includes(item.phrase)) {
        contradictions.push(
          `Legal impossibility: "${s}" — ${item.rule}`
        );
        deduction += 10;
      }
    });
  });

  // BRAIN 6 — FACTUAL CROSS-REFERENCE
  sentences.forEach((s1, i) => {
    sentences.forEach((s2, j) => {
      if (i !== j) {
        if (s1.toLowerCase().includes("alone") && 
            s2.toLowerCase().includes("with")) {
          contradictions.push(
            `Factual contradiction: "${s1}" conflicts with "${s2}"`
          );
          deduction += 8;
        }
      }
    });
  });

  // BRAIN 7 — INTENT & MEANING COHERENCE
  sentences.forEach((s1, i) => {
    sentences.forEach((s2, j) => {
      if (i !== j) {
        if (s1.toLowerCase().includes("accident") && 
            s2.toLowerCase().includes("on purpose")) {
          contradictions.push(
            `Intent contradiction: "${s1}" VS "${s2}"`
          );
          deduction += 8;
        }
      }
    });
  });

  // BRAIN 8 — EMOTIONAL ALIGNMENT
  sentences.forEach((s1, i) => {
    sentences.forEach((s2, j) => {
      if (i !== j) {
        if (s1.toLowerCase().includes("i was not afraid") && 
            s2.toLowerCase().includes("i panicked")) {
          contradictions.push(
            `Emotional inconsistency: "${s1}" conflicts with "${s2}"`
          );
          deduction += 6;
        }
      }
    });
  });

  // BRAIN 9 — CONSENSUS SYNTHESIS
  let score = clampScore(100 - deduction);

  // Generate analysis hash for integrity
  const hash = sha512(text + JSON.stringify(contradictions) + score);

  return {
    contradictions,
    score,
    hash
  };
}

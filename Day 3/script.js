 let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  const query = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(query));
}

function longestNote() {
  if (notes.length === 0) return null;

  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest
  );
}

function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const categorySummary = ["personal", "work", "study"]
    .filter((category) => counts[category])
    .map((category) => `${counts[category]} ${category}`)
    .join(", ");

  return `${total} ${total === 1 ? "note" : "notes"}: ${categorySummary}.`;
}

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();
  return notes.some(
    (note) => note.text.trim().toLowerCase() === normalizedText
  );
}

function addNote(text, category) {
  const trimmedText = text.trim();

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Note not added: duplicate text.");
    return false;
  }

  if (!["personal", "work", "study"].includes(category)) {
    console.log("Note not added: category must be personal, work, or study.");
    return false;
  }

  const nextId =
    notes.reduce((maximum, note) => Math.max(maximum, note.id), 0) + 1;
  notes.push({ id: nextId, text: trimmedText, category });
  console.log("Note added.");
  return true;
}

// searchNotes
console.log("Search for 'DAY':", searchNotes("DAY")); // Expected: the Day 3 assignment note.
console.log("Search for 'holiday':", searchNotes("holiday")); // Expected: [].

// longestNote
console.log("Longest note:", longestNote()); // Expected: note 3, "Email the project report to Grace".
const savedNotes = notes;
notes = [];
console.log("Longest note with no notes:", longestNote()); // Expected: null.
notes = savedNotes;

// countByCategory
console.log("Counts by category:", countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }.
console.log(
  "Counts after adding a work note:",
  addNote("Prepare slides", "work"),
  countByCategory()
); // Expected: true, then work: 2.

// getSummary
console.log("Summary:", getSummary()); // Expected: 6 notes: 2 personal, 2 work, 2 study.
const summaryNotes = notes;
notes = [{ id: 1, text: "One note", category: "personal" }];
console.log("Single-note summary:", getSummary()); // Expected: 1 note: 1 personal.
notes = summaryNotes;

// isDuplicate
console.log(
  "Duplicate with case and spaces:",
  isDuplicate("  BUY MILK AND BREAD  ")
); // Expected: true.
console.log("New text is duplicate:", isDuplicate("A brand new note")); // Expected: false.

// addNote
console.log("Add valid note:", addNote("Book dentist", "personal")); // Expected: logs "Note added." then true.
console.log(
  "Reject duplicate:",
  addNote("  buy MILK and bread ", "personal")
); // Expected: duplicate reason then false.
console.log("Reject blank text:", addNote("   ", "work")); // Expected: length reason then false.
console.log(
  "Reject invalid category:",
  addNote("Plan weekend", "home")
); // Expected: category reason then false.
import test from "node:test";
import assert from "node:assert/strict";
import { validateRecord } from "./catalog.js";

test("validates structured destination cards and ordered FAQs", () => {
  const destination = {
    slug: "example",
    name: "Example",
    description: "Description",
    gallery: ["/image.png"],
    popular_places: [{ name: "Place", image: "/place.png", description: "Details", highlights: ["One"] }],
    content: { oneLiner: "One liner", faqs: [{ question: "Question?", answer: "Answer" }] },
  };
  assert.equal(validateRecord("destinations", destination), null);
  assert.match(validateRecord("destinations", { ...destination, popular_places: [{ name: "", highlights: [] }] }), /popular place/i);
  assert.match(validateRecord("destinations", { ...destination, content: { faqs: [{ question: "", answer: "Answer" }] } }), /FAQ/);
});

test("validates service card and list shapes while accepting legacy text lists", () => {
  const service = {
    slug: "example",
    id: "example",
    title: "Example",
    description: "Description",
    content: { highlights: [{ title: "Title", description: "Details" }], benefits: ["Legacy benefit"], suitableFor: ["Groups"], faqs: [] },
  };
  assert.equal(validateRecord("services", service), null);
  assert.match(validateRecord("services", { ...service, content: { highlights: [{ title: "" }] } }), /highlights/);
  assert.match(validateRecord("services", { ...service, content: { gallery: [42] } }), /gallery/);
});

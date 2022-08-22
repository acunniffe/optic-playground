const yaml = require("js-yaml");
const {
  traverseSpec,
  factsToChangelog,
  groupChangesAndRules
} = require("@useoptic/openapi-utilities");
const $RefParser = require("@apidevtools/json-schema-ref-parser");

const { TestHelpers } = require("@useoptic/rulesets-base");
const { BreakingChangesRuleset } = require("@useoptic/standard-rulesets");

function decodeBase64(text: string): string {
  let buff = new Buffer(text, "base64");
  return buff.toString("ascii");
}

export async function compare(): { error: string } | { results: string } {
  const spec1 = decodeBase64(require("./openapi.yml").split(",")[1]);
  const spec2 = decodeBase64(require("./openapi-HEAD.yml").split(",")[1]);

  let spec1Json;
  let spec2Json;

  try {
    spec1Json = await $RefParser.dereference(yaml.load(spec1));
  } catch (e) {
    return { error: "openapi.yml was invalid yml " + e.message };
  }

  try {
    spec2Json = await $RefParser.dereference(yaml.load(spec2));
  } catch (e) {
    return { error: "openapi-HEAD.yml was invalid yml " + e.message };
  }

  const facts1 = traverseSpec(spec1Json);
  const facts2 = traverseSpec(spec2Json);

  const changelog = factsToChangelog(facts1, facts2);
  console.log(changelog);

  const rules = [new BreakingChangesRuleset()];

  // console.log(results);

  const grouped = groupChangesAndRules({
    toFacts: facts2,
    changes: changelog,
    rules: []
  });

  console.log(grouped);

  return { results: "" };
}

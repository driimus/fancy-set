import core from "@actions/core";
import Parser from "tap-parser";
import fs from "node:fs";

const OPEN_BRACE_EOL = /\{\s*$/;

const parseDirective = (line) => {
  if (!line.trim()) return false;

  line = line.replace(OPEN_BRACE_EOL, "").trim();
  // Similar to the logic in `tap-parse`, but matches `duration_ms` comments instead of `time=`
  const time = line.match(/^duration_ms ((?:[1-9][0-9]*|0)(?:\.[0-9]+)?)$/i);
  if (time) {
    let n = +time[1];
    if (time[2] === "s") {
      // JS does weird things with floats.  Round it off a bit.
      n *= 1000000;
      n = Math.round(n);
      n /= 1000;
    }
    return ["time", n];
  }

  const type = line.match(/^(todo|skip)(?:\S*)\b(.*)$/i);
  if (!type) return false;

  return [type[1].toLowerCase(), type[2].trim() || true];
};

class NodeTestParser extends Parser {
  emitComment(line, skipLine, noDuplicate) {
    if (line.trim().charAt(0) !== "#") line = "# " + line;

    if (line.slice(-1) !== "\n") line += "\n";

    if (noDuplicate && this.comments.indexOf(line) !== -1) return;

    this.comments.push(line);
    const dir = parseDirective(line.replace(/^\s*#\s*/, "").trim());
    if (dir[0] === "time" && typeof dir[1] === "number") this.time = dir[1];

    if (this.current || this.extraQueue.length) {
      // no way to get here with skipLine being true
      this.extraQueue.push(["line", line]);
      this.extraQueue.push(["comment", line]);
    } else {
      if (!skipLine) this.emit("line", line);
      this.emit("comment", line);
    }
  }
}

export const createTestSummary = async () => {
  const p = new NodeTestParser(async (results) => {
    const { ok, pass, fail, skip, time } = results;

    await core.summary
      .addHeading("Test Results")
      .addTable([
        [
          { data: "Result 🧪", header: true },
          { data: "Passed", header: true },
          { data: "Failed", header: true },
          { data: "Skipped ", header: true },
          { data: "Duration (ms) ⏱️", header: true },
        ],
        [
          ok ? "Pass ✅" : "Fail ❌",
          pass.toString(),
          fail.toString(),
          skip.toString(),
          time.toString(),
        ],
      ])
      .write();
  });

  return fs.createReadStream("./previous-test-output.tap").pipe(p);
};

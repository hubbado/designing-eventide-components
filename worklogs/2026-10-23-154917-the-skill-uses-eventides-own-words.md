# The skill uses Eventide's own words (2026-10-23 15:49)

- [decision] A candidate's sketch gives, for each stream, the commands that it
  takes and the events that it writes, and for each component, the commands
  that it sends and the events of other streams that it handles. Its walk uses
  those names.
  - Sam Stickland asked whether the candidates would show the basic messages,
    streams, commands and subscriptions. The row "Other users" judges
    couplings, and the reviewer can check a coupling only from the messages
    and the handlers.
- [finding] A session that is resumed or rewound keeps the skill's text that
  it loaded first. Sam Stickland's session loaded `SKILL.md` once, at 13:11,
  and ran until 16:23 without the changes of that afternoon. A test of a new
  text needs a new session.
- [finding] The table's cell words were the skill's own, and the skill never
  defined them. Two runs gave the same kind of step as "a relay" in one and
  "a protocol" in the other. Sam Stickland: "I don't know what 'a relay' or 'a
  protocol' mean", and "One write as opposed to what?"
- [finding] Eventide's sources, read for their words:
  - The docs call the component that sends commands "coordinating", and the
    one that takes them "afferent". The result comes back by Pub/Sub with
    correlation, "like a return address".
  - The course's Tutorial Guide says "multi-step transfer workflow", and once
    "funds transfer protocol". The syllabus has "Workflows Between Services",
    and the blog calls the correlation metadata "Workflow Attributes".
  - The handler "accepts or rejects the command" (Scott Bellware), protected
    by the expected version. There is no name for the whole mechanism.
  - No name for a command sent with no result handled. In the examples, the
    result of every command sent is handled.
  - No name for a rule that only the app checks. The glossary uses
    "applicative" for logic inside a service, so "application only" can be
    read as the opposite.
  - "Orchestration" is not in the docs. In a talk, Scott Bellware puts
    "service orchestration" with ESBs as "smart pipes" (auto-captions).
  - `reply_stream_name` is going out of use: the 2017 workshop used reply, the
    2022 workshop uses correlation, and messaging issue 32 (2024) is "Consider
    removing the `reply` API".
  - The course material is public: the Tutorial Guide and three slide decks
    on Google, linked from the archived eventide-project.org/tutorial-materials.
- [decision] The cell words are "inside one stream", "across streams: a
  workflow of N steps", "a read model" and "the app only", each defined in
  `SKILL.md`. The prose says "workflow" where it said "protocol".
  - [rejected] "One write". It names the mechanism, and the table compares
    where the facts are: in one stream, or across streams.
  - [rejected] "A relay" as a word of its own. Eventide does not separate it,
    and the size of the workflow, with which steps can be rejected, keeps the
    difference.
- [decision] The rule is "Afferent components take commands, and efferent
  components coordinate them", in the docs' word.

import type { ReadResponseContent } from "../../src/conversation/domain/read/ReadResponseContent";
import type { ReadThreadId } from "../../src/conversation/domain/read/ReadThreadId";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResponseLineComponent = ({
  line,
  threadId,
}: {
  line: string;
  threadId: ReadThreadId;
}) => {
  const regex = />>(\d+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.substring(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        className="text-blue-500 hover:underline"
        href={`#${threadId.val}-${match[1]}`}
      >
        {`>>${match[1]}`}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  parts.push(line.substring(lastIndex));

  return <div>{parts}</div>;
};

// まとめて全部行うためのコンポーネント
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResponseContentComponent = ({
  threadId,
  responseContent,
}: {
  threadId: ReadThreadId;
  responseContent: ReadResponseContent;
}) => {
  const lines = responseContent.val.split("\n");
  return (
    <div>
      {lines.map((line, i) => (
        <ResponseLineComponent key={i} line={line} threadId={threadId} />
      ))}
    </div>
  );
};

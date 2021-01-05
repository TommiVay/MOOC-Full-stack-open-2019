import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}
const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface IncDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends IncDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends IncDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends IncDescription {
  name: "Type four";
  difficulty: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount} {part.description}{" "}
          {part.exerciseSubmissionLink}
        </p>
      );
    case "Type four":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount} {part.description} {part.difficulty}
        </p>
      );
    default:
      return assertNever(part);
  }
};

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "Type four",
      exerciseCount: 1,
      description: "This is addition course part",
      difficulty: "medium",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export interface ProblemDetail {
  title: string;
  violations: Violation[];
}

export interface Violation {
  name: string;
  accountId: string;
  message: string;
}

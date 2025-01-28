export const trelloConfig = {
  Key: process.env.TRELLO_KEY,
  Token: process.env.TRELLO_TOKEN,

  OrganizationId: process.env.TRELLO_ORGANISATION_ID,
  EmployeesBoarId: process.env.TRELLO_BOARD_EMPLOYEES,
  AssignmentsBoardId: process.env.TRELLO_BOARD_ASSIGNMENTS,

  NeedAssignmentCardId: process.env.TRELLO_CARD_NEED_ASSIGNMENT,
  ParentalLeaveCardId: process.env.TRELLO_CARD_PARENTAL_LEAVE,
};

export const trelloConfig = () => ({
    KEY: process.env.TRELLO_KEY,
    TOKEN: process.env.TRELLO_TOKEN,

    EMPLOYEES_BOARD_ID: process.env.TRELLO_BOARD_EMPLOYEES,
    STATUS_BOARD_ID: process.env.TRELLO_BOARD_STATUS,
    ASSIGNMENTS_LIST_ID: process.env.TRELLO_BOARD_ASSIGNMENTS,

    NeedAssignmentCardId: process.env.TRELLO_CARD_NEED_ASSIGNMENT,
    ParentalLeaveCardId: process.env.TRELLO_CARD_PARENTAL_LEAVE,
});

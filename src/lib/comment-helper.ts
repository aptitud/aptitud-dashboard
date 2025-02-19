const INCLUDE_COMMENT_EMOJI = "😎";
const INCLUDE_COMMENT_EMOJI_TEXT = ":sunglasses:";

export const isActiveCustomerComment = (text: string) => {
  return text?.includes(INCLUDE_COMMENT_EMOJI) || text?.includes(INCLUDE_COMMENT_EMOJI_TEXT);
};

export const cleanupCommentText = (text: string) => {
  return text.replaceAll(INCLUDE_COMMENT_EMOJI, "").replaceAll(INCLUDE_COMMENT_EMOJI_TEXT, "").trim();
};

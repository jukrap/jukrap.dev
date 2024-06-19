export const getEmojiLength = (text: string) => {
	const emojiRegex = /\p{Emoji}/u;
	const match = text.match(emojiRegex);
	return match ? match[0].length : 0;
};

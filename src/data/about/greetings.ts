import {
	obfuscatedBirthDate,
	decodeBirthDate,
	calculateAge,
} from '../../util/dateUtils';

const birthDate = decodeBirthDate(obfuscatedBirthDate);
const age = calculateAge(birthDate);

export const greetings = [
	`👋 Hi there, I'm a 【Web & Mobile Frontend Engineer】. `,
	`🤖 Hi there, I'm 【Android Developer】. `,
	`👋 Hi there, I'm 【Jukrap】. `,
	`👋 Hi there, I'm 【Ju-cheol Park】. `,
	`🎮 Hi there, I'm a 【Gamer】. `,
	`📚 Hi there, I'm a 【Book Lover】. `,
	`👶 Hi there, I'm 【${age} years old】. `,
	`🚀 Ready to launch some stellar code! 【(and maybe a few memes)】 `,
	`📖 Avid 【reader】 and lifelong 【learner】. `,
	`📚 【I LOVE NOVEL !】 `,
	`🤝 【Collaboration and innovation】 are my strengths. `,
	`🚀 Exploring the world of 【mobile and frontend】. `,
	`📚 Always 【learning】, always 【growing】. `,
	`💖 Dedicated to 【mentoring and helping】 others grow. `,
	`🛠️ 【Debugging】: because my code never works on the first try. `,
];

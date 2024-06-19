export const obfuscatedBirthDate = { year: 7156, month: 128, day: 8923 };

export const decodeBirthDate = (obfuscated: {
	year: number;
	month: number;
	day: number;
}) => {
	const actualYear = obfuscated.year - 5156;
	const actualMonth = obfuscated.month - 122;
	const actualDay = obfuscated.day - 8895;
	return new Date(actualYear, actualMonth, actualDay);
};

export const calculateAge = (birthDate: Date) => {
	const today = new Date();
	const birthYear = birthDate.getFullYear();
	const birthMonth = birthDate.getMonth();
	const birthDay = birthDate.getDate();

	let age = today.getFullYear() - birthYear;
	const monthDiff = today.getMonth() - birthMonth;
	const dayDiff = today.getDate() - birthDay;

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
};

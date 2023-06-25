import readFile from '$lib/utility/read-file';

export default async function isValidFile(
	file: File,
	expectedType: object & { [k: string]: { value: string; optional?: true } },
	format: 'JSON' = 'JSON'
): Promise<boolean> {
	if (format === 'JSON') {
		const fileText: string = await readFile(file);
		const objArray: (object & { [k: string]: any })[] = JSON.parse(fileText);

		console.log(objArray);
		console.log(expectedType);
		for (const obj of objArray) {
			for (const key in expectedType) {
				const expectedKeyName: string = key;
				const getExpectedType = () => {
					if (expectedType[key].optional) {
						return `${typeof expectedType[key].value}?`;
					}
					return `${typeof expectedType[key].value}`;
				};
				const expectedValueType = getExpectedType();

				if (!expectedValueType.endsWith('?')) {
					if (!obj[expectedKeyName] || typeof obj[expectedKeyName] !== expectedValueType) {
						console.log(typeof obj[expectedKeyName]);
						console.log(expectedValueType);
						return false;
					}
				}
			}
		}
	}

	return true;
}

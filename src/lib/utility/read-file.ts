export default async function readFile(file: File): Promise<string> {
	return await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file, 'UTF-8');
		reader.onload = function (e) {
			resolve((e.target as any).result);
		};
		reader.onerror = function (e) {
			reject(e);
		};
	});
}

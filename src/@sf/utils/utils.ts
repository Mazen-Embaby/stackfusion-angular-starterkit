import { from } from 'rxjs';

export class Utils {
  static readAsDataURL = (file: File): Promise<any> =>
    new Promise((resolve, reject) => {
      // create file reader
      const reader = new FileReader();

      reader.onload = (): void => {
        resolve(reader.result);
      };

      // catch error
      reader.onerror = (e): void => {
        reject(e);
      };

      // Read the file
      reader.readAsDataURL(file);
    });

  static imgURL2Base64(file: File) {
    return from(this.readAsDataURL(file));
  }

  static downloadFile(data: any, fileName = 'data.csv') {
    const replacer = (key: any, value: null) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row: Record<string, any>) =>
      header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','),
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    if (!fileName.endsWith('.csv')) {
      fileName = fileName + '.csv';
    }
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}

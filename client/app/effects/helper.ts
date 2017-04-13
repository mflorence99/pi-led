import { Response } from '@angular/http';

export function handleError(error: Response): string {
  const dflt = 'Unknown error; server possibly down';
  const msg = `Status ${error.status}: ${error.statusText || dflt}`;
  console.log(msg);
  return msg;
}
